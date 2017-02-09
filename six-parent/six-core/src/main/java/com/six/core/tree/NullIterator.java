package com.six.core.tree;

import java.util.Iterator;

public class NullIterator<E> implements Iterator<E> {
	public boolean hasNext() {
		return Boolean.FALSE.booleanValue();
	}

	public E next() {
		return null;
	}

	public void remove() {
		throw new UnsupportedOperationException("Can't remove obj");
	}
}