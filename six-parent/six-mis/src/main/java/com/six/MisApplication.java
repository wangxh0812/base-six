package com.six;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.larva.framework.config.MisSpringSecurityConfig;
import com.six.framework.config.Initialization;

@Controller
@EnableAutoConfiguration
@SpringBootApplication
@Import(MisSpringSecurityConfig.class)
public class MisApplication {
	@RequestMapping("/")
	public String index() {
		return "redirect:/login";
	}

	public static void main(String[] args) {
		SpringApplication.run(MisApplication.class, args);
		Initialization.initPara();
	}
}