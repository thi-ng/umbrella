import { Pair } from "@thi.ng/api";

export interface ISpatialMap<K, V> {
    readonly size: number;

    set(key: K, v: V, eps?: number): boolean;
    into(pairs: Iterable<Pair<K, V>>, eps?: number): boolean;
    remove(key: K): boolean;
    has(key: K, eps?: number): boolean;
    get(key: K, eps?: number): V | undefined;
}

export interface ISpatialSet<K> {
    readonly size: number;

    add(key: K, eps?: number): boolean;
    into(keys: Iterable<K>, eps?: number): boolean;
    remove(key: K): boolean;
    has(key: K, eps?: number): boolean;
    get(key: K, eps?: number): K | undefined;
}

export interface IRegionQuery<K, V, R> {
    query(q: K, region: R, limit: number, acc?: Pair<K, V>[]): Pair<K, V>[];
    queryKeys(q: K, region: number, limit: number, acc?: K[]): K[];
    queryValues(q: K, region: number, limit: number, acc?: V[]): V[];
}
