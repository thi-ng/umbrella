// SPDX-License-Identifier: Apache-2.0
import type { Fn0, Fn2, Maybe, Nullable, Pair } from "@thi.ng/api";

export interface MultiTrieOpts<V> {
	/**
	 * Custom value set factory (e.g. `Set` implementations from the
	 * [thi.ng/associative](https://thi.ng/associative) package). Uses native
	 * ES6 Set by default.
	 */
	values: Fn0<Set<V>>;
}

/**
 * Multi-Map-like trie implementation for array-based keys and supporting
 * multiple unique values per key.
 */
export class MultiTrie<K, V> {
	next: Map<K, MultiTrie<K, V>> = new Map();
	vals?: Set<V>;

	constructor(
		pairs?: Nullable<Iterable<Pair<K[], V>>>,
		protected opts?: Partial<MultiTrieOpts<V>>
	) {
		pairs && this.into(pairs);
	}

	[Symbol.iterator]() {
		return this.iterate((key, node) =>
			[...node.vals!].map((v) => <Pair<K, V>>[key, v])
		);
	}

	keys(prefix: K[] = [], includePrefix = true) {
		return this.iterate((key) => [key], prefix, includePrefix);
	}

	values(prefix?: K[]) {
		return this.iterate((_, node) => node.vals!, prefix);
	}

	entries(prefix?: K[], includePrefix = true) {
		return this.iterate(
			(key, node) => [...node.vals!].map((v) => <Pair<K, V>>[key, v]),
			prefix,
			includePrefix
		);
	}

	clear() {
		this.next.clear();
		this.vals = undefined;
	}

	has(key: K[]) {
		return !!this.get(key);
	}

	hasPrefix(prefix: K[]) {
		return !!this.find(prefix);
	}

	get(key: K[]): Maybe<Set<V>> {
		const node = this.find(key);
		return node ? node.vals : undefined;
	}

	find(key: K[]) {
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: Maybe<MultiTrie<K, V>> = this;
		for (let i = 0, n = key.length; i < n; i++) {
			node = node!.next.get(key[i]);
			if (!node) return;
		}
		return node;
	}

	/**
	 * Returns longest known prefix for `key` as array. If array is
	 * empty, the given key has no partial matches.
	 *
	 * @param key -
	 */
	knownPrefix(key: K[]) {
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: Maybe<MultiTrie<K, V>> = this;
		const prefix: K[] = [];
		for (let i = 0, n = key.length; i < n; i++) {
			const k = key[i];
			const next: Maybe<MultiTrie<K, V>> = node!.next.get(k);
			if (!next) break;
			prefix.push(k);
			node = next;
		}
		return prefix;
	}

	hasKnownPrefix(key: K[]) {
		return this.knownPrefix(key).length > 0;
	}

	add(key: K[], val: V) {
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: MultiTrie<K, V> = this;
		for (let i = 0, n = key.length; i < n; i++) {
			const k = key[i];
			const next = node.next.get(k);
			if (!next) {
				const newNode = new MultiTrie<K, V>(null, this.opts);
				node.next.set(k, newNode);
				node = newNode;
			} else {
				node = next;
			}
		}
		if (!node.vals) {
			node.vals = this.opts?.values?.() ?? new Set<V>();
		}
		node.vals.add(val);
	}

	into(pairs: Iterable<[K[], V]>) {
		for (let [k, v] of pairs) {
			this.add(k, v);
		}
	}

	delete(prefix: K[], val?: V) {
		const n = prefix.length;
		if (n < 1) return false;
		const path: MultiTrie<K, V>[] = [];
		const key: K[] = [];
		let i = 0;
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: Maybe<MultiTrie<K, V>> = this;
		for (; i < n; i++) {
			const k = prefix[i];
			key.push(k);
			path.push(node);
			node = node.next.get(k);
			if (!node) return false;
		}
		// if val is given, remove from set
		// and only collapse path if no other vals for key
		if (val !== undefined) {
			const vals = node.vals;
			if (vals?.has(val)) {
				vals.delete(val);
				if (vals.size > 0) return true;
			} else {
				return false;
			}
		}
		// collapse path
		while ((node = path[--i])) {
			node.next.delete(key[i]);
			if (node.next.size) break;
		}
		return true;
	}

	toJSON(): SerializedMultiTrie<V> {
		return {
			next: [...this.next].reduce(
				(acc, [k, v]) => ((acc[k] = v.toJSON()), acc),
				<any>{}
			),
			vals: this.vals ? [...this.vals] : undefined,
		};
	}

	protected *iterate<T>(
		fn: Fn2<K[], MultiTrie<K, V>, Iterable<T>>,
		prefix: K[] = [],
		includePrefix = true
	) {
		const root = this.find(prefix);
		if (!root) return;
		const queue: [K[], MultiTrie<K, V>][] = [
			[includePrefix ? prefix : [], root],
		];
		while (queue.length) {
			const [key, node] = queue.pop()!;
			if (node.vals) yield* fn(key, node);
			queue.push(
				...[...node.next].map(
					([k, v]) => <[K[], MultiTrie<any, any>]>[key.concat(k), v]
				)
			);
		}
	}
}

export const defMultiTrie = <K, V>(
	pairs?: Nullable<Iterable<Pair<K[], V>>>,
	opts?: Partial<MultiTrieOpts<V>>
) => new MultiTrie(pairs, opts);

export type SerializedMultiTrie<V> = {
	next: Record<string, SerializedMultiTrie<V>>;
	vals?: any[];
};

/**
 * Reconstruct a {@link MultiTrie} from serialized JSON.
 *
 * @param src
 * @param opts
 */
export const defMultiTrieFromJSON = <V>(
	src: SerializedMultiTrie<V>,
	opts?: Partial<MultiTrieOpts<V>>
) => {
	const res = defMultiTrie<string, V>(null, opts);
	const queue = <[string[], SerializedMultiTrie<V>][]>[[[], src]];
	while (queue.length) {
		const [key, node] = queue.pop()!;
		if (node.vals) {
			for (let v of node.vals) res.add(key, v);
		}
		for (let [k, child] of Object.entries(node.next)) {
			queue.push([[...key, k], child]);
		}
	}
	return res;
};
