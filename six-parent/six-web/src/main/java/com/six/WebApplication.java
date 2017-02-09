package com.six;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.larva.framework.config.WebSpringSecurityConfig;

@Controller
@EnableAutoConfiguration
@SpringBootApplication
@Import(WebSpringSecurityConfig.class)
public class WebApplication {
	@RequestMapping("/")
	public String index() {
		return "index";
	}

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

}
