import type { AsyncTransducer } from "./api.js";
import { comp as _comp } from "@thi.ng/compose/comp";
import { ensureAsyncTransducer } from "./ensure.js";

export function comp<A, B>(a: AsyncTransducer<A, B>): AsyncTransducer<A, B>;
export function comp<A, B, C>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>
): AsyncTransducer<A, C>;
export function comp<A, B, C, D>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>
): AsyncTransducer<A, D>;
export function comp<A, B, C, D, E>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>,
	d: AsyncTransducer<D, E>
): AsyncTransducer<A, E>;
export function comp<A, B, C, D, E, F>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>,
	d: AsyncTransducer<D, E>,
	e: AsyncTransducer<E, F>
): AsyncTransducer<A, F>;
export function comp<A, B, C, D, E, F, G>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>,
	d: AsyncTransducer<D, E>,
	e: AsyncTransducer<E, F>,
	f: AsyncTransducer<F, G>
): AsyncTransducer<A, G>;
export function comp<A, B, C, D, E, F, G, H>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>,
	d: AsyncTransducer<D, E>,
	e: AsyncTransducer<E, F>,
	f: AsyncTransducer<F, G>,
	g: AsyncTransducer<G, H>
): AsyncTransducer<A, H>;
export function comp<A, B, C, D, E, F, G, H, I>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>,
	d: AsyncTransducer<D, E>,
	e: AsyncTransducer<E, F>,
	f: AsyncTransducer<F, G>,
	g: AsyncTransducer<G, H>,
	h: AsyncTransducer<H, I>
): AsyncTransducer<A, I>;
export function comp<A, B, C, D, E, F, G, H, I, J>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>,
	d: AsyncTransducer<D, E>,
	e: AsyncTransducer<E, F>,
	f: AsyncTransducer<F, G>,
	g: AsyncTransducer<G, H>,
	h: AsyncTransducer<H, I>,
	i: AsyncTransducer<I, J>
): AsyncTransducer<A, J>;
export function comp<A, B, C, D, E, F, G, H, I, J, K>(
	a: AsyncTransducer<A, B>,
	b: AsyncTransducer<B, C>,
	c: AsyncTransducer<C, D>,
	d: AsyncTransducer<D, E>,
	e: AsyncTransducer<E, F>,
	f: AsyncTransducer<F, G>,
	g: AsyncTransducer<G, H>,
	h: AsyncTransducer<H, I>,
	i: AsyncTransducer<I, J>,
	j: AsyncTransducer<J, K>,
	...fns: AsyncTransducer<any, any>[]
): AsyncTransducer<A, any>;
export function comp(...fns: any[]): any {
	fns = fns.map(ensureAsyncTransducer);
	// @ts-ignore
	return _comp.apply(null, fns);
}
