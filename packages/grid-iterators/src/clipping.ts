import type { FnN3, FnU2, FnU7, FnU8, Tuple } from "@thi.ng/api";

/**
 * Filters points from `src` iterable to remove any falling outside the rect
 * defined by `left,top`..`right,bottom`.
 *
 * @param src -
 * @param left -
 * @param top -
 * @param right -
 * @param bottom -
 */
export function* clipped(
	src: Iterable<number[]>,
	left: number,
	top: number,
	right: number,
	bottom: number
) {
	for (let p of src) {
		if (p[0] >= left && p[0] < right && p[1] >= top && p[1] < bottom)
			yield p;
	}
}

/** @internal */
const axis: FnN3 = (a, b, c) =>
	(a < b ? a - b : a > b + c ? a - b - c : 0) ** 2;

/**
 * Based on [thi.ng/geom-isec](https://thi.ng/geom-isec), but inlined to avoid
 * dependency.
 *
 * @param x -
 * @param y -
 * @param w -
 * @param h -
 * @param cx -
 * @param cy -
 * @param r -
 *
 * @internal
 */
export const intersectRectCircle: FnU7<number, boolean> = (
	x,
	y,
	w,
	h,
	cx,
	cy,
	r
) => axis(cx, x, w) + axis(cy, y, h) <= r * r;

/**
 * Based on [`liangBarsky2Raw()`](https://docs.thi.ng/umbrella/geom-clip-line/functions/liangBarsky2Raw.html), but with diff return type.
 *
 * @param ax -
 * @param ay -
 * @param bx -
 * @param by -
 * @param minx -
 * @param miny -
 * @param maxx -
 * @param maxy -
 *
 * @internal
 */
export const liangBarsky: FnU8<number, Tuple<number, 4> | undefined> = (
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
			if (r > beta) return false;
			r > alpha && (alpha = r);
		} else if (p > 0) {
			const r = q / p;
			if (r < alpha) return false;
			r < beta && (beta = r);
		} else if (q < 0) {
			return false;
		}
		return true;
	};
	return clip(-dx, ax - minx) &&
		clip(dx, maxx - ax) &&
		clip(-dy, ay - miny) &&
		clip(dy, maxy - ay)
		? [alpha * dx + ax, alpha * dy + ay, beta * dx + ax, beta * dy + ay]
		: undefined;
};
