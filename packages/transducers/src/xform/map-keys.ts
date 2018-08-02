import { IObjectOf } from "@thi.ng/api/api";

import { Transducer } from "../api";
import { map } from "./map";

/**
 * Takes a `keys` object of transformation functions and returns a
 * transducer which expects object values. For each input `x` then calls
 * transformation functions for each key `k` in `keys`. I.e. executes
 * `keys[k](x[k])` and reassigns result. By default creates a shallow
 * copy of each `x`.
 *
 * ```
 * [...iterator(
 *   mapKeys({
 *     a: (x) => x != null ? x * 10 : x,
 *     b: (x) => x != null ? x * 100: "n/a"
 *   }),
 *   [{a: 1, b: 2}, {c: 3, d: 4}]
 * )]
 * // [ { a: 10, b: 200 }, { c: 3, d: 4, b: 'n/a', a: undefined } ]
 * ```
 *
 * @param keys object of transformation functions
 * @param copy if true, creates a shallow copy of each incoming value
 */
export function mapKeys(keys: IObjectOf<(x: any) => any>, copy = true): Transducer<any, any> {
    return map((x) => {
        const res = copy ? Object.assign({}, x) : x;
        for (let k in keys) {
            res[k] = keys[k](x[k]);
        }
        return res;
    });
}
