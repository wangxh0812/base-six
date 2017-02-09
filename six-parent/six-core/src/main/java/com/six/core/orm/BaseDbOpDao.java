package com.six.core.orm;

import com.six.core.exception.DataBaseAccessException;
import com.six.core.orm.page.Page;

import java.io.Serializable;
import java.sql.Connection;
import java.util.List;
import java.util.Map;

public abstract interface BaseDbOpDao<T> {
	public abstract int save(String paramString, T paramT) throws DataBaseAccessException;

	public abstract int save(String paramString, List<T> paramList) throws DataBaseAccessException;

	public abstract int update(String paramString, T paramT) throws DataBaseAccessException;

	public abstract int update(String paramString, Map<Object, T> paramMap) throws DataBaseAccessException;

	public abstract int delete(String paramString, Serializable paramSerializable) throws DataBaseAccessException;

	public abstract int delete(String paramString, T paramT) throws DataBaseAccessException;

	public abstract List<T> getAll(String paramString);

	public abstract T get(String paramString, Object paramObject);

	public abstract List<T> getList(String paramString, Object paramObject);

	public abstract Page<T> getList(String paramString, Object paramObject, Page<T> paramPage);

	public abstract Integer count(String paramString, Object paramObject);

	public abstract Connection getConnection();
}