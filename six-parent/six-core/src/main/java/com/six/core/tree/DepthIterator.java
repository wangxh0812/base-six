package com.six.core.tree;

import java.util.Iterator;

public class DepthIterator implements Iterator<TreeNode> {
	private JcStack<Iterator<TreeNode>> stack = new JcStack();

	public DepthIterator(Iterator<TreeNode> it) {
		this.stack.push(it);
	}

	public DepthIterator() {
	}

	public boolean hasNext() {
		if (this.stack.isEmpty()) {
			return Boolean.FALSE.booleanValue();
		}
		Iterator it = (Iterator) this.stack.peek();
		if (it.hasNext()) {
			return Boolean.TRUE.booleanValue();
		}
		this.stack.pop();
		return hasNext();
	}

	public TreeNode next() {
		if (hasNext()) {
			Iterator it = (Iterator) this.stack.peek();
			TreeNode next = (TreeNode) it.next();
			if (next.getSize() > 0) {
				this.stack.push(next.iterator());
			}
			return next;
		}
		return null;
	}

	public void remove() {
		throw new UnsupportedOperationException("Can't remove node :KinjoYang");
	}
}