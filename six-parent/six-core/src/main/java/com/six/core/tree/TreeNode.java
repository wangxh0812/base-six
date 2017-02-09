package com.six.core.tree;

import java.util.Iterator;
import java.util.List;

public abstract interface TreeNode {
	public abstract void addNode(TreeNode paramTreeNode);

	public abstract Iterator<TreeNode> iterator();

	public abstract String getId();

	public abstract String getParentId();

	public abstract String getNodeName();

	public abstract String getNodeValue();

	public abstract String getLink();

	public abstract String getIcon();

	public abstract int getSize();

	public abstract int getPriority();

	public abstract void setRoot();

	public abstract boolean isChecked();

	public abstract void setChecked(boolean paramBoolean);

	public abstract void setNodeValue(String paramString);

	public abstract List<TreeNode> getList();

	public abstract void setList(List<TreeNode> paramList);
}