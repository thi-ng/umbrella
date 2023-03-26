import { max3id } from "@thi.ng/math/interval";
import { addmN2, addmN3 } from "@thi.ng/vectors/addmn";
import { addW2 } from "@thi.ng/vectors/addw";
import {
	MAX2,
	MIN2,
	type ReadonlyVec,
	type Vec,
	type VecPair,
} from "@thi.ng/vectors/api";
import { distSq2, distSq3 } from "@thi.ng/vectors/distsq";
import { max } from "@thi.ng/vectors/max";
import { min } from "@thi.ng/vectors/min";
import { mulN2, mulN3 } from "@thi.ng/vectors/muln";

/**
 * Computes the nD bounds of given vectors. `vmin` should be initialized
 * to `+∞` and `vmax` to `-∞` (e.g. use copies of `MIN*` / `MAX*`
 * constants defined in thi.ng/vectors).
 *
 * @example
 * ```ts
 * points = [[-1,-2], [5,-3], [0,4]];
 *
 * bounds(points, [...MAX2], [...MIN2])
 * // [[-1,-3],[5,4]]
 * ```
 *
 * Returns 2-tuple of modified `[vmin, vmax]`.
 *
 * @param pts - point
 * @param vmin - min result (pre-initialized to `+∞`)
 * @param vmax - max result (pre-initialized to `-∞`)
 */
export const bounds = (
	pts: ReadonlyArray<Vec>,
	vmin: Vec,
	vmax: Vec
): VecPair => {
	for (let i = pts.length; i-- > 0; ) {
		const p = pts[i];
		min(null, vmin, p);
		max(null, vmax, p);
	}
	return [vmin, vmax];
};

export const bounds2 = (pts: ReadonlyArray<Vec>) =>
	bounds(pts, [Infinity, Infinity], [-Infinity, -Infinity]);

export const bounds3 = (pts: ReadonlyArray<Vec>) =>
	bounds(
		pts,
		[Infinity, Infinity, Infinity],
		[-Infinity, -Infinity, -Infinity]
	);

/**
 * Calculates a near-optimal bounding circle for a set of points in 2D. Returns
 * tuple of `[centroid, radius]`.
 *
 * @remarks
 * Based on "An Efficient Bounding Sphere" by Jack Ritter "Graphics Gems",
 * Academic Press, 1990
 *
 * Ported from:
 * https://github.com/erich666/GraphicsGems/blob/master/gems/BoundSphere.c
 *
 * @param pts
 */
export const boundingCircle = (pts: ReadonlyVec[]): [Vec, number] => {
	let xmin = MAX2;
	let xmax = MIN2;
	let ymin = MAX2;
	let ymax = MIN2;
	for (let i = pts.length; i-- > 0; ) {
		const p = pts[i];
		if (p[0] < xmin[0]) xmin = p;
		else if (p[0] > xmax[0]) xmax = p;
		if (p[1] < ymin[1]) ymin = p;
		else if (p[1] > ymax[1]) ymax = p;
	}
	const xspan = distSq2(xmin, xmax);
	const yspan = distSq2(ymin, ymax);
	const span = <[ReadonlyVec, ReadonlyVec]>(
		(xspan > yspan ? [xmin, xmax] : [ymin, ymax])
	);
	let centroid = addmN2([], ...span, 0.5);
	let rsq = distSq2(centroid, span[0]);
	let r = Math.sqrt(rsq);
	for (let i = pts.length; i-- > 0; ) {
		const p = pts[i];
		const dsq = distSq2(centroid, p);
		if (dsq > rsq) {
			const d = Math.sqrt(dsq);
			r = (r + d) / 2;
			rsq = r * r;
			mulN2(null, addW2(null, centroid, p, r, d - r), 1 / d);
		}
	}
	return [centroid, r];
};

/**
 * Calculates a near-optimal bounding circle for a set of points in 3D. Returns
 * tuple of `[centroid, radius]`.
 *
 * @remarks
 * Based on "An Efficient Bounding Sphere" by Jack Ritter "Graphics Gems",
 * Academic Press, 1990
 *
 * Ported from:
 * https://github.com/erich666/GraphicsGems/blob/master/gems/BoundSphere.c
 *
 * @param pts
 */
export const boundingSphere = (pts: ReadonlyVec[]): [Vec, number] => {
	let xmin = MAX2;
	let xmax = MIN2;
	let ymin = MAX2;
	let ymax = MIN2;
	let zmin = MAX2;
	let zmax = MIN2;
	for (let i = pts.length; i-- > 0; ) {
		const p = pts[i];
		if (p[0] < xmin[0]) xmin = p;
		else if (p[0] > xmax[0]) xmax = p;
		if (p[1] < ymin[1]) ymin = p;
		else if (p[1] > ymax[1]) ymax = p;
		if (p[2] < zmin[1]) zmin = p;
		else if (p[2] > zmax[1]) zmax = p;
	}
	const span = <[ReadonlyVec, ReadonlyVec]>[
		[xmin, xmax],
		[ymin, ymax],
		[zmin, zmax],
	][max3id(distSq3(xmin, xmax), distSq3(ymin, ymax), distSq3(zmin, zmax))];
	let centroid = addmN3([], ...span, 0.5);
	let rsq = distSq3(centroid, span[0]);
	let r = Math.sqrt(rsq);
	for (let i = pts.length; i-- > 0; ) {
		const p = pts[i];
		const dsq = distSq3(centroid, p);
		if (dsq > rsq) {
			const d = Math.sqrt(dsq);
			r = (r + d) / 2;
			rsq = r * r;
			mulN3(null, addW2(null, centroid, p, r, d - r), 1 / d);
		}
	}
	return [centroid, r];
};
