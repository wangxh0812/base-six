package com.six.core.exception;

public class NestedBusinessException extends NestedRuntimeException {
	private static final long serialVersionUID = 2724032065111817538L;
	String businessMes;

	public NestedBusinessException(String msg) {
		super(msg);
		this.businessMes = msg;
	}

	public NestedBusinessException(Throwable cause) {
		super(cause);
	}

	public NestedBusinessException(String msg, Throwable cause) {
		super(msg, cause);
		this.businessMes = msg;
	}

	public String getMessage() {
		return super.getMessage(7);
	}

	public String getBusinessMessage() {
		return "" + this.businessMes + "";
	}
}