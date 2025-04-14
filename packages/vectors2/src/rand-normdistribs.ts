import type { VecOpSFN, VecOpSGFN, VecOpSVO } from "./api.js";
import {
	normalizeS,
	normalizeS2,
	normalizeS3,
	normalizeS4,
} from "./normalizes.js";
import {
	randDistribS,
	randDistribS2,
	randDistribS3,
	randDistribS4,
} from "./rand-distribs.js";

/**
 * Same as {@link randNormDistrib}, but for strided nD vectors.
 *
 * @param out
 * @param num
 * @param rnd
 * @param n
 * @param io
 * @param so
 */
export const randNormDistribS: VecOpSGFN = (
	out,
	num,
	rnd,
	n = 1,
	io = 0,
	so = 1
) =>
	normalizeS(
		null,
		randDistribS(out, num, rnd, 1, io, so),
		num,
		n,
		io,
		io,
		so,
		so
	);

const $ =
	(normalize: VecOpSVO<number>, random: VecOpSFN): VecOpSFN =>
	(a, rnd, n = 1, ia = 0, sa = 1) =>
		normalize(null, random(a, rnd, 1, ia, sa), n, ia, ia, sa, sa);

/**
 * Same as {@link randNormDistrib2}, but for strided 2D vectors.
 */
export const randNormDistribS2 = $(normalizeS2, randDistribS2);

/**
 * Same as {@link randNormDistrib3}, but for strided 3D vectors.
 */
export const randNormDistribS3 = $(normalizeS3, randDistribS3);

/**
 * Same as {@link randNormDistrib4}, but for strided 4D vectors.
 */
export const randNormDistribS4 = $(normalizeS4, randDistribS4);
