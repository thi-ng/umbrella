import type { Fn, Nullable } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import type { Boid } from "../boid.js";
import { __ensureFn } from "../internal/ensure.js";

/**
 * Boid behavior which steers toward target positions sourced from user provided
 * `target` fn. That `target` function will be called successively for each boid
 * update. If it returns a point, it will be used as steer target until a new
 * one is returned. If the function returns null/undefined the current target
 * will be kept. The behavior is a no-op for boids outside the configured
 * `radius` (around the target) and also has no effect until the target function
 * returns its first point.
 *
 * @param target
 * @param radius
 * @param weight
 */
export const dynamicTarget = (
	target: Fn<Boid, Nullable<ReadonlyVec>>,
	radius: ScalarOrField = Infinity,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	let currTarget: ReadonlyVec | undefined;
	const $radius = __ensureFn(radius);
	const force: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			currTarget = target(boid) || currTarget;
			if (!currTarget) return boid.api.ZERO;
			const r = $radius(boid);
			return boid.api.distSq(currTarget, boid.pos.curr) < r * r
				? boid.steerTowards(currTarget, force)
				: boid.api.ZERO;
		},
	};
};
