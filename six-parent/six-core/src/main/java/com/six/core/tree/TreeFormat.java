package com.six.core.tree;

import java.util.Map;

public abstract interface TreeFormat {
	public abstract StringBuffer getBranchNode(TreeNode paramTreeNode, String paramString1, String paramString2);

	public abstract StringBuffer getLeafNode(TreeNode paramTreeNode);

	public abstract StringBuffer treeDataFormat(TreeNode paramTreeNode, Map<String, TreeNode> paramMap);

	public abstract StringBuffer treeDataFormat(TreeNode paramTreeNode, Map<String, TreeNode> paramMap,
			String paramString, int paramInt);

	public abstract StringBuffer getMenuLeafNode(TreeNode paramTreeNode);
}