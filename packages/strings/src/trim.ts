import { memoize1 } from "@thi.ng/memoize/memoize1";
import type { Stringer } from "./api";

/**
 * Higher order trim function (both sides) with support for user defined
 * trimmable characters (default: whitespace only).
 *
 * @example
 * ```ts
 * trim()("  Hello   ")
 * // "Hello"
 *
 * trim(" -+")("-+-+- Hello -+-+-")
 * // "Hello"
 * ```
 *
 * @param chars -
 */
export const trim = memoize1<string, Stringer<string>>((chars = " \t\n\r") => {
    chars = `(${chars
        .split("")
        .map((x) => `\\${x}`)
        .join("|")})`;
    const re = new RegExp(`(^${chars}+)|(${chars}+$)`, "g");
    return (x) => x.replace(re, "");
});
