package com.six.core.orm.transaction;

public abstract interface TransactionStatusAdapter {
	public abstract String getTransactionKey();

	public static class DefaultTransactionStatus implements TransactionStatusAdapter {
		private Object transaction = null;

		public DefaultTransactionStatus(Object transaction) {
			if (transaction == null)
				throw new IllegalArgumentException("事务对象必须不能为null。");
			this.transaction = transaction;
		}

		public String getTransactionKey() {
			return this.transaction.getClass().toString() + "^" + this.transaction.hashCode();
		}
	}
}