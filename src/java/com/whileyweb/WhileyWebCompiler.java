package com.whileyweb;

import static wyc.Activator.WHILEY_PLATFORM;
import static wyboogie.Activator.BOOGIE_PLATFORM;
import static wyjs.Activator.JS_PLATFORM;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ForkJoinPool;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.whileyweb.util.ProcessTimerMethod;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

import jwebkit.http.HttpMethodDispatchHandler;
import wybs.lang.Build;
import wybs.lang.SyntacticItem;
import wybs.lang.Build.Meter;
import wybs.util.AbstractCompilationUnit;
import wybs.util.Logger;
import wybs.util.AbstractCompilationUnit.Attribute;
import wybs.util.AbstractCompilationUnit.Attribute.Span;
import wybs.util.AbstractCompilationUnit.Value;
import wybs.util.SequentialBuildProject;
import wyc.Activator;
import wyc.cmd.QuickCheck;
import wyc.lang.WhileyFile;
import wycli.WyMain;
import wycli.cfg.ConfigFile;
import wycli.cfg.Configuration;
import wycli.cfg.HashMapConfiguration;
import wycli.cfg.Configuration.Schema;
import wycli.lang.Command;
import wycli.lang.Command.Environment;
import wycli.lang.Package.Resolver;
import wyfs.lang.Content;
import wyfs.lang.Path;
import wyfs.lang.Content.Registry;
import wyfs.lang.Path.Filter;
import wyfs.lang.Path.ID;
import wyfs.lang.Path.Root;
import wyfs.util.DirectoryRoot;
import wyfs.util.Pair;
import wyfs.util.Trie;
import wyfs.util.VirtualRoot;
import wyfs.util.ZipFile;
import wyfs.util.ZipFileRoot;
import wyil.lang.WyilFile;
import wyil.lang.WyilFile.Attr.SyntaxError;
import wyjs.core.JavaScriptFile;
import wyjs.io.JavaScriptFilePrinter;

public class WhileyWebCompiler extends HttpMethodDispatchHandler {

	// Have no idea why this is needed.
	public static Configuration.Schema TEMPORARY_SCHEMA = Configuration.fromArray(
			Configuration.UNBOUND_STRING(Activator.PKGNAME_CONFIG_OPTION, "list of globally installed plugins", true));


	// Construct the configuration schema.
	private final static Configuration.Schema SCHEMA = Configuration.toCombinedSchema(
			TEMPORARY_SCHEMA,
			WyMain.LOCAL_CONFIG_SCHEMA,
			WHILEY_PLATFORM.getConfigurationSchema(),
			BOOGIE_PLATFORM.getConfigurationSchema(),
			JS_PLATFORM.getConfigurationSchema(),
			QuickCheck.DESCRIPTOR.getConfigurationSchema());

	private final int timeout;
	private final String repository;
	private final boolean boogie;

	public WhileyWebCompiler(String repository, int timeout, boolean boogie) throws IOException {
		super(HttpMethodDispatchHandler.ALLOW_POST);
		this.repository = repository;
		this.timeout = timeout;
		this.boogie = boogie;
	}

	@Override
	public void post(HttpRequest request, HttpResponse response, HttpContext context)
			throws HttpException, IOException {
		HttpEntity entity = checkHasEntity(request);
		try {
			// Parse compile request
			JSONObject json = new JSONObject(EntityUtils.toString(entity));
			// Extract key fields
			String code = json.getString("code");
			boolean verification = json.getBoolean("verify");
			boolean counterexamples = json.getBoolean("counterexamples");
			boolean quickcheck = json.getBoolean("quickcheck");
			String[] dependencies = toStringArray(json.getJSONArray("dependencies"));
			// Run the build
			try {
				// NOTE: we use ProcessTimeMethod here to ensure that a proper
				// timeout can be enforced. This is not the ideal way to do
				// this, but for now it works.
				ProcessTimerMethod.Outcome result = ProcessTimerMethod.exec(timeout, this.getClass().getCanonicalName(),
						"compile", repository, code, verification, counterexamples, quickcheck, boogie, dependencies);
				//
				if (result.exitCode() != null) {
					String reply = result.getReturnAs(String.class);
					// Configure response
					response.setEntity(new StringEntity(reply)); // ContentType.APPLICATION_JSON fails?
					response.setStatusCode(HttpStatus.SC_OK);
					// Done
					return;
				} else {
					errorResponse(response, "timeout");
					return;
				}
			} catch (Throwable e) {
				e.printStackTrace();
				errorResponse(response, "internal failure (" + e.getMessage() + ")");
				return;
			}
		} catch (ParseException e) {
		} catch (JSONException e) {
		} catch (IOException e) {
		}
		// Malformed Request
		response.setStatusCode(HttpStatus.SC_BAD_REQUEST);
	}

