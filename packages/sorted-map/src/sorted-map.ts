// SPDX-License-Identifier: Apache-2.0
import type { Comparator, Fn3, IObjectOf, Maybe, Pair } from "@thi.ng/api";
import { dissoc } from "@thi.ng/associative/dissoc";
import { __disposableEntries } from "@thi.ng/associative/internal/dispose";
import { __equivMap } from "@thi.ng/associative/internal/equiv";
import { __tostringMixin } from "@thi.ng/associative/internal/tostring";
import { into } from "@thi.ng/associative/into";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { compare } from "@thi.ng/compare/compare";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { Reduced, ReductionFn } from "@thi.ng/transducers";
import { isReduced } from "@thi.ng/transducers/reduced";
import type { SortedMapOpts } from "./api.js";

/** @internal */
class Node<K, V> {
	next: Maybe<Node<K, V>>;
	prev: Maybe<Node<K, V>>;
	up: Maybe<Node<K, V>>;
	down: Maybe<Node<K, V>>;

	constructor(public k?: K, public v?: V, public level = 0) {}
}

/**
 * Sorted map implementation based on Skip List data structure. Supports any
 * keys (other than `undefined`) which can be sorted via user-defined
 * comparator, given as ctor option.
 *
 * @remarks
 * v6.3.0 .set() & .delete() implementations rewritten, based on:
 *
 * - https://en.wikipedia.org/wiki/Skip_list
 * - https://www.youtube.com/watch?v=kBwUoWpeH_Q (MIT courseware)
 * - https://www.educba.com/skip-list-java/
 */
@__disposableEntries
@__tostringMixin
export class SortedMap<K, V> extends Map<K, V> {
	#head: Node<K, V>;
	#cmp: Comparator<K>;
	#p: number;
	#rnd: IRandom;
	#size: number;

	constructor(
		pairs?: Iterable<Pair<K, V>> | null,
		opts: Partial<SortedMapOpts<K>> = {}
	) {
		super();
		this.#head = new Node();
		this.#cmp = opts.compare || compare;
		this.#rnd = opts.rnd || SYSTEM;
		this.#p = opts.probability || 1 / Math.E;
		this.#size = 0;
		if (pairs) {
			this.into(pairs);
		}
	}

	get size(): number {
		return this.#size;
	}

	get [Symbol.species]() {
		return SortedMap;
	}

	get [Symbol.toStringTag]() {
		return "SortedMap";
	}

	*[Symbol.iterator](): MapIterator<Pair<K, V>> {
		let node: Maybe<Node<K, V>> = this.firstNode();
		while (node?.k !== undefined) {
			yield [node.k, node.v!];
			node = node.next;
		}
	}

	// mixin
	[Symbol.dispose]() {}

