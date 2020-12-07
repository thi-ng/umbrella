import type { Fn0 } from "@thi.ng/api";
import type { ConsCell, DCons } from "@thi.ng/dcons";
import type { CacheEntry, CacheOpts } from "./api";
import { LRUCache } from "./lru";

export interface TLRUCacheOpts<K, V> extends CacheOpts<K, V> {
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
    protected opts!: TLRUCacheOpts<K, V>;
    protected map!: Map<K, ConsCell<TLRUCacheEntry<K, V>>>;
    protected items!: DCons<TLRUCacheEntry<K, V>>;

    constructor(
        pairs?: Iterable<[K, V]> | null,
        opts?: Partial<TLRUCacheOpts<K, V>>
    ) {
        opts = Object.assign({ ttl: 60 * 60 * 1000 }, opts);
        super(pairs, opts);
    }

    empty(): TLRUCache<K, V> {
        return new TLRUCache<K, V>(null, this.opts);
    }

    has(key: K) {
        return this.get(key) !== undefined;
    }

    get(key: K, notFound?: any) {
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
        this._size += Math.max(0, size - (e ? e.value.s : 0));
        if (this.ensureSize()) {
            const t = Date.now() + ttl;
            if (e) {
                e.value.v = value;
                e.value.s = size;
                e.value.t = t;
                this.items.asTail(e);
            } else {
                this.items.push({
                    k: key,
                    v: value,
                    s: size,
                    t,
                });
                this.map.set(key, this.items.tail!);
            }
        }
        return value;
    }

    getSet(key: K, retrieve: Fn0<Promise<V>>, ttl = this.opts.ttl): Promise<V> {
        const e = this.get(key);
        if (e) {
            return Promise.resolve(e);
        }
        return retrieve().then((v) => this.set(key, v, ttl));
    }

    prune() {
        const now = Date.now();
        let cell = this.items.head;
        while (cell) {
            if (cell.value.t < now) {
                this.removeEntry(cell);
            }
            cell = cell.next;
        }
    }

    protected ensureSize() {
        const maxs = this.opts.maxsize;
        const maxl = this.opts.maxlen;
        const now = Date.now();
        let cell = this.items.head;
        while (cell && (this._size > maxs || this.length >= maxl)) {
            if (cell.value.t < now) {
                this.removeEntry(cell);
            }
            cell = cell.next;
        }
        return super.ensureSize();
    }
}
