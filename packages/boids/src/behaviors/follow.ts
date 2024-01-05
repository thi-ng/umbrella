import { Sampler } from "@thi.ng/geom-resample/sampler";
import { fract } from "@thi.ng/math/prec";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import { __ensureFn } from "../internal/ensure.js";

/**
 * Similar to {@link attractPolyline}, but forces steering along the path in the
 * given order of points, using normalized `lookahead`. If `closed` is false,
 * the behavior becomes a no-op for boids at the end of the path.
 *
 * @param points
 * @param closed
 * @param lookahead
 * @param weight
 */
export const followPolyline = (
	points: ReadonlyVec[],
	closed: boolean,
	lookahead = 0.01,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	const sampler = new Sampler(points, closed);
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const t = sampler.closestT(boid.pos.curr);
			if (t === undefined || (!closed && t + lookahead > 1))
				return boid.api.ZERO;
			return boid.steerTowards(sampler.pointAt(fract(t + lookahead))!);
		},
	};
};
