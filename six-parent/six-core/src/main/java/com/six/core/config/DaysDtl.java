package com.six.core.config;

import java.util.Date;

public class DaysDtl {
	private String name;
	private Date dayValue;
	private boolean isWork;

	public final String getName() {
		return this.name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	public final Date getDayValue() {
		return this.dayValue;
	}

	public final void setDayValue(Date dayValue) {
		this.dayValue = dayValue;
	}

	public final boolean isWork() {
		return this.isWork;
	}

	public final void setWork(boolean isWork) {
		this.isWork = isWork;
	}
}