package com.six.core.orm;

import com.six.core.exception.DataBaseAccessException;
import com.six.core.orm.page.Page;

import java.util.List;

public abstract interface BaseDao<T> {
	public abstract Page<T> getPage(T paramT, Page<T> paramPage);

	public abstract T findByKey(String paramString);

	public abstract boolean save(String paramString, T paramT) throws DataBaseAccessException;

	public abstract boolean update(String paramString, T paramT) throws DataBaseAccessException;

	public abstract boolean delete(String paramString, T paramT) throws DataBaseAccessException;

	public List<T> getList(String paramString, T paramT);
}