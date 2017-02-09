package com.six.core.tree;

import java.util.LinkedList;

public class JcStack<E> {
	private LinkedList<E> stacklist = new LinkedList();

	public void push(E e) {
		this.stacklist.addFirst(e);
	}

	public E top() {
		return this.stacklist.getFirst();
	}

	public E pop() {
		return this.stacklist.removeFirst();
	}

	public E peek() {
		return this.stacklist.getFirst();
	}

	public int getSize() {
		return this.stacklist.size();
	}

	public boolean isEmpty() {
		return this.stacklist.size() == 0;
	}
}