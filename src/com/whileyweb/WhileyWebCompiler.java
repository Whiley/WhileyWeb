package com.whileyweb;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ForkJoinPool;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.http.*;
import org.apache.http.client.utils.*;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.protocol.HttpContext;

import jwebkit.http.HttpMethodDispatchHandler;
import wybs.util.SequentialBuildProject;
import wybs.util.AbstractCompilationUnit.Attribute.Span;
import wyc.Activator;
import wyc.task.CompileTask;
import wyc.util.TestUtils;
import wycc.WyMain;
import wycc.WyProject;
import wyc.lang.WhileyFile;
import wyal.lang.WyalFile;
import wyal.util.Interpreter;
import wyal.util.SmallWorldDomain;
import wyal.util.WyalFileResolver;
import wyfs.lang.Content;
import wyfs.lang.Path;
import wyfs.util.ZipFileRoot;
import wyil.lang.WyilFile.SyntaxError;
import wyfs.util.Trie;
import wyfs.util.VirtualRoot;
import wyjs.core.JavaScriptFile;
import wyjs.tasks.JavaScriptCompileTask;
import wytp.provers.AutomatedTheoremProver;
import wytp.types.extractors.TypeInvariantExtractor;
import wybs.lang.Build;
import wybs.lang.SyntacticHeap;
import wybs.lang.SyntacticItem;

public class WhileyWebCompiler extends HttpMethodDispatchHandler {
	private static String WYRT_LIB = "lib/wystd-v0.2.3.jar".replace('/',File.separatorChar);
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
		boolean verification=false;
		boolean counterexamples=false;
		for (NameValuePair p : params) {
			if (p.getName().equals("code")) {
				code = p.getValue();
			} else if(p.getName().equals("verify")) {
				verification = Boolean.parseBoolean(p.getValue());
			} else if(p.getName().equals("counterexamples")) {
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

	private String compile(String code, boolean verification, boolean counterexamples) throws IOException, HttpException {
		Path.Root root = project.getRoot();
		Path.ID srcID = Trie.ROOT.append("src").append("main");
		Path.ID binID = Trie.ROOT.append("bin").append("main");
		//
		Path.Entry<WhileyFile> srcFile = root.get(srcID,WhileyFile.ContentType);
		if(srcFile == null) {
			srcFile = root.create(srcID, WhileyFile.ContentType);
		}
		// Write contents into source file
		srcFile.outputStream().write(code.getBytes());
		// Create project
		HashMap<String, Object> result = new HashMap<>();
		try {
			boolean b = project.build(ForkJoinPool.commonPool()).get();
			Path.Entry<JavaScriptFile> file = root.get(binID,JavaScriptFile.ContentType);
			System.out.println("SUCCESS: " + b);
			result.put("result", "success");
			result.put("js", extractJavaScript(file));
//		} catch (Exception e) {
//			try {
//				SyntacticItem element = e.getElement();
//				Span span = extractSpan(element);
//				EnclosingLine enclosing = readEnclosingLine(srcFile.inputStream(), span.getStart().get().intValue(),
//						span.getEnd().get().intValue());
//				result.put("result", "errors");
//				// Generate counterexample (if requested)
//				String counterexample = null;
//				if(counterexamples && element instanceof WyalFile.Declaration.Assert) {
//					WyalFile.Declaration.Assert assertion = (WyalFile.Declaration.Assert) element;
//					counterexample = findCounterexample(assertion,project);
//				}
//				result.put("errors", toErrorResponse(enclosing, e.getMessage(), counterexample));
//			} catch (Exception ex) {
//				// now what?
//				result.put("result", "exception");
//				result.put("text", e.getMessage());
//			}
		} catch (Exception e) {
			// now what?
			result.put("result", "exception");
			result.put("text", e.getMessage());
		}

		return toJsonString(result);
	}

	private static ArrayList toErrorResponse(EnclosingLine enclosing, String message, String counterexample) {
		ArrayList l = new ArrayList();
		HashMap<String, Object> args = new HashMap<>();
		args.put("filename", "main.whiley");
		args.put("line", enclosing.lineNumber);
		args.put("start", enclosing.columnStart());
		args.put("end", enclosing.columnEnd());
		args.put("text", message);
		args.put("context", Collections.EMPTY_LIST);
		if(counterexample != null) {
			args.put("counterexample",counterexample);
		}
		l.add(args);
		return l;
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
			throw new IllegalArgumentException();
		}
	}

	private static EnclosingLine readEnclosingLine(InputStream input, int start, int end) {
		int line = 0;
		int lineStart = 0;
		int lineEnd = 0;
		StringBuilder text = new StringBuilder();
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(input));

			// first, read whole file
			int len = 0;
			char[] buf = new char[1024];
			while ((len = in.read(buf)) != -1) {
				text.append(buf, 0, len);
			}

			while (lineEnd < text.length() && lineEnd <= start) {
				lineStart = lineEnd;
				lineEnd = parseLine(text, lineEnd);
				line = line + 1;
			}
		} catch (IOException e) {
			return null;
		}
		lineEnd = Math.min(lineEnd, text.length());

		return new EnclosingLine(start, end, line, lineStart, lineEnd, text.substring(lineStart, lineEnd));
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
