import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

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
