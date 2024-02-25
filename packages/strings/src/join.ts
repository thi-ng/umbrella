import { memoize1 } from "@thi.ng/memoize/memoize1";
import type { Stringer } from "./api.js";

/**
 * Higher-order version of `Array.join()`. Takes separator string `sep`
 * and returns function which accepts an array and joins all elements w/
 * separator into a result string.
 *
 * @example
 * ```ts
 * import { format, join } from "@thi.ng/strings";
 * import { partial } from "@thi.ng/compose";
 *
 * const slashes = join("/");
 *
 * slashes([1, 2, 3]);
 * // "1/2/3"
 *
 * // pre-compose formatter function w/ partial arguments
 * const formatOBJFace = partial(
 *   format, ["f ", slashes, " ", slashes, " ", slashes]
 * );
 *
 * formatOBJFace([1, 2], [3, 4], [5, 6]);
 * // "f 1/2 3/4 5/6"
 * ```
 */
export const join = memoize1<string, Stringer<any[]>>(
	(sep) => (x) => x.join(sep)
);
