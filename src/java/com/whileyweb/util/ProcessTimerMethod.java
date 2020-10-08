package com.whileyweb.util;

// This program is copyright VUW.
// You are granted permission to use it to construct your answer to a SWEN221 assignment.
// You may not distribute it in any other way without permission.
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

public class ProcessTimerMethod {
	/**
	 * The binary marker is a string which we hope executed code will not produce in
	 * its stdout. This is used to determine when the processes actual stdout has
	 * ended, and the start of our internal meta data begins.
	 */
	private final static byte[] BINARY_MARKER = "This is a long and winding road!".getBytes();
	/**
	 * Extract the java command used to execute this JVM.
	 */
	public static String JAVA_CMD = System.getProperty("java.home") + "/bin/java";
	/**
	 * Extract the classpath of the enclosing JVM as well.
	 */
	public static String CLASSPATH = System.getProperty("java.class.path");

	/**
	 * Execute a <code>static</code> method in a given receiver class using a given
	 * number of operands, producing an "outcome" which includes (amongst other
	 * things) the return value represented as an object. The method being invoke
	 * must be <code>static</code>!
	 *
	 * @param timeout    The timeout to use (in milliseconds)
	 * @param receiver   The fully qualified class name containing the method to
	 *                   invoke (e.g. java.lang.String);
	 * @param method     The name of the method (e.g. charAt).
	 * @param methodArgs Argument values for the method represented as objects
	 * @return
	 * @throws Throwable
	 */
	public static Outcome exec(int timeout, String receiver, String method, Object... methodArgs) throws Throwable {
		return exec(timeout, receiver, null, method, methodArgs);
	}

	/**
	 * Execute a <code>static</code> method in a given receiver class using a given
	 * number of operands, producing an "outcome" which includes (amongst other
	 * things) the return value represented as an object. The method being invoke
	 * must be <code>static</code>!
	 *
	 * @param timeout    The timeout to use (in milliseconds)
	 * @param receiver   The fully qualified class name containing the method to
	 *                   invoke (e.g. java.lang.String);
	 * @param method     The name of the method (e.g. charAt).
	 * @param methodTypes     The types of the method parameters
	 * @param methodArgs Argument values for the method represented as objects
	 * @return
	 * @throws Throwable
	 */
	public static Outcome exec(int timeout, String receiver, String method, Class<?>[] methodTypes, Object... methodArgs) throws Throwable {
		return exec(timeout, receiver, null, method, methodTypes, methodArgs);
	}
	/**
	 * Execute a given method in a given receiver class using a given number of
	 * operands, producing an "outcome" which includes (amongst other things) the
	 * return value represented as an object. The method being invoke does not need
	 * to be <code>static</code>. For non-static methods, a constructor matching the
	 * constructor args will be used.
	 *
	 * @param timeout         The timeout to use (in milliseconds)
	 * @param receiver        The fully qualified class name containing the method
	 *                        to invoke (e.g. java.lang.String);
	 * @param constructorArgs Argument values for the constructor represented as
	 *                        objects
	 * @param method          The name of the method (e.g. charAt).
	 * @param methodArgs      Argument values for the method represented as objects
	 * @return
	 * @throws Throwable
	 */
	public static Outcome exec(int timeout, String receiver, Object[] constructorArgs, String method, Object... methodArgs) throws Throwable {
		Class<?>[] constructorTypes = (constructorArgs == null) ? null : toUnboxedClassTypes(constructorArgs);
		Class<?>[] methodTypes = toUnboxedClassTypes(methodArgs);
		return exec(timeout,receiver,constructorTypes,constructorArgs,method,methodTypes,methodArgs);
	}

	/**
	 * Execute a given method in a given receiver class using a given number of
	 * operands, producing an "outcome" which includes (amongst other things) the
	 * return value represented as an object. The method being invoke does not need
	 * to be <code>static</code>. For non-static methods, a constructor matching the
	 * constructor args will be used.
	 *
	 * @param timeout         The timeout to use (in milliseconds)
	 * @param receiver        The fully qualified class name containing the method
	 *                        to invoke (e.g. java.lang.String);
	 * @param constructorArgs Argument values for the constructor represented as
	 *                        objects
	 * @param method          The name of the method (e.g. charAt).
	 * @param methodTypes     The types of the method parameters
	 * @param methodArgs      Argument values for the method represented as objects
	 * @return
	 * @throws Throwable
	 */
	public static Outcome exec(int timeout, String receiver, Object[] constructorArgs, String method, Class<?>[] methodTypes, Object... methodArgs) throws Throwable {
		Class<?>[] constructorTypes = (constructorArgs == null) ? null : toUnboxedClassTypes(constructorArgs);
		return exec(timeout,receiver,constructorTypes,constructorArgs,method,methodTypes,methodArgs);
	}

