import type { DistanceFn, ReadonlyVec } from "./api.js";
import { mul } from "./mul.js";

/**
 * Higher order distance function. Takes an existing {@link DistanceFn} `fn` and
 * a vector of `weights` to control impact of each dimension. Returns new
 * {@link DistanceFn}, which when called, first applies `weights` to both inputs
 * and then uses `fn` to compute distance between the weighted results.
 *
 * @example
 * ```ts
 * const distXZ = weightedDistance(dist3, [1,0,1]);
 *
 * // distance in XZ plane only
 * distXZ(ONE3, ZERO3);
 * // 1.4142135623730951
 *
 * // compare with full eucledian distance
 * dist3(ONE3, ZERO3);
 * // 1.7320508075688772
 * ```
 *
 * @param fn -
 * @param weights -
 */
export const weightedDistance =
	(fn: DistanceFn, weights: ReadonlyVec): DistanceFn =>
	(a, b) =>
		fn(mul([], a, weights), mul([], b, weights));
