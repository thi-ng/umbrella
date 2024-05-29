import type { Fn, FnA } from "@thi.ng/api";

export function juxt<T, A>(a: Fn<T, A>): Fn<T, [A]>;
export function juxt<T, A, B>(a: Fn<T, A>, b: Fn<T, B>): Fn<T, [A, B]>;
export function juxt<T, A, B, C>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>
): Fn<T, [A, B, C]>;
export function juxt<T, A, B, C, D>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>,
	d: Fn<T, D>
): Fn<T, [A, B, C, D]>;
export function juxt<T, A, B, C, D, E>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>,
	d: Fn<T, D>,
	e: Fn<T, E>
): Fn<T, [A, B, C, D, E]>;
export function juxt<T, A, B, C, D, E, F>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>,
	d: Fn<T, D>,
	e: Fn<T, E>,
	f: Fn<T, F>
): Fn<T, [A, B, C, D, E, F]>;
export function juxt<T, A, B, C, D, E, F, G>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>,
	d: Fn<T, D>,
	e: Fn<T, E>,
	f: Fn<T, F>,
	g: Fn<T, G>
): Fn<T, [A, B, C, D, E, F, G]>;
export function juxt<T, A, B, C, D, E, F, G, H>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>,
	d: Fn<T, D>,
	e: Fn<T, E>,
	f: Fn<T, F>,
	g: Fn<T, G>,
	h: Fn<T, H>
): Fn<T, [A, B, C, D, E, F, G, H]>;
export function juxt<T, A, B, C, D, E, F, G, H>(
	a: Fn<T, A>,
	b: Fn<T, B>,
	c: Fn<T, C>,
	d: Fn<T, D>,
	e: Fn<T, E>,
	f: Fn<T, F>,
	g: Fn<T, G>,
	h: Fn<T, H>,
	...args: Fn<T, any>[]
): Fn<T, any[]>;
export function juxt<T>(...fns: Fn<any, any>[]) {
	const [a, b, c, d, e, f, g, h] = fns;
	switch (fns.length) {
		case 1:
			return (x: T) => [a(x)];
		case 2:
			return (x: T) => [a(x), b(x)];
		case 3:
			return (x: T) => [a(x), b(x), c(x)];
		case 4:
			return (x: T) => [a(x), b(x), c(x), d(x)];
		case 5:
			return (x: T) => [a(x), b(x), c(x), d(x), e(x)];
		case 6:
			return (x: T) => [a(x), b(x), c(x), d(x), e(x), f(x)];
		case 7:
			return (x: T) => [a(x), b(x), c(x), d(x), e(x), f(x), g(x)];
		case 8:
			return (x: T) => [a(x), b(x), c(x), d(x), e(x), f(x), g(x), h(x)];
		default:
			return (x: T) => {
				let res = new Array(fns.length);
				for (let i = fns.length; i-- > 0; ) {
					res[i] = fns[i](x);
				}
				return res;
			};
	}
}

/**
 * Async version of {@link juxt}. Returns an async function which takes a single
 * arg `x`, calls all given functions with `x` and then waits for all results
 * before returning them as tuple.
 *
 * @param a
 */
export function juxtAsync<T, A>(a: FnA<T, A>): FnA<T, [A]>;
export function juxtAsync<T, A, B>(a: FnA<T, A>, b: FnA<T, B>): FnA<T, [A, B]>;
export function juxtAsync<T, A, B, C>(
	a: FnA<T, A>,
	b: FnA<T, B>,
	c: FnA<T, C>
): FnA<T, [A, B, C]>;
export function juxtAsync<T, A, B, C, D>(
	a: FnA<T, A>,
	b: FnA<T, B>,
	c: FnA<T, C>,
	d: FnA<T, D>
): FnA<T, [A, B, C, D]>;
export function juxtAsync<T, A, B, C, D, E>(
	a: FnA<T, A>,
	b: FnA<T, B>,
	c: FnA<T, C>,
	d: FnA<T, D>,
	e: FnA<T, E>
): FnA<T, [A, B, C, D, E]>;
export function juxtAsync<T, A, B, C, D, E, F>(
	a: FnA<T, A>,
	b: FnA<T, B>,
	c: FnA<T, C>,
	d: FnA<T, D>,
	e: FnA<T, E>,
	f: FnA<T, F>
): FnA<T, [A, B, C, D, E, F]>;
export function juxtAsync<T, A, B, C, D, E, F, G>(
	a: FnA<T, A>,
	b: FnA<T, B>,
	c: FnA<T, C>,
	d: FnA<T, D>,
	e: FnA<T, E>,
	f: FnA<T, F>,
	g: FnA<T, G>
): FnA<T, [A, B, C, D, E, F, G]>;
export function juxtAsync<T, A, B, C, D, E, F, G, H>(
	a: FnA<T, A>,
	b: FnA<T, B>,
	c: FnA<T, C>,
	d: FnA<T, D>,
	e: FnA<T, E>,
	f: FnA<T, F>,
	g: FnA<T, G>,
	h: FnA<T, H>
): FnA<T, [A, B, C, D, E, F, G, H]>;
export function juxtAsync<T, A, B, C, D, E, F, G, H>(
	a: FnA<T, A>,
	b: FnA<T, B>,
	c: FnA<T, C>,
	d: FnA<T, D>,
	e: FnA<T, E>,
	f: FnA<T, F>,
	g: FnA<T, G>,
	h: FnA<T, H>,
	...args: FnA<T, any>[]
): FnA<T, any[]>;
export function juxtAsync<T>(...fns: Fn<any, Promise<any>>[]) {
	return async (x: T) => await Promise.all(fns.map((f) => f(x)));
}
