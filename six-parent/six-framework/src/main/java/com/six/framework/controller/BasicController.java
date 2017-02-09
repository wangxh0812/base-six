package com.six.framework.controller;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import com.six.core.Conts;
import com.six.core.abstractclass.AbstractController;
import com.six.core.orm.page.Page;
import com.six.core.propeditor.CustomTransferSymbolEditor;
import com.six.core.propeditor.TimestampEditor;

public class BasicController extends AbstractController {

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		dateFormat.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
		binder.registerCustomEditor(String.class, new CustomTransferSymbolEditor());
		binder.registerCustomEditor(Timestamp.class, new TimestampEditor());
	}

	protected void getSessionData(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session == null)
			return;
		try {
			this.lock.lock();
			this.userId = (session.getAttribute(Conts.SESSION_USERID) == null ? null
					: String.valueOf(session.getAttribute(Conts.SESSION_USERID)));
			this.userName = (session.getAttribute(Conts.SESSION_USERNAME) == null ? null
					: String.valueOf(session.getAttribute(Conts.SESSION_USERNAME)));
			this.realName = (session.getAttribute(Conts.SESSION_REALNAME) == null ? null
					: String.valueOf(session.getAttribute(Conts.SESSION_REALNAME)));
			this.companyId = (session.getAttribute(Conts.SESSION_COMPANY) == null ? null
					: String.valueOf(session.getAttribute(Conts.SESSION_COMPANY)));
			this.companyCode = (session.getAttribute(Conts.SESSION_COMPANYCODE) == null ? null
					: String.valueOf(session.getAttribute(Conts.SESSION_COMPANYCODE)));
			this.userType = (session.getAttribute(Conts.SESSION_USERTYPE) == null ? null
					: String.valueOf(session.getAttribute(Conts.SESSION_USERTYPE)));
		} finally {
			this.lock.unlock();
		}
	}

	protected void removeSession(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session == null) {
			return;
		}
		if (session.isNew())
			return;
		try {
			request.getSession().removeAttribute(Conts.SESSION_USERID);
			request.getSession().removeAttribute(Conts.SESSION_USERNAME);
			request.getSession().removeAttribute(Conts.SESSION_REALNAME);
			request.getSession().removeAttribute(Conts.SESSION_COMPANY);
			request.getSession().removeAttribute(Conts.SESSION_COMPANYCODE);
			request.getSession().removeAttribute(Conts.SESSION_ERRORCODE);
		} catch (IllegalStateException e) {
			this.logger.error("remove session attribute IllegalStateException:", e);
		}
	}

	protected String getIpAddr(HttpServletRequest request) {
		String ip = null;
		String ips = request.getHeader("X-Forwarded-For");

		if (ips == null || ips.length() == 0) {
			ip = request.getHeader("X-Real-IP");
		} else {
			String[] ipl = ips.split(",");
			ip = ipl[0];
			// for (String str : ipl) {
			// logger.info(str);
			// }
		}
		if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if ((ip == null) || (ip.length() == 0) || ("unknown".equalsIgnoreCase(ip))) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	protected void setPage(HttpServletRequest request, Page<?> page) {
		String pageNo = request.getParameter("page");
		String pageSize = request.getParameter("limit");
		try {
			if (StringUtils.isNotBlank(pageNo))
				page.setPageNo(Integer.parseInt(pageNo));
			if (StringUtils.isNotBlank(pageSize))
				page.setPageSize(Integer.parseInt(pageSize));
		} catch (NumberFormatException e) {
			this.logger.error("setPage NumberFormatException:", e);
		}
	}

	protected void formatPageSize(String pageNo, String limit, Page<?> page) {
		try {
			if (StringUtils.isNotBlank(pageNo)) {
				page.setPageNo(Integer.parseInt(pageNo));
			}
			if (StringUtils.isNotBlank(limit))
				page.setPageSize(Integer.parseInt(limit));
		} catch (NumberFormatException e) {
			this.logger.error("page format excption for " + page.getClass().getName());
		}
	}

	protected String getSessionAttributes(HttpServletRequest request, String name) {
		HttpSession session = request.getSession(false);
		if (session == null)
			return null;
		return session.getAttribute(name) == null ? null : session.getAttribute(name).toString();
	}

	protected void removeSessionAttributes(HttpServletRequest request, String name) {
		HttpSession session = request.getSession(false);
		if (session == null)
			return;
		session.removeAttribute(name);
	}

	protected String getHeader(HttpServletRequest request, String headName) {
		Enumeration<String> enums = request.getHeaderNames();
		String headValue = "";
		while (enums.hasMoreElements()) {
			String key = (String) enums.nextElement();
			String value = request.getHeader(key);
			if (headName.equals(key)) {
				headValue = value;
				break;
			} else {
				continue;
			}
		}
		return headValue;
	}
}
