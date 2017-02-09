package com.six.core.tree;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class TreeJsonFormat implements TreeFormat {
	private final String jbegin = "{";
	private final String jend = "}";
	private final String jsbegin = "\"children\":[";
	private final String jsend = "]";
	private final String jsplit = ",";
	private final String idstr = "\"id\":";
	private final String textstr = "\"text\":";
	private final String linkstr = "\"link\":";
	private final String iocnstr = "\"iconClass\":";
	private final String leafstr = "\"leaf\":";

	private Map<String, Integer> counstack = null;

	private JcStack<Iterator<TreeNode>> treestack = null;

	private Map<String, StringBuffer> treeBuffer = null;

	private JcStack<TreeNode> loststack = null;

	private Map<String, Boolean> had = null;

	public StringBuffer getLeafNode(TreeNode node) {
		StringBuffer jsonbf = new StringBuffer(50);
		jsonbf.append("{");
		jsonbf.append("\"id\":");
		jsonbf.append("\"" + node.getId() + "\"");
		jsonbf.append(",");
		jsonbf.append("\"text\":");
		jsonbf.append("\"" + node.getNodeValue() + "\"");
		jsonbf.append(",");
		jsonbf.append("\"link\":");
		jsonbf.append("\"" + node.getLink() + "\"");
		if ((node.getIcon() != null) && (!"".equals(node.getIcon()))) {
			jsonbf.append(",");
			jsonbf.append("\"iconClass\":");
			jsonbf.append("\"" + node.getIcon() + "\"");
		}
		jsonbf.append(",");
		jsonbf.append("\"leaf\":");
		jsonbf.append(node.getSize() == 0);
		jsonbf.append("}");
		return jsonbf;
	}

	public StringBuffer getMenuLeafNode(TreeNode node) {
		StringBuffer jsonbf = new StringBuffer(50);
		jsonbf.append("{");
		jsonbf.append("\"id\":");
		jsonbf.append("\"" + node.getId() + "\"");
		jsonbf.append(",");
		jsonbf.append("\"text\":");
		jsonbf.append("\"" + node.getNodeValue() + "\"");
		if (node.getLink() != null) {
			jsonbf.append(",");
			jsonbf.append("\"link\":");
			jsonbf.append("\"" + node.getLink() + "\"");
		}
		if ((node.getList() != null) && (node.getList().size() > 0)) {
			jsonbf.append(",");
			jsonbf.append("\"children\":[");
			for (int i = 0; i < node.getList().size(); i++) {
				jsonbf.append("{");
				jsonbf.append("\"id\":");
				jsonbf.append("\"" + ((TreeNode) node.getList().get(i)).getId() + "\"");
				jsonbf.append(",");
				jsonbf.append("\"text\":");
				jsonbf.append("\"" + ((TreeNode) node.getList().get(i)).getNodeValue() + "\"");
				jsonbf.append(",");
				jsonbf.append("\"link\":");
				jsonbf.append("\"" + ((TreeNode) node.getList().get(i)).getLink() + "\"");
				jsonbf.append("}");
				if (i != node.getList().size() - 1) {
					jsonbf.append(",");
				}
			}
			jsonbf.append("]");
		}
		jsonbf.append("}");
		return jsonbf;
	}

	public StringBuffer getBranchNode(TreeNode node, String nodeStr, String childs) {
		StringBuffer jsonbf = new StringBuffer();
		if (nodeStr.indexOf("\"children\":[") > 0) {
			String tempchild = nodeStr.substring(nodeStr.indexOf("\"children\":[") + 12, nodeStr.lastIndexOf("]"));
			jsonbf.append("{");
			jsonbf.append("\"id\":");
			jsonbf.append("\"" + node.getId() + "\"");
			jsonbf.append(",");
			jsonbf.append("\"text\":");
			jsonbf.append("\"" + node.getNodeValue() + "\"");
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

	private void getParent(TreeNode parent, List<TreeNode> list) {
		StringBuffer temppaBuffer = null;
		StringBuffer paBuffer = null;
		this.had.put(parent.getId(), Boolean.TRUE);
		for (TreeNode tree : list) {
			temppaBuffer = (StringBuffer) this.treeBuffer.get(parent.getId());
			if ((temppaBuffer != null) && (!temppaBuffer.toString().equals(""))) {
				if (this.treeBuffer.containsKey(tree.getId())) {
					paBuffer = getBranchNode(parent, temppaBuffer.toString(),
							((StringBuffer) this.treeBuffer.get(tree.getId())).toString());
					this.treeBuffer.put(parent.getId(), paBuffer);
				}
			}
		}
	}

	private void getLost() {
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

	private boolean printhasNext() {
		if (this.treestack.isEmpty()) {
			return Boolean.FALSE.booleanValue();
		}
		Iterator it = (Iterator) this.treestack.peek();
		if (it.hasNext()) {
			return Boolean.TRUE.booleanValue();
		}
		this.treestack.pop();
		return printhasNext();
	}

	public StringBuffer treeDataFormat(TreeNode treeNode, Map<String, TreeNode> treeMp, String condition, int type) {
		return null;
	}
}