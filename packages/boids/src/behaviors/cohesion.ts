import type { Vec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import { __ensureFn } from "../internal/ensure.js";

export const cohesion = (
	maxDist: ScalarOrField,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	const $maxDist = __ensureFn(maxDist);
	const centroid: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { add, mulN, setN } = boid.api;
			const neighbors = boid.neighbors($maxDist(boid), boid.pos.curr);
			const num = neighbors.length;
			setN(centroid, 0);
			for (let i = 0; i < num; i++) {
				const n = neighbors[i];
				if (n !== boid) add(centroid, centroid, n.pos.curr);
			}
			return num > 1
				? boid.steerTowards(mulN(centroid, centroid, 1 / (num - 1)))
				: centroid;
		},
	};
};
