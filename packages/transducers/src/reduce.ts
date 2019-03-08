import { Fn0, FnAny } from "@thi.ng/api";
import { implementsFunction, isArrayLike, isIterable } from "@thi.ng/checks";
import { illegalArity } from "@thi.ng/errors";
import { IReducible, Reducer, ReductionFn } from "./api";
import { isReduced, unreduced } from "./reduced";

export function reduce<A, B>(rfn: Reducer<A, B>, xs: Iterable<B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, acc: A, xs: Iterable<B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, xs: IReducible<A, B>): A;
export function reduce<A, B>(
    rfn: Reducer<A, B>,
    acc: A,
    xs: IReducible<A, B>
): A;
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
    const rfn = args[0];
    const init = rfn[0];
    const complete = rfn[1];
    const reduce = rfn[2];
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
export const reducer = <A, B>(init: Fn0<A>, rfn: ReductionFn<A, B>) =>
    <Reducer<A, B>>[init, (acc) => acc, rfn];

export const $$reduce = (rfn: FnAny<Reducer<any, any>>, args: any[]) => {
    const n = args.length - 1;
    return isIterable(args[n])
        ? args.length > 1
            ? reduce(rfn.apply(null, args.slice(0, n)), args[n])
            : reduce(rfn(), args[0])
        : undefined;
};
