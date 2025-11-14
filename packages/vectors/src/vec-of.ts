// SPDX-License-Identifier: Apache-2.0
/**
 * Returns new vector of `size` with all components set to `n` (default: 0).
 *
 * @param size -
 * @param n -
 */
export const vecOf = (size: number, n = 0) => new Array(size).fill(n);

/**
 * Returns new one-hot vector of given `size` with `hot` element index (in
 * `[0..size)` range). By default the `hot` element will be set to 1.0, but can
 * be configured via optional `value`.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/One-hot
 *
 * @param size -
 * @param hot -
 * @param value -
 */
export const oneHot = (size: number, hot: number, value = 1) => {
	const res = vecOf(size);
	res[hot] = value;
	return res;
};
