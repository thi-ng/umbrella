import { IObjectOf } from "@thi.ng/api/api";
import { isFunction } from "@thi.ng/checks/is-function";

import { copy } from "./utils";

/**
 * Similar to `mergeApplyObj()`, but for ES6 Maps instead of plain objects.
 *
 * @param src
 * @param xs
 */
export function mergeApplyMap<K, V>(src: Map<K, V>, xs: Map<K, V | ((x: V) => V)>) {
    const res: any = copy(src, Map);
    for (let p of xs) {
        let [k, v] = p;
        isFunction(v) && (v = v(res[k]));
        res.set(k, v);
    }
    return res;
}

/**
 * Similar to `mergeObj()`, but only supports 2 args and any function
 * values in `xs` will be called with respective value in `src` to
 * produce a new / derived value for that key. Returns new merged object
 * and does not modify any of the inputs.
 *
 * ```
 * mapKeysObj({a: "hello", b: 23}, {a: (x) => x + " world", b: 42});
 * // { a: 'hello world', b: 42 }
 * ```
 *
 * @param src
 * @param xs
 */
export function mergeApplyObj<V>(src: IObjectOf<V>, xs: IObjectOf<V | ((x: V) => V)>) {
    const res: any = { ...src };
    for (let k in xs) {
        let v = xs[k];
        isFunction(v) && (v = v(res[k]));
        res[k] = v;
    }
    return res;
}
