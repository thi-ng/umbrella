// SPDX-License-Identifier: Apache-2.0
import type {
	Fn3,
	ICopy,
	IEmpty,
	IEquiv,
	IObjectOf,
	Maybe,
	Pair,
} from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { equiv } from "@thi.ng/equiv";
import { pairs } from "@thi.ng/transducers/pairs";
import type { EquivMapOpts, IEquivSet } from "./api.js";
import { ArraySet } from "./array-set.js";
import { dissoc } from "./dissoc.js";
import { __equivMap } from "./internal/equiv.js";
import { __tostringMixin } from "./internal/tostring.js";
import { into } from "./into.js";

@__tostringMixin
export class EquivMap<K, V>
	extends Map<K, V>
	implements
		Iterable<Pair<K, V>>,
		ICopy<EquivMap<K, V>>,
		IEmpty<EquivMap<K, V>>,
		IEquiv
{
	#keys: IEquivSet<K>;
	#map: Map<K, V>;
	#opts: EquivMapOpts<K>;

	/**
	 * Creates a new instance with optional initial key-value pairs and provided
	 * options. If no `opts` are given, uses `ArraySet` for storing canonical
	 * keys and
	 * [`equiv`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html) for
	 * checking key equivalence.
	 *
	 * @param pairs - key-value pairs
	 * @param opts - config options
	 */
	constructor(
		pairs?: Iterable<Pair<K, V>> | null,
		opts?: Partial<EquivMapOpts<K>>
	) {
		super();
		const _opts: EquivMapOpts<K> = { equiv, keys: ArraySet, ...opts };
		this.#keys = new _opts.keys(null, { equiv: _opts.equiv });
		this.#map = new Map<K, V>();
		this.#opts = _opts;
		if (pairs) {
			this.into(pairs);
		}
	}

	[Symbol.iterator](): IterableIterator<Pair<K, V>> {
		return this.entries();
	}

	get [Symbol.species]() {
		return EquivMap;
	}

	get [Symbol.toStringTag]() {
		return "EquivMap";
	}

	get size(): number {
		return this.#keys.size;
	}

	clear() {
		this.#keys.clear();
		this.#map.clear();
	}

	empty(): EquivMap<K, V> {
		return new EquivMap<K, V>(null, this.#opts);
	}

	copy() {
		const m = new EquivMap<K, V>();
		m.#keys = this.#keys.copy();
		m.#map = new Map<K, V>(this.#map);
		m.#opts = this.#opts;
		return m;
	}

	equiv(o: any) {
		return __equivMap(this, o);
	}

	delete(key: K) {
		const $key = this.#keys.get(key, <any>SEMAPHORE);
		if ($key !== SEMAPHORE) {
			this.#map.delete($key!);
			this.#keys.delete($key!);
			return true;
		}
		return false;
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
		for (let pair of this.#map) {
			fn.call(thisArg, pair[1], pair[0], this);
		}
	}

	get(key: K, notFound?: V): Maybe<V> {
		const $key = this.#keys.get(key, <any>SEMAPHORE);
		return $key !== SEMAPHORE ? this.#map.get($key!) : notFound;
	}

	has(key: K): boolean {
		return this.#keys.has(key);
	}

	set(key: K, value: V) {
		const $key = this.#keys.get(key, <any>SEMAPHORE);
		if ($key !== SEMAPHORE) {
			this.#map.set($key!, value);
		} else {
			this.#keys.add(key);
			this.#map.set(key, value);
		}
		return this;
	}

	into(pairs: Iterable<Pair<K, V>>) {
		return <this>into(this, pairs);
	}

	entries(): IterableIterator<Pair<K, V>> {
		return this.#map.entries();
	}

	keys(): IterableIterator<K> {
		return this.#map.keys();
	}

	values(): IterableIterator<V> {
		return this.#map.values();
	}

	opts(): EquivMapOpts<K> {
		return this.#opts;
	}
}

export function defEquivMap<K, V>(
	pairs?: Iterable<Pair<K, V>> | null,
	opts?: Partial<EquivMapOpts<K>>
): EquivMap<K, V>;
export function defEquivMap<V>(
	obj: IObjectOf<V>,
	opts?: Partial<EquivMapOpts<string>>
): EquivMap<string, V>;
export function defEquivMap<V>(
	src: any,
	opts?: Partial<EquivMapOpts<any>>
): EquivMap<any, V> {
	return new EquivMap(
		isPlainObject(src) ? pairs(<IObjectOf<V>>src) : src,
		opts
	);
}
