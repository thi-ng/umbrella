import { ICopy, IEmpty, ILength } from "@thi.ng/api/api";

export interface ICache<K, V> extends
    Iterable<CacheEntry<K, V>>,
    ICopy<ICache<K, V>>,
    IEmpty<ICache<K, V>>,
    ILength {

    readonly size: number;

    has(key: K): boolean;
    get(key: K, notFound?: V): V;
    set(key: K, val: V): V;
    getSet(key: K, fn: () => Promise<V>): Promise<V>;
    delete(key: K): boolean;
}

export interface CacheOpts<K, V> {
    ksize: (k: K) => number;
    vsize: (v: V) => number;
    maxLen: number;
    maxSize: number;
}

export interface CacheEntry<K, V> {
    k: K;
    v: V;
    s: number;
}