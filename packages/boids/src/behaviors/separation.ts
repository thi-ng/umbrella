// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import type { Boid } from "../boid.js";
import { __ensureFn } from "../internal/ensure.js";

/**
 * Separation behavior. Attempts to repel other boids closer the given
 * `minDist`. The behavior itself can be weighted via `weight`. The force for
 * resolving individual boid "collisions" can be amplified via optional `amp`
 * function, which receives current boid as first arg and current neighbor as
 * second. The default `amp` is uniformly 1.
 *
 * @param minDist
 * @param weight
 * @param amp
 */
export const separation = (
	minDist: ScalarOrField,
	weight: ScalarOrField = 1,
	amp?: FnU2<Boid, number>
): IBoidBehavior => {
	const $minDist = __ensureFn(minDist);
	const force: Vec = [];
	const delta: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { maddN, magSq, setN, sub } = boid.api;
			const pos = boid.pos.curr;
			const neighbors = boid.neighbors($minDist(boid), pos);
			const num = neighbors.length;
			let n: Boid;
			setN(force, 0);
			for (let i = 0; i < num; i++) {
				n = neighbors[i];
				if (n !== boid) {
					sub(delta, pos, n.pos.curr);
					maddN(
						force,
						delta,
						(amp?.(boid, n) ?? 1) / (magSq(delta) + 1e-6),
						force
					);
				}
			}
			return boid.averageForce(force, num - 1);
		},
	};
};
