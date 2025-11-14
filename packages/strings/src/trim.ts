// SPDX-License-Identifier: Apache-2.0
import { memoizeO } from "@thi.ng/memoize/memoizeo";
import type { Stringer } from "./api.js";

/**
 * Higher order trim function (both sides) with support for user defined
 * trimmable characters (default: whitespace only).
 *
 * @example
 * ```ts tangle:../export/trim.ts
 * import { trim } from "@thi.ng/strings";
 *
 * console.log(
 *   trim()("  Hello   ")
 * );
 * // "Hello"
 *
 * console.log(
 *   trim(" -+")("-+-+- Hello -+-+-")
 * );
 * // "Hello"
 * ```
 *
 * @param chars -
 */
export const trim = memoizeO<string, Stringer<string>>((chars = " \t\n\r") => {
	chars = `(${chars
		.split("")
		.map((x) => `\\${x}`)
		.join("|")})`;
	const re = new RegExp(`(^${chars}+)|(${chars}+$)`, "g");
	return (x) => x.replace(re, "");
});
