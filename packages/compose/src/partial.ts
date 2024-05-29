import type {
	FnAny,
	FnO,
	FnO2,
	FnO3,
	FnO4,
	FnO5,
	FnO6,
	FnO7,
	FnO8,
} from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

export function partial<A, T>(fn: FnO<A, T>, a: A): FnAny<T>;
export function partial<A, B, T>(fn: FnO2<A, B, T>, a: A, b: B): FnAny<T>;
export function partial<A, B, C, T>(
	fn: FnO3<A, B, C, T>,
	a: A,
	b: B,
	c: C
): FnAny<T>;
export function partial<A, B, C, D, T>(
	fn: FnO4<A, B, C, D, T>,
	a: A,
	b: B,
	c: C,
	d: D
): FnAny<T>;
export function partial<A, B, C, D, E, T>(
	fn: FnO5<A, B, C, D, E, T>,
	a: A,
	b: B,
	c: C,
	d: D,
	e: E
): FnAny<T>;
export function partial<A, B, C, D, E, F, T>(
	fn: FnO6<A, B, C, D, E, F, T>,
	a: A,
	b: B,
	c: C,
	d: D,
	e: E,
	f: F
): FnAny<T>;
export function partial<A, B, C, D, E, F, G, T>(
	fn: FnO7<A, B, C, D, E, F, G, T>,
	a: A,
	b: B,
	c: C,
	d: D,
	e: E,
	f: F,
	g: G
): FnAny<T>;
export function partial<A, B, C, D, E, F, G, H, T>(
	fn: FnO8<A, B, C, D, E, F, G, H, T>,
	a: A,
	b: B,
	c: C,
	d: D,
	e: E,
	f: F,
	g: G,
	h: H
): FnAny<T>;
export function partial(fn: any, ...args: any[]) {
	let [a, b, c, d, e, f, g, h] = args;
	switch (args.length) {
		case 1:
			return (...args: any[]) => fn(a, ...args);
		case 2:
			return (...args: any[]) => fn(a, b, ...args);
		case 3:
			return (...args: any[]) => fn(a, b, c, ...args);
		case 4:
			return (...args: any[]) => fn(a, b, c, d, ...args);
		case 5:
			return (...args: any[]) => fn(a, b, c, d, e, ...args);
		case 6:
			return (...args: any[]) => fn(a, b, c, d, e, f, ...args);
		case 7:
			return (...args: any[]) => fn(a, b, c, d, e, f, g, ...args);
		case 8:
			return (...args: any[]) => fn(a, b, c, d, e, f, g, h, ...args);
		default:
			illegalArgs();
	}
}
