// SPDX-License-Identifier: Apache-2.0
import type { VecOpSGV, VecOpSGVN } from "./api.js";

/**
 * Like {@link relu} but for nD strided vectors.
 *
 * @remarks
 * Also see {@link reluNS} for leaky version.
 *
 * @param o - output vector
 * @param a - input vector
 * @param num - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const reluS: VecOpSGV = (
	out,
	a,
	num,
	io = 0,
	ia = 0,
	so = 1,
	sa = 1
) => {
	!out && (out = a);
	for (let i = num; i-- > 0; ) {
		const x = a[ia + i * sa];
		out[io + i * so] = x >= 0 ? x : 0;
	}
	return out;
};

/**
 * Like {@link reluN} but for nD strided vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - gradient slope
 * @param num - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const reluNS: VecOpSGVN = (
	out,
	a,
	n,
	num,
	io = 0,
	ia = 0,
	so = 1,
	sa = 1
) => {
	!out && (out = a);
	for (let i = num; i-- > 0; ) {
		const x = a[ia + i * sa];
		out[io + i * so] = x >= 0 ? x : x * n;
	}
	return out;
};
