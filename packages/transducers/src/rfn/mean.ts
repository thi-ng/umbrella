import { Reducer } from "../api";
import { reduce } from "../reduce";

/**
 * Reducer computing mean of received inputs. Returns 0 if no inputs
 * were processed.
 */
export function mean(): Reducer<number, number>;
export function mean(xs: Iterable<number>): number;
export function mean(xs?: Iterable<number>): any {
    let n = 0;
    return xs
        ? reduce(mean(), xs)
        : [
              () => 0,
              (acc) => (n > 1 ? acc / n : acc),
              (acc, x) => (n++, acc + x)
          ];
}
