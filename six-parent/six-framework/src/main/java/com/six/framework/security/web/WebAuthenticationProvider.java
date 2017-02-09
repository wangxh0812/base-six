package com.six.framework.security.web;

import java.util.Collection;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.six.framework.basic.model.MyUserDetail;

@Component
public class WebAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
	@Qualifier("myUserDetailsService")
	private UserDetailsService userDetailsService;

	/**
	 * 自定义验证方式
	 */
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String userName = authentication.getName();
		String password = (String) authentication.getCredentials();
		if(StringUtils.isBlank(userName) || StringUtils.isBlank(password)){
			throw new BadCredentialsException("username or password is empty");
		}
		MyUserDetail mud = (MyUserDetail) userDetailsService.loadUserByUsername(userName);
		// 加密过程在这里体现
		if (!password.equals(mud.getPassword())) {
			throw new BadCredentialsException("wrong password");
		}

		Collection<? extends GrantedAuthority> authorities = mud.getAuthorities();
		return new UsernamePasswordAuthenticationToken(mud, password, authorities);
	}

	@Override
	public boolean supports(Class<?> arg0) {
		return true;
	}
}
