import type {
	IClear,
	ICopy,
	IEmpty,
	IInto,
	ILength,
	Pair,
	Predicate,
	Predicate2,
} from "@thi.ng/api";
import { compareNumDesc } from "@thi.ng/compare/numeric";
import { equiv } from "@thi.ng/equiv";
import type { PriorityQueueOpts } from "./api.js";
import { Heap } from "./heap.js";

/**
 * Returns a new {@link PriorityQueue} instance, a thin veneer wrapper for a
 * backing {@link Heap} and exposing a PQ-like API for arbitrary values, with
 * configurable value equality handling and priority ordering.
 *
 * @remarks
 * - By default higher priority values mean higher priority.
 * - Already queued items can be reprioritized or removed.
 * - The queue head can be inspected via `peek()` and/or `peekPriority()`
 *   without removing it from the queue.
 * - Multiple items can be added at once via `into()`
 * - The queue is iterable (in priority order, according to given comparator)
 */
export const defPriorityQueue = <T>(
	values?: Iterable<Pair<number, T>> | null,
	opts?: Partial<PriorityQueueOpts<T>>
) => new PriorityQueue(values, opts);

export class PriorityQueue<T>
	implements
		Iterable<Pair<number, T>>,
		IClear,
		ICopy<PriorityQueue<T>>,
		IEmpty<PriorityQueue<T>>,
		IInto<Pair<number, T>, PriorityQueue<T>>,
		ILength
{
	heap: Heap<Pair<number, T>>;
	equiv: Predicate2<T>;

	constructor(
		values?: Iterable<Pair<number, T>> | null,
		protected opts: Partial<PriorityQueueOpts<T>> = {}
	) {
		const compare = opts.compare || compareNumDesc;
		this.heap = new Heap<Pair<number, T>>(null, {
			compare: (a, b) => compare(a[0], b[0]),
		});
		this.equiv = opts.equiv || equiv;
		values && this.into(values);
	}

	get length() {
		return this.heap.length;
	}

	*[Symbol.iterator]() {
		yield* this.heap;
	}

	clear() {
		this.heap.clear();
	}

	copy() {
		return new PriorityQueue<T>(this.heap, this.opts);
	}

	empty() {
		return new PriorityQueue<T>(null, this.opts);
	}

	push(val: T, priority: number) {
		this.heap.push([priority, val]);
		return this;
	}

	pushPop(val: T, priority: number) {
		return this.heap.pushPop([priority, val]);
	}

	pop() {
		const res = this.heap.pop();
		return res ? res[1] : undefined;
	}

	peek() {
		const res = this.heap.peek();
		return res ? res[1] : undefined;
	}

	peekPriority() {
		const res = this.heap.peek();
		return res ? res[0] : undefined;
	}

	remove(val: T) {
		const item = this.find(val);
		return item ? this.heap.remove(item) : false;
	}

	find(val: T) {
		return this.heap.findWith((x) => this.equiv(x[1], val));
	}

	findWith(fn: Predicate<Pair<number, T>>) {
		return this.heap.findWith(fn);
	}

	has(val: T) {
		return !!this.find(val);
	}

	into(values: Iterable<Pair<number, T>>) {
		this.heap.into(values);
		return this;
	}

	reprioritize(val: T, priority: number) {
		const { heap, equiv } = this;
		const item = heap.findWith((x) => equiv(x[1], val));
		if (item) {
			item[0] = priority;
			heap.heapify();
			return true;
		}
		return false;
	}
}
