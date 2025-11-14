// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { IntersectionType, NONE, type IntersectionResult } from "./api.js";
import { checkPolyPair } from "./point.js";
import { intersectRayLine } from "./ray-line.js";

/** @internal */
const __startPoints = (pts: ReadonlyVec[], closed: boolean) =>
	closed ? [pts[pts.length - 1], pts[0]] : [pts[0], pts[1]];

/**
 * 2D only.
 *
 * @param rpos
 * @param dir
 * @param pts
 * @param closed
 * @param minD
 * @param maxD
 */
export const intersectRayPolyline = (
	rpos: ReadonlyVec,
	dir: ReadonlyVec,
	pts: ReadonlyVec[],
	closed = false,
	minD = 0,
	maxD = Infinity
): IntersectionResult => {
	const n = pts.length - 1;
	const [x, y] = rpos;
	let alpha = maxD;
	let cross = 0;
	let inside = 0;
	let [a, b] = __startPoints(pts, closed);
	for (let i = 0; i <= n; a = b, b = pts[++i]) {
		if (closed) {
			inside = checkPolyPair(x, y, a[0], a[1], b[0], b[1], inside);
		}
		const d = intersectRayLine(rpos, dir, a, b, minD, maxD).alpha;
		if (d !== undefined) {
			cross++;
			if (d < alpha) alpha = d;
		}
	}
	return cross > 0
		? {
				type: IntersectionType.INTERSECT,
				isec: [maddN2([], dir, alpha, rpos)],
				inside: !!inside,
				alpha,
		  }
		: NONE;
};

/**
 * 2D only.
 *
 * @param rpos
 * @param dir
 * @param pts
 * @param closed
 * @param minD
 * @param maxD
 */
export const intersectRayPolylineAll = (
	rpos: ReadonlyVec,
	dir: ReadonlyVec,
	pts: ReadonlyVec[],
	closed = false,
	minD = 0,
	maxD = Infinity
): IntersectionResult => {
	const n = pts.length - 1;
	const res: [number, Vec][] = [];
	const [x, y] = rpos;
	let [a, b] = __startPoints(pts, closed);
	let inside = 0;
	for (let i = 0; i <= n; a = b, b = pts[++i]) {
		if (closed) {
			inside = checkPolyPair(x, y, a[0], a[1], b[0], b[1], inside);
		}
		const d = intersectRayLine(rpos, dir, a, b, minD, maxD).alpha;
		if (d !== undefined) {
			res.push([d, maddN2([], dir, d, rpos)]);
		}
	}
	if (res.length) {
		res.sort((a, b) => a[0] - b[0]);
		return {
			type: IntersectionType.INTERSECT,
			isec: res.map((x) => x[1]),
			alpha: res[0][0],
			beta: res[res.length - 1][0],
			inside: !!inside,
		};
	}
	return NONE;
};
