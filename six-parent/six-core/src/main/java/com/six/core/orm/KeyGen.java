package com.six.core.orm;

import com.six.core.utils.UUIDUtil;

public class KeyGen {
	public static String randomSeqNum() {
		return UUIDUtil.randomUUID();
	}
}