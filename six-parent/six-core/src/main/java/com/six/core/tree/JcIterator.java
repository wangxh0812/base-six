package com.six.core.tree;

import java.util.Iterator;

public class JcIterator implements Iterator<TreeNode> {
	private JcStack<TreeNode> jcIterator = new JcStack();

	public JcIterator(Iterator<TreeNode> ittree) {
		while (ittree.hasNext())
			this.jcIterator.push((TreeNode) ittree.next());
	}

	public boolean hasNext() {
		if (this.jcIterator.isEmpty()) {
			return Boolean.FALSE.booleanValue();
		}
		return Boolean.TRUE.booleanValue();
	}

	public TreeNode find() {
		return (TreeNode) this.jcIterator.peek();
	}

	public TreeNode next() {
		return (TreeNode) this.jcIterator.pop();
	}

	public void remove() {
		throw new UnsupportedOperationException("Can't remove obj:Kinjo");
	}
}