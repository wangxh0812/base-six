package com.six.common.enums.basic;

public enum ResponseCode {
	SUCCESS("000000", "成功"), 
	FAILED("999999", "失败"), 
	FAILEDMSG("999998", ""),

	ERROR_DATAREAD("900001", "传入数据错误"), 
	ERROR_SAVE("900002", "保存失败"), 
	ERROR_DELETE_("900003","删除失败"), 
	ERROR_UPDATE("900004", "更新失败"),
 
	ERROR_USER_USERPASSWORD("100001", "用户名或密码错误"), 
	ERROR_USER_INVALID_SESSION("100002","用户未登录或超时"), 
	ERROR_USER_VERTIFYCODE("100003", "图形验证码错误")
	;

	private String value;
	private String name;

	private ResponseCode(String value, String name) {
		this.value = value;
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public static String getValueByName(String name) {
		for (ResponseCode rc : ResponseCode.values()) {
			if (rc.getName().equals(name))
				return rc.getValue();
		}
		return "";
	}

	public static String getNameByValue(String value) {
		for (ResponseCode rc : ResponseCode.values()) {
			if (rc.getValue().equals(value))
				return rc.getName();
		}
		return "";
	}

}
