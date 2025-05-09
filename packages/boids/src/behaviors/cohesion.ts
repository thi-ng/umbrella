// SPDX-License-Identifier: Apache-2.0
import type { Predicate2 } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import type { Boid } from "../boid.js";
import { __ensureFn } from "../internal/ensure.js";

/**
 * Cohesion behavior. Attempts to move boid towards centroid of neighboring
 * boids within `maxDist`. The behavior itself can be weighted via `weight`.
 * Neighbors can be filtered via optional `filter` predicate, which receives
 * current boid as first arg and current neighbor as second. By default all
 * neighbors are considered.
 *
 * @param maxDist
 * @param weight
 * @param pred
 */
export const cohesion = (
	maxDist: ScalarOrField,
	weight: ScalarOrField = 1,
	pred: Predicate2<Boid> = () => true
): IBoidBehavior => {
	const $maxDist = __ensureFn(maxDist);
	const centroid: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { add, mulN, setN } = boid.api;
			const neighbors = boid.neighbors($maxDist(boid), boid.pos.curr);
			setN(centroid, 0);
			let used = 0;
			const num = neighbors.length;
			for (let i = 0; i < num; i++) {
				const n = neighbors[i];
				if (n !== boid && pred(boid, n)) {
					add(centroid, centroid, n.pos.curr);
					used++;
				}
			}
			return used > 0
				? boid.steerTowards(mulN(centroid, centroid, 1 / used))
				: centroid;
		},
	};
};