	private void errorResponse(HttpResponse response, String msg) {
		HashMap<String, Object> result = new HashMap<>();
		result.put("result", "exception");
		result.put("text", msg);
		String r = toJsonString(result);
		try {
			response.setEntity(new StringEntity(r));
		} catch (UnsupportedEncodingException e) {

		}
		response.setStatusCode(HttpStatus.SC_OK);
	}

	private HttpEntity checkHasEntity(HttpRequest request) throws HttpException {
		if (request instanceof BasicHttpEntityEnclosingRequest) {
			BasicHttpEntityEnclosingRequest r = (BasicHttpEntityEnclosingRequest) request;
			return r.getEntity();
		} else {
			throw new HttpException("Missing entity");
		}
	}

	public String compile(String repositoryLocation, String code, boolean verification, boolean counterexamples, boolean quickcheck, boolean boogie, String[] dependencies)
			throws IOException, HttpException {
		DirectoryRoot repository = new DirectoryRoot(repositoryLocation,Main.REGISTRY);
		// Determine project directory
		Path.Root localRoot = new VirtualRoot(Main.REGISTRY);
		// Read the configuration schema
		HashMapConfiguration configuration = new HashMapConfiguration(SCHEMA);
		// Write default package name
		configuration.write(Activator.PKGNAME_CONFIG_OPTION,new Value.UTF8("main"));
		//
		if(!boogie && verification) {
			// Activate internal verification *only* if boogie is not available!
			configuration.write(Activator.VERIFY_CONFIG_OPTION, new Value.Bool(true));
		}
		if(counterexamples) {
			configuration.write(Activator.COUNTEREXAMPLE_CONFIG_OPTION, new Value.Bool(true));
		}
		// Construct environment and execute arguments
		Command.Project project = new CommandProject(localRoot,configuration);
		// Initialise the whiley platform
		WHILEY_PLATFORM.initialise(configuration, project);
		if(boogie && verification) {
			// Initialise Boogie (if applicable) and we want verification.
			BOOGIE_PLATFORM.initialise(configuration, project);
		}
		JS_PLATFORM.initialise(configuration, project);
		// Refresh system state
		//
		Path.Root root = project.getRoot();
		Path.ID srcID = Trie.ROOT.append("src").append("main");
		Path.ID binID = Trie.ROOT.append("bin").append("main");
		Path.ID jsBinID = Trie.ROOT.append("bin").append("js").append("main");
		//
		Path.Entry<WhileyFile> srcFile = root.get(srcID, WhileyFile.ContentType);
		if (srcFile == null) {
			srcFile = root.create(srcID, WhileyFile.ContentType);
		}
		// Write contents into source file
		srcFile.outputStream().write(code.getBytes());
		// Refresh project to ensure changes to binary file visible
		project.refresh();
		// Create project
		HashMap<String, Object> result = new HashMap<>();
		try {
			// Resolve package dependencies
			List<Build.Package> pkgs = resolvePackageDependencies(repository, SCHEMA, Main.REGISTRY, dependencies);
			project.getPackages().addAll(pkgs);
			//
			boolean ok = project.build(ForkJoinPool.commonPool(), Build.NULL_METER).get();
			// Extract the binary file
			Path.Entry<WyilFile> binFile = root.get(binID, WyilFile.ContentType);
			WyilFile binary = binFile.read();
			// Perform quickcheck testing!
			if(ok && quickcheck) {
				QuickCheck.Context context = QuickCheck.DEFAULT_CONTEXT;
				ok = new QuickCheck(Logger.NULL, System.out, System.err).check(project, binary, context,
						Collections.EMPTY_LIST);
			}
			// Flush everything to disk
			root.flush();
			//
			if (!ok) {
				// Build failed for some reason. Need to extract the error messages.
				List<SyntaxError> errors = binary.findAll(SyntaxError.class);
				result.put("result", "errors");
				result.put("errors", toErrorMessages(srcFile, errors));
			} else {
				// All is well
				Path.Entry<JavaScriptFile> jsFile = root.get(jsBinID, JavaScriptFile.ContentType);
				result.put("js", extractJavaScript(jsFile));
				result.put("result", "success");
			}
		} catch (Exception e) {
			// e.printStackTrace();
			// Some kind of internal failure has occurred, so simply report this.
			result.put("result", "exception");
			result.put("text", e.getMessage());
		}
		return toJsonString(result);
	}

	// ==================================================================
	// Helpers
	// ==================================================================

	public String[] toStringArray(JSONArray arr) throws JSONException {
		String[] items = new String[arr.length()];
		for(int i=0;i!=items.length;++i) {
			items[i] = arr.getString(i);
		}
		return items;
	}

