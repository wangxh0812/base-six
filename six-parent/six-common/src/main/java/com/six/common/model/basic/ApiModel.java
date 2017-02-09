package com.six.common.model.basic;

import com.six.common.enums.basic.ResponseCode;
import com.six.core.orm.KeyGen;

public class ApiModel<T> {

	private boolean success;
	private String responseCode;
	private String responseId;
	private long responseTime;
	private String msg;
	private T data;

	public ApiModel() {
		this.setSuccess(true);
		this.setResponseId(KeyGen.randomSeqNum());
		this.setResponseTime(System.currentTimeMillis());
	}

	public ApiModel(boolean success) {
		this.setSuccess(success);
		this.setResponseId(KeyGen.randomSeqNum());
		this.setResponseTime(System.currentTimeMillis());
	}
	
	public ApiModel(T model,ResponseCode responseCode) {
		this.setSuccess(Boolean.TRUE);
		this.setData(model);
		this.setResponseCode(responseCode.getValue());
		this.setMsg(responseCode.getName());
		this.setResponseId(KeyGen.randomSeqNum());
		this.setResponseTime(System.currentTimeMillis());
	}

	public ApiModel(String responseCode, String msg) {
		this.setSuccess(true);
		this.setResponseCode(responseCode);
		this.setMsg(msg);
		this.setResponseId(KeyGen.randomSeqNum());
		this.setResponseTime(System.currentTimeMillis());
	}
	
	public ApiModel(boolean success, String responseCode, String msg) {
		this.setSuccess(success);
		this.setResponseCode(responseCode);
		this.setMsg(msg);
		this.setResponseId(KeyGen.randomSeqNum());
		this.setResponseTime(System.currentTimeMillis());
	}

	public ApiModel(boolean isSuccess, T model, String responseCode, String msg) {
		this.setSuccess(isSuccess);
		this.setData(model);
		this.setResponseCode(responseCode);
		this.setMsg(msg);
		this.setResponseId(KeyGen.randomSeqNum());
		this.setResponseTime(System.currentTimeMillis());
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public String getResponseId() {
		return responseId;
	}

	public void setResponseId(String responseId) {
		this.responseId = responseId;
	}

	public long getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(long responseTime) {
		this.responseTime = responseTime;
	}
	
	
}
