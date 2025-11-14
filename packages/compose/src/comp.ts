// SPDX-License-Identifier: Apache-2.0
import type { Fn, FnA, FnAny, FnAnyA } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors/illegal-arity";

/**
 * Returns the right-to-left composition of given functions. I.e. when
 * the composed function is called, the given right most function is
 * called first (supports any number of args) and its return value then
 * used as sole argument for the next function etc. Eventually returns
 * result of left-most function.
 */
export function comp<A, B>(a: FnAny<A>): FnAny<A>;
export function comp<A, B>(a: Fn<B, A>, b: FnAny<B>): FnAny<A>;
export function comp<A, B, C>(a: Fn<B, A>, b: Fn<C, B>, c: FnAny<C>): FnAny<A>;
export function comp<A, B, C, D>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: FnAny<D>
): FnAny<A>;
export function comp<A, B, C, D, E>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: Fn<E, D>,
	e: FnAny<D>
): FnAny<A>;
export function comp<A, B, C, D, E, F>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: Fn<E, D>,
	e: Fn<F, E>,
	f: FnAny<F>
): FnAny<A>;
export function comp<A, B, C, D, E, F, G>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: Fn<E, D>,
	e: Fn<F, E>,
	f: Fn<G, F>,
	g: FnAny<G>
): FnAny<A>;
export function comp<A, B, C, D, E, F, G, H>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: Fn<E, D>,
	e: Fn<F, E>,
	f: Fn<G, F>,
	g: Fn<H, G>,
	h: FnAny<H>
): FnAny<A>;
export function comp<A, B, C, D, E, F, G, H, I>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: Fn<E, D>,
	e: Fn<F, E>,
	f: Fn<G, F>,
	g: Fn<H, G>,
	h: Fn<I, H>,
	i: FnAny<I>
): FnAny<A>;
export function comp<A, B, C, D, E, F, G, H, I, J>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: Fn<E, D>,
	e: Fn<F, E>,
	f: Fn<G, F>,
	g: Fn<H, G>,
	h: Fn<I, H>,
	i: Fn<J, I>,
	j: FnAny<J>
): FnAny<A>;
export function comp<A, B, C, D, E, F, G, H, I, J>(
	a: Fn<B, A>,
	b: Fn<C, B>,
	c: Fn<D, C>,
	d: Fn<E, D>,
	e: Fn<F, E>,
	f: Fn<G, F>,
	g: Fn<H, G>,
	h: Fn<I, H>,
	i: Fn<J, I>,
	j: Fn<any, J>,
	...fns: FnAny<any>[]
): FnAny<A>;
export function comp(...fns: any[]): any {
	let [a, b, c, d, e, f, g, h, i, j] = fns;
	switch (fns.length) {
		case 0:
			illegalArity(0);
		case 1:
			return a;
		case 2:
			return (...args: any[]) => a(b(...args));
		case 3:
			return (...args: any[]) => a(b(c(...args)));
		case 4:
			return (...args: any[]) => a(b(c(d(...args))));
		case 5:
			return (...args: any[]) => a(b(c(d(e(...args)))));
		case 6:
			return (...args: any[]) => a(b(c(d(e(f(...args))))));
		case 7:
			return (...args: any[]) => a(b(c(d(e(f(g(...args)))))));
		case 8:
			return (...args: any[]) => a(b(c(d(e(f(g(h(...args))))))));
		case 9:
			return (...args: any[]) => a(b(c(d(e(f(g(h(i(...args)))))))));
		case 10:
		default:
			const fn = (...args: any[]) =>
				a(b(c(d(e(f(g(h(i(j(...args))))))))));
			return fns.length === 10 ? fn : (<any>comp)(fn, ...fns.slice(10));
	}
}

/**
 * Similar to {@link comp}, but composes given functions in left-to-right order.
 */
