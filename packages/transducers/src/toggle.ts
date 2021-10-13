import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api.js";
import { iterator1 } from "./iterator.js";

/**
 * Stateful transducer which accepts any input and flips between given
 * `on` / `off` values for every value received. The `initial` state can
 * be optionally provided (default: false) and must be given if used as
 * an iterator.
 *
 * @example
 * ```ts
 * [...toggle(1, 0, false, [1, 2, 3, 4])]
 * // [ 1, 0, 1, 0 ]
 *
 * [...tx.toggle("on", "off", true, [1, 2, 3, 4])]
 * // [ 'off', 'on', 'off', 'on' ]
 * ```
 *
 * @param on - result for "on" state
 * @param off - result for "off" state
 * @param initial - initial state
 */
export function toggle<T>(on: T, off: T, initial?: boolean): Transducer<any, T>;
export function toggle<T>(
    on: T,
    off: T,
    initial: boolean,
    src: Iterable<any>
): IterableIterator<boolean>;
export function toggle<T>(
    on: T,
    off: T,
    initial = false,
    src?: Iterable<any>
): any {
    return isIterable(src)
        ? iterator1(toggle(on, off, initial), src)
        : ([init, complete, reduce]: Reducer<any, T>) => {
              let state = initial;
              return [
                  init,
                  complete,
                  (acc: any) => reduce(acc, (state = !state) ? on : off),
              ];
          };
}
