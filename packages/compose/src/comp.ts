import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { Fn, FnAny } from "@thi.ng/api";

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
			return (...xs: any[]) => a(b(...xs));
		case 3:
			return (...xs: any[]) => a(b(c(...xs)));
		case 4:
			return (...xs: any[]) => a(b(c(d(...xs))));
		case 5:
			return (...xs: any[]) => a(b(c(d(e(...xs)))));
		case 6:
			return (...xs: any[]) => a(b(c(d(e(f(...xs))))));
		case 7:
			return (...xs: any[]) => a(b(c(d(e(f(g(...xs)))))));
		case 8:
			return (...xs: any[]) => a(b(c(d(e(f(g(h(...xs))))))));
		case 9:
			return (...xs: any[]) => a(b(c(d(e(f(g(h(i(...xs)))))))));
		case 10:
		default:
			const fn = (...xs: any[]) => a(b(c(d(e(f(g(h(i(j(...xs))))))))));
			return fns.length === 10 ? fn : (<any>comp)(fn, ...fns.slice(10));
	}
}

/**
 * Similar to {@link comp}, but composes given functions in left-to-right order.
 */
export function compL<A>(a: FnAny<A>): FnAny<A>;
export function compL<A, B>(a: FnAny<A>, b: Fn<A, B>): FnAny<B>;
export function compL<A, B, C>(a: FnAny<A>, b: Fn<A, B>, c: Fn<B, C>): FnAny<C>;
export function compL<A, B, C, D>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>
): FnAny<D>;
export function compL<A, B, C, D, E>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>
): FnAny<E>;
export function compL<A, B, C, D, E, F>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>
): FnAny<F>;
export function compL<A, B, C, D, E, F, G>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>,
	g: Fn<F, G>
): FnAny<G>;
export function compL<A, B, C, D, E, F, G, H>(
	a: FnAny<A>,
	b: Fn<A, B>,
	c: Fn<B, C>,
	d: Fn<C, D>,
	e: Fn<D, E>,
	f: Fn<E, F>,
	g: Fn<F, G>,
	h: Fn<G, H>
): FnAny<H>;
export function compL<A, B, C, D, E, F, G, H, I>(
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
export function compL<A, B, C, D, E, F, G, H, I, J>(
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
export function compL<A, B, C, D, E, F, G, H, I, J>(
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
	...xs: Fn<any, any>[]
): FnAny<any>;
export function compL(...fns: any[]): any {
	return comp.apply(null, <any>fns.reverse());
}

/**
 * @deprecated renamed to {@link compL}
 */
export const compI = compL;
