import { comp as _comp } from "@thi.ng/compose/comp";

import { Transducer } from "../api";

export function comp<A, B>(a: Transducer<A, B>): Transducer<A, B>;
export function comp<A, B, C>(a: Transducer<A, B>, b: Transducer<B, C>): Transducer<A, C>;
export function comp<A, B, C, D>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>): Transducer<A, D>;
export function comp<A, B, C, D, E>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>): Transducer<A, E>;
export function comp<A, B, C, D, E, F>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>): Transducer<A, F>;
export function comp<A, B, C, D, E, F, G>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>): Transducer<A, G>;
export function comp<A, B, C, D, E, F, G, H>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>): Transducer<A, H>;
export function comp<A, B, C, D, E, F, G, H, I>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>): Transducer<A, I>;
export function comp<A, B, C, D, E, F, G, H, I, J>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>, i: Transducer<I, J>): Transducer<A, J>;
export function comp<A, B, C, D, E, F, G, H, I, J, K>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>, i: Transducer<I, J>, j: Transducer<J, K>): Transducer<A, K>;
export function comp<A, B, C, D, E, F, G, H, I, J, K>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>, i: Transducer<I, J>, j: Transducer<J, K>, ...fns: Transducer<any, any>[]): Transducer<A, any>;
export function comp(...fns: any[]) {
    return _comp.apply(null, fns);
}
