package com.six.core.tree;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public abstract class AbstractTreeOperate {
	protected Map<String, String> keyMap = new HashMap();

	protected Map<String, TreeNode> treeMp = null;

	protected JcTreeNode root = null;

	protected JcStack<TreeNode> stack = null;

	protected JcTreeNode addNode = null;

	private int count = 0;

	protected abstract void init();

	public abstract String getTreeData(String paramString);

	protected synchronized void constructTree() {
		this.root = new JcTreeNode();
		this.root.setRoot();
		changeNode();
	}

	public boolean moveTree(String nodeId, String parentId, String dtype) {
		return false;
	}

	protected void clear() {
		if (this.keyMap != null) {
			this.keyMap.clear();
		}
		if (this.treeMp != null) {
			this.treeMp.clear();
		}
		this.root = null;
		this.stack = null;
		this.addNode = null;
		this.count = 0;
	}

	protected void changeNode() {
		TreeNode branchNode = null;
		Iterator it = this.treeMp.keySet().iterator();
		while (it.hasNext()) {
			String key = (String) it.next();
			branchNode = (TreeNode) this.treeMp.get(key);
			if (!this.keyMap.containsKey(key)) {
				if (branchNode != null) {
					if (!isIterator(branchNode)) {
						this.count = 0;
						this.stack = new JcStack();
						isFound(branchNode);
						while (!this.stack.isEmpty()) {
							TreeNode itnode = (TreeNode) this.stack.pop();
							isIterator(itnode);
						}
					}
				}
			}
		}
	}

	protected void isFound(TreeNode child) {
		this.count += 1;
		if (child.getParentId().equals(this.root.getId())) {
			this.keyMap.put(child.getId(), null);
			this.root.addNode(child);
		} else if (!isIterator(child)) {
			this.stack.push(child);
			this.addNode = ((JcTreeNode) this.treeMp.get(child.getParentId()));
			if ((this.addNode != null) && (this.count < 1000))
				isFound(this.addNode);
		}
	}

	private boolean isIterator(TreeNode child) {
		for (Iterator itsub = new DepthIterator(this.root.iterator()); itsub.hasNext();) {
			TreeNode childone = (TreeNode) itsub.next();
			if (childone == null)
				return Boolean.FALSE.booleanValue();
			if (child.getParentId().equals(childone.getId())) {
				this.keyMap.put(child.getId(), null);
				childone.addNode(child);
				return Boolean.TRUE.booleanValue();
			}
		}
		return Boolean.FALSE.booleanValue();
	}
}