package com.six.framework.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactory;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import freemarker.template.TemplateException;
import freemarker.template.utility.XmlEscape;

@Component
@Configuration
public class FreeMarkerConfig extends WebMvcConfigurerAdapter {
	@Value("${freemarker.freemarkerviewresolver.suffix}")
	private String freemarkerviewresolver_suffix;

	@Value("${freemarker.freemarkerconfigurer.templateloaderpaths}")
	private String freemarkerconfigurer_templateloaderpaths;

	public String getFreemarkerviewresolver_suffix() {
		return freemarkerviewresolver_suffix;
	}

	public void setFreemarkerviewresolver_suffix(String freemarkerviewresolver_suffix) {
		this.freemarkerviewresolver_suffix = freemarkerviewresolver_suffix;
	}

	public String getFreemarkerconfigurer_templateloaderpaths() {
		return freemarkerconfigurer_templateloaderpaths;
	}

	public void setFreemarkerconfigurer_templateloaderpaths(String freemarkerconfigurer_templateloaderpaths) {
		this.freemarkerconfigurer_templateloaderpaths = freemarkerconfigurer_templateloaderpaths;
	}

	@Bean
	public FreeMarkerViewResolver viewResolver() {
		FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
		resolver.setCache(true);
		resolver.setPrefix("");
		resolver.setSuffix(freemarkerviewresolver_suffix);
		resolver.setContentType("text/html; charset=UTF-8");
		resolver.setRequestContextAttribute("request"); // 为模板调用时，调用request对象的变量名
		resolver.setViewClass(FreeMarkerView.class);
		resolver.setOrder(0);
		resolver.setExposeRequestAttributes(true);
		resolver.setExposeSessionAttributes(true);
		resolver.setExposeSpringMacroHelpers(true);

		return resolver;
	}

	@Bean
	public FreeMarkerConfigurer freemarkerConfig() throws IOException {
		FreeMarkerConfigurationFactory factory = new FreeMarkerConfigurationFactory();
		factory.setTemplateLoaderPaths(freemarkerconfigurer_templateloaderpaths);
		factory.setDefaultEncoding("UTF-8");
		FreeMarkerConfigurer result = new FreeMarkerConfigurer();
		freemarker.template.Configuration config = null;
		try {
			config = factory.createConfiguration();
			config.setSetting("template_update_delay", "1");
			config.setSetting("default_encoding", "UTF-8");
			config.setSetting("whitespace_stripping", "true");
			config.setSharedVariable("xml_escape", XmlEscape.class);
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		result.setConfiguration(config);
		return result;
	}
}
