import { U16, U32 } from "./radix.js";

export const ESCAPES: Record<string, string> = {
    0: "\0",
    b: "\b",
    t: "\t",
    r: "\r",
    v: "\v",
    f: "\f",
    n: "\n",
    "'": "'",
    '"': '"',
    "\\": "\\",
};

export const ESCAPES_REV: Record<number, string> = {
    0: "0",
    8: "b",
    9: "t",
    10: "n",
    11: "v",
    12: "f",
    13: "r",
    33: "'",
    34: '"',
    92: "\\",
};

/**
 * Escapes all non-ASCII characters (and well-known 0x0x control chars) using
 * backslash escape sequences.
 *
 * @remarks
 * - Well-known low-ASCII control chars will be escaped using simple `\`, e.g.
 *   0x0a => `\n`
 * - Non-BMP chars will be escaped using `\Uxxxxxxxx`
 * - Chars outside 0x20 - 0x7e range will be escaped using `\uxxxxx`
 *
 * @param src - 
 */
export const escape = (src: string) =>
    src
        .replace(
            /[\0\b\t\n\v\f\r'"\\]/g,
            (x) => `\\${ESCAPES_REV[x.charCodeAt(0)!]}`
        )
        .replace(/[\ud800-\udfff]{2}/g, (x) => `\\U${U32(x.codePointAt(0)!)}`)
        .replace(/[^\u0020-\u007e]/g, (x) => `\\u${U16(x.charCodeAt(0))}`);

/**
 * Replaces `\uxxxx` UTF-16 escapes, full `\Uxxxxxxxx` UTF-32 codepoint escapes
 * and other well-known backslash escape sequences (see {@link ESCAPES}) with
 * the characters they represent.
 *
 * @remarks
 * Any unknown named escape sequences (e.g. `\1`) will remain as is.
 *
 * - https://en.wikipedia.org/wiki/UTF-16#Code_points_from_U+010000_to_U+10FFFF
 * - https://www.unicode.org/charts/
 * - https://www.branah.com/unicode-converter
 *
 * @example
 * ```ts
 * unescape("\\ud83d\\ude0e \\U0001f60e")
 * // '😎'
 * ```
 *
 * @param src - 
 */
export const unescape = (src: string) =>
    src
        .replace(/\\u([0-9a-fA-F]{4})/g, (_, id) =>
            String.fromCharCode(parseInt(id, 16))
        )
        .replace(/\\U([0-9a-fA-F]{8})/g, (_, id) =>
            String.fromCodePoint(parseInt(id, 16))
        )
        .replace(/\\([0btnvfr'"\\])/g, (_, id) => ESCAPES[id]);
