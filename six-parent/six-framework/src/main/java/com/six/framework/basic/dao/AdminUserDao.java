package com.six.framework.basic.dao;

import com.six.common.model.basic.AdminUser;
import com.six.core.orm.BaseDao;

public interface AdminUserDao extends BaseDao<AdminUser> {
	public AdminUser getUserByAccount(String account);
}
