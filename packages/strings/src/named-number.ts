// SPDX-License-Identifier: Apache-2.0
import type { Stringer } from "./api.js";
import { int } from "./int.js";

/**
 * Array of the english names of digits 0-9
 */
export const NAMED_DIGITS = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

/**
 * Higher-order formatter. Takes an array of named numbers (e.g. `["zero",
 * "one", "two"...]`) and returns a function which accepts any number and either
 * returns the corresponding name (from the given array) or otherwise the result
 * of {@link int}.
 *
 * @remarks
 * The default names used are {@link NAMED_DIGITS}.
 *
 * @example
 * ```ts tangle:../export/named-number.ts
 * import { namedNumber } from "@thi.ng/strings";
 *
 * console.log(namedNumber()(9));
 * // "nine"
 *
 * console.log(namedNumber()(10));
 * // "10"
 *
 * console.log(namedNumber(["null", "eins", "zwei"])(2));
 * // "zwei"
 * ```
 *
 * @param names
 */
export const namedNumber =
	(names: string[] = NAMED_DIGITS): Stringer<number> =>
	(x) =>
		x >= 0 && x < names.length ? names[x | 0] : int(x);
