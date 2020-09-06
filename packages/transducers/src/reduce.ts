import type { Fn0, FnAny } from "@thi.ng/api";
import { implementsFunction, isArrayLike, isIterable } from "@thi.ng/checks";
import { illegalArity } from "@thi.ng/errors";
import type { IReducible, Reducer, ReductionFn } from "./api";
import { isReduced, unreduced } from "./reduced";

const parseArgs = (args: any[]) =>
    args.length === 2
        ? [undefined, args[1]]
        : args.length === 3
        ? [args[1], args[2]]
        : illegalArity(args.length);

export function reduce<A, B>(rfn: Reducer<A, B>, xs: Iterable<B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, acc: A, xs: Iterable<B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, xs: IReducible<A, B>): A;
// prettier-ignore
export function reduce<A, B>(rfn: Reducer<A, B>, acc: A, xs: IReducible<A, B>): A;
export function reduce<A, B>(...args: any[]): A {
    const rfn = args[0];
    const init = rfn[0];
    const complete = rfn[1];
    const reduce = rfn[2];
    args = parseArgs(args);
    const acc: A = args[0] == null ? init() : args[0];
    const xs: Iterable<B> | IReducible<A, B> = args[1];
    return unreduced(
        complete(
            implementsFunction(xs, "$reduce")
                ? (<IReducible<A, B>>xs).$reduce(reduce, acc)
                : isArrayLike(xs)
                ? reduceArray(reduce, acc, xs)
                : reduceIterable(reduce, acc, <Iterable<B>>xs)
        )
    );
}

const reduceArray = <A, B>(
    rfn: ReductionFn<A, B>,
    acc: A,
    xs: ArrayLike<B>
) => {
    for (let i = 0, n = xs.length; i < n; i++) {
        acc = <any>rfn(acc, xs[i]);
        if (isReduced(acc)) {
            acc = (<any>acc).deref();
            break;
        }
    }
    return acc;
};

const reduceIterable = <A, B>(
    rfn: ReductionFn<A, B>,
    acc: A,
    xs: Iterable<B>
) => {
    for (let x of xs) {
        acc = <any>rfn(acc, x);
        if (isReduced(acc)) {
            acc = (<any>acc).deref();
            break;
        }
    }
    return acc;
};

/**
 * Convenience helper for building a full {@link Reducer} using the identity
 * function (i.e. `(x) => x`) as completion step (true for 90% of all
 * bundled transducers).
 *
 * @param init - init step of reducer
 * @param rfn - reduction step of reducer
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
