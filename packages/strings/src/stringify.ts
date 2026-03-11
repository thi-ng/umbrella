// SPDX-License-Identifier: Apache-2.0
import type { Stringer } from "./api.js";

/**
 * Higher order version of `JSON.stringify()` with the option to treat top-level
 * strings and numbers differently (i.e. NOT if they're nested values!). If
 * `all` is `false` (default), strings and numbers are simply converted using
 * `String(x)`. If `indent` is given, it will be used for `JSON.stringify(x,
 * null, indent)`
 *
 * @remarks
 * Special treatment for the following types:
 *
 * - `Error`: uses `.stack` or `.message` string properties
 * - `RegExp`: use `.source` string property
 *
 * @example
 * ```ts tangle:../export/stringify.ts
 * import { stringify } from "@thi.ng/strings";
 *
 * console.log(
 *   stringify()("hello")
 * );
 * // hello
 *
 * console.log(
 *   stringify(true)("hello")
 * );
 * // "hello"
 *
 * console.log(
 *   stringify()({ a: "hello" })
 * );
 * // { "a": "hello" }
 *
 * console.log(
 *   stringify()(/\/abc/)
 * );
 * // "\\/abc"
 *
 * try {
 *   throw new Error("eek");
 * } catch(e) {
 *   console.log(stringify()(e));
 * }
 * // "Error: eek\n    at <...>/stringify.ts:22:13\n    at moduleEvaluation (native:1:11)..."
 * ```
 *
 * @param all -
 * @param indent -
 */
export const stringify =
	(all = false, indent?: number): Stringer<any> =>
	(x) =>
		all || (typeof x !== "string" && typeof x !== "number")
			? JSON.stringify(
					x instanceof Error
						? (x.stack ?? x.message)
						: x instanceof RegExp
							? x.source
							: x,
					null,
					indent,
				)
			: String(x);
