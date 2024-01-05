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
 * will be kept. The behavior is a no-op until the target function returns its
 * first point. no-op.
 *
 * @param target
 * @param weight
 */
export const dynamicTarget = (
	target: Fn<Boid, Nullable<ReadonlyVec>>,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	let currTarget: ReadonlyVec;
	const force: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const t = target(boid);
			if (t) currTarget = t;
			return currTarget
				? boid.steerTowards(currTarget, force)
				: boid.api.ZERO;
		},
	};
};
