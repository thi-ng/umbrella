// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { clamp2 as $clamp2, clamp3 as $clamp3 } from "@thi.ng/vectors/clamp";
import type { GlobalConstraint } from "./api.js";

export const clamp2 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p) =>
		$clamp2(p, p, min, max);

export const clamp3 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p) =>
		$clamp3(p, p, min, max);

/** @internal */
const __wrap = (p: Vec, i: number, x: number, min: number, max: number) => {
	if (x < min || x > max) {
		p[i] = x < min ? x - min + max : x > max ? x - max + min : x;
		return true;
	}
};

export const wrap2 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p, boid) => {
		if (
			__wrap(p, 0, p[0], min[0], max[0]) ||
			__wrap(p, 1, p[1], min[1], max[1])
		)
			boid.pos.reset(p);
		return p;
	};

export const wrap3 =
	(min: ReadonlyVec, max: ReadonlyVec): GlobalConstraint =>
	(p, boid) => {
		if (
			__wrap(p, 0, p[0], min[0], max[0]) ||
			__wrap(p, 1, p[1], min[1], max[1]) ||
			__wrap(p, 2, p[2], min[2], max[2])
		)
			boid.pos.reset(p);
		return p;
	};
