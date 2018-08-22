import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { illegalArity } from "@thi.ng/errors/illegal-arity";

import { Reducer, IReducible } from "./api";
import { isReduced, unreduced, Reduced } from "./reduced";

export function reduce<A, B>(rfn: Reducer<A, B>, xs: Iterable<B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, acc: A, xs: Iterable<B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, xs: IReducible<A, B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, acc: A, xs: IReducible<A, B>): A;
export function reduce<A, B>(...args: any[]): A {
    let acc: A, xs: Iterable<B> | IReducible<A, B>;
    switch (args.length) {
        case 3:
            xs = args[2];
            acc = args[1];
            break;
        case 2:
            xs = args[1];
            break;
        default:
            illegalArity(args.length);
    }
    const [init, complete, reduce] = args[0];
    acc = acc == null ? init() : acc;
    if (implementsFunction(xs, "$reduce")) {
        acc = <any>(<IReducible<A, B>>xs).$reduce(reduce, acc);
    } else if (isArrayLike(xs)) {
        for (let i = 0, n = xs.length; i < n; i++) {
            acc = <any>reduce(acc, xs[i]);
            if (isReduced(acc)) {
                acc = (<any>acc).deref();
                break;
            }
        }
    } else {
        for (let x of <Iterable<B>>xs) {
            acc = <any>reduce(acc, x);
            if (isReduced(acc)) {
                acc = (<any>acc).deref();
                break;
            }
        }
    }
    return unreduced(complete(acc));
}

/**
 * Convenience helper for building a full `Reducer` using the identity
 * function (i.e. `(x) => x`) as completion step (true for 90% of all
 * bundled transducers).
 *
 * @param init init step of reducer
 * @param rfn reduction step of reducer
 */
export function reducer<A, B>(init: () => A, rfn: (acc: A, x: B) => A | Reduced<A>) {
    return <Reducer<A, B>>[init, (acc) => acc, rfn];
}
