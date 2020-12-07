import type { Reducer } from "../api";
import { reduce, reducer } from "../reduce";

/**
 * Reducer which returns the value with the largest magnitude, regardless of
 * sign.
 */
export function maxMag(): Reducer<number, number>;
export function maxMag(xs: Iterable<number>): number;
export function maxMag(xs?: Iterable<number>): any {
    return xs
        ? reduce(maxMag(), xs)
        : reducer(
              () => 0,
              (acc, x: number) => (Math.abs(x) > Math.abs(acc) ? x : acc)
          );
}
