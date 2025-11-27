// SPDX-License-Identifier: Apache-2.0
import type { Fn2, IObjectOf, Maybe, Pair } from "@thi.ng/api";

export class TrieMap<T> {
	next: IObjectOf<TrieMap<T>> = {};
	val?: T;

	protected n = 0;

	constructor(pairs?: Iterable<Pair<string, T>>) {
		pairs && this.into(pairs);
	}

	[Symbol.iterator]() {
		return this.iterate((key, node) => <Pair<string, T>>[key, node.val]);
	}

	keys(prefix?: string, includePrefix = true) {
		return this.iterate((key) => key, prefix, includePrefix);
	}

	values(prefix?: string) {
		return this.iterate((_, node) => node.val!, prefix);
	}

	entries(prefix?: string, includePrefix = true) {
		return this.iterate(
			(key, node) => <Pair<string, T>>[key, node.val],
			prefix,
			includePrefix
		);
	}

	clear() {
		this.next = {};
		this.n = 0;
		this.val = undefined;
	}

	has(key: string) {
		return this.get(key) !== undefined;
	}

	hasPrefix(prefix: string) {
		return !!this.find(prefix);
	}

	get(key: string, notFound?: T): Maybe<T> {
		const node = this.find(key);
		return node ? node.val : notFound;
	}

	find(key: string) {
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: Maybe<TrieMap<T>> = this;
		for (let i = 0, n = key.length; i < n; i++) {
			node = node!.next[key[i]];
			if (!node) return;
		}
		return node;
	}

	/**
	 * Returns longest known prefix for `key`. Returns undefined if given key
	 * has no partial matches.
	 *
	 * @param key -
	 */
	knownPrefix(key: string) {
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: Maybe<TrieMap<T>> = this;
		let prefix: string = "";
		for (let i = 0, n = key.length; i < n; i++) {
			const k = key[i];
			const next: Maybe<TrieMap<T>> = node!.next[k];
			if (!next) break;
			prefix += k;
			node = next;
		}
		return prefix || undefined;
	}

	hasKnownPrefix(key: string) {
		return !!this.knownPrefix(key);
	}

	set(key: string, val: T) {
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: TrieMap<T> = this;
		for (let i = 0, n = key.length; i < n; i++) {
			const k = key[i];
			const next = node.next[k];
			node = !next ? (node.n++, (node.next[k] = new TrieMap<T>())) : next;
		}
		node.val = val;
	}

	into(pairs: Iterable<Pair<string, T>>) {
		for (const [k, v] of pairs) {
			this.set(k, v);
		}
	}

	delete(prefix: string) {
		const n = prefix.length;
		if (n < 1) return false;
		const path: TrieMap<T>[] = [];
		const key: string[] = [];
		let i = 0;
		// eslint-disable-next-line no-this-alias -- tree traversal
		let node: Maybe<TrieMap<T>> = this;
		for (; i < n; i++) {
			const k = prefix[i];
			key.push(k);
			path.push(node);
			node = node.next[k];
			if (!node) return false;
		}
		while ((node = path[--i])) {
			delete node.next[key[i]];
			if (--node.n) break;
		}
		return true;
	}

	protected *iterate<V>(
		fn: Fn2<string, TrieMap<T>, V>,
		prefix = "",
		includePrefix = true
	) {
		const root = this.find(prefix);
		if (!root) return;
		const queue: Pair<string, TrieMap<T>>[] = [
			[includePrefix ? prefix : "", root],
		];
		while (queue.length) {
			const [key, node] = queue.pop()!;
			if (node.val !== undefined) yield fn(key, node);
			queue.push(
				...Object.entries(node.next).map(
					([k, v]) => <Pair<string, TrieMap<T>>>[key + k, v]
				)
			);
		}
	}
}

export const defTrieMap = <T>(pairs?: Iterable<Pair<string, T>>) =>
	new TrieMap(pairs);

export type SerializedTrieMap<T> = {
	next: IObjectOf<SerializedTrieMap<T>>;
	val?: T;
};

/**
 * Reconstruct a {@link MultiTrie} from serialized JSON.
 *
 * @param src
 * @param opts
 */
export const defTrieMapFromJSON = <V>(src: SerializedTrieMap<V>) => {
	const res = defTrieMap<V>();
	const queue = <[string, SerializedTrieMap<V>][]>[["", src]];
	while (queue.length) {
		const [key, node] = queue.pop()!;
		if (node.val) res.set(key, node.val);
		for (const [k, child] of Object.entries(node.next)) {
			queue.push([key + k, child]);
		}
	}
	return res;
};
