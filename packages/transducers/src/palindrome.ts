import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import { concat } from "./concat";
import { reverse } from "./reverse";
import { str } from "./str";

/**
 * Returns the concatentation of `x` with its own duplicate in reverse
 * order. If input is an iterable, it MUST be finite!
 *
 * @remarks
 * In the general case, this is similar to `concat(x, reverse(x))`,
 * though keeps input type intact.
 *
 * @example
 * ```ts
 * palindrome("hello"); // "helloolleh"
 * palindrome([1, 2, 3]); // [1, 2, 3, 3, 2, 1]
 * palindrome(range(3)); // IterableIterator<number>
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
        : ((x = ensureArray(x)), concat(x, reverse(x)));
}
