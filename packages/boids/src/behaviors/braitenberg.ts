import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { rotate } from "@thi.ng/vectors/rotate";
import type { ScalarOrField, IBoidBehavior } from "../api.js";
import { __ensureFn } from "../internal/ensure.js";

/**
 * 2D only behavior. Takes a field function to be sampled, a sensor `lookahead`
 * distance and `angle` between left/right sensors. The returned behavior steers
 * an agent towards the local maxima of the field function based on a given
 * agent's position and direction. Steers toward which ever sensor yields the
 * greater value. If both sensors yield the same reading, the behavior is a
 * no-op (returns a zero force vector).
 *
 * @param field
 * @param lookahead
 * @param angle
 * @param weight
 */
export const braitenberg2 = (
	field: Fn<ReadonlyVec, number>,
	lookahead: number,
	angle: number,
	weight: ScalarOrField = 1
): IBoidBehavior => {
	const dir: Vec = [];
	const left: Vec = [];
	const right: Vec = [];
	return {
		weight: __ensureFn(weight),
		update: (boid) => {
			const { add, maddN, normalize } = boid.api;
			normalize(dir, boid.vel.curr, lookahead);
			const pos = boid.pos.curr;
			const valC = field(pos);
			const valL = field(add(left, rotate(left, dir, angle), pos));
			const valR = field(add(right, rotate(right, dir, -angle), pos));
			return valC > valL && valC > valR
				? boid.steerTowards(maddN(left, boid.vel.curr, -1, pos))
				: valL === valR
				? boid.api.ZERO
				: boid.steerTowards(valL > valR ? left : right);
		},
	};
};
