package com.whileyweb.util;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.PrintStream;
import java.io.Writer;
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

	protected final Configuration cfg;
	private final String page;
	private final String errorPage;

	public HtmlPage(Configuration cfg, String page, String errorPage) {
		this.cfg = cfg;
		this.page = page;
		this.errorPage = errorPage;
	}

	public HtmlPage(Configuration cfg) {
		this.cfg = cfg;
		this.page = "index.ftl";
		this.errorPage = "errorPage.ftl";
	}

	@Override
	public void handle(HttpRequest request, HttpResponse response, HttpContext context)
			throws HttpException, IOException {
		ByteArrayOutputStream ous = new ByteArrayOutputStream();
		Writer writer = new OutputStreamWriter(new PrintStream(ous,false,"UTF-8"));
		try {
			// Extract supplied parameters from the URL. This is useful for
			// pages which deal with user input.
			Map<String, String> parameters = new HashMap<>();
			extractGetParameters(request,parameters);
			extractPostParameters(request,parameters);
			// Check whether page is currently visible
			if(isPageVisible()) {
				// Write the page contents
				writePage(writer, parameters);
				response.setStatusCode(HttpStatus.SC_OK);
			} else {
				response.setHeader("Location", "/");
				response.setStatusCode(HttpStatus.SC_MOVED_TEMPORARILY);
				return;
			}
		} catch (Exception e) {
			// This indicates some kind of exception (e.g. SQLException)
			// occurred when handling this request. To deal with this, we need
			// to throw away whatever was already generated of the page being
			// returned and create a new page to signal the error.
			ous = new ByteArrayOutputStream();
			writer = new OutputStreamWriter(new PrintStream(ous));
			try {
				writeErrorPage(writer, e);
			} catch (TemplateException e1) {
				e1.printStackTrace();
			}
			response.setStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR);
		}
		writer.flush();
		ContentType ct = ContentType.create("text/html","UTF-8"); // ContentType.TEXT_HTML
		response.setEntity(new ByteArrayEntity(ous.toByteArray(), ct));
	}

	private void writePage(Writer writer, Map<String, String> parameters)
			throws SQLException, IOException, TemplateException {
		Map data = this.getPageData(parameters);
		Template template = this.cfg.getTemplate(this.page);
		template.process(data, writer);
	}

	private void writeErrorPage(Writer writer, Exception e)
			throws IOException, TemplateException {
		Map data = new HashMap();
		data.put("errorMessage", e.getMessage());
		data.put("stackTrace", new StackTraceDataModel(e.getStackTrace()));
		Template template = this.cfg.getTemplate(this.errorPage);
		template.process(data, writer);
	}

	/**
	 * Gets the data to pass to the page defined by this HTML page
	 * By default the page takes no data
	 */
	protected Map getPageData(Map<String, String> parameters) {
		return new HashMap();
	}

	/**
	 * This is a hook method for determining visibility of the page. Most pages
	 * in this application are not visible until the user has logged in and the
	 * database connection established.
	 *
	 * @return
	 */
	protected boolean isPageVisible() {
		return true;
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

	/**
	 * Data model for a stack trace from an exception
	 */
	public class StackTraceDataModel {
		private String output = "";

		private StackTraceDataModel(StackTraceElement[] stackTraceElements) {
			for (StackTraceElement ste : stackTraceElements) {
				output += ste.toString() + "\n";
			}
		}

		public String getOutput() {
			return this.output;
		}
	}
}