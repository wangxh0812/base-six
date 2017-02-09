package com.six.core.orm.transaction;

import com.six.core.exception.NestedRuntimeException;

public class TransactionException extends NestedRuntimeException {
	private static final long serialVersionUID = 7049248366872134545L;

	public TransactionException(String msg) {
		super(msg);
	}

	public TransactionException(String msg, Throwable cause) {
		super(msg, cause);
	}
}