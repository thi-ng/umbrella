import { Reducer } from "../api";
import { reducer } from "../reduce";

/**
 * Reducer. Like `push()`, but for ES6 Sets.
 */
export function conj<T>(): Reducer<Set<T>, T> {
    return reducer(() => new Set(), (acc, x) => acc.add(x));
}
