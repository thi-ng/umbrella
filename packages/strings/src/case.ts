import { Stringer } from "./api";

/**
 * Uppercase string formatter.
 *
 * @param x string to transform
 */
export const upper: Stringer<string> =
    (x: string) => x.toUpperCase();

/**
 * Lowercase string formatter.
 *
 * @param x string to transform
 */
export const lower: Stringer<string> =
    (x: string) => x.toLowerCase();

/**
 * String formatter which capitalizes first character.
 *
 * @param x string to transform
 */
export const capitalize: Stringer<string> =
    (x: string) => x[0].toUpperCase() + x.substr(1);

/**
 * Converts a CamelCase string into kebab case, with optional custom
 * delimiter (`-` by default).
 *
 * TODO: Currently broken in Safari & FF due to usage of TC39 stage 4
 * RegEx look-behind expression:
 *
 * https://github.com/tc39/proposal-regexp-lookbehind
 *
 * ```
 * kebab("FooBar23Baz");
 * // "foo-bar23-baz"
 * ```
 *
 * @param x
 * @param delim
 */
export const kebab: Stringer<string> =
    (x: string, delim = "-") =>
        lower(
            x.replace(
                /(?<=[a-z0-9\u00e0-\u00fd])(?=[A-Z\u00c0-\u00dd])/g,
                (_, i) => (i ? delim : "")
            )
        );

/**
 * Short for `kebab` using `_` as delimiter.
 *
 * @param x
 */
export const snake = (x: string) => kebab(x, "_");

/**
 * Converts a kebab-case or snake_case string into CamelCase. Uses `-`
 * as default delimiter.
 *
 * @param x
 * @param delim
 */
export const camel: Stringer<string> =
    (x: string, delim = "-") =>
        lower(x).replace(
            new RegExp(`\\${delim}+(\\w)`, "g"),
            (_, c) => upper(c)
        );
