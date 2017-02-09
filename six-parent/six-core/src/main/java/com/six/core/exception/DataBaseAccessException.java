package com.six.core.exception;

import java.sql.SQLException;

public class DataBaseAccessException extends NestedInspectException {
	private static final long serialVersionUID = 4669255838898730123L;
	private final String sql;

	public DataBaseAccessException(String msg) {
		super(msg);
		this.sql = "";
	}

	public DataBaseAccessException(Throwable cause) {
		super(cause);
		this.sql = "";
	}

	public DataBaseAccessException(String msg, Throwable cause) {
		super(msg, cause);
		this.sql = "";
	}

	public DataBaseAccessException(String task, String sql, SQLException ex) {
		super(task + "SQLException for SQL [" + sql + "]; SQL state [" + ex.getSQLState() + "]; error code ["
				+ ex.getErrorCode() + "]; " + ex.getMessage(), ex);
		this.sql = sql;
	}

	public SQLException getSQLException() {
		return (SQLException) getCause();
	}

	public String getSql() {
		return this.sql;
	}

	public String getMessage() {
		return super.getMessage(0);
	}
}