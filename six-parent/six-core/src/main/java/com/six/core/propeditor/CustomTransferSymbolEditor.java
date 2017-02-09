package com.six.core.propeditor;

import com.six.core.utils.CommonUtil;
import java.beans.PropertyEditorSupport;

public class CustomTransferSymbolEditor extends PropertyEditorSupport {
	public void setAsText(String text) {
		setValue(CommonUtil.replaceHtmlSymbols(text));
	}
}