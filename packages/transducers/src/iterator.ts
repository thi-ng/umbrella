import { SEMAPHORE } from "@thi.ng/api/api";
import { isIterable } from "@thi.ng/checks/is-iterable";

import { Reducer, Transducer } from "./api";
import { isReduced, unreduced } from "./reduced";
import { push } from "./rfn/push";

/**
 * Takes a transducer and input iterable. Returns iterator of
 * transformed results.
 *
 * @param xform
 * @param xs
 */
export function* iterator<A, B>(xform: Transducer<A, B>, xs: Iterable<A>): IterableIterator<B> {
    const rfn = <Reducer<B[], A>>xform(push());
    const complete = rfn[1];
    const reduce = rfn[2];
    for (let x of xs) {
        const y = reduce([], x);
        if (isReduced(y)) {
            yield* unreduced(complete(y.deref()));
            return;
        }
        if (y.length) {
            yield* y;
        }
    }
    yield* unreduced(complete([]));
}

/**
 * Optimized version of `iterator()` for transducers which are
 * guaranteed to:
 *
 * 1) Only produce none or a single result per input
 * 2) Do not require a `completion` reduction step
 *
 * @param xform
 * @param xs
 */
export function* iterator1<A, B>(xform: Transducer<A, B>, xs: Iterable<A>): IterableIterator<B> {
    const reduce = (<Reducer<B, A>>xform([null, null, (_, x) => x]))[2];
    for (let x of xs) {
        let y = reduce(<any>SEMAPHORE, x);
        if (isReduced(y)) {
            y = unreduced(y.deref());
            if (<any>y !== SEMAPHORE) {
                yield <B>y;
            }
            return;
        }
        if (<any>y !== SEMAPHORE) {
            yield y;
        }
    }
}

/**
 * Helper function used by various transducers to wrap themselves as
 * transforming iterators. Delegates to `iterator1()` by default.
 *
 * @param xform
 * @param args
 * @param impl
 */
export const $iter = (xform: (...xs: any[]) => Transducer<any, any>, args: any[], impl = iterator1) => {
    const n = args.length - 1;
    return isIterable(args[n]) ?
        args.length > 1 ?
            impl(xform.apply(null, args.slice(0, n)), args[n]) :
            impl(xform(), args[0]) :
        undefined;
};
