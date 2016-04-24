package com.whileylabs;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.StringBufferInputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.http.*;
import org.apache.http.client.utils.*;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;

import jwebkit.http.HttpMethodDispatchHandler;
import wybs.lang.Build;
import wybs.util.StdBuildRule;
import wybs.util.StdProject;
import wyc.builder.WhileyBuilder;
import wyc.io.WhileyFileLexer;
import wyc.io.WhileyFileParser;
import wyc.lang.WhileyFile;
import wyc.util.WycBuildTask;
import wycc.lang.Pipeline;
import wycc.lang.SyntaxError;
import wycc.util.Logger;
import wycc.util.Pair;
import wycs.builders.Wyal2WycsBuilder;
import wycs.core.WycsFile;
import wycs.syntax.WyalFile;
import wycs.transforms.SmtVerificationCheck;
import wycs.transforms.VerificationCheck;
import wycs.util.WycsBuildTask;
import wyfs.lang.Content;
import wyfs.lang.Path;
import wyfs.util.Trie;
import wyfs.util.VirtualRoot;
import wyil.builders.Wyil2WyalBuilder;
import wyil.lang.WyilFile;

public class WhileyLabsCompiler extends HttpMethodDispatchHandler {

	public WhileyLabsCompiler() {
		super(HttpMethodDispatchHandler.ALLOW_POST);
	}

	@Override
	public void post(HttpRequest request, HttpResponse response, HttpContext context)
			throws HttpException, IOException {
		HttpEntity entity = (HttpEntity) checkHasEntity(request);
		List<NameValuePair> params = URLEncodedUtils.parse(entity);
		String code = null;
		boolean verification=false;
		for (NameValuePair p : params) {
			if (p.getName().equals("code")) {
				code = p.getValue();
			} else if(p.getName().equals("verify")) {
				verification = Boolean.parseBoolean(p.getValue());
			}
		}
		if (code == null) {
			response.setStatusCode(HttpStatus.SC_BAD_REQUEST);
		} else {
			String r = compile(code,verification);
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

	private String compile(String code, boolean verification) throws IOException, HttpException {
		// Create registry and initialise root with the source file
		WycBuildTask.Registry registry = new WycBuildTask.Registry();
		VirtualRoot root = new VirtualRoot(registry);
		
		Path.Entry<WhileyFile> srcFile = root.create(Trie.ROOT.append("main"), WhileyFile.ContentType);
		// Write contents into source file
		srcFile.outputStream().write(code.getBytes());
		// Create project
		ArrayList<Path.Root> roots = new ArrayList<Path.Root>();
		roots.add(root);
		StdProject project = new StdProject(roots);
		// Create builder and add simple build rule
		WhileyBuilder builder = new WhileyBuilder(project, new Pipeline(WycBuildTask.defaultPipeline));
		builder.setLogger(new Logger.Default(System.err));
		Content.Filter<WhileyFile> whileyIncludes = Content.filter("**", WhileyFile.ContentType);
		project.add(new StdBuildRule(builder, root, whileyIncludes, null, root));
		configureVerification(verification,root,project);
		// Finally, do something?
		ArrayList<Path.Entry<?>> delta = new ArrayList<>();
		delta.add(srcFile);
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			project.build(delta);
			System.out.println(root.get(Content.filter("**", WyilFile.ContentType)));
			result.put("result", "success");
		} catch (SyntaxError e) {
			e.printStackTrace();
			EnclosingLine enclosing = readEnclosingLine(srcFile.inputStream(), e.start(), e.end());
			result.put("result", "errors");
			result.put("errors", toErrorResponse(enclosing, e.getMessage()));
		} catch(Exception e) {
			e.printStackTrace();
			throw new HttpException("");
		}
		return toJsonString(result);		
	}

	private static void configureVerification(boolean verification, VirtualRoot root, StdProject project) {
		if(verification) {
			Content.Filter<WyilFile> wyilIncludes = Content.filter("**", WyilFile.ContentType);
			Content.Filter<WyalFile> wyalIncludes = Content.filter("**", WyalFile.ContentType);
			// First, handle the conversion of wyil to wyal

			Wyil2WyalBuilder wyalBuilder = new Wyil2WyalBuilder(project);
			wyalBuilder.setLogger(new Logger.Default(System.err));
			project.add(new StdBuildRule(wyalBuilder, root,
					wyilIncludes, null, root));

			// Second, handle the conversion of wyal to wycs				
			Pipeline<WycsFile> wycsPipeline = new Pipeline(WycsBuildTask.defaultPipeline);
			wycsPipeline.setOption(VerificationCheck.class,"enable",verification);
			Wyal2WycsBuilder wycsBuilder = new Wyal2WycsBuilder(project,wycsPipeline);
			wycsBuilder.setLogger(new Logger.Default(System.err));
			project.add(new StdBuildRule(wycsBuilder, root, wyalIncludes, null, root));
		}
	}
	
	private static ArrayList toErrorResponse(EnclosingLine enclosing, String message) {
		ArrayList l = new ArrayList();
		HashMap<String, Object> args = new HashMap<>();
		args.put("filename", "main.whiley");
		args.put("line", enclosing.lineNumber);
		args.put("start", enclosing.columnStart());
		args.put("end", enclosing.columnEnd());
		args.put("text", message);
		args.put("context", Collections.EMPTY_LIST);
		l.add(args);
		return l;
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
