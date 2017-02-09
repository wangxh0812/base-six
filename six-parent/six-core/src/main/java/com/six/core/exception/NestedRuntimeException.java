package com.six.core.exception;

import java.io.PrintStream;
import java.io.PrintWriter;

public abstract class NestedRuntimeException extends RuntimeException {
	private static final long serialVersionUID = -8177944177839639283L;
	private Throwable exceptionCause;

	static {
		NestedExceptionUtil.class.getName();
	}

	public NestedRuntimeException(String msg) {
		super(msg);
	}

	public NestedRuntimeException(Throwable cause) {
		this.exceptionCause = cause;
	}

	public NestedRuntimeException(String msg, Throwable cause) {
		super(msg, cause);
		this.exceptionCause = cause;
	}

	public Throwable getRootCause() {
		Throwable rootCause = null;
		Throwable cause = getCause();
		while ((cause != null) && (cause != rootCause)) {
			rootCause = cause;
			cause = cause.getCause();
		}
		return rootCause;
	}

	public Throwable getMostSpecificCause() {
		Throwable rootCause = getRootCause();
		return rootCause != null ? rootCause : this;
	}

	public String getMessage() {
		return super.getMessage();
	}

	public String getMessage(int type) {
		return NestedExceptionUtil.buildMessage(super.getMessage(), type, getCause());
	}

	public boolean contains(Class<?> exType) {
		if (exType == null) {
			return false;
		}
		if (exType.isInstance(this)) {
			return true;
		}
		Throwable cause = getCause();
		if (cause == this) {
			return false;
		}
		if ((cause instanceof NestedRuntimeException)) {
			return ((NestedRuntimeException) cause).contains(exType);
		}
		while (cause != null) {
			if (exType.isInstance(cause)) {
				return true;
			}
			if (cause.getCause() == cause) {
				break;
			}
			cause = cause.getCause();
		}
		return false;
	}

	public void printStackTrace() {
		super.printStackTrace();
		if (this.exceptionCause != null)
			synchronized (System.err) {
				System.err.println("\nException cause by:");
				this.exceptionCause.printStackTrace();
			}
	}

	public void printStackTrace(PrintStream s) {
		super.printStackTrace(s);

		if (this.exceptionCause != null)
			synchronized (s) {
				s.println("\nException cause by:");
				this.exceptionCause.printStackTrace(s);
			}
	}

	public void printStackTrace(PrintWriter s) {
		super.printStackTrace(s);
		if (this.exceptionCause != null)
			synchronized (s) {
				s.println("\nException cause by:");
				this.exceptionCause.printStackTrace(s);
			}
	}
}