	/**
	 * Add any declared dependencies to the set of project roots. The challenge here
	 * is that we may need to download, install and compile these dependencies if
	 * they are not currently installed.
	 *
	 * @throws IOException
	 */
	private static List<Build.Package> resolvePackageDependencies(Path.Root repository,
			Configuration.Schema schema, Content.Registry registry, String... deps) throws IOException {
		ArrayList<Build.Package> packages = new ArrayList<>();
		// Resolve each dependencies and add to project roots
		for (int i = 0; i != deps.length; ++i) {
			String dep = deps[i];
			// Construct path to the config file
			Trie root = Trie.fromString(dep);
			// Attempt to resolve it.
			if (!repository.exists(root, ZipFile.ContentType)) {
				// FIXME: handle better error handling.
				throw new RuntimeException("missing dependency \"" + dep + "\"");
			} else {
				// Extract entry for ZipFile
				Path.Entry<ZipFile> zipfile = repository.get(root, ZipFile.ContentType);
				// Construct root repesenting this ZipFile
				Path.Root pkgRoot = new ZipFileRoot(zipfile, registry);
				// Extract configuration from package
				Path.Entry<ConfigFile> entry = pkgRoot.get(Trie.fromString("wy"), ConfigFile.ContentType);
				if (entry == null) {
					throw new RuntimeException("corrupt package (missing wy.toml) \"" + dep + "\"");
				} else {
					ConfigFile pkgcfg = pkgRoot.get(Trie.fromString("wy"), ConfigFile.ContentType).read();
					// Construct a package representation of this root.
					Build.Package pkg = new Package(pkgRoot, pkgcfg.toConfiguration(schema, false));
					// Add a relative ZipFile root
					packages.add(pkg);
				}
			}
		}
		//
		return packages;
	}

	/**
	 * Yes, this class is a complete hack which needs to be replaced in the VERY
	 * near future.
	 *
	 * @author David J. Pearce
	 *
	 */
	private static class CommandProject extends SequentialBuildProject implements Command.Project {
		private final Configuration configuration;
		public CommandProject(Path.Root root, Configuration configuration) {
			super(root);
			this.configuration = configuration;
		}

		@Override
		public Schema getConfigurationSchema() {
			return configuration.getConfigurationSchema();
		}

		@Override
		public <T> boolean hasKey(ID key) {
			return configuration.hasKey(key);
		}

		@Override
		public <T> T get(Class<T> kind, ID key) {
			return configuration.get(kind, key);
		}

		@Override
		public <T> void write(ID key, T value) {
			configuration.write(key, value);
		}

		@Override
		public List<ID> matchAll(Filter filter) {
			return configuration.matchAll(filter);
		}

		@Override
		public Environment getEnvironment() {
			return new Command.Environment() {

				@Override
				public <T> void write(ID key, T value) {
					throw new UnsupportedOperationException();
				}

				@Override
				public List<ID> matchAll(Filter filter) {
					throw new UnsupportedOperationException();
				}

				@Override
				public <T> boolean hasKey(ID key) {
					throw new UnsupportedOperationException();
				}

				@Override
				public Schema getConfigurationSchema() {
					throw new UnsupportedOperationException();
				}

				@Override
				public <T> T get(Class<T> kind, ID key) {
					throw new UnsupportedOperationException();
				}

				@Override
				public Root getRoot() {
					throw new UnsupportedOperationException();
				}

				@Override
				public List<wybs.lang.Build.Project> getProjects() {
					throw new UnsupportedOperationException();
				}

				@Override
				public Resolver getPackageResolver() {
					throw new UnsupportedOperationException();
				}

				@Override
				public Meter getMeter() {
					throw new UnsupportedOperationException();
				}

				@Override
				public Logger getLogger() {
					return Logger.NULL;
				}

				@Override
				public ExecutorService getExecutor() {
					throw new UnsupportedOperationException();
				}

				@Override
				public Registry getContentRegistry() {
					throw new UnsupportedOperationException();
				}

				@Override
				public List<Command.Descriptor> getCommandDescriptors() {
					throw new UnsupportedOperationException();
				}

				@Override
				public List<Command.Platform> getBuildPlatforms() {
					throw new UnsupportedOperationException();
				}
			};
		}

	}

	private static class Package implements Build.Package {
		private final Path.Root root;
		private final Configuration configuration;

		public Package(Path.Root root, Configuration configuration) {
			this.root = root;
			this.configuration = configuration;
		}

		@Override
		public Path.Root getRoot() {
			return root;
		}

		@Override
		public <T extends Value> T get(Class<T> kind, Trie key) {
			return configuration.get(kind, key);
		}
	}

