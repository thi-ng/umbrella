import { reduce, reducer } from "../reduce";
import type { Reducer } from "../api";

export function min(): Reducer<number, number>;
export function min(xs: Iterable<number>): number;
export function min(xs?: Iterable<number>): any {
    return xs
        ? reduce(min(), xs)
        : reducer(
              () => Infinity,
              (acc, x: number) => Math.min(acc, x)
          );
}
