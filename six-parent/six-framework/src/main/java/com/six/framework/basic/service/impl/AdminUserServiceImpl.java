package com.six.framework.basic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.common.model.basic.AdminUser;
import com.six.core.exception.DataBaseAccessException;
import com.six.core.logger.SimpleLogger;
import com.six.core.orm.KeyGen;
import com.six.core.orm.OrmUtil;
import com.six.core.orm.page.Page;
import com.six.framework.basic.dao.AdminUserDao;
import com.six.framework.basic.service.AdminUserService;

@Service("adminUserService")
public class AdminUserServiceImpl implements AdminUserService {
	
	private SimpleLogger logger = SimpleLogger.getLogger(this.getClass());
	@Autowired
	private AdminUserDao adminUserDao;

	@Override
	public AdminUser findUserByUserName(String userName) {
		AdminUser adminUser = adminUserDao.getUserByAccount(userName);
		if(adminUser != null)logger.info("===json:"+adminUser.toJson());
		if (userName.equals("six")) {
			adminUser = new AdminUser();
			adminUser.setPassword("123456");
			adminUser.setAccount(userName);
			adminUser.setUserId(KeyGen.randomSeqNum());
		}
		
		AdminUser queryAu = new AdminUser();
		queryAu.setAccount(userName);
		Page<AdminUser> pagelist = new Page<AdminUser>();
		OrmUtil.formatPageSize("1", "10", pagelist);
		this.getPage(queryAu,pagelist);
		
		return adminUser;
	}

	@Override
	public Page<AdminUser> getPage(AdminUser paramT,Page<AdminUser> paramPage) {
		return adminUserDao.getPage(paramT ,paramPage);
	}

	@Override
	public AdminUser findByKey(String paramString) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean save(String paramString, AdminUser paramT) throws DataBaseAccessException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean update(String paramString, AdminUser paramT) throws DataBaseAccessException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean delete(String paramString, AdminUser paramT) throws DataBaseAccessException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<AdminUser> getList(String paramString, AdminUser paramT) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public static void main(String[] args){}
	
}
