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
	    writer.println("<script type=\"text/javascript\" src=\"js/jquery.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/jquery-ui.js\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/ace.js\" charset=\"utf-8\"></script>");
		writer.println("<script type=\"text/javascript\" src=\"js/mode-whiley.js\"></script>");
		writer.println("<script type=\"text/javascript\">var root_url = \"\"</script>");
	    writer.println("<script type=\"text/javascript\" src=\"js/whileyweb.js\"></script>");
	    writer.println("<script type=\"text/javascript\" src=\"js/wy.js\"></script>");
	    writer.println("<script type=\"text/javascript\" src=\"js/wystd.js\"></script>");
		writer.println("</head>");
	}

	private void writeBody(PrintStream writer, Map<String, String> parameters) throws SQLException {
		writer.println("<body>");
		writeTrackingScript(writer);
		if(isMenubarVisible()) {
			writeMenuBar(writer);
		}
		writer.println("<div id=\"container\">");
		writer.println("<div id=\"content\">");
		writeBodyContent(writer, parameters);
		writer.println("</div>");
		writer.println("</div>");
		writer.println("</body>");
	}

	public void writeTrackingScript(PrintStream writer) {
		writer.println("<script>");
		writer.println("(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){");
		writer.println("(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),");
		writer.println("m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)");
		writer.println("})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');");
		writer.println("ga('create', 'UA-5582165-6', 'auto');");
		writer.println("ga('send', 'pageview');");
		writer.println("</script>");
	}

	protected void writeMenuBar(PrintStream writer) {
		writer.println("<nav class='menubar'>");
		writer.println("<ul>");
		writeMenu(writer, "Books", "Catalogue", "Loaned", "Select", "Borrow", "Return");
		writeMenu(writer, "Authors", "Show All", "Select");
		writeMenu(writer, "Customers", "Show All", "Select");
		writeMenu(writer, "Database","Log Out");
		writer.println("</ul>");
		writer.println("</nav>");
	}

	private void writeMenu(PrintStream writer, String menu, String... items) {
		writer.println("<li><a>" + menu + " \u25be</a>");
		writer.println("<ul>");
		for (String item : items) {
			String route = menu.replaceAll(" ", "") + item.replaceAll(" ", "");
			writer.println("<li><a href=\"" + route + "\">" + item + "</a></li>");
		}
		writer.println("</ul>");
		writer.println("</li>");
	}

	/**
	 * This is a hook method for writing the contents of the page. This is
	 * intended to be implemented by subclasses of this.
	 *
	 * @param writer
	 */
	protected void writeBodyContent(PrintStream writer, Map<String, String> parameters) throws SQLException {

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

	/**
	 * Determine whether or not the menubar is visible. For most pages it will
	 * be, but for the login page it is not.
	 *
	 * @return
	 */
	protected boolean isMenubarVisible() {
		return false;
	}

	/**
	 * Write out a title for the page
	 *
	 * @param writer
	 */
	protected void writePageHeading(PrintStream writer, String heading) {
		writer.println("<h1>" + heading + "</h1>");
	}

	/**
	 * Write out a title for the page
	 *
	 * @param writer
	 */
	protected void writePageSubheading(PrintStream writer, String heading) {
		writer.println("<h2>" + heading + "</h2>");
	}

	/**
	 * Write out a title for the page
	 *
	 * @param writer
	 */
	protected void writePageFooting(PrintStream writer, String footing) {
		writer.println("<p>" + footing + "</p>");
	}

	/**
	 * Begin a new table.
	 *
	 * @param writer
	 */
	protected void writeTableBegin(PrintStream writer) {
		writer.println("<center><table>");
	}

	/**
	 * End a given table.
	 *
	 * @param writer
	 */
	protected void writeTableEnd(PrintStream writer) {
		writer.println("</table></center>");
	}

	/**
	 * Write a single row of table headings, where each heading is taken from
	 * the array of heading strings.
	 *
	 * @param writer
	 * @param headings
	 */
	protected void writeTableHeadings(PrintStream writer, String... headings) {
		writer.println("<tr>");
		for (String heading : headings) {
			writer.println("<th>" + heading + "</th>");
		}
		writer.println("</tr>");
	}

	/**
	 * Write a single table row, which will be filled from the arry of items
	 * provided.
	 *
	 * @param writer
	 * @param items
	 */
	protected void writeTableRow(PrintStream writer, Object... items) {
		writer.println("<tr>");
		for (Object item : items) {
			writer.println("<td>" + item + "</td>");
		}
		writer.println("</tr>");
	}

	protected void writeFormBegin(PrintStream writer) {
		writeFormBegin(writer,false);
	}
	protected void writeFormBegin(PrintStream writer, boolean post) {
		String m = post ? "POST" : "GET";
		writer.println("<center><form method=\"" + m + "\">");
	}

	protected void writeFormEnd(PrintStream writer) {
		writer.println("</form></center>");
	}

	/**
	 * Write a simple text box for receiving user input
	 *
	 * @param writer
	 * @param label
	 */
	protected void writeInputField(PrintStream writer, String label, Object value) {
		writer.println(label + ": ");
		if (value != null) {
			writer.println("<input type=\"text\" name=\"" + label + "\" value=\"" + value + "\">");
		} else {
			writer.println("<input type=\"text\" name=\"" + label + "\">");
		}
	}

	/**
	 * Write a simple text box for receiving user input
	 *
	 * @param writer
	 * @param label
	 */
	protected void writeNumberInputField(PrintStream writer, String label, Object value) {
		writer.println(label + ": ");
		if (value != null) {
			writer.println("<input type=\"number\" name=\"" + label + "\" min=\"0\" value=\"" + value + "\">");
		} else {
			writer.println("<input type=\"number\" name=\"" + label + "\" min=\"0\">");
		}
	}

	/**
	 * Write a simple text box for receiving user input
	 *
	 * @param writer
	 * @param label
	 */
	protected void writeSelectField(PrintStream writer, String label, int index, String... options	) {
		writer.println(label + ": ");
		writer.println("<select  name=\"" + label + "\">");
		for(int i=0;i!=options.length;++i) {
			String option = options[i];
			writer.print("<option value=\"" + option + "\"");
			if(i == index) {
				writer.print(" selected");
			}
			writer.println(">" + option + "</option>");
		}
		writer.println("</select>");
	}

	/**
	 * Write a simple text box for receiving user input
	 *
	 * @param writer
	 * @param label
	 */
	protected void writePasswordField(PrintStream writer, String label) {
		writer.println(label + ": ");
		writer.println("<input type=\"password\" name=\"" + label + "\">");
	}

	/**
	 * Write a simple text box for receiving user input
	 *
	 * @param writer
	 * @param label
	 */
	protected void writeInputField(PrintStream writer, String label, Object value, int size) {
		writer.println(label + ": ");
		if (value != null) {
			writer.println(
					"<input type=\"text\" name=\"" + label + "\" value=\"" + value + "\" size=\"" + size + "\">");
		} else {
			writer.println("<input type=\"text\" name=\"" + label + "\" size=\"" + size + "\">");
		}
	}

	/**
	 * Write a simple text box for receiving user input
	 *
	 * @param writer
	 * @param label
	 */
	protected void writeSubmitButton(PrintStream writer, String label) {
		writer.println("<input type=\"submit\" value=\"" + label + "\">");
	}

	protected void writeResultsBegin(PrintStream writer) {
		writer.println("<center><div class=\"results\">");
	}

	protected void writeResultsEnd(PrintStream writer) {
		writer.println("</div></center>");
	}

	protected void writeResultLine(PrintStream writer, String label, Object value) {
		writer.println("<b>" + label + ":</b> " + value + "<br/>");
	}

	/**
	 * Check whether or not the user has begun entering fields into the form.
	 *
	 * @param items
	 * @return
	 */
	protected boolean hasFormBegun(String... items) {
		for (int i = 0; i != items.length; ++i) {
			String value = items[i];
			if (value != null && !value.equals("")) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Check whether or not the user has finished entering fields into the form.
	 *
	 * @param items
	 * @return
	 */
	protected boolean hasFormCompleted(String... items) {
		for (int i = 0; i != items.length; ++i) {
			String value = items[i];
			if (value == null || value.equals("")) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Check whether a given form value is an unsigned integer or not.
	 *
	 * @param value
	 * @return
	 */
	protected boolean isUnsignedInteger(String value) {
		if (value != null) {
			try {
				Integer.parseUnsignedInt(value);
				return true;
			} catch (NumberFormatException e) {
			}
		}
		return false;
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