import { equiv } from "@thi.ng/api/equiv";
import { DCons, ConsCell } from "@thi.ng/dcons";
import { map } from "@thi.ng/iterators/map";

import { ICache, CacheOpts, CacheEntry } from "./api";

export interface LRUEntry<K, V> extends CacheEntry<K, V> {
    t: number;
}

export class LRUCache<K, V> implements ICache<K, V> {

    protected items: DCons<LRUEntry<K, V>>;
    protected _equiv: (a: K, b: K) => boolean;
    protected _release: (k: K, v: V) => void;
    protected ksize: (k: K) => number;
    protected vsize: (v: V) => number;

    protected _size: number;
    protected maxsize: number;
    protected maxlen: number;

    constructor(pairs?: Iterable<[K, V]>, opts?: Partial<CacheOpts<K, V>>) {
        opts = Object.assign({
            maxlen: Number.POSITIVE_INFINITY,
            maxsize: Number.POSITIVE_INFINITY,
            equiv: equiv,
            ksize: () => 0,
            vsize: () => 0,
        }, opts);
        this.items = new DCons<LRUEntry<K, V>>();
        this._size = 0;
        this._equiv = opts.equiv;
        this.ksize = opts.ksize;
        this.vsize = opts.vsize;
        this._release = opts.release;
        this.maxsize = opts.maxsize;
        this.maxlen = opts.maxlen;
        if (pairs) {
            this.into(pairs);
        }
    }

    get length() {
        return this.items.length;
    }

    get size() {
        return this._size;
    }

    [Symbol.iterator]() {
        return this.entries();
    }

    *entries(): IterableIterator<Readonly<CacheEntry<K, V>>> {
        yield* this.items;
    }

    *keys(): IterableIterator<Readonly<K>> {
        yield* map((e) => e.k, this.items);
    }

    *values(): IterableIterator<Readonly<V>> {
        yield* map((e) => e.v, this.items);
    }

    copy(): ICache<K, V> {
        const c = this.empty();
        c.items = this.items.copy();
        return c;
    }

    empty(): LRUCache<K, V> {
        return new LRUCache<K, V>(null, {
            maxlen: this.maxlen,
            maxsize: this.maxsize,
            equiv: this._equiv,
            release: this._release,
            ksize: this.ksize,
            vsize: this.vsize,
        });
    }

    release() {
        const release = this._release;
        this._size = 0;
        if (release) {
            let e;
            while (e = this.items.drop()) {
                release(e.k, e.v);
            }
            return true;
        }
        return this.items.release();
    }

    has(key: K): boolean {
        return !!this.find(key);
    }

    get(key: K, notFound?: V): V {
        const e = this.find(key);
        if (!e) {
            return notFound;
        }
        return this.resetEntry(e);
    }

    set(key: K, value: V) {
        this.delete(key);
        const size = this.ksize(key) + this.vsize(value);
        this._size += size;
        if (this.ensureSize()) {
            this.items.push({
                k: key,
                v: value,
                s: size,
                t: Date.now(),
            });
        }
        return value;
    }

    into(pairs: Iterable<[K, V]>) {
        for (let p of pairs) {
            this.set(p[0], p[1]);
        }
        return this;
    }

    getSet(key: K, retrieve: () => Promise<V>): Promise<V> {
        const e = this.find(key);
        if (e) {
            return Promise.resolve(this.resetEntry(e));
        }
        return retrieve().then((v) => this.set(key, v));
    }

    delete(key: K): boolean {
        const e = this.find(key);
        if (e) {
            this.items.splice(e, 1);
            this._size -= e.value.s;
            return true;
        }
        return false;
    }

    protected find(key: K): ConsCell<LRUEntry<K, V>> {
        const eq = this._equiv;
        return this.items.findWith((x) => eq(x.k, key));
    }

    protected resetEntry(e: ConsCell<LRUEntry<K, V>>) {
        e.value.t = Date.now();
        this.items.splice(e, 1).push(e.value);
        return e.value.v;
    }

    protected ensureSize() {
        const release = this._release;
        while (this._size > this.maxsize || this.length >= this.maxlen) {
            const e = this.items.drop();
            if (!e) {
                return false;
            }
            release && release(e.k, e.v);
            this._size -= e.s;
        }
        return true;
    }
}
