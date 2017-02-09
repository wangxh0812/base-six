package com.six.framework.basic.model;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.six.common.model.basic.User;

public class MyUserDetail extends User implements UserDetails{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4774360604499758614L;

	public MyUserDetail(User user) {
		if(user != null) {
			this.setPassword(user.getPassword());
			this.setUserName(user.getUserName());
			this.setUserId(user.getUserId());
			this.setCompanyId(user.getCompanyId());
		}
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		/*
		Set<SRole> userRoles = this.getSRoles();
		
		if(userRoles != null)
		{
			for (SRole role : userRoles) {
				SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
				authorities.add(authority);
			}
		}*/
		//if (getRole() == 1) {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("" + this.getRole());
		authorities.add(authority);
		//}
		return authorities;
	}

	@Override
	public String getPassword() {
		return super.getPassword();
	}


	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getUsername() {
		return super.getUserName();
	}


}
