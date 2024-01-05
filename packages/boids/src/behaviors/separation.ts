import type { Vec } from "@thi.ng/vectors";
import type { IBoidBehavior, ScalarOrField } from "../api.js";
import type { Boid } from "../boid.js";
import { __ensureFn } from "../internal/ensure.js";

export const separation = (
	minDist: ScalarOrField,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	const $minDist = __ensureFn(minDist);
	const force: Vec = [];
	const delta: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { maddN, magSq, setN, sub } = boid.api;
			const pos = boid.pos.value;
			const neighbors = boid.neighbors($minDist(boid), boid.pos.curr);
			const num = neighbors.length;
			let n: Boid;
			setN(force, 0);
			for (let i = 0; i < num; i++) {
				n = neighbors[i];
				if (n !== boid) {
					sub(delta, pos, n.pos.curr);
					maddN(force, delta, 1 / (magSq(delta) + 1e-6), force);
				}
			}
			return boid.computeSteer(force, num - 1);
		},
	};
};
