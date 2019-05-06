package com.whileyweb;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ForkJoinPool;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.protocol.HttpContext;

import jwebkit.http.HttpMethodDispatchHandler;
import wybs.lang.Build;
import wybs.lang.SyntacticItem;
import wybs.util.AbstractCompilationUnit;
import wybs.util.AbstractCompilationUnit.Attribute;
import wybs.util.AbstractCompilationUnit.Attribute.Span;
import wyc.lang.WhileyFile;
import wyfs.lang.Path;
import wyfs.util.Trie;
import wyil.lang.WyilFile;
import wyil.lang.WyilFile.SyntaxError;
import wyjs.core.JavaScriptFile;

public class WhileyWebCompiler extends HttpMethodDispatchHandler {
	private static String WYRT_LIB = "lib/wystd-v0.2.3.jar".replace('/', File.separatorChar);
	private final Build.Project project;

	public WhileyWebCompiler(Build.Project project) {
		super(HttpMethodDispatchHandler.ALLOW_POST);
		this.project = project;
	}

	@Override
	public void post(HttpRequest request, HttpResponse response, HttpContext context)
			throws HttpException, IOException {
		HttpEntity entity = checkHasEntity(request);
		List<NameValuePair> params = URLEncodedUtils.parse(entity);
		String code = null;
		boolean verification = false;
		boolean counterexamples = false;
		for (NameValuePair p : params) {
			if (p.getName().equals("code")) {
				code = p.getValue();
			} else if (p.getName().equals("verify")) {
				verification = Boolean.parseBoolean(p.getValue());
			} else if (p.getName().equals("counterexamples")) {
				counterexamples = Boolean.parseBoolean(p.getValue());
			}
		}
		if (code == null) {
			response.setStatusCode(HttpStatus.SC_BAD_REQUEST);
		} else {
			String r = compile(code,verification,counterexamples);
			response.setEntity(new StringEntity(r)); // ContentType.APPLICATION_JSON fails?
			response.setStatusCode(HttpStatus.SC_OK);
		}
	}

	private HttpEntity checkHasEntity(HttpRequest request) throws HttpException {
		if (request instanceof BasicHttpEntityEnclosingRequest) {
			BasicHttpEntityEnclosingRequest r = (BasicHttpEntityEnclosingRequest) request;
			return r.getEntity();
		} else {
			throw new HttpException("Missing entity");
		}
	}

	private String compile(String code, boolean verification, boolean counterexamples)
			throws IOException, HttpException {
		Path.Root root = project.getRoot();
		Path.ID srcID = Trie.ROOT.append("src").append("main");
		Path.ID binID = Trie.ROOT.append("bin").append("main");
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
			boolean ok = project.build(ForkJoinPool.commonPool()).get();
			// Flush everything to disk
			root.flush();
			//
			if (!ok) {
				// Extract the binary file
				Path.Entry<WyilFile> binFile = root.get(binID, WyilFile.ContentType);
				WyilFile binary = binFile.read();
				// Build failed for some reason. Need to extract the error messages.
				List<SyntaxError> errors = binary.findAll(SyntaxError.class);
				result.put("result", "errors");
				result.put("errors", toErrorMessages(srcFile, errors));
			} else {
				// All is well
				// result.put("js", extractJavaScript(file));
				result.put("result", "success");
				// result.put("js", extractJavaScript(file));
			}
		} catch (Exception e) {
			// Some kind of internal failure has occurred, so simply report this.
			result.put("result", "exception");
			result.put("text", e.getMessage());
		}

		return toJsonString(result);
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
		System.out.println("MESSAGE: " + marker.getMessage());
		error.put("text", marker.getMessage());
		//
		return error;
	}

	private static String extractJavaScript(Path.Entry<JavaScriptFile> file) throws IOException {
		JavaScriptFile jsf = file.read();
		return jsf.toString();
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
		} else {
			throw new IllegalArgumentException("GOT: " + o);
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
