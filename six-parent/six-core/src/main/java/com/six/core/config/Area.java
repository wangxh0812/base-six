package com.six.core.config;

public class Area {
	private String areaCode;
	private String areaName;
	private String parentCode;
	private int sortValue = 0;

	public String getAreaCode() {
		return this.areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getAreaName() {
		return this.areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getParentCode() {
		return this.parentCode;
	}

	public void setParentCode(String parentCode) {
		this.parentCode = parentCode;
	}

	public int getSortValue() {
		if ((this.areaCode != null) && ("".equals(this.areaCode)))
			this.sortValue = Integer.parseInt(this.areaCode);
		return this.sortValue;
	}

	public void setSortValue(int sortValue) {
		this.sortValue = sortValue;
	}
}