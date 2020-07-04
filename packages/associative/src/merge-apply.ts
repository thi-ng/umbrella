import { isFunction } from "@thi.ng/checks";
import { copy } from "./utils";
import type { Fn, IObjectOf } from "@thi.ng/api";

/**
 * Similar to {@link mergeApplyObj}, but for ES6 Maps instead of plain objects.
 *
 * @param src - source map
 * @param xs - map w/ transformation functions
 */
export const mergeApplyMap = <K, V>(
    src: Map<K, V>,
    xs: Map<K, V | Fn<V, V>>
): Map<K, V> => {
    const res: Map<K, any> = copy(src, Map);
    for (let [k, v] of xs) {
        res.set(k, isFunction(v) ? v(res.get(k)) : v);
    }
    return res;
};

/**
 * Similar to {@link mergeObjWith}, but only supports 2 args and any
 * function values in `xs` will be called with respective value in `src`
 * to produce a new / derived value for that key, i.e.
 *
 * @example
 * ```ts
 * dest[k] = xs[k](src[k])
 * ```
 *
 * Returns new merged object and does not modify any of the inputs.
 *
 * @example
 * ```ts
 * mergeApplyObj(
 *   { a: "hello", b: 23, c: 12 },
 *   { a: (x) => x + " world", b: 42 }
 * );
 * // { a: 'hello world', b: 42, c: 12 }
 * ```
 *
 * @param src - source object
 * @param xs - object w/ transformation functions
 */
export const mergeApplyObj = <V>(
    src: IObjectOf<V>,
    xs: IObjectOf<V | Fn<V, V>>
) => meldApplyObj({ ...src }, xs);

/**
 * Mutable version of {@link mergeApplyObj}. Returns modified `src` object.
 *
 * @param src -
 * @param xs -
 */
export const meldApplyObj = <V>(
    src: IObjectOf<V>,
    xs: IObjectOf<V | Fn<V, V>>
) => {
    for (let k in xs) {
        const v = xs[k];
        src[k] = isFunction(v) ? v(src[k]) : v;
    }
    return src;
};
