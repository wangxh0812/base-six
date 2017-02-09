package com.six.core.config;

public class Combox {
	private String name;
	private String value;
	private int isDefault = 0;

	public final String getName() {
		return this.name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	public final String getValue() {
		return this.value;
	}

	public final void setValue(String value) {
		this.value = value;
	}

	public final int getIsDefault() {
		return this.isDefault;
	}

	public final void setIsDefault(int isDefault) {
		this.isDefault = isDefault;
	}
}