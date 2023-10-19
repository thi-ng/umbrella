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
 * ```ts
 * dup("hello"); // "hellohello"
 * dup([1, 2, 3]); // [1, 2, 3, 1, 2, 3]
 * dup(range(3)); // IterableIterator<number>
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
