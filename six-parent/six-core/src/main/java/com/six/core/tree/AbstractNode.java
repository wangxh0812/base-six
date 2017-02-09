package com.six.core.tree;

public abstract class AbstractNode implements TreeNode {
	protected String Id;
	protected String parentId;
	protected String nodeName;
	protected String nodeValue;
	protected boolean isChecked = false;
	protected String link;
	protected String tcode;
	protected String icon;
	protected int priority;

	public AbstractNode() {
	}

	public void setRoot() {
		this.Id = "kinjo";
		this.parentId = "";
		this.nodeName = "kinjo";
		this.nodeValue = "kinjo";
	}

	protected AbstractNode(TreeNode node) {
		this.Id = node.getId();
		this.parentId = node.getParentId();
		this.nodeName = node.getNodeName();
		this.nodeValue = node.getNodeValue();
		this.icon = node.getIcon();
		this.isChecked = node.isChecked();
	}

	public String getId() {
		return this.Id;
	}

	public void setId(String keyId) {
		this.Id = keyId;
	}

	public String getParentId() {
		return this.parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getNodeName() {
		return this.nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNodeValue() {
		return this.nodeValue;
	}

	public void setNodeValue(String nodeValue) {
		this.nodeValue = nodeValue;
	}

	public final boolean isChecked() {
		return this.isChecked;
	}

	public final void setChecked(boolean isChecked) {
		this.isChecked = isChecked;
	}

	public String getLink() {
		return this.link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getTcode() {
		return this.tcode;
	}

	public void setTcode(String tcode) {
		this.tcode = tcode;
	}

	public String getIcon() {
		return this.icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public int getPriority() {
		return this.priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}
}