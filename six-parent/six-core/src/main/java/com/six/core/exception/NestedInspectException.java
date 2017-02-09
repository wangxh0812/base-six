package com.six.core.exception;

public abstract class NestedInspectException extends RuntimeException {
	private static final long serialVersionUID = 7100714597678207546L;

	public NestedInspectException(String msg) {
		super(msg);
	}

	public NestedInspectException() {
	}

	public NestedInspectException(Throwable cause) {
		super(cause);
	}

	public NestedInspectException(String msg, Throwable cause) {
		super(msg, cause);
	}

	public String getMessage() {
		return super.getMessage();
	}

	public String getMessage(int type) {
		return NestedExceptionUtil.buildMessage(super.getMessage(), type, getCause());
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
		if ((cause instanceof NestedInspectException)) {
			return ((NestedInspectException) cause).contains(exType);
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
}