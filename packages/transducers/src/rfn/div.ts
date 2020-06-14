import { reduce, reducer } from "../reduce";
import type { Reducer } from "../api";

/**
 * Reducer to compute successive division of values using given `init`
 * value.
 */
export function div(init: number): Reducer<number, number>;
export function div(init: number, xs: Iterable<number>): number;
export function div(init: number, xs?: Iterable<number>): any {
    return xs
        ? reduce(div(init), xs)
        : reducer(
              () => init,
              (acc, x: number) => acc / x
          );
}
