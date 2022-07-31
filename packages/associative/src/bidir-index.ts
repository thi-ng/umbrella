import { isString } from "@thi.ng/checks/is-string";

export interface SerializedBidirIndex<T> {
	pairs: [T, number][];
	nextID: number;
}

export interface BidirIndexOpts<T> {
	/**
	 * Custom `key -> id` map implementation (e.g. {@link EquivMap} or
	 * {@link HashMap}). If omitted, a native JS `Map` will be used.
	 */
	map: Map<T, number>;
	/**
	 * Start ID for indexing new keys.
	 *
	 * @defaultValue 0
	 */
	start: number;
}

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
	 * Removes bi-directional mapping for given `key` from the index. Returns
	 * true if successful.
	 *
	 * @param key
	 */
	delete(key: T) {
		const fwd = this.fwd;
		const id = fwd.get(key);
		if (id !== undefined) {
			fwd.delete(key);
			this.rev.delete(id);
			return true;
		}
		return false;
	}

	/**
	 * Removes bi-directional mapping for given `id` from the index. Returns
	 * true if successful.
	 *
	 * @param id
	 */
	deleteID(id: number) {
		const rev = this.rev;
		const k = rev.get(id);
		if (k !== undefined) {
			rev.delete(id);
			this.fwd.delete(k);
			return true;
		}
		return false;
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
		const index = this.fwd;
		const res: number[] = [];
		for (let k of keys) {
			const id = index.get(k);
			if (id === undefined) {
				if (fail) throw new Error(`unknown key: ${k}`);
			} else {
				res.push(id);
			}
		}
		return res;
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
		const index = this.rev;
		const res: T[] = [];
		for (let id of ids) {
			const k = index.get(id);
			if (k === undefined) {
				if (fail) throw new Error(`unknwon ID: ${id}`);
			} else {
				res.push(k);
			}
		}
		return res;
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
	const $src = isString(src) ? <SerializedBidirIndex<T>>JSON.parse(src) : src;
	const res = new BidirIndex(null, { map, start: $src.nextID });
	$src.pairs.forEach(([k, id]) => {
		res.fwd.set(k, id);
		res.rev.set(id, k);
	});
	return res;
};
