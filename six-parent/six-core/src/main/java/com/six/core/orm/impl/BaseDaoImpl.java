package com.six.core.orm.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.six.core.exception.DataBaseAccessException;
import com.six.core.orm.BaseDbOpDao;
import com.six.core.orm.page.Page;

public abstract class BaseDaoImpl<T> {
	protected static Logger logger = LoggerFactory.getLogger(BaseDaoImpl.class);
	@Autowired
	protected BaseDbOpDao<T> baseDao;

	public Page<T> getPage(T paramT,Page<T> paramPage) {
		if (paramPage != null) {
			return this.baseDao.getList(this.getMapper() + "getList", paramT,paramPage);
		}
		return null;
	}

	public T findByKey(String paramString) {
		return this.baseDao.get(this.getMapper() + "selectByPrimaryKey", paramString);
	}

	public boolean save(String paramString, T paramT) throws DataBaseAccessException {
		return this.baseDao.save(this.getMapper() + "insert", paramT) > 0;
	}

	public boolean update(String paramString, T paramT) throws DataBaseAccessException {
		return this.baseDao.update(this.getMapper() + "updateByPrimaryKeySelective", paramT) > 0;
	}

	public boolean delete(String paramString, T paramT) throws DataBaseAccessException {
		return this.baseDao.update(this.getMapper() + "softDeleteByPrimaryKey", paramT) > 0;
	}

	public List<T> getList(String paramString, T paramT) {
		return this.baseDao.getList(this.getMapper() + "getList", paramT);
	}

	@SuppressWarnings("rawtypes")
	public String getMapper() {
		Class clazz = (Class) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		return clazz.getName() + "Mapper.";
	};

}
