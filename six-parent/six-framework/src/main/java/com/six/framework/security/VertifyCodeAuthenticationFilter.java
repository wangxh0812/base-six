package com.six.framework.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.google.code.kaptcha.Constants;
import com.six.core.Conts;

public class VertifyCodeAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
	private static final String VERTIRY_CODE_PARAMETER = "vertifyCode";
	private String servletPath;

	public VertifyCodeAuthenticationFilter(String servletPath, String failureUrl) {
		super(servletPath);
		this.servletPath = servletPath;
		setAuthenticationFailureHandler(new SimpleUrlAuthenticationFailureHandler(failureUrl));
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		if ("POST".equalsIgnoreCase(req.getMethod()) && servletPath.equals(req.getServletPath())) {
			String expectCode = (String) req.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
			String vertifyCode = req.getParameter(VERTIRY_CODE_PARAMETER);
			System.out.println("==expectCode:"+expectCode+";vertifyCode:"+vertifyCode);
			if (StringUtils.isBlank(expectCode)
					|| StringUtils.isBlank(vertifyCode) 
					|| !expectCode.equalsIgnoreCase(req.getParameter(VERTIRY_CODE_PARAMETER))) {
				req.getSession().setAttribute(Conts.SESSION_ERRORCODE, 1);
				unsuccessfulAuthentication(req, res, new InsufficientAuthenticationException("图形验证码错误"));
				return;
			}else{
				req.getSession().removeAttribute(Constants.KAPTCHA_SESSION_KEY);
			}
			
		}
		chain.doFilter(request, response);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {
		return null;
	}

}