import { implementsFunction } from "./implements-function.js";
import { isIterable } from "./is-iterable.js";

/**
 * Returns true if `x` is an instantiated ES6 generator (i.e. it
 * {@link isIterable} and {@link implementsFunction} `next`).
 *
 * @param x
 */
export const isGenerator = (x: any): x is Generator =>
	isIterable(x) && implementsFunction(x, "next");
