package com.six.framework.config;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import com.google.code.kaptcha.servlet.KaptchaServlet;

@Component
@Configuration
public class KaptchaConfig extends WebMvcConfigurerAdapter {
	/*
	 * @Value("${kaptcha.border}") private String kborder;
	 */

	@Value("${kaptcha.session.key}")
	private String skey;

	@Value("${kaptcha.textproducer.font.color}")
	private String fcolor;

	@Value("${kaptcha.textproducer.font.size}")
	private String fsize;

	@Value("${kaptcha.obscurificator.impl}")
	private String obscurificator;

	@Value("${kaptcha.noise.impl}")
	private String noise;

	@Value("${kaptcha.image.width}")
	private String width;

	@Value("${kaptcha.image.height}")
	private String height;

	@Value("${kaptcha.textproducer.char.length}")
	private String clength;

	@Value("${kaptcha.textproducer.char.space}")
	private String cspace;

	@Value("${kaptcha.background.clear.from}")
	private String from;

	@Value("${kaptcha.background.clear.to}")
	private String to;

	@Bean
	public ServletRegistrationBean servletRegistrationBean() throws ServletException {
		ServletRegistrationBean servlet = new ServletRegistrationBean(new KaptchaServlet(), "/kaptcha.svl");
		servlet.addInitParameter("kaptcha.border", "no"/* kborder */);// 无边框
		servlet.addInitParameter("kaptcha.session.key", skey);// session key
		servlet.addInitParameter("kaptcha.textproducer.font.color", fcolor);
		servlet.addInitParameter("kaptcha.textproducer.font.size", fsize);
		servlet.addInitParameter("kaptcha.obscurificator.impl", obscurificator);
		servlet.addInitParameter("kaptcha.noise.impl", noise);
		servlet.addInitParameter("kaptcha.image.width", width);
		servlet.addInitParameter("kaptcha.image.height", height);
		servlet.addInitParameter("kaptcha.textproducer.char.length", clength);
		servlet.addInitParameter("kaptcha.textproducer.char.space", cspace);
		servlet.addInitParameter("kaptcha.background.clear.from", from); // 和登录框背景颜色一致
		servlet.addInitParameter("kaptcha.background.clear.to", to);
		return servlet;
	}

	public String getSkey() {
		return skey;
	}

	public void setSkey(String skey) {
		this.skey = skey;
	}

	public String getFcolor() {
		return fcolor;
	}

	public void setFcolor(String fcolor) {
		this.fcolor = fcolor;
	}

	public String getFsize() {
		return fsize;
	}

	public void setFsize(String fsize) {
		this.fsize = fsize;
	}

	public String getObscurificator() {
		return obscurificator;
	}

	public void setObscurificator(String obscurificator) {
		this.obscurificator = obscurificator;
	}

	public String getNoise() {
		return noise;
	}

	public void setNoise(String noise) {
		this.noise = noise;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getClength() {
		return clength;
	}

	public void setClength(String clength) {
		this.clength = clength;
	}

	public String getCspace() {
		return cspace;
	}

	public void setCspace(String cspace) {
		this.cspace = cspace;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

}
