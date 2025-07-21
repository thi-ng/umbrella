import { cossin } from "@thi.ng/math/angle";
import type { ReadonlyVec } from "./api.js";
import { cartesian2 } from "./cartesian.js";
import { headingXY } from "./heading.js";
import { mean } from "./mean.js";

/**
 * Computes circular/angular mean angle (in radians, `[0,TAU)` interval) of
 * given 2D polar coordinates.
 *
 * @remarks
 * Also see {@link circularMeanFromAngles}, {@link cartesian2}, {@link polar2}.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Circular_mean
 *
 * @param pts
 */
export const circularMean = (pts: ReadonlyVec[]) =>
	headingXY(
		mean(
			[],
			pts.map((p) => cartesian2([], p))
		)
	);

/**
 * Converts given angles into polar coordinates and then computes their mean
 * angle using {@link circularMean}.
 *
 * @param angles
 */
export const circularMeanFromAngles = (angles: number[]) =>
	circularMean(angles.map((x) => cossin(x)));
