import { reduce, reducer } from "../reduce";
import type { Reducer } from "../api";

export function max(): Reducer<number, number>;
export function max(xs: Iterable<number>): number;
export function max(xs?: Iterable<number>): any {
    return xs
        ? reduce(max(), xs)
        : reducer(
              () => -Infinity,
              (acc, x: number) => Math.max(acc, x)
          );
}