	/**
	 * Execute a given method in a given receiver class using a given number of
	 * operands, producing an "outcome" which includes (amongst other things) the
	 * return value represented as an object. The method being invoke does not need
	 * to be <code>static</code>. For non-static methods, a constructor matching the
	 * constructor args will be used.
	 *
	 * @param timeout         The timeout to use (in milliseconds)
	 * @param receiver        The fully qualified class name containing the method
	 *                        to invoke (e.g. java.lang.String);
	 * @param constructorTypes The types of the constructor parameters
	 * @param constructorArgs Argument values for the constructor represented as
	 *                        objects
	 * @param method          The name of the method (e.g. charAt).
	 * @param methodTypes     The types of the method parameters
	 * @param methodArgs      Argument values for the method represented as objects
	 * @return
	 * @throws Throwable
	 */
	public static Outcome exec(int timeout, String receiver, Class<?>[] constructorTypes, Object[] constructorArgs, String method, Class<?>[] methodTypes, Object... methodArgs) throws Throwable {
		// ===================================================
		// Construct command
		// ===================================================
		ArrayList<String> command = new ArrayList<>();
		command.add(JAVA_CMD);
		command.add("-ea"); // enable assertions by default
		command.add("-cp");
		command.add(CLASSPATH);
		command.add(ProcessTimerMethod.class.getCanonicalName());

		// ===================================================
		// Construct the process
		// ===================================================
		ProcessBuilder builder = new ProcessBuilder(command);
		Process child = builder.start();
		try {
			// first, send over the method in question + args
			OutputStream output = child.getOutputStream();
			ObjectOutputStream oos = new ObjectOutputStream(output);
			oos.writeObject(receiver);
			oos.writeObject(method);
			oos.writeObject(constructorTypes);
			oos.writeObject(constructorArgs);
			oos.writeObject(methodTypes);
			oos.writeObject(methodArgs);
			oos.flush();
			output.flush();
			// second, read the result whilst checking for a timeout
			InputStream input = child.getInputStream();
			InputStream error = child.getErrorStream();
			boolean success = child.waitFor(timeout,TimeUnit.MILLISECONDS);
			byte[] stdout = readInputStream(input);
			byte[] stderr = readInputStream(error);
			// Look for binary marker (if present)
			int marker = findBinaryMarker(stdout);
			Object returnVal = null;
			if (marker != -1) {
				// found marker, attempt to unmarshall return value
				try {
					// Extract bytes of the object stream
					byte[] bytes = Arrays.copyOfRange(stdout, marker + BINARY_MARKER.length, stdout.length);
					// Construct object input stream
					ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes));
					// Construct returned object (could be null)
					returnVal = in.readObject();
				} catch(Throwable e) {
					// ObjectInputStream could be malformed if timeout occurred whilst it was being
					// written. That's unfortunate, but not much we can do.
				}
				// Trim stdout to remove hidden object output stream
				stdout = Arrays.copyOfRange(stdout, 0, marker);
			}
			return new Outcome(success ? child.exitValue() : null, returnVal, stdout, stderr);
		} finally {
			// make sure child process is destroyed.
			child.destroy();
		}
	}

	/**
	 * Read an input stream entirely into a byte array.
	 *
	 * @param input
	 * @return
	 * @throws IOException
	 */
	private static byte[] readInputStream(InputStream input) throws IOException {
		byte[] buffer = new byte[1024];
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		while (input.available() > 0) {
			int count = input.read(buffer);
			output.write(buffer, 0, count);
		}
		return output.toByteArray();
	}

	/**
	 * Search through a sequence of bytes looking for a given subsequence of bytes
	 * (the binary marker), returning the index of the start of the subsequence, or
	 * <code>-1</code> if it cannot be found.
	 *
	 * @param bytes
	 * @return
	 */
	private static int findBinaryMarker(byte[] bytes) {
		outer: for (int i = 0; i < bytes.length - (BINARY_MARKER.length); ++i) {
			for (int j = 0; j < BINARY_MARKER.length; ++j) {
				if (bytes[i + j] != BINARY_MARKER[j]) {
					// failed match at this position
					continue outer;
				}
			}
			// matched
			return i;
		}
		// no match
		return -1;
	}

	/**
	 * This is the entry point for the child process. This reads information about
	 * the class and method to invoke, along with the parameter values to use.
	 *
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		ObjectInputStream ois = new ObjectInputStream(System.in);
		int exitCode=0;
		try {
			String receiver = (String) ois.readObject();
			String name = (String) ois.readObject();
			Class<?> clazz = Class.forName(receiver);
			Class<?>[] constructorTypes = (Class[]) ois.readObject();
			Object[] constructorArguments = (Object[]) ois.readObject();
			Class<?>[] methodTypes = (Class[]) ois.readObject();
			Object[] methodArguments = (Object[]) ois.readObject();
			//
			// Construct enclosing class instance (if necessary)
			Object instance = (constructorTypes == null) ? null : clazz.getConstructor(constructorTypes).newInstance(constructorArguments);
			// Invoke method
			Object ret = clazz.getMethod(name, methodTypes).invoke(instance, methodArguments);
			// Write out marker bytes to indicate start of object stream.
			System.out.write(BINARY_MARKER);
			// Write out the return value
			ObjectOutputStream os = new ObjectOutputStream(System.out);
			os.writeObject(ret);
			// Flush it all
			os.flush();
			System.out.flush();
			// Done
		}
//		} catch(InvocationTargetException e) {
//			e.getCause().printStackTrace();
//			exitCode=-1;
//		}
		catch (Exception e) {
			e.printStackTrace();
			exitCode=-2;
		}
		// Finally write the exit code
		System.exit(exitCode);
	}

	/**
	 * Determine the class types for a given set of object arguments. For example,
	 * passing in <code>[1,"str"]</code> and we get back
	 * <code>[int.class,String.class]</code>. Observe that primitive types have been
	 * unboxed during this process.
	 *
	 * @param args
	 * @return
	 */
	public static Class<?>[] toUnboxedClassTypes(Object...args) {
		Class<?>[] classes = new Class<?>[args.length];
		for(int i=0;i!=args.length;++i) {
			classes[i] = normalise(args[i].getClass());
		}
		return classes;
	}

	/**
	 * Normalise a class kind so that methods accepting primitive types can be
	 * invoked.
	 *
	 * @param kind
	 * @return
	 */
	private static Class<?> normalise(Class<?> kind) {
		if(kind == java.lang.Boolean.class) {
			return boolean.class;
		} else if(kind == java.lang.Byte.class) {
			return byte.class;
		} else if(kind == java.lang.Short.class) {
			return short.class;
		} else if(kind == java.lang.Integer.class) {
			return int.class;
		} else if(kind == java.lang.Long.class) {
			return long.class;
		} else {
			return kind;
		}
	}

	/**
	 * Represents the outcome of a given execution. This includes several
	 * components:
	 * <ul>
	 * <li><b>exitCode</b>. This is the exit code for the process which is zero if
	 * successful, or a positive number if an error occurred.</li>
	 * <li><b>returnedObject</b>. This is the object returned from the method (if
	 * any). If the method returns a primitive, this will be automatically boxed.
	 * <li><b>stdout</b>. All stdout produced by the process.</li>
	 * <li><b>stderr</b>. All stderr produced by the process (including exception
	 * traces).</li>
	 * </ul>
	 *
	 * @author David J. Pearce
	 *
	 */
	public static class Outcome {

		/**
		 * Exit code for process, with <code>null</code> indicating timeout occurred.
		 */
		private final Integer exitCode;

		/**
		 * Object returned. This will be <code>null</code> if an error occurred, and can
		 * also be <code>null</code> if method has no return, etc.
		 */
		private final Object returnedObject;

		/**
		 * Bytes for the stdout produced.
		 */
		private final byte[] stdout;

		/**
		 * Bytes for the stderr produced.
		 */
		private final byte[] stderr;

		public Outcome(Integer exitCode, Object returnVal, byte[] stdout, byte[] stderr) {
			this.exitCode = exitCode;
			this.returnedObject = returnVal;
			this.stdout = stdout;
			this.stderr = stderr;
		}

		/**
		 * Get the exit code of the process.
		 *
		 * @return
		 */
		public Integer exitCode() {
			return exitCode;
		}

		/**
		 * Get all bytes written to <code>stdout</code> during the execution.
		 *
		 * @return
		 */
		public byte[] getStdout() {
			return stdout;
		}

		/**
		 * Get all bytes written to <code>stderr</code> during the execution.
		 *
		 * @return
		 */
		public byte[] getStderr() {
			return stderr;
		}

		/**
		 * Get the object returned by the method in question.
		 *
		 * @param <T>
		 * @param kind
		 * @return
		 */
		public <T> T getReturnAs(Class<T> kind) {
			if(returnedObject == null || kind.isInstance(returnedObject)) {
				return (T) returnedObject;
			} else {
				throw new IllegalArgumentException("returned object instance of " + returnedObject.getClass().getCanonicalName()
						+ ", expected " + kind.getCanonicalName());
			}
		}
	}
}
