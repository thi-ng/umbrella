import type { Fn, IObjectOf } from "@thi.ng/api";
import type { Transducer } from "./api.js";
import { __iter } from "./iterator.js";
import { map } from "./map.js";

/**
 * Transducer. Similar to {@link (map:1)}, but expects object values and
 * the given function `fn` is applied to each enumerable property value
 * and the results reassigned to their original keys.
 *
 * @remarks
 * By default, a shallow copy of the source object is created. The
 * resulting object is then used as the result of this transducer.
 *
 * @example
 * ```ts
 * [...mapVals((x)=> x * 10, [{a: 1, b: 2}, {c: 3, d: 4}])]
 * // [ { a: 10, b: 20 }, { c: 30, d: 40 } ]
 * ```
 *
 * @param fn -
 * @param copy - if true (default), creates a shallow copy of each
 * incoming value
 */
export function mapVals<A, B>(
    fn: Fn<A, B>,
    copy?: boolean
): Transducer<IObjectOf<A>, IObjectOf<B>>;
export function mapVals<A, B>(
    fn: Fn<A, B>,
    src: Iterable<IObjectOf<A>>
): IterableIterator<IObjectOf<B>>;
export function mapVals<A, B>(
    fn: Fn<A, B>,
    copy: boolean,
    src: Iterable<IObjectOf<A>>
): IterableIterator<IObjectOf<B>>;
export function mapVals<A, B>(...args: any[]): any {
    const iter = __iter(mapVals, args);
    if (iter) {
        return iter;
    }
    const fn: Fn<A, B> = args[0];
    const copy = args[1] !== false;
    return map((x: any) => {
        const res: any = copy ? {} : x;
        for (let k in x) {
            res[k] = fn(x[k]);
        }
        return <any>res;
    });
}
