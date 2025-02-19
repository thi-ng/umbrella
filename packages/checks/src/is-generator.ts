// SPDX-License-Identifier: Apache-2.0
import { implementsFunction } from "./implements-function.js";
import { isIterable } from "./is-iterable.js";

/**
 * Returns true if `x` is an instantiated ES6 generator (i.e. it
 * {@link isIterable} and {@link implementsFunction} `next`).
 *
 * @param x
 */
export const isGenerator = <T = any>(x: any): x is Generator<T> =>
	isIterable(x) && implementsFunction(x, "next");
