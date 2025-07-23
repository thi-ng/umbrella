// SPDX-License-Identifier: Apache-2.0
import { PI, TAU } from "@thi.ng/math/api";
import type { ReadonlyVec, Vec } from "./api.js";
import { cartesian2FromAngles } from "./cartesian.js";
import { center } from "./center.js";
import { headingXY } from "./heading.js";
import { mean } from "./mean.js";
import { sd, variance } from "./variance.js";

/**
 * Converts given angles into polar coordinates and then computes their mean
 * angle.
 *
 * @remarks
 * Also see {@link cartesian2FromAngles}, {@link circularVariance},
 * {@link circularSD}.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Circular_mean
 *
 * @param angles
 */
export const circularMean = (angles: ReadonlyVec) =>
	headingXY(mean([], cartesian2FromAngles(angles)));

/**
 * Circular version of {@link center} for given vector of angles.
 *
 * @param out
 * @param angles
 */
export const centerCircular = (out: Vec | null, angles: ReadonlyVec) => {
	const mean = circularMean(angles);
	!out && (out = []);
	for (let i = 0, n = angles.length; i < n; i++) {
		out[i] = (angles[i] - mean + PI) % TAU;
	}
	return center(null, out);
};

/**
 * Computes variance of given angles (in radians). Functional composition of
 * {@link centerCircular} and {@link variance}. Also see the latter for
 * explanation of the `corrected` param.
 *
 * @param angles
 * @param corrected
 */
export const circularVariance = (angles: ReadonlyVec, corrected?: boolean) =>
	variance(centerCircular([], angles), true, corrected);

/**
 * Computes standard deviation of given angles (in radians). Functional
 * composition of {@link centerCircular} and {@link sd}. Also see the latter for
 * explanation of the `corrected` param.
 *
 * @param angles
 * @param corrected
 */
export const circularSD = (angles: ReadonlyVec, corrected?: boolean) =>
	sd(centerCircular([], angles), true, corrected);
