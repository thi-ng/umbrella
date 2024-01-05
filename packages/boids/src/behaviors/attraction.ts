import { closestPointPolyline } from "@thi.ng/geom-closest-point";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { ScalarOrField, IBoidBehavior } from "../api.js";
import { __ensureFn } from "../internal/ensure.js";

export const attractPolyline = (
	points: ReadonlyVec[],
	closed: boolean,
	lookahead = 1,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	const closest: Vec = [];
	const pos: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { add, normalize } = boid.api;
			return closestPointPolyline(
				lookahead !== 0
					? add(
							pos,
							normalize(pos, boid.vel.curr, lookahead),
							boid.pos.curr
					  )
					: boid.pos.curr,
				points,
				closed,
				closest
			)
				? boid.steerTowards(closest)
				: boid.api.ZERO;
		},
	};
};
