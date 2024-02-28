import type { Stringer } from "./api.js";

/**
 * Higher order version of `JSON.stringify()` with the option to treat top-level
 * strings and numbers differently (i.e. NOT if they're nested values!). If
 * `all` is `false` (default), strings and numbers are simply converted using
 * `String(x)`. If `indent` is given, it will be used for `JSON.stringify(x,
 * null, indent)`
 *
 * @example
 * ```ts
 * import { stringify } from "@thi.ng/strings";
 *
 * stringify()("hello");
 * // hello
 *
 * stringify(true)("hello");
 * // "hello"
 *
 * stringify()({ a: "hello" })
 * // { "a": "hello" }
 * ```
 *
 * @param all -
 * @param indent -
 */
export const stringify =
	(all = false, indent?: number): Stringer<any> =>
	(x) =>
		all || (typeof x !== "string" && typeof x !== "number")
			? JSON.stringify(x, null, indent)
			: String(x);
