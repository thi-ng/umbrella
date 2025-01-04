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
export const capitalize: FnS = (x) =>
	x.length ? x[0].toUpperCase() + x.substring(1) : x;

/**
 * Converts a CamelCase string into kebab case, with optional custom
 * delimiter (`-` by default).
 *
 * @remarks
 * See {@link snake} for alternative.
 *
 * @example
 * ```ts tangle:../export/kebab.ts
 * import { kebab } from "@thi.ng/strings";
 *
 * console.log(kebab("FooBar23Baz"));
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
 * @remarks
 * Also see {@link upperSnake} for alternative.
 *
 * @example
 * ```ts tangle:../export/snake.ts
 * import { snake } from "@thi.ng/strings";
 *
 * console.log(snake("FooBar23Baz"));
 * // "foo_bar23_baz"
 * ```
 *
 * @param x -
 */
export const snake: FnS = (x) => kebab(x, "_");

/**
 * Uppercase version of {@link snake}.
 *
 * @remarks
 * Also see {@link snake} for alternative.
 *
 * @param x -
 */
export const upperSnake: FnS = (x) => snake(x).toUpperCase();

/**
 * Converts a kebab-case or snake_case string into camelCase. Uses `-` as
 * default delimiter.
 *
 * @remarks
 * Alse see {@link pascal} for alternative.
 *
 * @example
 * ```ts tangle:../export/camel.ts
 * import { camel } from "@thi.ng/strings";
 *
 * console.log(camel("foo-bar23-baz"));
 * // fooBar23Baz
 *
 * console.log(camel("FOO_BAR23_BAZ", "_"));
 * // fooBar23Baz
 * ```
 *
 * @param x -
 * @param delim -
 */
export const camel: Stringer<string> = (x, delim = "-") =>
	lower(x).replace(new RegExp(`\\${delim}+(\\w)`, "g"), (_, c) => upper(c));

/**
 * Converts a kebab-case or snake_case string into PascalCase. Uses `-` as
 * default delimiter.
 *
 * @example
 * ```ts tangle:../export/pascal.ts
 * import { pascal } from "@thi.ng/strings";
 *
 * console.log(pascal("foo-bar23-baz"));
 * // FooBar23Baz
 *
 * console.log(pascal("FOO_BAR23_BAZ", "_"));
 * // FooBar23Baz
 * ```
 *
 * @param x
 * @param delim
 */
export const pascal: Stringer<string> = (x, delim = "-") =>
	capitalize(camel(x, delim));
