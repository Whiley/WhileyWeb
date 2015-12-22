package com.whileylabs;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.*;

@SuppressWarnings("serial")
public class WhileyLabsServlet extends HttpServlet {
	
	public static int counter = 0 ;
	
	private static String MYSQL_DB_URL = "jdbc:google:mysql://whileylabs:whileylabs-mysql-01/WhileyLabsDatabase?user=root";
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		PrintWriter writer = new PrintWriter(resp.getWriter());
		try {
			Connection connection = getDatabaseConnection();
			try {
				resp.setContentType("text/html");
				writePage(writer,connection);
			} finally {
				connection.close();
			}
		} catch (SQLException e) {
			resp.setContentType("text/plain");
			e.printStackTrace(writer);
		}
	}

	private void writePage(PrintWriter writer, Connection connection) throws IOException,SQLException {
		writer.println("<!DOCTYPE html>");
		writer.println("<html xmlns=\"http://www.w3.org/1999/xhtml\" dir=\"ltr\" lang=\"en-US\">");
		writeHeader(writer,connection);
		writeBody(writer,connection);		
		writer.println("</html>");
	}
	
	public void writeHeader(PrintWriter writer, Connection connection) throws IOException,SQLException {
		writer.println("<head>");
		writer.println("<title>Whiley Labs</title>");
		writer.println("<link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\">");
		writer.println("</head>");
		
	}
	
	public void writeBody(PrintWriter writer, Connection connection) throws IOException, SQLException {
		writer.println("<body bgcolor=\"#ffffff\">");
		writer.println("<!-- " + (counter++) + " -->");
		writer.println("<div id=\"container\">");
		writer.println("<img src=\"images/logo.png\"/>");
		writer.println("<div id=\"title\">Whiley Labs</div>");
		writer.println("</div>");
//		writer.println("<table border=\"1px\">");
//		for(String user : getUsers(connection)) {
//			writer.println("<tr>");
//			writer.println(user);
//			writer.println("</tr>");
//		}
//		writer.println("</table>");
		writer.println("</body>");
	}
	
	public List<String> getUsers(Connection connection) throws SQLException {
		ArrayList<String> users = new ArrayList<String>();
		Statement statement = connection.createStatement();
		ResultSet rs = statement.executeQuery("SELECT * FROM Users");
		while(rs.next()) {			
			int id = rs.getInt("ID");
			String surname = rs.getString("Surname");
			String firstname = rs.getString("FirstName");
			users.add("<td>" + Integer.toString(id) + "</td><td>" + firstname + "</td><td>" + surname + "<td>");
		}
		return users;
	}

	private Connection getDatabaseConnection() throws SQLException {
		try {
			Class.forName("com.mysql.jdbc.GoogleDriver");
		} catch (Exception e) {
			e.printStackTrace();
		}
		Connection conn = DriverManager.getConnection(MYSQL_DB_URL);
		return conn;
	}
	
}
