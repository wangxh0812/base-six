package com.six.core.exception;

public abstract class NestedExceptionUtil {
	public static String buildMessage(String message, Throwable cause) {
		if (cause != null) {
			StringBuffer buf = new StringBuffer();
			if (message != null) {
				buf.append(message).append(";");
			}
			buf.append("Exception is:").append(cause);
			return buf.toString();
		}
		return message;
	}

	public static String buildMessage(String message, int type, Throwable cause) {
		if (cause != null) {
			StringBuffer buf = new StringBuffer();
			if (message != null)
				buf.append(message).append(",");
			try {
				switch (type) {
				case -1:
					buf.append("APPNestedException.");
				case 0:
					buf.append("APPSQLException,SQL is: " + ((DataBaseAccessException) cause).getSql());
				case 2:
					buf.append("APPClassCastException.");
				case 1:
					buf.append("APPIndexOutOfBandsException.");
				case 3:
					buf.append("APPNoClassDefFoundException.");
				case 4:
					buf.append("APPSeccurityException.");
				case 5:
					buf.append("APPNullPointerException.");
				case 6:
					buf.append("APPNestedMongoDbException.");
				case 7:
					buf.append("APPNestedBusinessException,business info is: "
							+ ((NestedBusinessException) cause).getBusinessMessage());
				}
				buf.append("APPNestedException");
			} catch (Exception e) {
				buf.append("APPNestedRuntimeException.");
			}

			buf.append(" caused by :").append(cause.getMessage());
			return buf.toString();
		}
		return message;
	}
}