import type { Fn0, Nullable } from "@thi.ng/api";
import type { ConsCell, DCons } from "@thi.ng/dcons";
import type { CacheEntry, CacheOpts } from "./api.js";
import { LRUCache } from "./lru.js";

export interface TLRUCacheOpts<K, V> extends CacheOpts<K, V> {
	/**
	 * Default time-to-live (cache period in milliseconds) before an entry is
	 * considered expired.
	 *
	 * @defaultValue 3600000 (1 hour)
	 */
	ttl: number;
}

export interface TLRUCacheEntry<K, V> extends CacheEntry<K, V> {
	t: number;
}

/**
 * Time-aware LRU cache. Extends LRU strategy with TTL (time-to-live)
 * values associated to each entry.
 *
 * @remarks
 * {@link ICache.has} will only return true and {@link ICache.get} only
 * returns a cached value if its TTL hasn't yet expired. When adding a
 * new value to the cache, first removes expired entries and if still
 * not sufficient space then removes entries in LRU order.
 *
 * {@link ICache.set} takes an optional entry specific `ttl` arg. If not
 * given, uses the cache instance's default (provided via ctor option
 * arg). If no instance TTL is given, TTL defaults to 1 hour.
 */
export class TLRUCache<K, V> extends LRUCache<K, V> {
	protected declare opts: TLRUCacheOpts<K, V>;
	protected declare map: Map<K, ConsCell<TLRUCacheEntry<K, V>>>;
	protected declare items: DCons<TLRUCacheEntry<K, V>>;

	constructor(
		pairs: Nullable<Iterable<[K, V]>>,
		opts?: Partial<TLRUCacheOpts<K, V>>
	) {
		super(pairs, { ttl: 60 * 60 * 1000, ...opts });
	}

	empty(): TLRUCache<K, V> {
		return new TLRUCache<K, V>(null, this.opts);
	}

	has(key: K) {
		return this.get(key) !== undefined;
	}

	get(key: K, notFound?: V) {
		const e = this.map.get(key);
		if (e) {
			if (e.value.t >= Date.now()) {
				return this.resetEntry(e);
			}
			this.removeEntry(e);
		}
		return notFound;
	}

	set(key: K, value: V, ttl = this.opts.ttl) {
		const size = this.opts.ksize(key) + this.opts.vsize(value);
		const e = this.map.get(key);
		const additionalSize = Math.max(0, size - (e ? e.value.s : 0));
		this._size += additionalSize;
		if (this.ensureSize()) {
			this.doSetEntry(e, key, value, size, ttl);
		} else {
			this._size -= additionalSize;
		}
		return value;
	}

	async getSet(key: K, retrieve: Fn0<Promise<V>>, ttl = this.opts.ttl) {
		const e = this.get(key);
		return e !== undefined ? e : this.set(key, await retrieve(), ttl);
	}

	/**
	 * Scans all cached entries and evicts any which are expired by now (based
	 * on their TTL). Does **not** modify last-accessed time of remaining
	 * entries. Returns number of entries evicted.
	 *
	 * @remarks
	 * For very large caches, it's recommended to call this function in a
	 * cron-like manner...
	 */
	prune() {
		const now = Date.now();
		let cell = this.items.head;
		let count = 0;
		while (cell) {
			if (cell.value.t < now) {
				this.removeEntry(cell);
				count++;
			}
			cell = cell.next;
		}
		return count;
	}

	protected ensureSize() {
		const { maxlen, maxsize } = this.opts;
		const now = Date.now();
		let cell = this.items.head;
		while (cell && (this._size > maxsize || this.length >= maxlen)) {
			if (cell.value.t < now) {
				this.removeEntry(cell);
			}
			cell = cell.next;
		}
		return super.ensureSize();
	}

	protected doSetEntry(
		e: ConsCell<TLRUCacheEntry<K, V>> | undefined,
		k: K,
		v: V,
		s: number,
		ttl = this.opts.ttl
	) {
		const t = Date.now() + ttl;
		if (e) {
			this.opts.update?.(k, e.value.v, v);
			e.value.v = v;
			e.value.s = s;
			e.value.t = t;
			this.items.asTail(e);
		} else {
			this.items.push({ k, v, s, t });
			this.map.set(k, this.items.tail!);
		}
	}
}
