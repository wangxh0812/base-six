package com.six.core.abstractclass;

import java.io.Serializable;
import java.util.Date;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.six.core.utils.PojoMapper;

public abstract class BasicModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8226600209943251352L;
	private String primaryKey;
	private String opUser;
	private Date createTime;
	private Date updateTime;
	private String isvalid;
	private String orderBy;

	public abstract void initPrimaryKey();

	public BasicModel() {
	}

	public BasicModel(String key) {
		this.primaryKey = key;
	}

	public String getOpUser() {
		return this.opUser;
	}

	public void setOpUser(String opUser) {
		this.opUser = opUser == null ? null : opUser.trim();
	}

	public String getPrimaryKey() {
		if (this.primaryKey == null) {
			this.primaryKey = "";
		}
		return this.primaryKey;
	}

	public void setPrimaryKey(String primaryKey) {
		this.primaryKey = primaryKey;
	}

	public String toJson() {
		return PojoMapper.toJson(this);
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public String getIsvalid() {
		return isvalid;
	}

	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid == null ? null : isvalid.trim();
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy == null ? null : orderBy.trim();
	}

}
