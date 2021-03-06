package com.six.framework.basic.model;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.six.common.model.basic.AdminUser;

public class AdminUserDetail extends AdminUser implements UserDetails{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4774360604499758614L;

	public AdminUserDetail(AdminUser adminUser) {
		if(adminUser != null) {
			this.setPassword(adminUser.getPassword());
			this.setAccount(adminUser.getAccount());
			this.setUserId(adminUser.getUserId());
			this.setCompanyId(adminUser.getCompanyId());
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
		return super.getAccount();
	}
}
