import type { FnS, Stringer } from "./api.js";

/**
 * Uppercase string formatter.
 *
 * @param x - string to transform
 */
export const upper: FnS = (x) => x.toUpperCase();

/**
 * Lowercase string formatter.
 *
 * @param x - string to transform
 */
export const lower: FnS = (x) => x.toLowerCase();

/**
 * String formatter which capitalizes first character.
 *
 * @param x - string to transform
 */
export const capitalize: FnS = (x) => x[0].toUpperCase() + x.substring(1);

/**
 * Converts a CamelCase string into kebab case, with optional custom
 * delimiter (`-` by default).
 *
 * @example
 * ```ts
 * kebab("FooBar23Baz");
 * // "foo-bar23-baz"
 * ```
 *
 * @param x -
 * @param delim -
 */
export const kebab: Stringer<string> = (x, delim = "-") =>
	lower(
		x.replace(
			// TC39
			// /(?<=[a-z0-9\u00e0-\u00fd])(?=[A-Z\u00c0-\u00dd])/g,
			// (_, i) => (i ? delim : "")
			/([a-z0-9\u00e0-\u00fd])([A-Z\u00c0-\u00dd])/g,
			(_, a, b) => a + delim + b
		)
	);

/**
 * Short for {@link kebab} using `_` as delimiter.
 *
 * @param x -
 */
export const snake: FnS = (x) => kebab(x, "_");

/**
 * Uppercase version of {@link snake}.
 *
 * @param x -
 */
export const upperSnake: FnS = (x) => snake(x).toUpperCase();

/**
 * Converts a kebab-case or snake_case string into CamelCase. Uses `-`
 * as default delimiter.
 *
 * @param x -
 * @param delim -
 */
export const camel: Stringer<string> = (x, delim = "-") =>
	lower(x).replace(new RegExp(`\\${delim}+(\\w)`, "g"), (_, c) => upper(c));
