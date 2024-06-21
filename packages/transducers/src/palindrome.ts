import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import { concat } from "./concat.js";
import { reverse } from "./reverse.js";
import { str } from "./str.js";
import { symmetric } from "./symmetric.js";

/**
 * Returns the concatentation of `x` with its own duplicate in reverse
 * order. If input is an iterable, it MUST be finite!
 *
 * @remarks
 * In the general case, this is similar to `concat(x, reverse(x))`,
 * though this function keeps input type intact.
 *
 * Uses {@link symmetric}.for all inputs other than arrays or strings.
 *
 * @example
 * ```ts tangle:../export/palindrome.ts
 * import { palindrome, range } from "@thi.ng/transducers";
 *
 * console.log(
 *   palindrome("hello")
 * );
 * // "helloolleh"
 *
 * console.log(
 *   palindrome([1, 2, 3])
 * );
 * // [1, 2, 3, 3, 2, 1]
 *
 * console.log(
 *   [...palindrome(range(3))]
 * );
 * // [ 0, 1, 2, 2, 1, 0 ]
 * ```
 *
 * @param x -
 */
export function palindrome(x: string): string;
export function palindrome<T>(x: T[]): T[];
export function palindrome<T>(x: Iterable<T>): Iterable<T>;
export function palindrome(x: any): any {
	return isString(x)
		? str("", concat([x], reverse(x)))
		: isArray(x)
		? x.concat(x.slice().reverse())
		: symmetric(x);
}
