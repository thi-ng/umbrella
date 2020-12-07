import { isIterable } from "@thi.ng/checks";
import type { Transducer } from "../api";
import { iterator } from "../iterator";
import { partitionBy } from "./partition-by";

/**
 * Transducer. Yields cyclic sequence of user defined variable sized
 * chunks. The last partition emitted is allowed to be incomplete.
 *
 * @example
 * ```ts
 * [...partitionOf([3,2,4], range(20))]
 * // [ [ 0, 1, 2 ],
 * //   [ 3, 4 ],
 * //   [ 5, 6, 7, 8 ],
 * //   [ 9, 10, 11 ],
 * //   [ 12, 13 ],
 * //   [ 14, 15, 16, 17 ],
 * //   [ 18, 19 ] ]
 * ```
 *
 * @param sizes -
 */
export function partitionOf<T>(sizes: number[]): Transducer<T, T[]>;
export function partitionOf<T>(
    sizes: number[],
    src: Iterable<T>
): IterableIterator<T[]>;
export function partitionOf<T>(sizes: number[], src?: Iterable<T>): any {
    return isIterable(src)
        ? iterator(partitionOf(sizes), src)
        : partitionBy(() => {
              let i = 0,
                  j = 0;
              return () => {
                  if (i++ === sizes[j]) {
                      i = 1;
                      j = (j + 1) % sizes.length;
                  }
                  return j;
              };
          }, true);
}
