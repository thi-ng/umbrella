import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api/isec";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { NONE } from "./api.js";
import { intersectRayLine } from "./ray-line.js";

const startPoints = (pts: ReadonlyVec[], closed: boolean) =>
	closed ? [pts[pts.length - 1], pts[0]] : [pts[0], pts[1]];

export const intersectRayPolyline = (
	rpos: ReadonlyVec,
	dir: ReadonlyVec,
	pts: ReadonlyVec[],
	closed = false,
	minD = 0,
	maxD = Infinity
): IntersectionResult => {
	const n = pts.length - 1;
	let alpha = maxD;
	let cross = 0;
	let [i, j] = startPoints(pts, closed);
	for (let k = 0; k <= n; i = j, j = pts[++k]) {
		const d = intersectRayLine(rpos, dir, i, j, minD, maxD).alpha;
		if (d !== undefined) {
			cross++;
			if (d < alpha) alpha = d;
		}
	}
	return cross > 0
		? {
				type: IntersectionType.INTERSECT,
				isec: maddN2([], dir, alpha, rpos),
				inside: !(cross & 1),
				alpha,
		  }
		: NONE;
};

export const intersectRayPolylineAll = (
	rpos: ReadonlyVec,
	dir: ReadonlyVec,
	pts: ReadonlyVec[],
	closed = false,
	minD = 0,
	maxD = Infinity
): IntersectionResult => {
	const n = pts.length - 1;
	let [i, j] = startPoints(pts, closed);
	const res: [number, Vec][] = [];
	for (let k = 0; k <= n; i = j, j = pts[++k]) {
		const d = intersectRayLine(rpos, dir, i, j, minD, maxD).alpha;
		if (d !== undefined) {
			res.push([d, maddN2([], dir, d, rpos)]);
		}
	}
	return res.length
		? {
				type: IntersectionType.INTERSECT,
				isec: res.sort((a, b) => a[0] - b[0]).map((x) => x[1]),
		  }
		: NONE;
};
