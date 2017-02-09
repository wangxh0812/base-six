package com.six.core.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SimpleLogger {
	private Logger simpleLogger = null;

	public static SimpleLogger getLogger() {
		return SingletonHolder.instance;
	}

	public static SimpleLogger getLogger(Class<?> clazz) {
		return new SimpleLogger(clazz);
	}

	private SimpleLogger() {
		this.simpleLogger = null;
		this.simpleLogger = LoggerFactory.getLogger("app_logger");
	}

	private SimpleLogger(Class<?> clazz) {
		this.simpleLogger = LoggerFactory.getLogger(clazz);
	}

	public void error(String message) {
		this.simpleLogger.error(message);
	}

	public void error(String message, Throwable t) {
		this.simpleLogger.error(message, t);
	}

	public void error(String format, Object arg1, Object arg2) {
		this.simpleLogger.error(format, arg1, arg2);
	}

	public void error(String format, Object[] args) {
		this.simpleLogger.error(format, args);
	}

	public void debug(String message) {
		this.simpleLogger.debug(message);
	}

	public void debug(String message, Throwable t) {
		this.simpleLogger.debug(message, t);
	}

	public void warn(String message) {
		this.simpleLogger.warn(message);
	}

	public void warn(String message, Throwable t) {
		this.simpleLogger.warn(message, t);
	}

	public void info(String message) {
		this.simpleLogger.info(message);
	}

	public void info(String message, Throwable t) {
		this.simpleLogger.info(message, t);
	}

	public boolean isDebugEnabled() {
		return this.simpleLogger.isDebugEnabled();
	}

	static class SingletonHolder {
		static SimpleLogger instance = new SimpleLogger(null);
	}
}
