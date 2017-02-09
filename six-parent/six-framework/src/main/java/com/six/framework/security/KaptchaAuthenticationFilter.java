package com.six.framework.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.google.code.kaptcha.Constants;

public class KaptchaAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	public static final String SPRING_SECURITY_FORM_CAPTCHA_KEY = "validateCode";
	public static final String SESSION_GENERATED_CAPTCHA_KEY = Constants.KAPTCHA_SESSION_KEY;
	private String captchaParameter = SPRING_SECURITY_FORM_CAPTCHA_KEY;

	public KaptchaAuthenticationFilter(AuthenticationManager authenticationManager) {
		super();
		this.setAuthenticationManager(authenticationManager);
	}

	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		String genCode = this.obtainGeneratedCaptcha(request);
		String inputCode = this.obtainCaptcha(request);
		if (StringUtils.isBlank(genCode)) {
			throw new BadCredentialsException("LoginAuthentication.captchaInvalid");
		}

		if (!genCode.equalsIgnoreCase(inputCode)) {
			throw new BadCredentialsException("LoginAuthentication.captchaNotEquals");
		}

		return super.attemptAuthentication(request, response);
	}

	protected String obtainCaptcha(HttpServletRequest request) {
		return request.getParameter(this.captchaParameter);
	}

	protected String obtainGeneratedCaptcha(HttpServletRequest request) {
		return (String) request.getSession().getAttribute(SESSION_GENERATED_CAPTCHA_KEY);
	}

}