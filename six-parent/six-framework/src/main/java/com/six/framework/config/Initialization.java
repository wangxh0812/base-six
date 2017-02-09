package com.six.framework.config;

import com.six.core.logger.SimpleLogger;
import com.six.core.service.LabelManager;

public class Initialization {
	private static final SimpleLogger logger = SimpleLogger.getLogger(Initialization.class);
	// 系统信息初始化
	public static void initPara() {
		long begin = System.currentTimeMillis();
		logger.info("server initialized begin......");
		LabelManager.init();
		long end = System.currentTimeMillis();
		logger.info("server initialized processed in" + (begin - end) + " ms.....");
	}
}
