package com.six.core.tree;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class JcTreeNode extends AbstractNode {
	private List<TreeNode> childs = new ArrayList();

	public JcTreeNode() {
	}

	public void serRoot() {
		super.setRoot();
	}

	public JcTreeNode(TreeNode node) {
		super(node);
	}

	public void addNode(TreeNode node) {
		this.childs.add(node);
	}

	public Iterator<TreeNode> iterator() {
		return this.childs.iterator();
	}

	public int getSize() {
		return this.childs.size();
	}

	public List<TreeNode> getList() {
		return this.childs;
	}

	public List<TreeNode> getChilds() {
		return this.childs;
	}

	public void setChilds(List<TreeNode> childs) {
		childs = null;
		this.childs = childs;
	}

	public void setList(List<TreeNode> list) {
		this.childs = null;
		this.childs = list;
	}
}