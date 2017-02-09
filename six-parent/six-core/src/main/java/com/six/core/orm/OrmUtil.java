package com.six.core.orm;

import org.apache.commons.lang3.StringUtils;

import com.six.core.logger.SimpleLogger;
import com.six.core.orm.page.Page;

public class OrmUtil {
	private static SimpleLogger logger = SimpleLogger.getLogger(OrmUtil.class);

	public static void formatPageSize(String pageNo, String limit, Page<?> page) {
		try {
			if (StringUtils.isNotBlank(pageNo)) {
				page.setPageNo(Integer.parseInt(pageNo));
			}
			if (StringUtils.isNotBlank(limit))
				page.setPageSize(Integer.parseInt(limit));
		} catch (NumberFormatException e) {
			logger.error("page format excption for " + page.getClass().getName());
		}
	}
}