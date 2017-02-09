package com.six.framework.basic.service.impl;

import org.springframework.stereotype.Service;

import com.six.common.model.basic.User;
import com.six.core.orm.KeyGen;
import com.six.framework.basic.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Override
	public User findUserByUserName(String userName) {
		User user = null;
		if (userName.equals("six")) {
			user = new User();
			user.setPassword("123456");
			user.setUserName(userName);
			user.setUserId(KeyGen.randomSeqNum());
		}
		return user;
	}
	
}
