import { isFunction } from "@thi.ng/checks/is-function";
import { IObjectOf } from "@thi.ng/api/api";

/**
 * Similar to `mapKeysObj()`, but for ES6 Maps instead of plain objects.
 *
 * @param src
 * @param xs
 */
export function mapKeysMap<K, V>(src: Map<K, V>, xs: Map<K, V | ((x: V) => V)>) {
    const res: any = { ...src };
    for (let p of xs) {
        let [k, v] = p;
        if (isFunction(v)) {
            v = v(res[k]);
        }
        res.set(k, v);
    }
    return res;
}

/**
 * Similar to `mergeObj()`, but only supports 2 args and any function
 * values in `xs` will be called with respective value in `src` to
 * produce new value for that key. Returns new merged object and does
 * not modify any of the inputs.
 *
 * ```
 * mapKeysObj({a: "hello", b: 23}, {a: (x) => x + " world", b: 42});
 * // { a: 'hello world', b: 42 }
 * ```
 *
 * @param src
 * @param xs
 */
export function mapKeysObj<V>(src: IObjectOf<V>, xs: IObjectOf<V | ((x: V) => V)>) {
    const res: any = { ...src };
    for (let k in xs) {
        let v = xs[k];
        if (isFunction(v)) {
            v = v(res[k]);
        }
        res[k] = v;
    }
    return res;
}
