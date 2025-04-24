// SPDX-License-Identifier: Apache-2.0
import { normal as op } from "@thi.ng/random/distributions/normal";
import type { VecOpSFN, VecOpSGFN } from "./api.js";

/**
 * Same as {@link randDistrib} but for strided nD vectors.
 *
 * @param out - output vector
 * @param num - vector size
 * @param rnd - random distribution function
 * @param n - scale factor
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const randDistribS: VecOpSGFN = (
	out,
	num,
	rnd = op(),
	n = 1,
	io = 0,
	so = 1
) => {
	!out && (out = []);
	while (num-- > 0) out[io + num * so] = rnd() * n;
	return out;
};

/**
 * Same as {@link randDistrib2} but for strided 2D vectors.
 *
 * @param out - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const randDistribS2: VecOpSFN = (
	out,
	rnd = op(),
	n = 1,
	io = 0,
	so = 1
) => {
	!out && (out = []);
	out[io] = rnd() * n;
	out[io + so] = rnd() * n;
	return out;
};

/**
 * Same as {@link randDistrib3} but for strided 3D vectors.
 *
 * @param out - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const randDistribS3: VecOpSFN = (
	out,
	rnd = op(),
	n = 1,
	io = 0,
	so = 1
) => {
	!out && (out = []);
	out[io] = rnd() * n;
	out[io + so] = rnd() * n;
	out[io + 2 * so] = rnd() * n;
	return out;
};

/**
 * Same as {@link randDistrib4} but for strided 4D vectors.
 *
 * @param out - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const randDistribS4: VecOpSFN = (
	out,
	rnd = op(),
	n = 1,
	io = 0,
	so = 1
) => {
	!out && (out = []);
	out[io] = rnd() * n;
	out[io + so] = rnd() * n;
	out[io + 2 * so] = rnd() * n;
	out[io + 3 * so] = rnd() * n;
	return out;
};
