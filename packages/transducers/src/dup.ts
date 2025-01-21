// SPDX-License-Identifier: Apache-2.0
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import { concat } from "./concat.js";

/**
 * Returns the concatentation of `x` with itself. If input is an iterable, it
 * MUST be finite!
 *
 * @remarks
 * Also see the {@link concat}, {@link duplicate}, {@link repeat} and
 * {@link repeatedly} for achieving a different kinds of value duplication.
 *
 * @example
 * ```ts tangle:../export/dup.ts
 * import { dup, range } from "@thi.ng/transducers";
 *
 * console.log(dup("hello"));
 * // "hellohello"
 *
 * console.log(dup([1, 2, 3]));
 * // [ 1, 2, 3, 1, 2, 3 ]
 *
 * console.log([...dup(range(3))]);
 * // [ 0, 1, 2, 0, 1, 2 ]
 * ```
 *
 * @param x -
 */
export function dup(x: string): string;
export function dup<T>(x: T[]): T[];
export function dup<T>(x: Iterable<T>): Iterable<T>;
export function dup(x: any): any {
	return isString(x)
		? x + x
		: isArray(x)
		? x.concat(x)
		: ((x = ensureArray(x)), concat(x, x));
}
