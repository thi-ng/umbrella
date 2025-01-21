// SPDX-License-Identifier: Apache-2.0
import type { FnU4, Range } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { maddN } from "@thi.ng/vectors/maddn";
import { IntersectionType, NONE, type IntersectionResult } from "./api.js";

const { min, max } = Math;

/**
 * Based on:
 * https://tavianator.com/fast-branchless-raybounding-box-intersections/
 *
 * @param rpos - ray origin
 * @param dir - ray dir
 * @param bmin - rect min
 * @param bmax - rect max
 *
 * @internal
 */
const __rayRect: FnU4<ReadonlyVec, Range> = (rpos, dir, bmin, bmax) => {
	let p = rpos[0];
	let d = 1 / dir[0];
	let t1 = (bmin[0] - p) * d;
	let t2 = (bmax[0] - p) * d;
	let tmin = min(t1, t2);
	let tmax = max(t1, t2);
	p = rpos[1];
	d = 1 / dir[1];
	t1 = (bmin[1] - p) * d;
	t2 = (bmax[1] - p) * d;
	return [max(tmin, min(t1, t2)), min(tmax, max(t1, t2))];
};

/**
 * Like to {@link __rayRect}, but for 3D (AABB).
 *
 * @param rpos - ray origin
 * @param dir - ray dir
 * @param bmin - box min
 * @param bmax - box max
 *
 * @internal
 */
const __rayBox: FnU4<ReadonlyVec, Range> = (rpos, dir, bmin, bmax) => {
	let p = rpos[0];
	let d = 1 / dir[0];
	let t1 = (bmin[0] - p) * d;
	let t2 = (bmax[0] - p) * d;
	let tmin = min(t1, t2);
	let tmax = max(t1, t2);
	p = rpos[1];
	d = 1 / dir[1];
	t1 = (bmin[1] - p) * d;
	t2 = (bmax[1] - p) * d;
	tmin = max(tmin, min(t1, t2));
	tmax = min(tmax, max(t1, t2));
	p = rpos[2];
	d = 1 / dir[2];
	t1 = (bmin[2] - p) * d;
	t2 = (bmax[2] - p) * d;
	return [max(tmin, min(t1, t2)), min(tmax, max(t1, t2))];
};

/** @internal */
const __intersectWith =
	(fn: FnU4<ReadonlyVec, Range>): FnU4<ReadonlyVec, IntersectionResult> =>
	(rpos, dir, bmin, bmax) => {
		const t = fn(rpos, dir, bmin, bmax);
		const tmin = t[0];
		const tmax = t[1];
		const inside = tmin < 0;
		return tmax > max(tmin, 0)
			? inside
				? {
						type: IntersectionType.INTERSECT,
						isec: [maddN([], dir, tmax, rpos)],
						alpha: tmax,
						inside,
				  }
				: {
						type: IntersectionType.INTERSECT,
						isec: [
							maddN([], dir, tmin, rpos),
							maddN([], dir, tmax, rpos),
						],
						alpha: tmin,
						beta: tmax,
				  }
			: NONE;
	};

export const intersectRayRect = __intersectWith(__rayRect);

export const intersectRayAABB = __intersectWith(__rayBox);

export const testRayRect: FnU4<ReadonlyVec, boolean> = (
	rpos,
	dir,
	bmin,
	bmax
) => {
	const t = __rayRect(rpos, dir, bmin, bmax);
	return t[1] > max(t[0], 0);
};

export const testRayAABB: FnU4<ReadonlyVec, boolean> = (
	rpos,
	dir,
	bmin,
	bmax
) => {
	const t = __rayBox(rpos, dir, bmin, bmax);
	return t[1] > max(t[0], 0);
};
