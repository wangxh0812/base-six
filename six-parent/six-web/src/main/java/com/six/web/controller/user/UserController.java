package com.six.web.controller.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.six.common.enums.basic.ResponseCode;
import com.six.common.model.basic.ApiModel;
import com.six.common.model.basic.User;
import com.six.core.Conts;
import com.six.framework.controller.BasicController;

import io.swagger.annotations.ApiOperation;

@RestController
@Scope(value = "prototype")
@RequestMapping("/web/user")
public class UserController extends BasicController {
	
	@ApiOperation(value="获取用户列表", notes="")
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public ApiModel<User> dologin(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String userName = (String) session.getAttribute(Conts.SESSION_USERNAME);
		User user = new User();
		user.setUserName(userName);
		return new ApiModel<User>(user, ResponseCode.SUCCESS);
	}
}
