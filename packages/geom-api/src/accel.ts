import { Pair } from "@thi.ng/api";

export interface ISpatialAccel<K, V> {
    add(p: K, v: V, eps?: number): boolean;
    addAll(pairs: Iterable<Pair<K, V>>, eps?: number): boolean;
    addKey(k: K, eps?: number): boolean;
    addKeys(keys: Iterable<K>, eps?: number): boolean;
    remove(p: K): boolean;
    has(k: K, eps?: number): boolean;
    select(q: K, maxNum: number, maxDist?: number): Pair<K, V>[];
    selectKeys(q: K, maxNum: number, maxDist?: number): K[];
}