	/**
	 * Yields iterator of sorted `[key, value]` pairs, optionally taking given
	 * `key` and `max` flag into account.
	 *
	 * @remarks
	 * If `key` is given and `max=false`, the key is used as minimum search key
	 * and the iterator will only yield pairs for which keys are `>=` given key.
	 * If `max=true`, the given is used as maximum and only yields pairs for
	 * which keys are `<=` given key.
	 *
	 * If **no** key is given, yields **all** pairs.
	 *
	 * @param key
	 * @param max
	 */
	*entries(key?: K, max = false): MapIterator<Pair<K, V>> {
		if (key === undefined) {
			yield* this;
			return;
		}
		if (!this.#size) return;
		const cmp = this.#cmp;
		if (max) {
			let node: Maybe<Node<K, V>> = this.firstNode();
			while (node?.k !== undefined && cmp(node.k, key) <= 0) {
				yield [node.k!, node.v!];
				node = node.next;
			}
		} else {
			let node: Maybe<Node<K, V>> = this.firstNode();
			while (node.down) node = node!.down;
			while (node) {
				if (node.k !== undefined && cmp(node.k, key) >= 0) {
					yield [node.k!, node.v!];
				}
				node = node.next;
			}
		}
	}

	/**
	 * Similar to {@link SortedMap.entries}, but only yield sequence of keys.
	 *
	 * @param key
	 * @param max
	 */
	*keys(key?: K, max = false): MapIterator<K> {
		for (let p of this.entries(key, max)) {
			yield p[0];
		}
	}

	/**
	 * Similar to {@link SortedMap.entries}, but only yield sequence of values.
	 *
	 * @param key
	 * @param max
	 */
	*values(key?: K, max = false): MapIterator<V> {
		for (let p of this.entries(key, max)) {
			yield p[1];
		}
	}

	clear() {
		this.#head = new Node<K, V>();
		this.#size = 0;
	}

	empty(): SortedMap<K, V> {
		return new SortedMap<K, V>(null, this.opts());
	}

	copy(): SortedMap<K, V> {
		return new SortedMap<K, V>(this, this.opts());
	}

	compare(o: Map<K, V>) {
		const n = this.size;
		const m = o.size;
		if (n < m) return -1;
		if (n > m) return 1;
		const i = this.entries();
		const j = o.entries();
		let x: IteratorResult<Pair<K, V>>, y: IteratorResult<Pair<K, V>>;
		let c: number;
		while (((x = i.next()), (y = j.next()), !x.done && !y.done)) {
			if (
				(c = compare(x.value[0], y.value[0])) !== 0 ||
				(c = compare(x.value[1], y.value[1])) !== 0
			) {
				return c;
			}
		}
		return 0;
	}

	equiv(o: any) {
		return __equivMap(this, o);
	}

	first() {
		const node = this.firstNode();
		return node?.k !== undefined ? [node.k, node.v] : undefined;
	}

	get(key: K, notFound?: V): Maybe<V> {
		const node = this.findNode(key);
		return node.k !== undefined && this.#cmp(node.k, key) === 0
			? node.v
			: notFound;
	}

	has(key: K): boolean {
		const node = this.findNode(key);
		return node.k !== undefined && this.#cmp(node.k, key) === 0;
	}

	set(key: K, val: V) {
		let node: Maybe<Node<K, V>> = this.findNode(key);
		if (node.k !== undefined && this.#cmp(node.k, key) === 0) {
			node.v = val;
			while (node.down) {
				node = node!.down;
				node.v = val;
			}
			return this;
		}
		let newNode = new Node(key, val, node.level);
		this.insertInLane(node, newNode);
		let currLevel = node.level;
		let headLevel = this.#head.level;
		const rnd = this.#rnd;
		const p = this.#p;
		while (rnd.probability(p)) {
			// check if new head (at a new level) is needed
			if (currLevel >= headLevel) {
				const newHead = new Node<K, V>(
					undefined,
					undefined,
					headLevel + 1
				);
				this.linkLanes(newHead, this.#head);
				this.#head = newHead;
				headLevel++;
			}
			// find nearest predecessor with up link
			while (!node!.up) node = node!.prev;
			node = node!.up;
			// insert new link in express lane
			const tmp = new Node(key, val, node.level);
			this.insertInLane(node, tmp);
			// connect with new node at base level
			this.linkLanes(tmp, newNode);
			newNode = tmp;
			currLevel++;
		}
		this.#size++;
		return this;
	}

	delete(key: K) {
		let node: Maybe<Node<K, V>> = this.findNode(key);
		if (node.k === undefined || this.#cmp(node.k, key) !== 0) return false;
		// descent to lowest level
		while (node.down) node = node.down;
		let prev: Maybe<Node<K, V>>;
		let next: Maybe<Node<K, V>>;
		// ascend & remove node from all levels
		while (node) {
			prev = node.prev;
			next = node.next;
			if (prev) prev.next = next;
			if (next) next.prev = prev;
			node = node.up;
		}
		// patch up head
		while (!this.#head.next && this.#head.down) {
			this.#head = this.#head.down;
			this.#head.up = undefined;
		}
		this.#size--;
		return true;
	}

	into(pairs: Iterable<Pair<K, V>>) {
		return <this>into(this, pairs);
	}

	dissoc(keys: Iterable<K>) {
		return <this>dissoc(this, keys);
	}

	/**
	 * The key & value args given the callback `fn` MUST be treated as
	 * readonly/immutable. This could be enforced via TS, but would
	 * break ES6 Map interface contract.
	 *
	 * @param fn -
	 * @param thisArg -
	 */
	forEach(fn: Fn3<V, K, Map<K, V>, void>, thisArg?: any) {
		for (let p of this) {
			fn.call(thisArg, p[1], p[0], this);
		}
	}

	$reduce<R>(rfn: ReductionFn<Pair<K, V>, R>, acc: R | Reduced<R>) {
		let node: Maybe<Node<K, V>> = this.firstNode();
		while (node?.k !== undefined && !isReduced(acc)) {
			acc = rfn(acc, [node.k, node.v!]);
			node = node.next;
		}
		return acc;
	}

	opts(): SortedMapOpts<K> {
		return {
			compare: this.#cmp,
			probability: this.#p,
			rnd: this.#rnd,
		};
	}

	/**
	 * Inserts `b` as successor of `a` (in the same lane as `a`).
	 *
	 * @param a
	 * @param b
	 */
	protected insertInLane(a: Node<K, V>, b: Node<K, V>) {
		b.prev = a;
		b.next = a.next;
		if (a.next) a.next.prev = b;
		a.next = b;
	}

	/**
	 * Links lanes by connecting `a` and `b` vertically.
	 *
	 * @param a
	 * @param b
	 */
	protected linkLanes(a: Node<K, V>, b: Node<K, V>) {
		a.down = b;
		b.up = a;
	}

	/**
	 * Returns first node on lowest level. Unless the map is empty, this node
	 * will be the first data node (with the smallest key).
	 */
	protected firstNode() {
		let node: Maybe<Node<K, V>> = this.#head;
		while (node.down) node = node.down;
		while (node.prev) node = node.prev;
		if (node.next) node = node.next;
		return node;
	}

	/**
	 * Returns the first matching (or predecessor) node for given key (NOT
	 * necessarily at the lowest level).
	 *
	 * @param key
	 */
	protected findNode(key: K) {
		const cmp = this.#cmp;
		let node: Node<K, V> = this.#head;
		let next: Maybe<Node<K, V>>;
		let down: Maybe<Node<K, V>>;
		let nodeKey: Maybe<K>;
		while (true) {
			next = node.next;
			while (next && cmp(next.k!, key) <= 0) {
				node = next;
				next = node.next;
			}
			nodeKey = node.k;
			if (nodeKey !== undefined && cmp(nodeKey, key) === 0) break;
			down = node.down;
			if (!down) break;
			node = down;
		}
		return node;
	}
}

export function defSortedMap<K, V>(
	pairs?: Iterable<Pair<K, V>> | null,
	opts?: Partial<SortedMapOpts<K>>
): SortedMap<K, V>;
export function defSortedMap<V>(
	obj: IObjectOf<V>,
	opts?: Partial<SortedMapOpts<string>>
): SortedMap<string, V>;
export function defSortedMap<V>(
	src: any,
	opts?: Partial<SortedMapOpts<any>>
): SortedMap<any, V> {
	return isPlainObject(src)
		? new SortedMap<string, V>(Object.entries(src), opts)
		: new SortedMap(src, opts);
}
