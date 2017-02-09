package com.six.framework.basic.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.six.common.model.basic.AdminUser;
import com.six.framework.basic.model.AdminUserDetail;
import com.six.framework.basic.service.AdminUserService;

@Service("misUserDetailsService")
public class MisDetailUserServiceImpl implements UserDetailsService {

	@Autowired
	private AdminUserService adminUserService;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		AdminUser adminUser = adminUserService.findUserByUserName(userName);
		if (adminUser == null) {
			throw new UsernameNotFoundException("user is not exist");
		}
		return new AdminUserDetail(adminUser);
	}

}
