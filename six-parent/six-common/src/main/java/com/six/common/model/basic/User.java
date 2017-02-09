package com.six.common.model.basic;

import com.six.core.abstractclass.BasicModel;
import com.six.core.orm.KeyGen;

public class User extends BasicModel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2845517590843101041L;
	private String userId;
	private String userName;
	private String password;
	private String role;
	private String companyId;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	@Override
	public void initPrimaryKey() {
		this.setUserId(KeyGen.randomSeqNum());
	}

}
