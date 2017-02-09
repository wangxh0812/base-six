package com.six.core.orm;

import java.util.List;

import com.six.core.exception.DataBaseAccessException;
import com.six.core.orm.page.Page;

public interface BaseService<T> {
	public Page<T> getPage(T paramT, Page<T> paramPage);

	public T findByKey(String paramString);

	public boolean save(String paramString, T paramT) throws DataBaseAccessException;

	public boolean update(String paramString, T paramT) throws DataBaseAccessException;

	public boolean delete(String paramString, T paramT) throws DataBaseAccessException;

	public List<T> getList(String paramString, T paramT);
}
