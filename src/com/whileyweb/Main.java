package com.whileyweb;

import com.whileyweb.util.HtmlPage;
import com.whileyweb.pages.FrontPage;
import java.io.*;
import java.net.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.concurrent.TimeUnit;

import org.apache.http.*;
import org.apache.http.config.SocketConfig;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.bootstrap.HttpServer;
import org.apache.http.impl.bootstrap.ServerBootstrap;

import jwebkit.http.HttpFileHandler;
import wyal.lang.WyalFile;
import wybs.lang.Build;
import wybs.lang.SyntacticException;
import wybs.util.SequentialBuildProject;
import wyc.lang.WhileyFile;
import wyc.util.TestUtils;
import static wyc.Activator.WHILEY_PLATFORM;
import wycc.WyMain;
import wycc.cfg.ConfigFile;
import wycc.cfg.Configuration;
import wyfs.lang.Content;
import wyfs.lang.Path;
import wyfs.util.DirectoryRoot;
import wyfs.util.Trie;
import wyil.lang.WyilFile;

/**
 * Responsible for initialising and starting the HTTP server which manages the
 * tool
 *
 * @author David J. Pearce
 *
 */
public class Main {

	public static final int[] HTTP_PORTS = {80,8080,8081};

	public static final ContentType TEXT_JAVASCRIPT = ContentType.create("text/javascript");
	public static final ContentType TEXT_CSS = ContentType.create("text/css");
	public static final ContentType IMAGE_PNG = ContentType.create("image/png");
	public static final ContentType IMAGE_GIF = ContentType.create("image/gif");

	/**
	 * Default implementation of a content registry. This associates whiley and
	 * wyil files with their respective content types.
	 *
	 * @author David J. Pearce
	 *
	 */
	public static class Registry implements Content.Registry {
		@Override
		public void associate(Path.Entry e) {
			String suffix = e.suffix();

			if (suffix.equals("whiley")) {
				e.associate(WhileyFile.ContentType, null);
			} else if (suffix.equals("wyil")) {
				e.associate(WyilFile.ContentType, null);
			} else if (suffix.equals("toml")) {
				e.associate(ConfigFile.ContentType, null);
			}
		}

		@Override
		public String suffix(Content.Type<?> t) {
			return t.getSuffix();
		}
	}
	// =======================================================================
	// Main Entry Point
	// =======================================================================
	public static void main(String[] argc) throws IOException {
		Content.Registry registry = new Registry();
		// Determine project directory
		Path.Root localRoot = determineLocalRoot(registry);
		// Read the configuration schema
		Configuration configuration = readConfigFile("wy", localRoot, WHILEY_PLATFORM.getConfigurationSchema());
		// Construct environment and execute arguments
		Build.Project project = new SequentialBuildProject(localRoot);
		// Initialise the whiley platform
		wyc.Activator.WHILEY_PLATFORM.initialise(configuration, project);
		// Attempt to start the web server
		try {
			HttpServer server = startWebServer(project);
			server.start();
			server.awaitTermination(-1, TimeUnit.MILLISECONDS);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}


	public static HttpServer startWebServer(Build.Project project) throws IOException {
		// Construct appropriate configuration for socket over which HTTP
		// server will run.
		SocketConfig socketConfig = SocketConfig.custom().setSoTimeout(1500).build();
		// Set port number from which we'll try to run the server. If this port
		// is taken, we'll try the next one and the next one, until we find a
		// match.
		int portIndex = 0;
		//
		while (portIndex < HTTP_PORTS.length) {
			int port = HTTP_PORTS[portIndex++];
			try {
				// Construct HTTP server object, and connect pages to routes
				HttpServer server = ServerBootstrap.bootstrap().setListenerPort(port).setSocketConfig(socketConfig)
						.setExceptionLogger(new Logger())
						.registerHandler("/css/*", new HttpFileHandler(new File("."),TEXT_CSS))
						.registerHandler("/js/*", new HttpFileHandler(new File("."),TEXT_JAVASCRIPT))
						.registerHandler("*.png", new HttpFileHandler(new File("."),IMAGE_PNG))
						.registerHandler("*.gif", new HttpFileHandler(new File("."),IMAGE_GIF))
						.registerHandler("/compile", new WhileyWebCompiler(project))
						.registerHandler("/", new FrontPage())
						.registerHandler("*", new HtmlPage())
						.create();
				// Attempt to start server
				server.start();
				System.out.println("WhileyWeb running on port " + port + ".");
				return server;
			} catch (BindException e) {
				System.out.println("Port " + port + " in use by another application.");
			}
		}
		System.out.println("Failed starting HTTP server.");
		System.exit(-1);
		return null;
	}

    private static class Logger implements ExceptionLogger {

		@Override
		public void log(Exception ex) {
            if (ex instanceof SocketTimeoutException) {
                System.err.println(ex.getMessage());
            } else if (ex instanceof ConnectionClosedException) {
                System.err.println(ex.getMessage());
            } else {
                ex.printStackTrace();
            }
		}
    }

	private static Configuration readConfigFile(String name, Path.Root root, Configuration.Schema... schemas)
			throws IOException {
		Path.Entry<ConfigFile> config = root.get(Trie.fromString(name), ConfigFile.ContentType);
		if (config == null) {
			return Configuration.EMPTY;
		}
		try {
			// Read the configuration file
			ConfigFile cf = config.read();
			// Construct configuration according to given schema
			return cf.toConfiguration(Configuration.toCombinedSchema(schemas));
		} catch (SyntacticException e) {
			e.outputSourceError(System.out, false);
			System.exit(-1);
			return null;
		}
	}

	/**
	 * Determine the local root. This is within the hidden whiley directory in the
	 * user's home directory (e.g. ~/.whiley).
	 *
	 * @param tool
	 * @return
	 * @throws IOException
	 */
	private static Path.Root determineLocalRoot(Content.Registry registry) throws IOException {
		String userhome = System.getProperty("user.home");
		String whileydir = userhome + File.separator + ".whiley" + File.separator + "whileyweb";
		File f = new File(whileydir);
		// Construct the directory if it doesn't already exist.
		if(!f.exists()) {
			f.mkdirs();
		}
		return new DirectoryRoot(whileydir, registry);
	}
}
