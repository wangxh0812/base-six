package com.six.web.controller.basic;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.six.common.enums.basic.ResponseCode;
import com.six.common.model.basic.ApiModel;
import com.six.core.Conts;
import com.six.framework.controller.BasicController;

@Controller
@Scope(value = "prototype")
public class UserLoginController extends BasicController {
	
	@RequestMapping("/dologin")
	@ResponseBody
	public ApiModel dologin(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String userName = (String) session.getAttribute("userName");
		//to do update user login info
		logger.info("sessiontimeout:"+request.getSession().getMaxInactiveInterval());
		return new ApiModel();
	}

	@RequestMapping("/loginFail")
	@ResponseBody
	public ApiModel loginFail(HttpServletRequest request) {
		logger.info("===loginFail===");
		ResponseCode rc = ResponseCode.ERROR_USER_USERPASSWORD;

		HttpSession session = request.getSession(false);
		int ecode = 0;
		if (session != null) {
			String errorCode = session.getAttribute(Conts.SESSION_ERRORCODE) == null ? null
					: String.valueOf(session.getAttribute(Conts.SESSION_ERRORCODE));
			if (StringUtils.isNotBlank(errorCode)) {
				removeSessionAttributes(request, Conts.SESSION_ERRORCODE);
				ecode = Integer.valueOf(errorCode).intValue();
			}
		}
		switch (ecode) {
		case 1:
			rc = ResponseCode.ERROR_USER_VERTIFYCODE;
			break;
		}
		return new ApiModel(Boolean.FALSE, rc.getValue(), rc.getName());
	}

	@RequestMapping("/expired")
	@ResponseBody
	public ApiModel expired(HttpServletRequest request) {
		ResponseCode rc = ResponseCode.ERROR_USER_INVALID_SESSION;
		logger.info("session-timeout");
		return new ApiModel(Boolean.FALSE, rc.getValue(), rc.getName());
	}

	@RequestMapping("/dologout")
	@ResponseBody
	public ApiModel dologout(HttpServletRequest request) {
		ResponseCode rc = ResponseCode.SUCCESS;
		this.removeSession(request);
		return new ApiModel(Boolean.TRUE, rc.getValue(), rc.getName());
	}

	@RequestMapping("/login")
	public String login(Model model, HttpServletRequest request) {
		return "redirect:/p/pages/login.html";
	}
	
	@RequestMapping("/home")
	public String home(Model model, HttpServletRequest request) {
		logger.info("===home===");
		model.addAttribute("resultMsg", "hello home");
		return "home";
	}

}
