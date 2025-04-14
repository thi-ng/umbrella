import { normal as op } from "@thi.ng/random/distributions/normal";
import type { MultiVecOpFNO, VecOpFNO } from "./api.js";
import { vop } from "./vop.js";

/**
 * Sets `v` to random 2D vector, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1). Creates new vector if `v` is null.
 *
 * @remarks
 * References:
 *
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 *
 * @param o - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 */
export const randDistrib2: VecOpFNO = (a, rnd = op(), n = 1) => {
	!a && (a = []);
	a[0] = rnd() * n;
	a[1] = rnd() * n;
	return a;
};

/**
 * Sets `v` to random 3D vector, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1). Creates new vector if `v` is null.
 *
 * @remarks
 * References:
 *
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 *
 * @param o - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 */
export const randDistrib3: VecOpFNO = (a, rnd = op(), n = 1) => {
	!a && (a = []);
	a[0] = rnd() * n;
	a[1] = rnd() * n;
	a[2] = rnd() * n;
	return a;
};

/**
 * Sets `v` to random 4D vector, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1). Creates new vector if `v` is null.
 *
 * @remarks
 * References:
 *
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 *
 * @param o - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 */
export const randDistrib4: VecOpFNO = (a, rnd = op(), n = 1) => {
	!a && (a = []);
	a[0] = rnd() * n;
	a[1] = rnd() * n;
	a[2] = rnd() * n;
	a[3] = rnd() * n;
	return a;
};

/**
 * Sets `v` to random nD vector, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1). Creates new vector if `v` is null.
 *
 * @remarks
 * This version of this function can ONLY be used if `v` is given and
 * initialized to the desired size/length.
 *
 * References:
 *
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 *
 * @param o - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 */
export const randDistrib: MultiVecOpFNO = vop(
	0,
	(a, rnd = op(), n = 1) => {
		!a && (a = []);
		for (let i = a.length; i-- > 0; ) a[i] = rnd() * n;
		return a;
	},
	randDistrib2,
	randDistrib3,
	randDistrib4
);
