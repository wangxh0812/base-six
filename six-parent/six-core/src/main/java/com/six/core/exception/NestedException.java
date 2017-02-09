package com.six.core.exception;

public class NestedException extends NestedRuntimeException {
	private static final long serialVersionUID = -4775190692869227607L;

	public NestedException(String msg) {
		super(msg);
	}

	public NestedException(Throwable cause) {
		super(cause);
	}

	public NestedException(String msg, Throwable cause) {
		super(msg, cause);
	}

	public String getMessage() {
		return super.getMessage(-1);
	}
}