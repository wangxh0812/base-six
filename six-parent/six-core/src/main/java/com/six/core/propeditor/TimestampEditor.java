package com.six.core.propeditor;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;

import org.apache.commons.lang3.StringUtils;

public class TimestampEditor extends PropertyEditorSupport {
	public void setAsText(String text) {
		if (StringUtils.isNotBlank(text))
			setValue(Timestamp.valueOf(text));
	}
}