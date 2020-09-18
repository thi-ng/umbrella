export const ESCAPES: Record<string, string> = {
    0: "\0",
    b: "\b",
    t: "\t",
    r: "\r",
    v: "\v",
    f: "\f",
    n: "\n",
    "\\": "\\",
};

/**
 * Replaces `\uxxxx` UTF-16 unicode escapes and other well-known backslash
 * escape sequences (see {@link ESCAPES}) with their actual characters.
 *
 * @remarks
 * Any unknown escape sequences will remain as is. Any unicode chars outside the
 * UTF-16 range will need to be encoded using surrogate pairs.
 *
 * - https://en.wikipedia.org/wiki/UTF-16#Code_points_from_U+010000_to_U+10FFFF
 * - https://www.branah.com/unicode-converter
 *
 * @example
 * ```ts
 * unescape("\\ud83d\\ude0e")
 * // '😎'
 * ```
 *
 * @param src
 */
export const unescape = (src: string) =>
    src
        .replace(/\\u([0-9a-fA-F]{4})/g, (_, id) =>
            String.fromCharCode(parseInt(id, 16))
        )
        .replace(/\\(\w)/g, (_, id) => ESCAPES[id] || `\\${id}`);
