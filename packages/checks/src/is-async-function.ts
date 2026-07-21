// SPDX-License-Identifier: Apache-2.0
/**
 * Returns true if `x` is an async function.
 *
 * @param x
 */
export const isAsyncFunction = <T extends Function>(x: any): x is T =>
	x != null && Object.prototype.toString.call(x) === "[object AsyncFunction]";
