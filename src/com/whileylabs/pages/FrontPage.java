package com.whileylabs.pages;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URISyntaxException;
import java.util.List;

import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.protocol.HttpContext;

import jwebkit.http.HttpMethodDispatchHandler;

public class FrontPage extends HttpMethodDispatchHandler {

	public FrontPage() {
		super(HttpMethodDispatchHandler.ALLOW_GET);
	}

	@Override
	public void get(HttpRequest request, HttpResponse response, HttpContext context)
			throws HttpException, IOException {
		String uri = request.getRequestLine().getUri();
		try {
			List<NameValuePair> parameters = new URIBuilder(uri).getQueryParams();
			ByteArrayOutputStream ous = new ByteArrayOutputStream();
			PrintWriter writer = new PrintWriter(ous);
			writePage(writer);
			writer.flush();
			response.setStatusCode(HttpStatus.SC_OK);
			response.setEntity(new ByteArrayEntity(ous.toByteArray(), ContentType.TEXT_HTML));
		} catch(URISyntaxException e) {
			throw new HttpException("Invalid URI",e);
		}
	}

	private void writePage(PrintWriter writer) {
		writer.println("<!DOCTYPE html>");
		writer.println("<html xmlns=\"http://www.w3.org/1999/xhtml\" dir=\"ltr\" lang=\"en-US\">");
		writeHeader(writer);
		writeBody(writer);
		writer.println("</html>");
	}

	public void writeHeader(PrintWriter writer) {
		writer.println("<head>");
		writer.println("<title>Whiley Labs</title>");
		writer.println("<link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\">");
	    writer.println("<script type=\"text/javascript\" src=\"js/jquery.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/jquery-ui.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/ace.js\" charset=\"utf-8\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/mode-whiley.js\"></script>");
		writer.println("<script type=\"text/javascript\">var root_url = \"\"</script>");
	    writer.println("<script type=\"text/javascript\" src=\"js/whileyweb.js\"></script>");
		writer.println("</head>");

	}

	public void writeBody(PrintWriter writer) {
		writer.println("<div id='container'>");
		writer.println("\t<div id='content'>");
//		writer.println(
//				"\t\t<p>From this page, you can run Whiley programs in your browser!  For more on Whiley, visit <a href='http://whiley.org'>whiley.org</a>.</p>");
		writer.println("\t\t<div id='code'>// Write your Whiley program here</div>");
		writer.println("\t\t\t<section id='toolbar'>");
//		writer.println(
//				"\t\t\t<button type='button' onClick='save();' title='Create a permalink of this program to share with others.'>Share</button>");
		writer.println(
				"\t\t\t<button type='button' onClick='compile();' title='Compile your program to check it is correct.'>Compile</button>");
		writer.println(
				"\t\t\t<button type='button' onClick='run();' title='Run your program to produce some output!'>Run</button>");
		writer.println(
				"\t\t\t<input id='verification' type='checkBox' checked='checked' title='Enable or disable compile-time verification'>Enable Verification</input>");
		writer.println(
				"\t\t\t<input id='counterexamples' type='checkBox' title='Enable or disable counterexample generation'>Generate Counterexamples</input>");
		writer.println("<img id='spinner' src='images/loading.gif' />");
		writer.println("\t\t\t</section>");
		writer.println("\t\t<div id='messages'></div>");
		writer.println("\t\t<textarea id='console' readonly='readonly'></textarea>");
		writer.println("\t\t</div>");
		writer.println("\t</div>");
	}
}
