package com.six.core.orm;

public abstract interface Dialect
{
  public abstract boolean supportsLimit();

  public abstract boolean supportsLimitOffset();

  public abstract String getLimitString(String paramString, int paramInt1, int paramInt2);
}