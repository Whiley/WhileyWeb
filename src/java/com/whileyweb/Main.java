package com.whileyweb;

import java.io.File;
import java.io.IOException;
import java.net.BindException;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.http.ConnectionClosedException;
import org.apache.http.ExceptionLogger;
import org.apache.http.config.SocketConfig;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.bootstrap.HttpServer;
import org.apache.http.impl.bootstrap.ServerBootstrap;

import com.whileyweb.pages.*;
import com.whileyweb.util.*;

import com.whileyweb.util.OptArg;
import jwebkit.http.HttpFileHandler;
import wyboogie.core.BoogieFile;
import wyboogie.util.Boogie;
import wyc.lang.WhileyFile;
import wycli.cfg.ConfigFile;
import wycli.lang.SemanticVersion;
import wyfs.lang.Content;
import wyfs.lang.Path;
import wyfs.lang.Path.Entry;
import wyfs.util.DefaultContentRegistry;
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
	public static final Content.Registry REGISTRY = new DefaultContentRegistry()
			.register(WhileyFile.ContentType, "whiley").register(WyilFile.ContentType, "wyil")
			.register(ConfigFile.ContentType, "toml").register(ZipFile.ContentType, "zip");

	private static final OptArg[] OPTIONS = {
			// Standard options
			new OptArg("timeout", "t", OptArg.INT, "Set timeout constraint per query (in ms)", 10000),
			new OptArg("pkgs", "p", OptArg.STRINGARRAY, "Specify packages to make available for compilation", new String[] {"std"}),
			new OptArg("repository","r", OptArg.STRING, "Specify location of package repository", null),
			new OptArg("analytics","g", OptArg.STRING, "Specify Google analytics Tracking ID", null)
	};

	// =======================================================================
	// Main Entry Point
	// =======================================================================
	public static void main(String[] _args) throws IOException {
		List<String> args = new ArrayList<>(Arrays.asList(_args));
		Map<String, Object> options = OptArg.parseOptions(args, OPTIONS);
		// Determine requested timeout value
		int timeout = (Integer) options.get("timeout");
		// Determine requested packages
		String[] packages = (String[]) options.get("pkgs");
		// Determine location of repository
		String repositoryLocation = (String) options.get("repository");
		//
		if(repositoryLocation == null) {
				// Try environment variable
				repositoryLocation = System.getenv("WHILEY_REPOSITORY");
				if(repositoryLocation == null) {
					// Use default location
					repositoryLocation = System.getProperty("user.home") + File.separator + ".whiley" + File.separator + "repository";
				}
		}
		System.out.println("Working directory is " + System.getProperty("user.dir"));
		System.out.println("Whiley repository is " + repositoryLocation);
		// Extract Google Analytics tracking ID
		String gaTrackingID = (String) options.get("analytics");
		//
		if(gaTrackingID != null) {
			System.out.println("Google analytics enabled (" + gaTrackingID + ")");
		}
		// Create the repository root
		DirectoryRoot repository = new DirectoryRoot(repositoryLocation,REGISTRY);
		// Determine list of installed packages
		String[] pkgs = determineInstalledPackages(repository);
		// Determine default configure deps
		String[] deps = determineDefaultDependencies(pkgs,packages);
		// Attempt to start the web server
		boolean boogie = determineBoogieAvailable();

		try {
			HttpServer server = startWebServer(repositoryLocation, pkgs, deps, timeout, boogie, gaTrackingID);
			server.start();
			server.awaitTermination(-1, TimeUnit.MILLISECONDS);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}


	public static HttpServer startWebServer(String repository, String[] packages, String[] dependencies, int timeout, boolean boogie, String gaTrackingID) throws IOException {
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
						.registerHandler("/bin/js/*", new HttpFileHandler(new File("."),TEXT_JAVASCRIPT))
						.registerHandler("*.png", new HttpFileHandler(new File("."),IMAGE_PNG))
						.registerHandler("*.gif", new HttpFileHandler(new File("."),IMAGE_GIF))
						.registerHandler("/compile", new WhileyWebCompiler(repository, timeout, boogie))
						.registerHandler("/", new FrontPage(gaTrackingID,packages,dependencies))
						.registerHandler("*", new HtmlPage(gaTrackingID))
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

	private static String[] determineDefaultDependencies(String[] pkgs, String... deps) {
		ArrayList<String> results = new ArrayList<>();
		for (String dep : deps) {
			String concrete = findLatestVersion(pkgs, dep);
			if (concrete != null) {
				results.add(concrete);
			}

		}
		System.out.println("Found " + results.size() + " matching dependencies: " + results);
		return results.toArray(new String[results.size()]);
	}

	private static String findLatestVersion(String[] pkgs, String dep) {
		String prefix = dep + "-v";
		String best = null;
		SemanticVersion ver = null;
		for (int i = 0; i != pkgs.length; ++i) {
			String pkg = pkgs[i];
			if (pkg.startsWith(prefix)) {
				SemanticVersion v = new SemanticVersion(pkg.substring(prefix.length()));
				if (best == null || v.compareTo(ver) > 0) {
					best = pkg;
					ver = v;
				}
			}
		}
		return best;
	}

    private static String[] determineInstalledPackages(DirectoryRoot repository) throws IOException {
		List<Entry<ZipFile>> pkgs = repository.get(Content.filter("**", ZipFile.ContentType));
		String[] items = new String[pkgs.size()];
		for(int i=0;i!=pkgs.size();++i) {
			items[i] = pkgs.get(i).id().toString();
		}
		System.out.println("Found " + items.length + " installed packages: " + Arrays.toString(items));
		return items;
    }

	/**
	 * Check whether or not Boogie is available on this system.
	 * @return
	 */
	private static boolean determineBoogieAvailable() {
		// Create dummy boogie file
		BoogieFile bf = new BoogieFile();
		boolean response;
		//
		try {
			Boogie.Message[] errors = new Boogie().check(10, "test", bf);
			// Should produce no errors
			if(errors == null) {
				System.out.println("Boogie was detected!");
				return true;
			} else {
				System.out.println("Boogie was not detected (" + errors.length + " errors)");
			}
		} catch(Exception e) {
			e.printStackTrace();
			System.out.println("Boogie was not detected (" + e.getClass().getSimpleName() + ")");
		}
		return false;
	}
}
