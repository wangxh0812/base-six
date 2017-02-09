package com.six.core.abstractclass;

import java.util.Date;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import com.six.core.logger.SimpleLogger;

public abstract class AbstractController {
	protected String userId;
	protected String userName;
	protected String realName;
	protected String userEmail;
	protected String userMobile;
	protected String userType;
	protected String loginIp;
	protected Date loginTime;
	protected String companyId;
	protected String companyCode;
	protected String isApprove;
	protected int errorCode;
	protected final Lock lock = new ReentrantLock();
	protected SimpleLogger logger = SimpleLogger.getLogger(this.getClass());
}