export function compLeft<A>(a: FnAny<A>): FnAny<A>;
export function compLeft<A, B>(a: FnAny<A>, b: Fn<A, B>): FnAny<B>;
export function compLeft<A, B, C>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>
): FnAny<C>;
export function compLeft<A, B, C, D>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>
): FnAny<D>;
export function compLeft<A, B, C, D, E>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>
): FnAny<E>;
export function compLeft<A, B, C, D, E, F>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>
): FnAny<F>;
export function compLeft<A, B, C, D, E, F, G>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>,
	g: Fn<F, G>
): FnAny<G>;
export function compLeft<A, B, C, D, E, F, G, H>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>,
	g: Fn<F, G>,
	h: Fn<G, H>
): FnAny<H>;
export function compLeft<A, B, C, D, E, F, G, H, I>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>,
	g: Fn<F, G>,
	h: Fn<G, H>,
	i: Fn<H, I>
): FnAny<I>;
export function compLeft<A, B, C, D, E, F, G, H, I, J>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>,
	g: Fn<F, G>,
	h: Fn<G, H>,
	i: Fn<H, I>,
	j: Fn<I, J>
): FnAny<J>;
export function compLeft<A, B, C, D, E, F, G, H, I, J>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>,
	g: Fn<F, G>,
	h: Fn<G, H>,
	i: Fn<H, I>,
	j: Fn<I, J>,
	...args: Fn<any, any>[]
): FnAny<any>;
export function compLeft(...fns: any[]): any {
	return comp.apply(null, <any>fns.reverse());
}

/**
 * @deprecated renamed to {@link compLeft}.
 */
export const compL = compLeft;

/**
 * Async version of {@link comp}.
 */
export function compAsync<A, B>(a: FnAnyA<A>): FnAnyA<A>;
export function compAsync<A, B>(a: FnA<B, A>, b: FnAnyA<B>): FnAnyA<A>;
export function compAsync<A, B, C>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnAnyA<C>
): FnAnyA<A>;
export function compAsync<A, B, C, D>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnAnyA<D>
): FnAnyA<A>;
export function compAsync<A, B, C, D, E>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnA<E, D>,
	e: FnAnyA<D>
): FnAnyA<A>;
export function compAsync<A, B, C, D, E, F>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnA<E, D>,
	e: FnA<F, E>,
	f: FnAnyA<F>
): FnAnyA<A>;
export function compAsync<A, B, C, D, E, F, G>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnA<E, D>,
	e: FnA<F, E>,
	f: FnA<G, F>,
	g: FnAnyA<G>
): FnAnyA<A>;
export function compAsync<A, B, C, D, E, F, G, H>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnA<E, D>,
	e: FnA<F, E>,
	f: FnA<G, F>,
	g: FnA<H, G>,
	h: FnAnyA<H>
): FnAnyA<A>;
export function compAsync<A, B, C, D, E, F, G, H, I>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnA<E, D>,
	e: FnA<F, E>,
	f: FnA<G, F>,
	g: FnA<H, G>,
	h: FnA<I, H>,
	i: FnAnyA<I>
): FnAnyA<A>;
export function compAsync<A, B, C, D, E, F, G, H, I, J>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnA<E, D>,
	e: FnA<F, E>,
	f: FnA<G, F>,
	g: FnA<H, G>,
	h: FnA<I, H>,
	i: FnA<J, I>,
	j: FnAnyA<J>
): FnAnyA<A>;
export function compAsync<A, B, C, D, E, F, G, H, I, J>(
	a: FnA<B, A>,
	b: FnA<C, B>,
	c: FnA<D, C>,
	d: FnA<E, D>,
	e: FnA<F, E>,
	f: FnA<G, F>,
	g: FnA<H, G>,
	h: FnA<I, H>,
	i: FnA<J, I>,
	j: FnA<any, J>,
	...fns: FnAnyA<any>[]
): FnAnyA<A>;
export function compAsync(...fns: any[]): any {
	return async (...args: any[]) => {
		let n = fns.length - 1;
		let res = fns[n](...args);
		while (n-- > 0) {
			res = await fns[n](res);
		}
		return res;
	};
}
