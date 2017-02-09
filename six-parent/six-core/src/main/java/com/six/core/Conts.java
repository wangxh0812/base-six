package com.six.core;

import java.math.BigDecimal;

public final class Conts {
	public static final int MAXBUYPERC = 100;
	public static final BigDecimal LIMITBUYPERC = new BigDecimal("0.5");
	public static final int LENDPENALTY = 0;
	public static final BigDecimal WITHDRAWLRATE = new BigDecimal("0.003");
	public static final String UTF8 = "UTF-8";
	public static final String dateType = "yyyy-MM-dd";
	public static final String SESSION_USERID = "six.userId";
	public static final String SESSION_USERNAME = "six.userName";
	public static final String SESSION_REALNAME = "six.realName";
	public static final String SESSION_COMPANY = "six.companyId";
	public static final String SESSION_COMPANYCODE = "six.companyCode";
	public static final String SESSION_COMPANYNAME = "six.companyName";
	public static final String SESSION_USERTYPE = "six.userType";
	public static final String SESSION_ERRORCODE = "six.errorCode";
	public static final int ERROR_EUSER = 0;
	public static final int ERROR_EPASS = 1;
	public static final int ERROR_ECODE = 2;
	public static final String SEQ_NAME = "KSIDS";
	public static final short DEDUCT_STATUS_UNCHECK = 0;
	public static final short DEDUCT_STATUS_UNDO = 1;
	public static final short DEDUCT_STATUS_SUCC = 2;
	public static final short DEDUCT_STATUS_FAIL = 3;
	public static final short DEDUCT_STATUS_PART = 4;
	public static final short DEDUCT_STATUS_STOP = 5;
	public static final String Third_PAY_STATUS_DOING = "1";
	public static final String Third_PAY_STATUS_SUCC = "2";
	public static final String Third_PAY_STATUS_FAIL = "3";
	public static final String Third_PAY_STATUS_UNLOCK = "4";
	public static final String PLATFORM_ACC_STATUS_ACTIVE = "0";
	public static final String PLATFORM_ACC_STATUS_UNACTIVE = "1";
	public static final int LOANAMOUTLOWER_DEADLINE = 3;
	public static final String PAY_BILL_FLW_BUS_CODE_SPLIT = "_";
	public static final short ACC_C_ACTUAL_SUP = 1;
	public static final short ACC_C_ACTUAL_SUB = 0;
	public static final short ACC_C_TYPE_CASH = 0;
	public static final short ACC_C_TYPE_MANAGE = 1;
	public static final int MAX_FETCHSIZE = 50000;
	public static final short ENCASH_STATUS_UNFINISH = 0;
	public static final short ENCASH_STATUS_CHECKED = 1;
	public static final short ENCASH_STATUS_SUCCESS = 2;
	public static final short ENCASH_STATUS_FAIL = 3;
	public static final short ENCASH_STATUS_REFUSE = 4;
	public static final short ENCASH_STATUS_WAITING = 5;
	public static final short ENCASH_STATUS_RESULT_FAILED = 6;
	public static final short ENCASH_STATUS_APPLYWAIT = 7;
	public static final short ENCASH_STATUS_REVOCATION = 8;
	public static final short PAY_RECORD_FOLW_IN = 1;
	public static final short PAY_RECORD_FOLW_OUT = 2;
	public static final long HOLD_PERIOD = 1L;
	public static final BigDecimal PRINCIPAL_MIN = BigDecimal.valueOf(100L);
	public static final long S_PERIOD = 3L;
	public static final int S_DATE = 5;
}