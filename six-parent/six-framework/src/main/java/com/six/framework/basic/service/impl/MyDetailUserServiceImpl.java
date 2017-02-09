package com.six.framework.basic.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.six.common.model.basic.User;
import com.six.framework.basic.model.MyUserDetail;
import com.six.framework.basic.service.UserService;

@Service("myUserDetailsService")
public class MyDetailUserServiceImpl implements UserDetailsService {

	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		User user = userService.findUserByUserName(userName);
		if (user == null) {
			throw new UsernameNotFoundException("user is not exist");
		}
		return new MyUserDetail(user);
	}

}
