package com.whileyweb;

import java.io.File;
import java.io.IOException;
import java.net.BindException;
import java.net.SocketTimeoutException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.http.ConnectionClosedException;
import org.apache.http.ExceptionLogger;
import org.apache.http.config.SocketConfig;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.bootstrap.HttpServer;
import org.apache.http.impl.bootstrap.ServerBootstrap;

import com.whileyweb.pages.FrontPage;
import com.whileyweb.util.HtmlPage;

import jwebkit.http.HttpFileHandler;
import wyc.lang.WhileyFile;
import wycc.cfg.ConfigFile;
import wycc.lang.SemanticVersion;
import wyfs.lang.Content;
import wyfs.lang.Path;
import wyfs.lang.Path.Entry;
import wyfs.util.DirectoryRoot;
import wyfs.util.ZipFile;
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
	private static class Registry implements Content.Registry {
		@Override
		public void associate(Path.Entry e) {
			String suffix = e.suffix();

			if (suffix.equals("whiley")) {
				e.associate(WhileyFile.ContentType, null);
			} else if (suffix.equals("wyil")) {
				e.associate(WyilFile.ContentType, null);
			} else if (suffix.equals("toml")) {
				e.associate(ConfigFile.ContentType, null);
			} else if (suffix.equals("zip")) {
				e.associate(ZipFile.ContentType, null);
			}
		}

		@Override
		public String suffix(Content.Type<?> t) {
			return t.getSuffix();
		}
	}

	private static final Registry REGISTRY = new Registry();

	// =======================================================================
	// Main Entry Point
	// =======================================================================
	public static void main(String[] argc) throws IOException {
		// Determine location of repository
		String userhome = System.getProperty("user.home");
		String repositoryLocation = userhome + File.separator + ".whiley" + File.separator + "repository";
		// Create the repository root
		DirectoryRoot repository = new DirectoryRoot(repositoryLocation,REGISTRY);
		// Determine list of installed packages
		String[] pkgs = determineInstalledPackages(repository);
		// Determine default configure deps
		String[] deps = determineDefaultDependencies(pkgs);
		// Attempt to start the web server
		try {
			HttpServer server = startWebServer(repository,pkgs,deps);
			server.start();
			server.awaitTermination(-1, TimeUnit.MILLISECONDS);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}


	public static HttpServer startWebServer(Path.Root repository, String[] packages, String[] dependencies) throws IOException {
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
						.registerHandler("/compile", new WhileyWebCompiler(REGISTRY, repository))
						.registerHandler("/", new FrontPage(packages,dependencies))
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

	private static String[] determineDefaultDependencies(String[] pkgs) {
		String std = null;
		SemanticVersion ver = null;
		for (int i = 0; i != pkgs.length; ++i) {
			String pkg = pkgs[i];
			if (pkg.startsWith("std-")) {
				SemanticVersion v = new SemanticVersion(pkg.substring(5));
				if (std == null || v.compareTo(ver) > 0) {
					std = pkg;
					ver = v;
				}
			}
		}
		//
		if (std == null) {
			return new String[0];
		} else {
			return new String[] { std };
		}
	}

    private static String[] determineInstalledPackages(DirectoryRoot repository) throws IOException {
		List<Entry<ZipFile>> pkgs = repository.get(Content.filter("**", ZipFile.ContentType));
		String[] items = new String[pkgs.size()];
		for(int i=0;i!=pkgs.size();++i) {
			items[i] = pkgs.get(i).id().toString();
		}
		System.out.println("Found " + items.length + " installed packages.");
		return items;
    }
}
