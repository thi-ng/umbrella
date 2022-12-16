import type { FnU2, FnU8, Tuple } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

/**
 * Performs Liang-Barsky clipping of the line segment with endpoints `a`, `b`
 * against the clipping rect defined by `min` and `max`. The optional `ca` and
 * `cb` vectors can be given to store the result (clipped points). If omitted
 * creates new vectors. Returns a tuple of `[ca, cb, a, b]`, where the latter
 * two values represent the normalized distances of the clipped points relative
 * to original given line segment. Returns `undefined` iff the line lies
 * completely outside the rect.
 *
 * - https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm
 * - https://github.com/thi-ng/c-thing/blob/develop/src/geom/clip/liangbarsky.c
 *
 * @param a - line endpoint
 * @param b - line endpoint
 * @param min - bbox min
 * @param max - bbox max
 * @param ca - result A
 * @param cb - result B
 */
export const liangBarsky2 = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	min: ReadonlyVec,
	max: ReadonlyVec,
	ca: Vec = [],
	cb: Vec = []
): [Vec, Vec, number, number] | undefined => {
	const res = liangBarsky2Raw(
		a[0],
		a[1],
		b[0],
		b[1],
		min[0],
		min[1],
		max[0],
		max[1]
	);
	if (!res) return;

	ca[0] = res[0];
	ca[1] = res[1];
	cb[0] = res[2];
	cb[1] = res[3];

	return [ca, cb, res[4], res[5]];
};

/**
 * Same as {@link liangBarsky2} but for non-vector arguments.
 *
 * @param ax -
 * @param ay -
 * @param bx -
 * @param by -
 * @param minx -
 * @param miny -
 * @param maxx -
 * @param maxy -
 */
export const liangBarsky2Raw: FnU8<number, Tuple<number, 6> | undefined> = (
	ax,
	ay,
	bx,
	by,
	minx,
	miny,
	maxx,
	maxy
) => {
	const dx = bx - ax;
	const dy = by - ay;
	let alpha = 0;
	let beta = 1;

	const clip: FnU2<number, boolean> = (p, q) => {
		if (p < 0) {
			const r = q / p;
			if (r > beta) {
				return false;
			}
			if (r > alpha) {
				alpha = r;
			}
		} else if (p > 0) {
			const r = q / p;
			if (r < alpha) {
				return false;
			}
			if (r < beta) {
				beta = r;
			}
		} else if (q < 0) {
			return false;
		}
		return true;
	};

	return clip(-dx, ax - minx) &&
		clip(dx, maxx - ax) &&
		clip(-dy, ay - miny) &&
		clip(dy, maxy - ay)
		? [
				alpha * dx + ax,
				alpha * dy + ay,
				beta * dx + ax,
				beta * dy + ay,
				alpha,
				beta,
		  ]
		: undefined;
};
