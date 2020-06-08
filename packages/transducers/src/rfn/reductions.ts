import { reduce } from "../reduce";
import { isReduced, reduced } from "../reduced";
import type { Reducer } from "../api";

export function reductions<A, B>(rfn: Reducer<A, B>): Reducer<A[], B>;
export function reductions<A, B>(rfn: Reducer<A, B>, xs: Iterable<B>): A[];
export function reductions<A, B>(rfn: Reducer<A, B>, xs?: Iterable<B>): any {
    const [init, complete, _reduce] = rfn;
    return xs
        ? reduce(reductions(rfn), xs)
        : <Reducer<A[], B>>[
              () => [init()],
              (acc) => (
                  (acc[acc.length - 1] = complete(acc[acc.length - 1])), acc
              ),
              (acc, x) => {
                  const res = _reduce(acc[acc.length - 1], x);
                  if (isReduced(res)) {
                      acc.push(res.deref());
                      return reduced(acc);
                  }
                  acc.push(res);
                  return acc;
              },
          ];
}
