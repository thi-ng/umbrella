// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import type { Boid } from "../boid.js";
import { __ensureFn } from "../internal/ensure.js";

export const cohesion = (
	maxDist: ScalarOrField,
	weight: ScalarOrField = 1,
	amp?: FnU2<Boid, number>
): IBoidBehavior => {
	const $maxDist = __ensureFn(maxDist);
	const centroid: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { add, maddN, mulN, setN } = boid.api;
			const neighbors = boid.neighbors($maxDist(boid), boid.pos.curr);
			const num = neighbors.length;
			setN(centroid, 0);
			for (let i = 0; i < num; i++) {
				const n = neighbors[i];
				if (n !== boid) {
					amp
						? maddN(centroid, n.pos.curr, amp(boid, n), centroid)
						: add(centroid, centroid, n.pos.curr);
				}
			}
			return num > 1
				? boid.steerTowards(mulN(centroid, centroid, 1 / (num - 1)))
				: centroid;
		},
	};
};
