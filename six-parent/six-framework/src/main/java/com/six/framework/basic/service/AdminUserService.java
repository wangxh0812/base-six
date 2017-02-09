package com.six.framework.basic.service;

import com.six.common.model.basic.AdminUser;
import com.six.core.orm.BaseService;

public interface AdminUserService extends BaseService<AdminUser>{
	public AdminUser findUserByUserName(String userName);
}
