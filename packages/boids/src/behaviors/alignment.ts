import type { Vec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import { __ensureFn } from "../internal/ensure.js";

export const alignment = (
	maxDist: ScalarOrField,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	const $maxDist = __ensureFn(maxDist);
	const force: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { add, setN } = boid.api;
			const neighbors = boid.neighbors($maxDist(boid), boid.pos.curr);
			const num = neighbors.length;
			setN(force, 0);
			for (let i = 0; i < num; i++) {
				const n = neighbors[i];
				if (n !== boid) add(force, force, n.vel.curr);
			}
			return boid.computeSteer(force, num - 1);
		},
	};
};
