import { Reducer } from "../api";
import { reducer } from "../reduce";

/**
 * Reducer accepting key-value pairs / tuples and transforming / adding
 * them to an ES6 Map.
 */
export function assocMap<A, B>(): Reducer<Map<A, B>, [A, B]> {
    return reducer(() => new Map(), (acc, [k, v]) => acc.set(k, v));
}
