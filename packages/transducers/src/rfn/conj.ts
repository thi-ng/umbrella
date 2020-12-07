import type { Reducer } from "../api";
import { reduce, reducer } from "../reduce";

/**
 * Reducer. Like {@link (push:1)}, but for ES6 Sets.
 */
export function conj<T>(): Reducer<Set<T>, T>;
export function conj<T>(xs: Iterable<T>): Set<T>;
export function conj<T>(xs?: Iterable<T>): any {
    return xs
        ? reduce(conj(), xs)
        : reducer(
              () => new Set(),
              (acc, x) => acc.add(x)
          );
}
