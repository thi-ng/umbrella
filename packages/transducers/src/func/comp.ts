import { comp as _comp } from "@thi.ng/compose/comp";
import type { Transducer, TxLike } from "../api";
import { ensureTransducer } from "../internal/ensure";

/**
 * Transducer composition. Returns new transducer which applies given
 * transducers in left-to-right order.
 *
 * @remarks
 * Fast (loop-free) paths are provided for up to 10 args (transducers).
 */
export function comp<A, B>(a: TxLike<A, B>): Transducer<A, B>;
export function comp<A, B, C>(
    a: TxLike<A, B>,
    b: TxLike<B, C>
): Transducer<A, C>;
export function comp<A, B, C, D>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>
): Transducer<A, D>;
export function comp<A, B, C, D, E>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>
): Transducer<A, E>;
export function comp<A, B, C, D, E, F>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>,
    e: TxLike<E, F>
): Transducer<A, F>;
export function comp<A, B, C, D, E, F, G>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>,
    e: TxLike<E, F>,
    f: TxLike<F, G>
): Transducer<A, G>;
export function comp<A, B, C, D, E, F, G, H>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>,
    e: TxLike<E, F>,
    f: TxLike<F, G>,
    g: TxLike<G, H>
): Transducer<A, H>;
export function comp<A, B, C, D, E, F, G, H, I>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>,
    e: TxLike<E, F>,
    f: TxLike<F, G>,
    g: TxLike<G, H>,
    h: TxLike<H, I>
): Transducer<A, I>;
export function comp<A, B, C, D, E, F, G, H, I, J>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>,
    e: TxLike<E, F>,
    f: TxLike<F, G>,
    g: TxLike<G, H>,
    h: TxLike<H, I>,
    i: TxLike<I, J>
): Transducer<A, J>;
export function comp<A, B, C, D, E, F, G, H, I, J, K>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>,
    e: TxLike<E, F>,
    f: TxLike<F, G>,
    g: TxLike<G, H>,
    h: TxLike<H, I>,
    i: TxLike<I, J>,
    j: TxLike<J, K>
): Transducer<A, K>;
export function comp<A, B, C, D, E, F, G, H, I, J, K>(
    a: TxLike<A, B>,
    b: TxLike<B, C>,
    c: TxLike<C, D>,
    d: TxLike<D, E>,
    e: TxLike<E, F>,
    f: TxLike<F, G>,
    g: TxLike<G, H>,
    h: TxLike<H, I>,
    i: TxLike<I, J>,
    j: TxLike<J, K>,
    ...fns: TxLike<any, any>[]
): Transducer<A, any>;
export function comp(...fns: any[]) {
    fns = fns.map(ensureTransducer);
    return _comp.apply(null, <any>fns);
}
