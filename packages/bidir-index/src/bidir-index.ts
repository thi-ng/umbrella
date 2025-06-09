// SPDX-License-Identifier: Apache-2.0
import type { BidirIndexOpts, SerializedBidirIndex } from "./api.js";

/**
 * Bi-directional index to map arbitrary keys to numeric IDs and vice versa.
 */
export class BidirIndex<T> {
	fwd: Map<T, number>;
	rev: Map<number, T>;
	nextID: number;

	constructor(
		keys?: Iterable<T> | null,
		opts: Partial<BidirIndexOpts<T>> = {}
	) {
		this.nextID = opts.start || 0;
		this.fwd = opts.map || new Map();
		this.rev = new Map();
		keys && this.addAll(keys);
	}

	get size() {
		return this.fwd.size;
	}

	/**
	 * Yields same result as {@link BidirIndex.entries}.
	 */
	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Returns iterator of `[key,id]` pairs.
	 */
	entries() {
		return this.fwd.entries();
	}

	/**
	 * Returns iterator of all indexed keys.
	 */
	keys() {
		return this.fwd.keys();
	}

	/**
	 * Returns iterator of all indexed IDs.
	 */
	values() {
		return this.fwd.values();
	}

	/**
	 * Returns true if given `key` is known/indexed.
	 *
	 * @param key
	 */
	has(key: T) {
		return this.fwd.has(key);
	}

	/**
	 * Returns true if given `id` has a corresponding known/indexed key.
	 *
	 * @param id
	 */
	hasID(id: number) {
		return this.rev.has(id);
	}

	/**
	 * Reverse lookup of {@link BidirIndex.getID}. Returns the matching ID for
	 * given `key` or undefined if the key is not known.
	 *
	 * @param key
	 */
	get(key: T) {
		return this.fwd.get(key);
	}

	/**
	 * Reverse lookup of {@link BidirIndex.get}. Returns the matching key for
	 * given `id` or undefined if the ID is not known.
	 *
	 * @param id
	 */
	getID(id: number) {
		return this.rev.get(id);
	}

	/**
	 * Indexes given `key` and assigns & returns a new ID. If `key` is already
	 * known/indexed, returns its existing ID.
	 *
	 * @param key
	 */
	add(key: T) {
		let id = this.fwd.get(key);
		if (id === undefined) {
			this.fwd.set(key, this.nextID);
			this.rev.set(this.nextID, key);
			id = this.nextID++;
		}
		return id;
	}

	/**
	 * Batch version of {@link BidirIndex.add}. Indexes all given keys and
	 * returns array of their corresponding IDs.
	 *
	 * @param keys
	 */
	addAll(keys: Iterable<T>) {
		const res: number[] = [];
		for (let k of keys) {
			res.push(this.add(k));
		}
		return res;
	}

	/**
	 * Similar to {@link BidirIndex.addAll}, but returns indexed key IDs as ES6
	 * Set, thereby removing any duplicates present in `keys`.
	 *
	 * @param keys
	 */
	addAllUnique(keys: Iterable<T>) {
		const res = new Set<number>();
		for (let k of keys) {
			res.add(this.add(k));
		}
		return res;
	}

	/**
	 * Removes bi-directional mapping for given `key` from the index. Returns
	 * true if successful.
	 *
	 * @param key
	 */
	delete(key: T) {
		return __delete(this.fwd, this.rev, key);
	}

	/**
	 * Removes bi-directional mapping for given `id` from the index. Returns
	 * true if successful.
	 *
	 * @param id
	 */
	deleteID(id: number) {
		return __delete(this.rev, this.fwd, id);
	}

	/**
	 * Batch version of {@link BidirIndex.delete}.
	 *
	 * @param keys
	 */
	deleteAll(keys: Iterable<T>) {
		for (let k of keys) this.delete(k);
	}

	/**
	 * Batch version of {@link BidirIndex.deleteID}.
	 *
	 * @param ids
	 */
	deleteAllIDs(ids: Iterable<number>) {
		for (let id of ids) this.deleteID(id);
	}

	/**
	 * Returns array of IDs for all given keys. If `fail` is true (default:
	 * false), throws error if any of the given keys is unknown/unindexed (use
	 * {@link BidirIndex.add} or {@link BidirIndex.addAll} first).
	 *
	 * @param keys
	 * @param fail
	 */
	getAll(keys: Iterable<T>, fail = false) {
		return __iterate(this.fwd, keys, fail);
	}

	/**
	 * Similar to {@link BidirIndex.getAll}, but returns result as ES6 Set,
	 * thereby removing any duplicates in `keys`.
	 *
	 * @param keys
	 * @param fail
	 */
	getAllUnique(keys: Iterable<T>, fail = false) {
		return new Set(__iterate(this.fwd, keys, fail));
	}

	/**
	 * Returns array of matching keys for all given IDs. If `fail` is true
	 * (default: false), throws error if any of the given IDs is
	 * unknown/unindexed (use {@link BidirIndex.add} or
	 * {@link BidirIndex.addAll} first).
	 *
	 * @param ids
	 * @param fail
	 */
	getAllIDs(ids: Iterable<number>, fail = false) {
		return __iterate(this.rev, ids, fail);
	}

	/**
	 * Returns a compact JSON serializable version of the index. Use
	 * {@link bidirIndexFromJSON} to instantiate an index from such a JSON
	 * serialization.
	 */
	toJSON(): SerializedBidirIndex<T> {
		return {
			pairs: [...this.entries()],
			nextID: this.nextID,
		};
	}
}

const __delete = <A, B>(fwd: Map<A, B>, rev: Map<B, A>, key: A) => {
	const val = fwd.get(key);
	if (val !== undefined) {
		fwd.delete(key);
		rev.delete(val);
		return true;
	}
	return false;
};

const __iterate = <A, B>(
	index: Map<A, B>,
	keys: Iterable<A>,
	fail: boolean
) => {
	const res: B[] = [];
	for (let k of keys) {
		const val = index.get(k);
		if (val === undefined) {
			if (fail) throw new Error(`unknwon key/ID: ${k}`);
		} else {
			res.push(val);
		}
	}
	return res;
};

/**
 * Factory function wrapper for {@link BidirIndex}.
 *
 * @param keys
 * @param opts
 */
export const defBidirIndex = <T>(
	keys?: Iterable<T>,
	opts?: Partial<BidirIndexOpts<T>>
) => new BidirIndex<T>(keys, opts);

/**
 * Instantiates a {@link BidirIndex} from given JSON serialization. The optional
 * `map` arg can be used to provide a customized `key -> id` map implementation
 * (same use as {@link BidirIndexOpts.map}).
 *
 * @param src
 * @param map
 */
export const bidirIndexFromJSON = <T>(
	src: string | SerializedBidirIndex<T>,
	map?: Map<T, number>
) => {
	const $src =
		typeof src === "string"
			? <SerializedBidirIndex<T>>JSON.parse(src)
			: src;
	const res = new BidirIndex(null, { map, start: $src.nextID });
	$src.pairs.forEach(([k, id]) => {
		res.fwd.set(k, id);
		res.rev.set(id, k);
	});
	return res;
};
