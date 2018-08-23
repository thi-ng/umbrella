import { Pair } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reducer, reduce } from "../reduce";

/**
 * Reducer accepting key-value pairs / tuples and transforming / adding
 * them to an ES6 Map.
 */
export function assocMap<A, B>(): Reducer<Map<A, B>, Pair<A, B>>;
export function assocMap<A, B>(xs: Iterable<Pair<A, B>>): Map<A, B>;
export function assocMap<A, B>(xs?: Iterable<Pair<A, B>>): any {
    return xs ?
        reduce(assocMap(), xs) :
        reducer(() => new Map(), (acc, [k, v]) => acc.set(k, v));
}
