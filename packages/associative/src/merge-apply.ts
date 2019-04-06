import { Fn, IObjectOf } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import { copy } from "./utils";

/**
 * Similar to `mergeApplyObj()`, but for ES6 Maps instead of plain objects.
 *
 * @param src
 * @param xs
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
 * Similar to `mergeObjWith()`, but only supports 2 args and any
 * function values in `xs` will be called with respective value in `src`
 * to produce a new / derived value for that key, i.e.
 *
 * ```
 * dest[k] = xs[k](src[k])
 * ```
 *
 * Returns new merged object and does not modify any of the inputs.
 *
 * ```
 * mergeApplyObj(
 *   {a: "hello", b: 23, c: 12},
 *   {a: (x) => x + " world", b: 42}
 * );
 * // { a: 'hello world', b: 42, c: 12 }
 * ```
 *
 * @param src
 * @param xs
 */
export const mergeApplyObj = <V>(
    src: IObjectOf<V>,
    xs: IObjectOf<V | Fn<V, V>>
) => {
    const res: IObjectOf<V> = { ...src };
    for (let k in xs) {
        const v = xs[k];
        res[k] = isFunction(v) ? v(res[k]) : v;
    }
    return res;
};
