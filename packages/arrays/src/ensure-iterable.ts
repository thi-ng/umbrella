// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/**
 * Attempts to obtain an iterator from `x` and throws error if `x` is
 * not iterable.
 *
 * @param x -
 */
export const ensureIterable = <T = any>(x: any): Iterable<T> => {
	(x == null || !x[Symbol.iterator]) &&
		illegalArgs(`value is not iterable: ${x}`);
	return x;
};
