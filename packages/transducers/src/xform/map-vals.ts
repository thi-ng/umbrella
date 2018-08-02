import { IObjectOf } from "@thi.ng/api/api";

import { Transducer } from "../api";
import { map } from "./map";

/**
 * Transducer. Similar to `map`, but expects object values and the given
 * function `fn` is applied to each enumerable property value and the
 * results reassigned to their original keys. By default, a shallow copy
 * of the source object is created. The resulting object is then used as
 * the result of this transducer.
 *
 * ```
 * [...iterator(mapVals((x)=> x * 10), [{a: 1, b: 2}, {c: 3, d: 4}])]
 * // [ { a: 10, b: 20 }, { c: 30, d: 40 } ]
 * ```
 *
 * @param fn
 * @param copy if true, creates a shallow copy of each incoming value
 */
export function mapVals<A, B>(fn: (v: A) => B, copy = true): Transducer<IObjectOf<A>, IObjectOf<B>> {
    return map((x) => {
        const res: any = copy ? {} : x;
        for (let k in x) {
            res[k] = fn(x[k]);
        }
        return <any>res;
    });
}
