import type { IObjectOf } from "@thi.ng/api";

/**
 * Iterator which yields all values of given object's own properties
 * (Similar to `Object.values()`).
 *
 * @remarks
 * See also:
 * - {@link keys}
 * - {@link pairs}
 *
 * @param x -
 */
export function* vals<T>(x: IObjectOf<T>): IterableIterator<T> {
    for (let k in x) {
        if (x.hasOwnProperty(k)) {
            yield x[k];
        }
    }
}
