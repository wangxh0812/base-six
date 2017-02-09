package com.six.framework.security.mis;

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

import com.six.core.utils.MD5;
import com.six.framework.basic.model.AdminUserDetail;

@Component
public class MisAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
	@Qualifier("misUserDetailsService")
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
		AdminUserDetail mud = (AdminUserDetail) userDetailsService.loadUserByUsername(userName);
		// 加密过程在这里体现
		password = MD5.getStrMD5(password);
		if (StringUtils.isBlank(mud.getPassword()) 
				|| !password.equals(mud.getPassword().toLowerCase())) {
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
