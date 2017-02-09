package com.six.framework.security.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.six.core.Conts;
import com.six.framework.basic.model.MyUserDetail;

public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	public LoginSuccessHandler(String defaultTatgetUrl,boolean alwaysUseDefaultTargetUrl){
		super();
		this.setUseReferer(true);
		this.setDefaultTargetUrl(defaultTatgetUrl);
		this.setAlwaysUseDefaultTargetUrl(true);
	}
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		MyUserDetail userDetails = (MyUserDetail) authentication.getPrincipal();
		HttpSession session = request.getSession();
		//save user info to session
		session.setAttribute(Conts.SESSION_USERNAME, userDetails.getUserName());
		session.setAttribute(Conts.SESSION_USERID, userDetails.getUserId());
		session.setAttribute(Conts.SESSION_COMPANY, userDetails.getCompanyId());
		super.onAuthenticationSuccess(request, response, authentication);
	}
}
