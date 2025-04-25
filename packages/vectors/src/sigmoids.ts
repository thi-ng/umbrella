// SPDX-License-Identifier: Apache-2.0
import type { VecOpSGV } from "./api.js";

const { exp } = Math;

/**
 * Like {@link sigmoid} but for nD strided vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param num - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const sigmoidS: VecOpSGV = (
	out,
	a,
	num,
	io = 0,
	ia = 0,
	so = 1,
	sa = 1
) => {
	!out && (out = a);
	for (let i = num; i-- > 0; )
		out[io + i * so] = 1 / (1 + exp(-a[ia + i * sa]));
	return out;
};
