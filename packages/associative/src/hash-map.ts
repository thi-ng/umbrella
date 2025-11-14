// SPDX-License-Identifier: Apache-2.0
import type {
	Fn,
	Fn3,
	ICopy,
	IEmpty,
	IEquiv,
	IObjectOf,
	Maybe,
	Pair,
	Predicate2,
} from "@thi.ng/api";
import { ceilPow2 } from "@thi.ng/binary/pow";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { equiv } from "@thi.ng/equiv";
import { map } from "@thi.ng/transducers/map";
import type { HashMapOpts } from "./api.js";
import { dissoc } from "./dissoc.js";
import { __disposableEntries } from "./internal/dispose.js";
import { __equivMap } from "./internal/equiv.js";
import { __tostringMixin } from "./internal/tostring.js";
import { into } from "./into.js";

const DEFAULT_CAP = 16;
const DEFAULT_LOAD = 0.75;

/**
 * Configurable hash map implementation w/ ES6 Map API. Uses open
 * addressing / linear probing to resolve key collisions. Supports any
 * key types via mandatory user supplied hash function.
 *
 * See {@link HashMapOpts} for further configuration & behavior details.
 *
 * @example
 * ```ts tangle:../export/hash-map.ts
 * import { HashMap } from "@thi.ng/associative";
 * import { hash } from "@thi.ng/vectors";
 *
 * const m = new HashMap([], { hash })
 * m.set([1, 2], "a");
 * m.set([3, 4], "b");
 * m.set([1, 2], "c");
 *
 * console.log("%s", m);
 * // HashMap { [ 1, 2 ] => 'c', [ 3, 4 ] => 'b' }
 * ```
 *
 */
@__disposableEntries
@__tostringMixin
export class HashMap<K, V>
	extends Map<K, V>
	implements
		Iterable<Pair<K, V>>,
		ICopy<HashMap<K, V>>,
		IEmpty<HashMap<K, V>>,
		IEquiv
{
	#hash: Fn<K, number>;
	#equiv: Predicate2<K>;
	#load: number;
	#bins: Pair<K, V>[];
	#mask: number;
	#size: number;

	constructor(pairs: Iterable<Pair<K, V>> | null, opts: HashMapOpts<K>) {
		super();
		const m = ceilPow2(Math.min(opts.cap || DEFAULT_CAP, 4)) - 1;
		this.#hash = opts.hash;
		this.#equiv = opts.equiv || equiv;
		this.#load = opts.load || DEFAULT_LOAD;
		this.#mask = m;
		this.#bins = new Array(m + 1);
		this.#size = 0;
		if (pairs) {
			this.into(pairs);
		}
	}

	get [Symbol.species]() {
		return HashMap;
	}

	get [Symbol.toStringTag]() {
		return "HashMap";
	}

	get size(): number {
		return this.#size;
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	// mixin
	[Symbol.dispose]() {}

	*entries(): MapIterator<Pair<K, V>> {
		for (let p of this.#bins) {
			if (p) yield [p[0], p[1]];
		}
	}

	*keys(): MapIterator<K> {
		for (let p of this.#bins) {
			if (p) yield p[0];
		}
	}

	*values(): MapIterator<V> {
		for (let p of this.#bins) {
			if (p) yield p[1];
		}
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
		for (let pair of this.#bins) {
			fn.call(thisArg, pair[1], pair[0], this);
		}
	}

	clear() {
		this.#bins = new Array(DEFAULT_CAP);
		this.#mask = 15;
		this.#size = 0;
	}

	empty() {
		return new HashMap<K, V>(null, this.opts({ cap: DEFAULT_CAP }));
	}

	copy() {
		const m = new HashMap<K, V>(null, this.opts({ cap: 4 }));
		m.#bins = this.#bins.slice();
		m.#mask = this.#mask;
		m.#size = this.#size;
		return m;
	}

	equiv(o: any) {
		return __equivMap(this, o);
	}

	has(key: K): boolean {
		const i = this.find(key);
		return i >= 0 && this.#bins[i] != undefined;
	}

	get(key: K, notFound?: V): Maybe<V> {
		const i = this.find(key);
		return i >= 0 && this.#bins[i] ? this.#bins[i][1] : notFound;
	}

	set(key: K, val: V) {
		let i = this.find(key);
		if (i >= 0 && this.#bins[i]) {
			this.#bins[i][1] = val;
			return this;
		}
		if (this.size > this.#mask * this.#load) {
			this.resize();
			i = this.find(key);
		}
		this.#bins[i] = [key, val];
		this.#size++;
		return this;
	}

	delete(key: K) {
		const bins = this.#bins;
		const mask = this.#mask;
		let i = this.find(key);
		if (i >= 0 && !bins[i]) {
			return false;
		}
		this.#size--;
		let j = i;
		let k: number;
		while (true) {
			delete bins[i];
			do {
				j = (j + 1) & mask;
				if (!bins[j]) return true;
				k = this.#hash(bins[j][0]) & mask;
			} while (i <= j ? i < k && k <= j : i < k || k <= j);
			bins[i] = bins[j];
			i = j;
		}
	}

	into(pairs: Iterable<Pair<K, V>>) {
		return <this>into(this, pairs);
	}

	dissoc(keys: Iterable<K>) {
		return <this>dissoc(this, keys);
	}

	opts(overrides?: Partial<HashMapOpts<K>>): HashMapOpts<K> {
		return <HashMapOpts<K>>{
			hash: this.#hash,
			equiv: this.#equiv,
			load: this.#load,
			cap: this.#mask + 1,
			...overrides,
		};
	}

	/** @internal */
	protected find(key: K) {
		const bins = this.#bins;
		const mask = this.#mask;
		const equiv = this.#equiv;
		let h = this.#hash(key) & this.#mask;
		let i = mask;
		while (bins[h] && !equiv(bins[h][0], key)) {
			i--;
			if (i < 0) return -1;
			h = (h + 1) & mask;
		}
		return h;
	}

	/** @internal */
	protected resize() {
		const src = this.#bins;
		const cap = (this.#mask + 1) * 2;
		this.#bins = new Array(cap);
		this.#mask = cap - 1;
		this.#size = 0;
		for (let p of src) {
			if (p) this.set(p[0], p[1]);
		}
	}
}

export function defHashMap<K, V>(
	pairs: Iterable<Pair<K, V>> | null,
	opts: HashMapOpts<K>
): HashMap<K, V>;
export function defHashMap<V>(
	obj: IObjectOf<V>,
	opts: HashMapOpts<string>
): HashMap<string, V>;
export function defHashMap<V>(
	src: any,
	opts: HashMapOpts<any>
): HashMap<any, V> {
	if (isPlainObject(src)) {
		const keys = Object.keys(src);
		return new HashMap<string, V>(
			map((k) => <Pair<string, V>>[k, (<IObjectOf<V>>src)[k]], keys),
			{
				cap: keys.length / (opts.load || DEFAULT_LOAD),
				...opts,
			}
		);
	} else {
		return new HashMap(src, opts);
	}
}
