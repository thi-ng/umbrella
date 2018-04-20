import { equiv } from "@thi.ng/api/equiv";
import { DCons, ConsCell } from "@thi.ng/dcons";
import { map } from "@thi.ng/iterators/map";

import { ICache, CacheOpts, CacheEntry } from "./api";

export interface LRUEntry<K, V> extends CacheEntry<K, V> {
    t: number;
}

export class LRUCache<K, V> implements ICache<K, V> {

    protected ksize: (k: K) => number;
    protected vsize: (v: V) => number;
    protected items: DCons<LRUEntry<K, V>>;
    protected _size: number;
    protected maxSize: number;
    protected maxLen: number;

    constructor(opts?: Partial<CacheOpts<K, V>>) {
        opts = Object.assign({
            maxLen: Number.POSITIVE_INFINITY,
            maxSize: Number.POSITIVE_INFINITY,
            ksize: () => 0,
            vsize: () => 0,
        }, opts);
        this.items = new DCons<LRUEntry<K, V>>();
        this._size = 0;
        this.ksize = opts.ksize;
        this.vsize = opts.vsize;
        this.maxSize = opts.maxSize;
        this.maxLen = opts.maxLen;
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

    *values(): Iterator<Readonly<V>> {
        yield* map((e) => e.v, this.items);
    }

    copy(): ICache<K, V> {
        const c = this.empty();
        c.items = this.items.copy();
        return c;
    }

    empty(): LRUCache<K, V> {
        return new LRUCache<K, V>({
            maxLen: this.maxLen,
            maxSize: this.maxSize,
            ksize: this.ksize,
            vsize: this.vsize,
        });
    }

    has(key: K): boolean {
        return !!this.find(key);
    }

    get(key: K, notFound?: V): V {
        const e = this.find(key);
        if (!e) {
            return notFound;
        }
        this.items.splice(e, 1);
        e.value.t = Date.now();
        this.items.push(e.value);
        return e.value.v;
    }

    set(key: K, value: V) {
        this.delete(key);
        const size = this.ksize(key) + this.vsize(value);
        this._size += size;
        while (this._size > this.maxSize || this.length >= this.maxLen) {
            const e = this.items.drop();
            if (!e) {
                return;
            }
            this._size -= e.s;
        }
        this.items.push({
            k: key,
            v: value,
            s: size,
            t: Date.now(),
        });
        return value;
    }

    getSet(key: K, fn: () => Promise<V>): Promise<V> {
        const e = this.find(key);
        if (e) {
            this.items.splice(e, 1);
            e.value.t = Date.now();
            this.items.push(e.value);
            return Promise.resolve(e.value.v);
        }
        return fn().then((v) => this.set(key, v));
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
        return this.items.findWith((x) => equiv(x.k, key));
    }
}
