package com.whileyweb;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.apache.http.ParseException;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

import jwebkit.http.HttpMethodDispatchHandler;
import wyc.Compiler;
import wycc.util.AbstractCompilationUnit;
import wycc.util.AbstractCompilationUnit.Attribute.Span;
import wycc.util.MailBox;
import wycc.util.TextFile;
import wycc.util.Trie;
import wyil.lang.WyilFile.Attr.SyntaxError;

public class WhileyWebCompiler extends HttpMethodDispatchHandler {
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
			Path workingDir = null;
			// Run the build
			try {
				// Construct temporary directory
				workingDir = Files.createTempDirectory("whiley");
				// NOTE: we use ProcessTimeMethod here to ensure that a proper
				// timeout can be enforced. This is not the ideal way to do
				// this, but for now it works.
				ProcessTimerMethod.Outcome result = ProcessTimerMethod.exec(timeout, this.getClass().getCanonicalName(),
						"compile", workingDir.toFile().getAbsolutePath(), code, verification, counterexamples, quickcheck, boogie, dependencies);
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
			} finally {
				// Force deletion of temporary directory.
				if(workingDir != null) {
					forceDelete(workingDir);
				}
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

	public static String compile(String workingDir, String code, boolean verification, boolean counterexamples, boolean quickcheck, boolean boogie, String[] dependencies)
			throws IOException, HttpException {
		File workingDirFile = new File(workingDir);
		HashMap<String, Object> result = new HashMap<>();
		// Construct a suitable mailbox
		MailBox.Buffered<SyntaxError> handler = new MailBox.Buffered<>();
		// Choose target name;
		Trie main = Trie.fromString("main");
		//
		try {
			// Write source file contents
			writeWhileyFile(workingDirFile, main, code);
			// Configure & Run Whiley Compiler
			wyc.Compiler wyc = new wyc.Compiler().setTarget(main).setWhileyDir(workingDirFile).setWyilDir(workingDirFile)
					.addSource(main).setErrorHandler(handler);
			// Run the compiler and manage errors.
			boolean ok = wyc.run();
			// Run verifier (if requested)
			if(ok && verification) {
				// All is well, manage verification (if relevant)
				wyboogie.Main verifier = new wyboogie.Main().setTarget(main).setWyilDir(workingDirFile)
						.setBplDir(workingDirFile).addSource(main).setBoogieOption("useArrayTheory", true)
						.setErrorHandler(handler);
				ok = verifier.run();
			}
			// Run QuickCheck (if requested)
			if(ok && quickcheck) {
				wyc.Check check = new wyc.Check().setWyilDir(workingDirFile).addSource(main).setErrorHandler(handler);
				ok = check.run();
			}
			if(!ok) {
				// Build failed for some reason. Need to extract the error messages.
				// Construct enclosing Text File
				TextFile srcFile = new TextFile(code);
				result.put("result", "errors");
				result.put("errors", toErrorMessages(srcFile,handler));
			} else {
				//result.put("js", readJavaScriptFile(workingDir,main));
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
	 * Force a directory and all its contents to be deleted.
	 *
	 * @param path
	 * @throws IOException
	 */
	public static void forceDelete(Path path) throws IOException {
		if (Files.isDirectory(path, LinkOption.NOFOLLOW_LINKS)) {
			try (DirectoryStream<Path> entries = Files.newDirectoryStream(path)) {
				for (Path entry : entries) {
					forceDelete(entry);
				}
			}
		}
		if (path.toFile().exists()) {
			Files.delete(path);
		}
	}

	/**
	 * Add any declared dependencies to the set of project roots. The challenge here
	 * is that we may need to download, install and compile these dependencies if
	 * they are not currently installed.
	 *
	 * @throws IOException
	 */
//	private static List<Build.Package> resolvePackageDependencies(Path.Root repository,
//			Configuration.Schema schema, Content.Registry registry, String... deps) throws IOException {
//		ArrayList<Build.Package> packages = new ArrayList<>();
//		// Resolve each dependencies and add to project roots
//		for (int i = 0; i != deps.length; ++i) {
//			String dep = deps[i];
//			// Construct path to the config file
//			Trie root = Trie.fromString(dep);
//			// Attempt to resolve it.
//			if (!repository.exists(root, ZipFile.ContentType)) {
//				// FIXME: handle better error handling.
//				throw new RuntimeException("missing dependency \"" + dep + "\"");
//			} else {
//				// Extract entry for ZipFile
//				Path.Entry<ZipFile> zipfile = repository.get(root, ZipFile.ContentType);
//				// Construct root repesenting this ZipFile
//				Path.Root pkgRoot = new ZipFileRoot(zipfile, registry);
//				// Extract configuration from package
//				Path.Entry<ConfigFile> entry = pkgRoot.get(Trie.fromString("wy"), ConfigFile.ContentType);
//				if (entry == null) {
//					throw new RuntimeException("corrupt package (missing wy.toml) \"" + dep + "\"");
//				} else {
//					ConfigFile pkgcfg = pkgRoot.get(Trie.fromString("wy"), ConfigFile.ContentType).read();
//					// Construct a package representation of this root.
//					Build.Package pkg = new Package(pkgRoot, pkgcfg.toConfiguration(schema, false));
//					// Add a relative ZipFile root
//					packages.add(pkg);
//				}
//			}
//		}
//		//
//		return packages;
//	}

	/**
	 * Convert a list of syntactic markers into a key-value form which can be easily
	 * converted into JSON.
	 *
	 * @param source
	 * @param markers
	 * @return
	 */
	private static ArrayList<Object> toErrorMessages(TextFile srcFile, MailBox.Buffered<SyntaxError> handler) {
		ArrayList<Object> errors = new ArrayList<>();
		//
		for (SyntaxError marker : handler) {
			errors.add(toErrorMessage(srcFile,marker));
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
	private static Map<String, Object> toErrorMessage(TextFile srcFile, SyntaxError marker) {
		HashMap<String, Object> error = new HashMap<>();
		//
		Span span = marker.getTarget().getAncestor(AbstractCompilationUnit.Attribute.Span.class);
		// Read the enclosing line so we can print it
		TextFile.Line l = srcFile.getEnclosingLine(span.getStart());
		// Sanity check we found it
		if (l != null) {
			// construct the error message
			error.put("filename", "main.whiley");
			error.put("line", l.getNumber());
			error.put("start", span.getStart() - l.getOffset());
			error.put("end", span.getEnd() - l.getOffset());
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

	public static String readJavaScriptFile(Path dir, Trie path) throws IOException {
		// First, determine filename
		String filename = path.toNativeString() + ".js";
		// Second Read the file
		try (FileInputStream fin = new FileInputStream(dir.resolve(filename).toFile())) {
			return new String(fin.readAllBytes());
		}
	}

	/**
	 * Write a given Whiley source file to disk
	 *
	 * @param wf
	 * @param dir
	 * @throws IOException
	 */
	public static void writeWhileyFile(File dir, Trie target, String content) throws IOException {
		String filename = target.toNativeString() + ".whiley";
		try (FileOutputStream fout = new FileOutputStream(new File(dir,filename))) {
			fout.write(content.getBytes());
			fout.flush();
		}
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
}
