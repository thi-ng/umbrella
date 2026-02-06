// SPDX-License-Identifier: Apache-2.0
import type { IClear, ICopy, IEmpty } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { BidirIndexOpts, SerializedBidirIndex } from "./api.js";

/**
 * Bi-directional index to map arbitrary keys to numeric IDs and vice versa.
 */
export class BidirIndex<T>
	implements IClear, ICopy<BidirIndex<T>>, IEmpty<BidirIndex<T>>
{
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

	clear() {
		this.fwd.clear();
		this.rev.clear();
		this.nextID = 0;
	}

	copy() {
		const result = new BidirIndex<T>();
		result.fwd = implementsFunction(this.fwd, "copy")
			? this.fwd.copy()
			: new Map(this.fwd);
		result.rev = new Map(this.rev);
		result.nextID = this.nextID;
		return result;
	}

	empty() {
		const result = new BidirIndex<T>();
		if (implementsFunction(this.fwd, "empty")) {
			result.fwd = this.fwd.empty();
		}
		return result;
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
		for (const k of keys) {
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
		for (const k of keys) {
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
		for (const k of keys) this.delete(k);
	}

	/**
	 * Batch version of {@link BidirIndex.deleteID}.
	 *
	 * @param ids
	 */
	deleteAllIDs(ids: Iterable<number>) {
		for (const id of ids) this.deleteID(id);
	}

	/**
	 * Returns array of IDs for all given keys. If `fail` is true (default:
	 * false), throws error if any of the given keys is unknown/unindexed (use
	 * {@link BidirIndex.add} or {@link BidirIndex.addAll} first).
	 *
	 * @remarks
	 * Only used if `fail=false` (default): If `all=true`, any unknown values
	 * will be mapped to `null` values in the result array. Otherwise, the
	 * default behavior is for such unknown values to be skipped.
	 *
	 * @param keys
	 * @param fail
	 * @param all
	 */
	getAll(keys: Iterable<T>, fail?: boolean): number[];
	getAll(keys: Iterable<T>, fail: boolean, all: true): (number | null)[];
	getAll(keys: Iterable<T>, fail = false, all?: boolean) {
		return __iterate(this.fwd, keys, fail, all);
	}

	/**
	 * Similar to {@link BidirIndex.getAll}, but returns result as ES6 Set,
	 * thereby removing any duplicates in `keys`.
	 *
	 * @param keys
	 * @param fail
	 */
	getAllUnique(keys: Iterable<T>, fail = false) {
		return new Set(<number[]>__iterate(this.fwd, keys, fail));
	}

	/**
	 * Reverse op of {@link BidirIndex.getAll}. Returns array of matching keys
	 * for all given IDs. If `fail` is true (default: false), throws error if
	 * any of the given IDs is unknown/unindexed (use {@link BidirIndex.add} or
	 * {@link BidirIndex.addAll} first).
	 *
	 * @remarks
	 * Only used if `fail=false` (default): If `all=true`, any unknown IDs will
	 * be mapped to `null` values in the result array. Otherwise, the default
	 * behavior is for such unknown values to be skipped.
	 *
	 * @param ids
	 * @param fail
	 * @param all
	 */
	getAllIDs(ids: Iterable<number>, fail?: boolean): T[];
	getAllIDs(ids: Iterable<number>, fail: boolean, all: true): (T | null)[];
	getAllIDs(ids: Iterable<number>, fail = false, all?: true) {
		return __iterate(this.rev, ids, fail, all);
	}

	/**
	 * Attempts to rename `currKey` into `newKey` without changing its ID
	 * mapping. Returns `ok` if successful, otherwise `missing` if `currKey` is
	 * unknown or `conflict` if `newKey` already exists.
	 *
	 * @param currKey
	 * @param newKey
	 */
	renameKey(currKey: T, newKey: T) {
		const id1 = this.fwd.get(currKey);
		if (id1 == null) return "missing";
		const id2 = this.fwd.get(newKey);
		if (id2 != null) return "conflict";
		this.fwd.delete(currKey);
		this.fwd.set(newKey, id1);
		this.rev.set(id1, newKey);
		return "ok";
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

/** @internal */
function __iterate<A, B>(
	index: Map<A, B>,
	keys: Iterable<A>,
	fail: boolean,
	all?: boolean
) {
	const res: (B | null)[] = [];
	for (const k of keys) {
		const val = index.get(k);
		if (val === undefined) {
			if (fail) throw new Error(`unknwon key/ID: ${k}`);
			if (all) res.push(null);
		} else {
			res.push(val);
		}
	}
	return res;
}

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