	/**
	 * Convert a list of syntactic markers into a key-value form which can be easily
	 * converted into JSON.
	 *
	 * @param source
	 * @param markers
	 * @return
	 */
	private static ArrayList<Object> toErrorMessages(Path.Entry<?> source,
			List<? extends SyntacticItem.Marker> markers) {
		ArrayList<Object> errors = new ArrayList<>();
		//
		for (SyntacticItem.Marker marker : markers) {
			errors.add(toErrorMessage(source, marker));
		}
		//
		return errors;
	}

	/**
	 * Convert a syntactic marker on a given source file to a key-value
	 * representation which can easily be converted into JSON.
	 *
	 * @param source
	 *            The source file containing the syntactic error
	 * @param marker
	 *            The syntactic marker identifying the error.
	 *
	 * @return
	 */
	private static Map<String, Object> toErrorMessage(Path.Entry<?> source, SyntacticItem.Marker marker) {
		HashMap<String, Object> error = new HashMap<>();
		//
		Span span = marker.getTarget().getAncestor(AbstractCompilationUnit.Attribute.Span.class);
		// Read the enclosing line so we can print it
		EnclosingLine enclosing = readEnclosingLine(source, span);
		// Sanity check we found it
		if (enclosing != null) {
			// construct the error message
			error.put("filename", "main.whiley");
			error.put("line", enclosing.lineNumber);
			error.put("start", enclosing.columnStart());
			error.put("end", enclosing.columnEnd());
			error.put("context", Collections.EMPTY_LIST);
			// FIXME: put back counterexamples!
//			if(counterexample) {
//				error.put("counterexample",counterexample);
//			}
		}
		error.put("text", marker.getMessage());
		//
		return error;
	}

	private static String extractJavaScript(Path.Entry<JavaScriptFile> file) throws IOException {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		JavaScriptFile jsf = file.read();
		new JavaScriptFilePrinter(output).write(jsf);
		return new String(output.toByteArray());
	}

	/**
	 * This is a simple hack for converting Java objects into JSON. It needs to
	 * be replaced by a proper JSON library.
	 *
	 * @param o
	 * @return
	 */
	private static String toJsonString(Object o) {
		if (o instanceof String) {
			String r = (String) o;
			r = StringEscapeUtils.escapeJava(r);
			return "\"" + r + "\"";
		} else if (o instanceof Integer) {
			return o.toString();
		} else if (o instanceof List) {
			List l = (List) o;
			String r = "[";
			boolean firstTime = true;
			for (Object e : l) {
				if (!firstTime) {
					r += ",";
				}
				firstTime = false;
				r += toJsonString(e);
			}
			return r + "]";
		} else if (o instanceof Map) {
			Map<String, Object> l = (Map) o;
			String r = "{";
			boolean firstTime = true;
			for (Map.Entry<String, Object> e : l.entrySet()) {
				if (!firstTime) {
					r += ",";
				}
				firstTime = false;
				r += toJsonString(e.getKey());
				r += ": ";
				r += toJsonString(e.getValue());
			}
			return r + "}";
		} else if (o == null) {
			return "null";
		} else {
			throw new IllegalArgumentException();
		}
	}


	private static EnclosingLine readEnclosingLine(Path.Entry<?> entry, Attribute.Span location) {
		int spanStart = location.getStart().get().intValue();
		int spanEnd = location.getEnd().get().intValue();
		int line = 0;
		int lineStart = 0;
		int lineEnd = 0;
		StringBuilder text = new StringBuilder();
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(entry.inputStream(), "UTF-8"));

			// first, read whole file
			int len = 0;
			char[] buf = new char[1024];
			while ((len = in.read(buf)) != -1) {
				text.append(buf, 0, len);
			}

			while (lineEnd < text.length() && lineEnd <= spanStart) {
				lineStart = lineEnd;
				lineEnd = parseLine(text, lineEnd);
				line = line + 1;
			}
		} catch (IOException e) {
			return null;
		}
		lineEnd = Math.min(lineEnd, text.length());

		return new EnclosingLine(spanStart, spanEnd, line, lineStart, lineEnd,
				text.substring(lineStart, lineEnd));
	}

	private static int parseLine(StringBuilder buf, int index) {
		while (index < buf.length() && buf.charAt(index) != '\n') {
			index++;
		}
		return index + 1;
	}

	private static class EnclosingLine {
		private int lineNumber;
		private int start;
		private int end;
		private int lineStart;
		private int lineEnd;
		private String lineText;

		public EnclosingLine(int start, int end, int lineNumber, int lineStart, int lineEnd, String lineText) {
			this.start = start;
			this.end = end;
			this.lineNumber = lineNumber;
			this.lineStart = lineStart;
			this.lineEnd = lineEnd;
			this.lineText = lineText;
		}

		public int columnStart() {
			return start - lineStart;
		}

		public int columnEnd() {
			return Math.min(end, lineEnd) - lineStart;
		}
	}
}
