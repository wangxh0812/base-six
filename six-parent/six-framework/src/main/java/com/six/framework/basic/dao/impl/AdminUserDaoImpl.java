package com.six.framework.basic.dao.impl;

import org.springframework.stereotype.Repository;

import com.six.common.model.basic.AdminUser;
import com.six.core.orm.impl.BaseDaoImpl;
import com.six.framework.basic.dao.AdminUserDao;

@Repository("adminUserDao")
public class AdminUserDaoImpl extends BaseDaoImpl<AdminUser> implements AdminUserDao {
	public AdminUser getUserByAccount(String account) {
		return (AdminUser) this.baseDao.get(this.getMapper() + "getUserByAccount", account);
	}
}
