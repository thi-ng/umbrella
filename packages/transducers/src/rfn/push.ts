import type { Reducer } from "../api";
import { reducer } from "../reduce";

export function push<T>(): Reducer<T[], T>;
export function push<T>(xs: Iterable<T>): T[];
export function push<T>(xs?: Iterable<T>): any {
    return xs
        ? [...xs]
        : reducer<T[], T>(
              () => [],
              (acc, x) => (acc.push(x), acc)
          );
}
