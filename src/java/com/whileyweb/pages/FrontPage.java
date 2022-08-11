package com.whileyweb.pages;

import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.Map;

import com.whileyweb.util.*;

public class FrontPage extends HtmlPage {
	private final String[] dependencies;

	public FrontPage(String gaTrackingID, String[] dependencies) {
		super(gaTrackingID);
		this.dependencies = dependencies;
	}

	@Override
	public void writeBodyContent(PrintStream writer, Map<String,String> parameters) {
		String deps = "";
		for(int i=0;i!=dependencies.length;++i) {
			if(i != 0) {
				deps += ",";
			}
			deps += "'" + dependencies[i] + "'";
		}
		deps = "[" + deps + "]";
		writer.println("<div id='root'></div>");
		writer.println("<script>");
		writer.println(
				"window.onload = function() { wyweb$main$run(document.getElementById('root'),window," + deps + "); };");
		writer.println("</script>");
	}
}
