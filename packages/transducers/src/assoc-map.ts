import type { Pair } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer accepting key-value pairs / tuples and transforming / adding
 * them to an ES6 Map.
 */
export function assocMap<A, B>(): Reducer<Map<A, B>, Pair<A, B>>;
export function assocMap<A, B>(xs: Iterable<Pair<A, B>>): Map<A, B>;
export function assocMap<A, B>(xs?: Iterable<Pair<A, B>>): any {
    return xs
        ? reduce(assocMap(), xs)
        : reducer<Map<A, B>, Pair<A, B>>(
              () => new Map(),
              (acc, [k, v]) => acc.set(k, v)
          );
}
