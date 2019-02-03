package com.whileyweb.pages;

import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.Map;

import com.whileyweb.util.HtmlPage;

public class FrontPage extends HtmlPage {
	private static String[] examples = {
			"Hello World","Absolute","IndexOf"
	};

	@Override
	public void writeBodyContent(PrintStream writer, Map<String,String> parameters) {
		writeCodeBlock(writer, parameters);
		writeCommands(writer);
		writeConfigOptions(writer);
		writer.println("<img id='spinner' src='images/loading.gif' />");
		writeExampleSelector(writer);
		writer.println("\t\t<div id='messages'></div>");
		writer.println("\t\t<textarea id='console' readonly='readonly'></textarea>");
		writer.println("\t\t<textarea id='bin' readonly='readonly'></textarea>");
	}

	public void writeCodeBlock(PrintStream writer, Map<String, String> parameters) {
		writer.print("<div id='code'></div>");
	}

	public void writeCommands(PrintStream writer) {
		writer.println("<div id='cmdbar'>");
		writer.println(
				"<button type='button' onClick='compile();' title='Compile your program to check it is correct.'>Compile</button>");
		writer.println(
				"<button id = 'run' type='button' onClick='run();' title='Run your program to produce some output!'>Run</button>");
		writer.println("</div>");
	}

	public void writeConfigOptions(PrintStream writer) {
		writer.println("<div id='configbar'>");
		writer.println(
				"<input id='verification' type='checkBox' checked='checked' title='Enable or disable compile-time verification'>Verification</input>");
		writer.println(
				"<input id='showConsole' type='checkBox' onclick='showConsole(this.checked);' title='Show Console'>Console</input>");
		writer.print("<br/>");
		writer.println(
				"<input id='counterexamples' type='checkBox' title='Enable or disable counterexample generation'>Counterexamples</input>");
		writer.println(
				"<input id='showJavaScript' type='checkBox' onclick='showJavaScript(this.checked);' title='Show generated JavaScript'>JavaScript</input>");
		writer.println("</div>");
	}

	public void writeExampleSelector(PrintStream writer) {
		writer.println("\t\t\t<div id='egbar'>");
		writer.println("Examples:");
		writer.println("<select onChange='showExample(this.selectedIndex);' name='eg'>");
		for(int i=0;i!=examples.length;++i) {
			writer.println("<option>" + examples[i] + "</option>");
		}
		writer.println("</select>");
		writer.println("</div>");
	}
}
