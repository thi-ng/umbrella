// SPDX-License-Identifier: Apache-2.0
import { abs } from "./abs.js";
import type { ReadonlyVec } from "./api.js";
import { center } from "./center.js";
import { magSq } from "./magsq.js";
import { sum } from "./sum.js";

/**
 * Computes variance of vector components in `a`. If `isCentered` is false
 * (default), the vector will first be {@link center}ed (copy) in order to
 * compute the result.
 *
 * @remarks
 * If `corrected` is true, applies Bessel's correction for computing the sample
 * variance of an unknown population size: `var(a) = magSq(a) / (len(a)-1)`
 *
 * If `corected` is false, assumes the given vector represents the full
 * population and computes uncorrected variance: `var(a) = magSq(a) / len(a)`
 *
 * Returns 0 if `len(a) < k` where `k=2` for corrected and `k=1` for
 * uncorrected.
 *
 * For angular values, use {@link circularVariance}.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Variance
 * - https://en.wikipedia.org/wiki/Bessel's_correction
 *
 * @param a -
 * @param isCentered -
 * @param corrected -
 */
export const variance = (
	a: ReadonlyVec,
	isCentered = false,
	corrected = false
) => {
	const k = ~~corrected;
	return a.length > k
		? magSq(isCentered ? a : center([], a)) / (a.length - k)
		: 0;
};

/**
 * Computes standard deviation of vector components in `a`. If `isCentered` is
 * false (default), the vector will first be {@link center}ed (copy) in order to
 * compute the result.
 *
 * @remarks
 * If `corrected` is true, applies Bessel's correction for computing the sample
 * SD of an unknown population size: `sd(a) = sqrt(magSq(a) / (len(a)-1))`
 *
 * If `corected` is false, assumes the given vector represents the full
 * population and computes uncorrected SD: `sd(a) = sqrt(magSq(a) / len(a))`
 *
 * Returns 0 if `len(a) < k` where `k=2` for corrected and `k=1` for
 * uncorrected.
 *
 * For angular values, use {@link circularSD}.
 *
 * Reference:
 *
 * - https://en.wikipedia.org/wiki/Standard_deviation
 * - https://en.wikipedia.org/wiki/Bessel's_correction
 *
 * @param a -
 * @param isCentered -
 * @param corrected -
 */
export const sd = (a: ReadonlyVec, isCentered = false, corrected = false) =>
	Math.sqrt(variance(a, isCentered, corrected));

/**
 * Computes the standard error of vector components in `a`. If `isCentered` is
 * false (default), the vector will first be {@link center}ed (copy) in order to
 * compute the result.
 *
 * @remarks
 * Also see {@link sd} comments about role of `corrected` param.
 *
 * sderr(a) = sd(a) / sqrt(len(a))
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Standard_error
 *
 * @param a -
 * @param isCentered -
 * @param corrected -
 */
export const sdError = (
	a: ReadonlyVec,
	isCentered = false,
	corrected = false
) => (a.length > 1 ? sd(a, isCentered, corrected) / Math.sqrt(a.length) : 0);

/**
 * Computes the mean absolute deviation of vector components in `a`. If
 * `isCentered` is false (default), the vector will first be {@link center}ed
 * (copy) in order to compute the result.
 *
 * @remarks
 * Reference:
 *
 * - https://en.wikipedia.org/wiki/Average_absolute_deviation
 *
 * @param a
 * @param isCentered
 */
export const meanAD = (a: ReadonlyVec, isCentered = false) =>
	a.length > 1
		? sum(isCentered ? abs([], a) : abs(null, center([], a))) / a.length
		: 0;
