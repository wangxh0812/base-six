package com.six.core.orm.transaction;

public abstract interface TransactionInterceptor {
	public abstract int getOrder();

	public abstract void onBegin(TransactionStatusAdapter paramTransactionStatusAdapter);

	public abstract void beforeCommit(TransactionStatusAdapter paramTransactionStatusAdapter);

	public abstract void afterCommit(TransactionStatusAdapter paramTransactionStatusAdapter);

	public abstract void afterRollBack(TransactionStatusAdapter paramTransactionStatusAdapter);

	public abstract void onCompletion(TransactionStatusAdapter paramTransactionStatusAdapter);
}