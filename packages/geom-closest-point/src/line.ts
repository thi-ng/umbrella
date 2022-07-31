import type { FnU3 } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dist } from "@thi.ng/vectors/dist";
import { distSq } from "@thi.ng/vectors/distsq";
import { dot } from "@thi.ng/vectors/dot";
import { empty } from "@thi.ng/vectors/empty";
import { magSq } from "@thi.ng/vectors/magsq";
import { mixN } from "@thi.ng/vectors/mixn";
import { set } from "@thi.ng/vectors/set";
import { sub } from "@thi.ng/vectors/sub";

/**
 * Computes the parametric distance `t` of point `p` projected onto line
 * `a` -> `b`, relative to `a`. I.e. the projection of `p` can then be
 * computed like so:
 *
 * @example
 * ```ts
 * mixN([], a, b, closestT(p, a, b))
 * ```
 *
 * If the return value is outside the closed [0,1] interval, the
 * projected point lies outside the line segment. Returns `undefined` if
 * `a` and `b` are coincident.
 *
 * - {@link closestPointLine}
 * - {@link closestPointSegment}
 *
 * @param p - query point
 * @param a - line point A
 * @param b - line point B
 */
export const closestT: FnU3<ReadonlyVec, number | undefined> = (p, a, b) => {
	const d = sub([], b, a);
	const l = magSq(d);
	return l > 1e-6 ? dot(sub([], p, a), d) / l : undefined;
};

/**
 * Returns closest point to `p` on infinite line defined by points `a`
 * and `b`. Use {@link closestPointSegment} to only consider the actual line
 * segment between these two points.
 *
 * {@link closestPointSegment}
 *
 * @param p - query point
 * @param a - line point A
 * @param b - line point B
 */
export const closestPointLine: FnU3<ReadonlyVec, Vec> = (p, a, b) =>
	mixN([], a, b, closestT(p, a, b) || 0);

/**
 * Returns distance from `p` to closest point to infinite line `a` ->
 * `b`. Use {@link distToSegment} to only consider the actual line segment
 * between these two points.
 *
 * {@link distToSegment}
 *
 * @param p - query point
 * @param a - line point A
 * @param b - line point B
 */
export const distToLine: FnU3<ReadonlyVec, number> = (p, a, b) =>
	dist(p, closestPointLine(p, a, b) || a);

/**
 * Returns closest point to `p` on line segment `a` -> `b`. By default,
 * if the result point lies outside the segment, returns a copy of the
 * closest end point. The result is written to the optional `out` vector
 * (or if omitted, a new one is created).
 *
 * If `insideOnly` is true, only returns the closest point iff it
 * actually is inside the segment. The behavior of this configurable via
 * the optional `eps` arg and by default includes both end points. This
 * function uses {@link closestT} to compute the parametric position of the
 * result point and determine if it lies within the line segment. If
 * `eps > 0`, the end points `a` and `b` will be excluded from the
 * match, effectively shortening the valid line segment from both ends,
 * i.e. the valid interval of the parametric position will be
 * [eps,1-eps]. If the result lies outside this interval, the function
 * returns `undefined`. Likewise, if `a` and `b` are coincident.
 *
 * @param p - query point
 * @param a - line point A
 * @param b - line point B
 * @param out - result
 * @param eps - epsilon value
 */
export const closestPointSegment = (
	p: ReadonlyVec,
	a: ReadonlyVec,
	b: ReadonlyVec,
	out?: Vec,
	insideOnly = false,
	eps = 0
) => {
	const t = closestT(p, a, b);
	if (t !== undefined && (!insideOnly || (t >= eps && t <= 1 - eps))) {
		out = out || empty(p);
		return t <= 0 ? set(out, a) : t >= 1 ? set(out, b) : mixN(out, a, b, t);
	}
};

/**
 * Returns distance from `p` to closest point on line segment `a` ->
 * `b`.
 *
 * @param p - query point
 * @param a - line point A
 * @param b - line point B
 */
export const distToSegment: FnU3<ReadonlyVec, number> = (p, a, b) =>
	dist(p, closestPointSegment(p, a, b) || a);

export const closestPointPolyline = (
	p: ReadonlyVec,
	pts: ReadonlyArray<Vec>,
	closed = false,
	out: Vec = []
) => {
	if (!pts.length) return;
	const tmp: Vec = [];
	const n = pts.length - 1;
	let minD = Infinity,
		i,
		j;
	if (closed) {
		i = n;
		j = 0;
	} else {
		i = 0;
		j = 1;
	}
	for (; j <= n; i = j, j++) {
		if (closestPointSegment(p, pts[i], pts[j], tmp)) {
			const d = distSq(p, tmp);
			if (d < minD) {
				minD = d;
				set(out, tmp);
			}
		}
	}
	return minD < Infinity ? out : undefined;
};

/**
 * Returns the index of the start point containing the segment in the
 * polyline array `points` farthest away from `p` with regards to the
 * line segment `a` to `b`. `points` is only checked between indices
 * `from` and `to` (not including the latter).
 *
 * @param a - line point A
 * @param b - line point B
 * @param points - points
 * @param from - start search index
 * @param to - end search index
 */
export const farthestPointSegment = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	points: ReadonlyVec[],
	from = 0,
	to = points.length
) => {
	let maxD = -1;
	let maxIdx: number = -1;
	const tmp = empty(a);
	for (let i = from; i < to; i++) {
		const p = points[i];
		const d = distSq(p, closestPointSegment(p, a, b, tmp) || a);
		if (d > maxD) {
			maxD = d;
			maxIdx = i;
		}
	}
	return [maxIdx, Math.sqrt(maxD)];
};
