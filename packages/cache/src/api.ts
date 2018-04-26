import {
    ICopy,
    IEmpty,
    ILength,
    IRelease
} from "@thi.ng/api/api";

export interface ICache<K, V> extends
    Iterable<Readonly<[K, CacheEntry<K, V>]>>,
    ICopy<ICache<K, V>>,
    IEmpty<ICache<K, V>>,
    ILength,
    IRelease {

    readonly size: number;

    has(key: K): boolean;
    get(key: K, notFound?: V): V;
    set(key: K, val: V): V;
    getSet(key: K, fn: () => Promise<V>): Promise<V>;
    delete(key: K): boolean;

    entries(): IterableIterator<Readonly<[K, CacheEntry<K, V>]>>;
    keys(): IterableIterator<Readonly<K>>;
    values(): IterableIterator<Readonly<V>>;
}

export interface CacheOpts<K, V> {
    ksize: (k: K) => number;
    vsize: (v: V) => number;
    release: (k: K, v: V) => void;
    map: () => Map<K, any>;
    maxlen: number;
    maxsize: number;
}

export interface CacheEntry<K, V> {
    k: K;
    v: V;
    s: number;
}