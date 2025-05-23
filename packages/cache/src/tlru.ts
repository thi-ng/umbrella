// SPDX-License-Identifier: Apache-2.0
import type { Fn0, Maybe, Nullable } from "@thi.ng/api";
import type { ConsCell, DCons } from "@thi.ng/dcons";
import type { CacheEntry, CacheOpts, MapLike } from "./api.js";
import { LRUCache } from "./lru.js";

export interface TLRUCacheOpts<K, V> extends CacheOpts<K, V> {
	/**
	 * Default time-to-live (cache period in milliseconds) before an entry is
	 * considered expired.
	 *
	 * @defaultValue 3600000 (1 hour)
	 */
	ttl: number;
	/**
	 * If true, a cache hit (i.e. reading a cached value via
	 * {@link TLRUCache.get}) will auto-extend the expiry time for that cache
	 * entry.
	 *
	 * @defaultValue false
	 */
	autoExtend: boolean;
}

export interface TLRUCacheEntry<K, V> extends CacheEntry<K, V> {
	/**
	 * Expiry timestamp
	 */
	t: number;
	/**
	 * TTL for this entry (defaults to {@link TLRUCacheOpts.ttl}, but can be
	 * customized per key via {@link TLRUCache.set} or
	 * {@link TLRUCache.getSet}).
	 */
	ttl: number;
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
	protected declare map: MapLike<K, ConsCell<TLRUCacheEntry<K, V>>>;
	protected declare items: DCons<TLRUCacheEntry<K, V>>;

	constructor(
		pairs?: Nullable<Iterable<[K, V]>>,
		opts?: Partial<TLRUCacheOpts<K, V>>
	) {
		super(pairs, { ttl: 60 * 60 * 1000, autoExtend: false, ...opts });
	}

	empty(): TLRUCache<K, V> {
		return new TLRUCache<K, V>(null, this.opts);
	}

	has(key: K) {
		return this.get(key) !== undefined;
	}

	/**
	 * Attempts to retrieve & return cached value for `key`. If found, also
	 * resets the cache entry's configured TTL. If cache miss, returns
	 * `notFound`.
	 *
	 * @param key
	 * @param notFound
	 */
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

	/**
	 * Stores given `value` under `key` in the cache, optionally with custom
	 * `ttl` (in milliseconds). Returns `value`.
	 *
	 * @remarks
	 * Also see {@link TLRUCache.getSet} for alternative, and
	 * {@link CacheOpts.update} for user callback when updating an existing
	 * `key` in the cache.
	 *
	 * @param key
	 * @param value
	 * @param ttl
	 */
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
		e: Maybe<ConsCell<TLRUCacheEntry<K, V>>>,
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
			this.items.push({ k, v, s, t, ttl });
			this.map.set(k, this.items.tail!);
		}
	}

	protected resetEntry(e: ConsCell<TLRUCacheEntry<K, V>>): V {
		if (this.opts.autoExtend) {
			e.value.t = Date.now() + e.value.ttl;
		}
		return super.resetEntry(e);
	}
}
