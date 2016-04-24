package com.whileylabs;

import java.io.*;
import java.net.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
import java.util.Locale;

import org.apache.http.*;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.config.SocketConfig;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.bootstrap.HttpServer;
import org.apache.http.impl.bootstrap.ServerBootstrap;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HttpContext;
import org.apache.http.protocol.HttpRequestHandler;
import org.apache.http.util.EntityUtils;

import com.whileylabs.pages.FrontPage;

import jwebkit.http.HttpFileHandler;
import jwebkit.http.HttpMethodDispatchHandler;
import jwebkit.sql.*;
 
/**
 * Responsible for initialising and starting the HTTP server which manages the
 * tool
 * 
 * @author David J. Pearce
 *
 */
public class Main {
	
	public static final int HTTP_PORT = 8080;
		
	public static final ContentType TEXT_JAVASCRIPT = ContentType.create("text/javascript");
	public static final ContentType TEXT_CSS = ContentType.create("text/css");
	public static final ContentType IMAGE_PNG = ContentType.create("image/png");
	public static final ContentType IMAGE_GIF = ContentType.create("image/gif");
	// =======================================================================
	// Main Entry Point
	// =======================================================================
	public static void main(String[] argc) throws SQLException {
//		Connection connection = getDatabaseConnection();
//		SqlDatabase db = new SqlDatabase(connection);
//		db.bindTable("users", new SqlTable.Column("name", SqlType.VARCHAR(10)));
		
		SocketConfig socketConfig = SocketConfig.custom()
				.setSoTimeout(15000)
				.setTcpNoDelay(true)
				.build();

		HttpServer server = ServerBootstrap.bootstrap()
				.setListenerPort(HTTP_PORT)
				.setServerInfo("Test/1.1")
				.setSocketConfig(socketConfig)
				.setExceptionLogger(new Logger())
				.registerHandler("/css/*", new HttpFileHandler(new File("."),TEXT_CSS))
				.registerHandler("/js/*", new HttpFileHandler(new File("."),TEXT_JAVASCRIPT))
				.registerHandler("*.png", new HttpFileHandler(new File("."),IMAGE_PNG))
				.registerHandler("*.gif", new HttpFileHandler(new File("."),IMAGE_GIF))
				.registerHandler("/compile", new WhileyLabsCompiler())
				.registerHandler("/", new FrontPage())
				.create();

		try {
			server.start();
		} catch(IOException e) {
			e.printStackTrace();
		}
	}
	
    private static class Logger implements ExceptionLogger {

        @Override
        public void log(final Exception ex) {
            if (ex instanceof SocketTimeoutException) {
                System.err.println(ex.getMessage());
            } else if (ex instanceof ConnectionClosedException) {
                System.err.println(ex.getMessage());
            } else {
                ex.printStackTrace();
            }
        }
    }
    
    private static Connection getDatabaseConnection() throws SQLException {
		try {
			Class.forName("org.sqlite.JDBC");
		} catch (Exception e) {
			e.printStackTrace();
		}
		Connection conn = DriverManager.getConnection("jdbc:sqlite:test.db");
		return conn;
	}
}
