import { reduce, reducer } from "../reduce";
import type { Reducer } from "../api";

/**
 * Reducer which returns the value with the smallest magnitude, regardless of
 * sign.
 */
export function minMag(): Reducer<number, number>;
export function minMag(xs: Iterable<number>): number;
export function minMag(xs?: Iterable<number>): any {
    return xs
        ? reduce(minMag(), xs)
        : reducer(
              () => Infinity,
              (acc, x: number) => (Math.abs(x) < Math.abs(acc) ? x : acc)
          );
}
