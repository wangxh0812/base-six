package com.six.core.tree;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;

public class BreadthIterator implements Iterator<TreeNode> {
	private Queue<Iterator<TreeNode>> queue = new LinkedList();

	public BreadthIterator(Iterator<TreeNode> it) {
		this.queue.offer(it);
	}

	public boolean hasNext() {
		if (this.queue.isEmpty()) {
			return Boolean.FALSE.booleanValue();
		}
		Iterator it = (Iterator) this.queue.peek();
		if (it.hasNext()) {
			return Boolean.TRUE.booleanValue();
		}
		this.queue.poll();
		return hasNext();
	}

	public TreeNode next() {
		if (hasNext()) {
			Iterator it = (Iterator) this.queue.peek();
			TreeNode next = (TreeNode) it.next();
			if (next.getSize() > 0) {
				this.queue.offer(next.iterator());
			}
			return next;
		}
		return null;
	}

	public void remove() {
		throw new UnsupportedOperationException("Can't remove node :KinjoYang");
	}
}