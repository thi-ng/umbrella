import type { FnN } from "@thi.ng/api";
import type { ReadonlyVec } from "./api.js";
import { magSq } from "./magsq.js";
import { sub } from "./sub.js";

/**
 * Computes the residual sum of squares (aka sum of squared errors) between
 * observed and predicted values (each set given as vector).
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Residual_sum_of_squares
 *
 * @param a
 * @param b
 */
export const rss = (a: ReadonlyVec, b: ReadonlyVec) => magSq(sub([], b, a));

/**
 * Computes the residual sum of squares (aka sum of squared errors), given
 * related data sets `x` (domain) and `y` (range) and a `model` function for
 * obtaining predictions (will be evaluated for all values in `x`).
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Residual_sum_of_squares
 *
 * @param x
 * @param y
 * @param model
 */
export const rssModel = (x: ReadonlyVec, y: ReadonlyVec, model: FnN) => {
	let err = 0;
	for (let i = 0, n = x.length; i < n; i++) err += (model(x[i]) - y[i]) ** 2;
	return err;
};

/**
 * Computes the residual sum of squares (aka sum of squared errors), given
 * related data sets `x` (domain) and `y` (range) and predicted line parameters
 * `y0` (y-intercept) and `slope`.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Residual_sum_of_squares
 *
 * @param x
 * @param y
 * @param y0
 * @param slope
 */
export const rssLine = (
	x: ReadonlyVec,
	y: ReadonlyVec,
	y0: number,
	slope: number
) => rssModel(x, y, (t) => y0 + slope * t);
