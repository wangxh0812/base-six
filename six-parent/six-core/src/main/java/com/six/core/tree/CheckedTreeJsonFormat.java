package com.six.core.tree;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class CheckedTreeJsonFormat implements TreeFormat {
	protected final String jbegin = "{";
	protected final String jend = "}";
	protected final String jsbegin = "\"children\":[";
	protected final String jsend = "]";
	protected final String jsplit = ",";
	protected final String idstr = "\"id\":";
	protected final String textstr = "\"text\":";
	protected final String check = "\"checked\":true";
	protected final String nocheck = "\"checked\":false";
	protected final String leafstr = "\"leaf\":";

	protected Map<String, Integer> counstack = null;

	protected JcStack<Iterator<TreeNode>> treestack = null;

	protected Map<String, StringBuffer> treeBuffer = null;

	protected JcStack<TreeNode> loststack = null;

	protected Map<String, Boolean> had = null;

	public StringBuffer getLeafNode(TreeNode node) {
		StringBuffer jsonbf = new StringBuffer(50);
		jsonbf.append("{");
		jsonbf.append("\"id\":");
		jsonbf.append("\"" + node.getId() + "\"");
		jsonbf.append(",");
		jsonbf.append("\"text\":");
		jsonbf.append("\"" + node.getNodeValue() + "\"");
		jsonbf.append(",");
		if (node.isChecked())
			jsonbf.append("\"checked\":true");
		else {
			jsonbf.append("\"checked\":false");
		}
		jsonbf.append(",");
		jsonbf.append("\"leaf\":");
		jsonbf.append(node.getSize() == 0);
		jsonbf.append("}");
		return jsonbf;
	}

	public StringBuffer getCustomLeafNode(TreeNode node, String str) {
		StringBuffer jsonbf = new StringBuffer(50);
		jsonbf.append("{");
		jsonbf.append("\"id\":");
		jsonbf.append("\"" + node.getId() + "\"");
		jsonbf.append(",");
		jsonbf.append("\"text\":");
		jsonbf.append("\"" + node.getNodeValue() + "\"");
		jsonbf.append(",");
		jsonbf.append(str);
		jsonbf.append(",");
		if (node.isChecked())
			jsonbf.append("\"checked\":true");
		else {
			jsonbf.append("\"checked\":false");
		}
		jsonbf.append(",");
		jsonbf.append("\"leaf\":");
		jsonbf.append(node.getSize() == 0);
		jsonbf.append("}");
		return jsonbf;
	}

	public StringBuffer getBranchNode(TreeNode node, String nodeStr, String childs) {
		StringBuffer jsonbf = new StringBuffer();
		if ((childs == null) || (childs.equals(""))) {
			jsonbf = getLeafNode(node);
			return jsonbf;
		}
		if (nodeStr.indexOf("\"children\":[") > 0) {
			String tempchild = nodeStr.substring(nodeStr.indexOf("\"children\":[") + 12, nodeStr.lastIndexOf("]"));
			jsonbf.append("{");
			jsonbf.append("\"id\":");
			jsonbf.append("\"" + node.getId() + "\"");
			jsonbf.append(",");
			jsonbf.append("\"text\":");
			jsonbf.append("\"" + node.getNodeValue() + "\"");
			jsonbf.append(",");
			if (node.isChecked())
				jsonbf.append("\"checked\":true");
			else {
				jsonbf.append("\"checked\":false");
			}
			jsonbf.append(",");
			jsonbf.append("\"children\":[");
			jsonbf.append(tempchild);
			jsonbf.append(",");
			jsonbf.append(childs);
			jsonbf.append("]");
			jsonbf.append("}");
		} else {
			jsonbf.append("{");
			jsonbf.append("\"id\":");
			jsonbf.append("\"" + node.getId() + "\"");
			jsonbf.append(",");
			jsonbf.append("\"text\":");
			jsonbf.append("\"" + node.getNodeValue() + "\"");
			jsonbf.append(",");
			if (node.isChecked())
				jsonbf.append("\"checked\":true");
			else {
				jsonbf.append("\"checked\":false");
			}
			jsonbf.append(",");
			jsonbf.append("\"children\":[");
			jsonbf.append(childs);
			jsonbf.append("]");
			jsonbf.append("}");
		}
		return jsonbf;
	}

	public synchronized StringBuffer treeDataFormat(TreeNode treeNode, Map<String, TreeNode> treeMp) {
		if (treeMp.isEmpty())
			return new StringBuffer();
		this.treestack = new JcStack();
		this.counstack = new HashMap();
		this.loststack = new JcStack();
		this.treeBuffer = new HashMap();
		this.had = new HashMap();
		this.treestack.push(treeNode.iterator());
		this.loststack.push(treeNode);
		this.treeBuffer.put(treeNode.getId(), getLeafNode(treeNode));
		int i = 0;
		TreeNode pa = null;
		while (printhasNext()) {
			i++;
			Iterator it = (Iterator) this.treestack.peek();
			TreeNode next = (TreeNode) it.next();
			this.treeBuffer.put(next.getId(), getLeafNode(next));
			this.counstack.put(next.getId(), Integer.valueOf(next.getSize()));
			if (next.getSize() > 0) {
				this.treestack.push(next.iterator());
				this.loststack.push(next);
				i = 0;
			} else {
				Integer ii = (Integer) this.counstack.get(next.getParentId());
				if ((ii != null) && (i == ii.intValue())) {
					pa = (TreeNode) treeMp.get(next.getParentId());
					getParent(pa, pa.getList());
					i = 1;
				}
			}
		}

		getLost();
		StringBuffer rtn = (StringBuffer) this.treeBuffer.get(treeNode.getId());
		this.treestack = null;
		this.counstack = null;
		this.loststack = null;
		this.treeBuffer = null;
		this.had = null;
		return rtn == null ? new StringBuffer() : rtn;
	}

	protected void getParent(TreeNode parent, List<TreeNode> list) {
		StringBuffer temppaBuffer = null;
		StringBuffer paBuffer = null;
		this.had.put(parent.getId(), Boolean.TRUE);
		for (TreeNode tree : list) {
			temppaBuffer = (StringBuffer) this.treeBuffer.get(parent.getId());
			if (temppaBuffer != null) {
				if (this.treeBuffer.get(tree.getId()) != null) {
					paBuffer = getBranchNode(parent, temppaBuffer.toString(),
							((StringBuffer) this.treeBuffer.get(tree.getId())).toString());
					this.treeBuffer.put(parent.getId(), paBuffer);
				}
			}
		}
	}

	protected void getLost() {
		TreeNode lost = null;
		Boolean flag = null;
		while (!this.loststack.isEmpty()) {
			lost = (TreeNode) this.loststack.pop();
			flag = (Boolean) this.had.get(lost.getId());
			if (flag == null) {
				getParent(lost, lost.getList());
			}
		}
	}

	protected boolean printhasNext() {
		if (this.treestack.isEmpty()) {
			return false;
		}
		Iterator it = (Iterator) this.treestack.peek();
		if (it.hasNext()) {
			return true;
		}
		this.treestack.pop();
		return printhasNext();
	}

	public StringBuffer treeDataFormat(TreeNode treeNode, Map<String, TreeNode> treeMp, String condition, int type) {
		return new StringBuffer();
	}

	public StringBuffer getMenuLeafNode(TreeNode node) {
		return null;
	}
}