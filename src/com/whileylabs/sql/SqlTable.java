package com.whileylabs.sql;

import java.util.Iterator;

/**
 * Respresents an SQL table as accessed via JDBC. The purpose of this class
 * is to simplify the process of communicating with the table.
 * 
 * @author David J. Pearce
 *
 */
public class SqlTable<T> {
	/**
	 * The table name
	 */
	private String name;

	/**
	 * The schema for the table
	 */
	private Column[] schema;

	public SqlTable(String name, Column... schema) {
		this.name = name;
		this.schema = schema;
	}

	/**
	 * Get the column schema for a given numbered column.
	 * 
	 * @param index
	 * @return
	 */
	public Column getColumn(int index) {
		return schema[index];
	}

	/**
	 * Get the column schema for a given named column.
	 * 
	 * @param name
	 *            --- Name of column schema to locate
	 * @return
	 */
	public Column getColumn(String name) {
		for (int i = 0; i != schema.length; ++i) {
			Column c = schema[i];
			if (c.getName().equals(name)) {
				return c;
			}
		}
		throw new IllegalArgumentException("Invalid column - " + name);
	}

	public int nColumns() {
		return schema.length;
	}

	public java.util.Iterator<T> iterator() {
		return new Iterator<T>();
	}
	
	/**
	 * Represents a column in the table schema
	 * 
	 * @author David J. Pearce
	 *
	 */
	public static class Column {
		private final String name;
		private final SqlType type;

		public Column(String name, SqlType type) {
			this.name = name;
			this.type = type;
		}

		public String getName() {
			return name;
		}

		public SqlType getType() {
			return type;
		}
	}

	private static class Iterator<S> implements java.util.Iterator<S> {

		public Iterator() {

		}

		@Override
		public boolean hasNext() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public S next() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public void remove() {
			// TODO Auto-generated method stub

		}
	}
}