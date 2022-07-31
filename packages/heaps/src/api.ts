import type { Comparator, Predicate2 } from "@thi.ng/api";

export interface HeapOpts<T> {
	compare: Comparator<T>;
	equiv: Predicate2<T>;
}

export interface DHeapOpts<T> extends HeapOpts<T> {
	d: number;
}

export interface PriorityQueueOpts<T> {
	/**
	 * Comparator for priorities. Default: ascending order
	 */
	compare: Comparator<number>;
	/**
	 * Equality predicate for queued values. Default: thi.ng/equiv
	 */
	equiv: Predicate2<T>;
}
