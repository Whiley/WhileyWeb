package com.whileyweb.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintStream;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.protocol.HttpContext;
import org.apache.http.protocol.HttpRequestHandler;

/**
 * A simple representation of an HTML page. This contains all the common parts
 * for each page in the application.
 *
 * @author David J. Pearce
 *
 */
public class HtmlPage implements HttpRequestHandler {

	@Override
	public void handle(HttpRequest request, HttpResponse response, HttpContext context)
			throws HttpException, IOException {
		ByteArrayOutputStream ous = new ByteArrayOutputStream();
		PrintStream writer = new PrintStream(ous,false,"UTF-8");
		try {
			// Extract supplied parameters from the URL. This is useful for
			// pages which deal with user input.
			Map<String, String> parameters = new HashMap<>();
			extractGetParameters(request,parameters);
			extractPostParameters(request,parameters);
			// Write the page contents
			writePage(writer, parameters);
			response.setStatusCode(HttpStatus.SC_OK);
		} catch (Exception e) {
			// This indicates some kind of exception (e.g. SQLException)
			// occurred when handling this request. To deal with this, we need
			// to throw away whatever was already generated of the page being
			// returned and create a new page to signal the error.
			ous = new ByteArrayOutputStream();
			writer = new PrintStream(ous);
			writeErrorPage(writer, e);
			response.setStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR);
		}
		writer.flush();
		ContentType ct = ContentType.create("text/html","UTF-8"); // ContentType.TEXT_HTML
		response.setEntity(new ByteArrayEntity(ous.toByteArray(), ct));
	}

	private void writePage(PrintStream writer, Map<String, String> parameters) throws SQLException {
		writer.println("<!DOCTYPE html>");
		writer.println("<html xmlns=\"http://www.w3.org/1999/xhtml\" dir=\"ltr\" lang=\"en-US\">");
		writeHeader(writer);
		writeBody(writer, parameters);
		writer.println("</html>");
	}

	private void writeErrorPage(PrintStream writer, Exception e) {
		writer.println("<!DOCTYPE html>");
		writer.println("<html xmlns=\"http://www.w3.org/1999/xhtml\" dir=\"ltr\" lang=\"en-US\">");
		writeHeader(writer);
		writer.println("<body>");
		writer.println("<div id=\"container\">");
		writer.println("<div id=\"content\">");
		writer.println("<h1>Internal Failure</h1>");
		writer.println("<pre>");
		e.printStackTrace(writer);
		writer.println("</pre>");
		writer.println("</div>");
		writer.println("</div>");
		writer.println("</body>");
	}

	private void writeHeader(PrintStream writer) {
		writer.println("<head>");
		writer.println("<title>Whiley Labs</title>");
		writer.println("<link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\">");
		writer.println("<script type=\"text/javascript\" src=\"js/ace.js\" charset=\"utf-8\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/mode-whiley.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/theme-eclipse.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"bin/js/std.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"bin/js/js.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"bin/js/dom.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"bin/js/web.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"bin/js/ace.js\"></script>");
	    writer.println("<script type=\"text/javascript\" src=\"bin/js/wyweb.js\"></script>");
		writer.println("</head>");
	}

	private void writeBody(PrintStream writer, Map<String, String> parameters) throws SQLException {
		writer.println("<body>");
		writer.println("<div id=\"container\">");
		writer.println("<div id=\"content\">");
		writeBodyContent(writer, parameters);
		writer.println("</div>");
		writer.println("</div>");
		writer.println("</body>");
	}

	/**
	 * This is a hook method for writing the contents of the page. This is
	 * intended to be implemented by subclasses of this.
	 *
	 * @param writer
	 */
	protected void writeBodyContent(PrintStream writer, Map<String, String> parameters) throws SQLException {

	}

	private void extractGetParameters(HttpRequest request, Map<String, String> parameters) throws URISyntaxException {
		String uri = request.getRequestLine().getUri();
		for (NameValuePair p : new URIBuilder(uri).getQueryParams()) {
			parameters.put(p.getName(), p.getValue());
		}
	}

	private void extractPostParameters(HttpRequest request, Map<String, String> parameters)
			throws URISyntaxException, IOException {
		if (request instanceof HttpEntityEnclosingRequest) {
			// This request includes an entity from the client-side. For
			// this application, that means its a POST request from the
			// login page.
			HttpEntityEnclosingRequest r = (HttpEntityEnclosingRequest) request;
			for (NameValuePair p : URLEncodedUtils.parse(r.getEntity())) {
				parameters.put(p.getName(), p.getValue());
			}
		}
	}
}