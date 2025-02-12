// SPDX-License-Identifier: Apache-2.0
import type { Fn3, FnN7, FnU4, FnU5 } from "@thi.ng/api";
import { closestT } from "@thi.ng/geom-closest-point/line";
import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import type { MultiVecOpImpl, ReadonlyVec } from "@thi.ng/vectors";
import { clockwise2 } from "@thi.ng/vectors/clockwise";
import { direction2 } from "@thi.ng/vectors/direction";
import { distSq } from "@thi.ng/vectors/distsq";
import { dot2, dot3 } from "@thi.ng/vectors/dot";
import { magSq } from "@thi.ng/vectors/magsq";
import { mixN } from "@thi.ng/vectors/mixn";
import { perpendicularCCW } from "@thi.ng/vectors/perpendicular";
import { signedArea2 } from "@thi.ng/vectors/signed-area";
import { vop } from "@thi.ng/vectors/vop";

/**
 * Returns classifier for point `p`, relative to infinite 2D line defined by
 * point `a` and line direction `dir`. One of the following:
 *
 * - `0` if `p` lies on the line (using `eps` as tolerance)
 * - `-1` if `p` is right (clockwise) of the line segment
 * - `+1` if `p` is left (counterclockwise) of the line segment
 *
 * @param p
 * @param a
 * @param dir
 * @param eps
 */
export const classifyPointLine2 = (
	p: ReadonlyVec,
	a: ReadonlyVec,
	dir: ReadonlyVec,
	eps = EPS
) => {
	const n = perpendicularCCW([], dir);
	return sign(dot2(n, p) - dot2(n, a), eps);
};

/**
 * Syntax sugar for {@link classifyPointLine2}, using points `a` and `b`
 * defining the line segment.
 *
 * @param p
 * @param a
 * @param b
 * @param eps
 */
export const classifyPointSegment2 = (
	p: ReadonlyVec,
	a: ReadonlyVec,
	b: ReadonlyVec,
	eps = EPS
) => classifyPointLine2(p, a, direction2([], a, b), eps);

/**
 * Returns true if point `p` lies on the line segment `a`, `b`, using `eps` as
 * tolerance.
 *
 * @param p
 * @param a
 * @param b
 * @param eps
 */
export const pointInSegment = (
	p: ReadonlyVec,
	a: ReadonlyVec,
	b: ReadonlyVec,
	eps = EPS
) => {
	const t = closestT(p, a, b);
	return t !== undefined
		? distSq(p, mixN([], a, b, clamp01(t))) < eps * eps
		: false;
};

/**
 * Same as {@link pointInSegment}, but for polylines/polygons.
 *
 * @param p
 * @param points
 * @param closed
 * @param eps
 */
export const pointInSegments = (
	p: ReadonlyVec,
	points: ReadonlyVec[],
	closed: boolean,
	eps = EPS
) => {
	const n = points.length;
	let [i, j] = closed ? [n - 1, 0] : [0, 1];
	for (; j < n; i = j, j++) {
		if (pointInSegment(p, points[i], points[j], eps)) return true;
	}
	return false;
};

/**
 * Returns true if point `p` is inside the circle defined by `pos` and `r`.
 *
 * @param p
 * @param pos
 * @param r
 */
export const pointInCircle = (p: ReadonlyVec, pos: ReadonlyVec, r: number) =>
	distSq(pos, p) <= r * r;

export const pointInSphere = pointInCircle;

/**
 * Returns classifier for `p` regarding the circle defined by `pos` and `r`.
 * Returns -1 if point is outside, 0 if on the boundary (using `eps` as
 * tolerance) or +1 if inside the circle.
 *
 * @remarks
 * Also see {@link pointInCircle}, {@link pointIn3Circle}.
 *
 * @param p
 * @param pos
 * @param r
 * @param eps
 */
export const classifyPointInCircle = (
	p: ReadonlyVec,
	pos: ReadonlyVec,
	r: number,
	eps = EPS
) => sign(r * r - distSq(pos, p), eps);

/**
 * Returns positive value if `p` lies inside the circle passing through a,b,c.
 * Returns negative value if `p` is outside and zero if all 4 points are
 * cocircular.
 *
 * @remarks
 * Assumes a,b,c are in ccw order or else result will be have inverted sign.
 *
 * Based on Jonathan R. Shewchuck:
 * http://www.cs.cmu.edu/afs/cs/project/quake/public/code/predicates.c
 *
 * Also see {@link pointInCircumCircle}
 *
 * @param p -
 * @param a -
 * @param b -
 * @param c -
 */
export const pointIn3Circle: FnU4<ReadonlyVec, number> = (
	[px, py],
	a,
	b,
	c
) => {
	const apx = a[0] - px;
	const apy = a[1] - py;
	const bpx = b[0] - px;
	const bpy = b[1] - py;
	const cpx = c[0] - px;
	const cpy = c[1] - py;

	const abdet = apx * bpy - bpx * apy;
	const bcdet = bpx * cpy - cpx * bpy;
	const cadet = cpx * apy - apx * cpy;
	const alift = apx * apx + apy * apy;
	const blift = bpx * bpx + bpy * bpy;
	const clift = cpx * cpx + cpy * cpy;

	return alift * bcdet + blift * cadet + clift * abdet;
};

/**
 * Returns positive value if `p` lies inside the sphere passing through `a`,
 * `b`, `c`, `d`. Returns a negative value if `p` is outside and zero if all 5
 * points are cospherical.
 *
 * @remarks
 * Assumes a,b,c,d are in ccw order or else result will be have inverted sign.
 *
 * Based on Jonathan R. Shewchuck:
 * http://www.cs.cmu.edu/afs/cs/project/quake/public/code/predicates.c
 *
 * @param p -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const pointIn4Sphere: FnU5<ReadonlyVec, number> = (
	[px, py, pz],
	a,
	b,
	c,
	d
) => {
	const apx = a[0] - px;
	const bpx = b[0] - px;
	const cpx = c[0] - px;
	const dpx = d[0] - px;
	const apy = a[1] - py;
	const bpy = b[1] - py;
	const cpy = c[1] - py;
	const dpy = d[1] - py;
	const apz = a[2] - pz;
	const bpz = b[2] - pz;
	const cpz = c[2] - pz;
	const dpz = d[2] - pz;

	const ab = apx * bpy - bpx * apy;
	const bc = bpx * cpy - cpx * bpy;
	const cd = cpx * dpy - dpx * cpy;
	const da = dpx * apy - apx * dpy;

	const ac = apx * cpy - cpx * apy;
	const bd = bpx * dpy - dpx * bpy;

	const abc = apz * bc - bpz * ac + cpz * ab;
	const bcd = bpz * cd - cpz * bd + dpz * bc;
	const cda = cpz * da + dpz * ac + apz * cd;
	const dab = dpz * ab + apz * bd + bpz * da;

	const alift = apx * apx + apy * apy + apz * apz;
	const blift = bpx * bpx + bpy * bpy + bpz * bpz;
	const clift = cpx * cpx + cpy * cpy + cpz * cpz;
	const dlift = dpx * dpx + dpy * dpy + dpz * dpz;

	return dlift * abc - clift * dab + (blift * cda - alift * bcd);
};

/**
 * Returns true if point `p` is in the circumcircle of triangle defined by `a`,
 * `b`, `c`.
 *
 * @param p
 * @param a
 * @param b
 * @param c
 */
export const pointInCircumCircle: FnU4<ReadonlyVec, boolean> = (p, a, b, c) =>
	magSq(a) * signedArea2(b, c, p) -
		magSq(b) * signedArea2(a, c, p) +
		magSq(c) * signedArea2(a, b, p) -
		magSq(p) * signedArea2(a, b, c) >
	0;

/**
 * Returns true if point `p` is in the triangle defined by `a`, `b`, `c`.
 * @param p
 * @param a
 * @param b
 * @param c
 */
export const pointInTriangle2: FnU4<ReadonlyVec, boolean> = (p, a, b, c) => {
	const s = clockwise2(a, b, c) ? 1 : -1;
	return (
		s * signedArea2(a, c, p) >= 0 &&
		s * signedArea2(b, a, p) >= 0 &&
		s * signedArea2(c, b, p) >= 0
	);
};

/**
 * Returns a classifier for given point `p` with respect to the triangle defined
 * by `a`, `b`, `c`. Returns -1 if point is outside the triangle, 0 if on the
 * boundary (using `eps` as tolerance) or +1 if the point is inside.
 *
 * @remarks
 * Also see {@link pointInTriangle2}
 *
 * @param p
 * @param a
 * @param b
 * @param c
 * @param eps
 */
export const classifyPointInTriangle2 = (
	p: ReadonlyVec,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	eps = EPS
) => {
	const s = clockwise2(a, b, c) ? 1 : -1;
	return sign(
		Math.min(
			s * signedArea2(a, c, p),
			s * signedArea2(b, a, p),
			s * signedArea2(c, b, p)
		),
		eps
	);
};

/**
 * Returns true if point `p` is inside the polygon boundary defined by `pts`.
 *
 * @param p
 * @param pts
 */
export const pointInPolygon2 = (p: ReadonlyVec, pts: ReadonlyVec[]) => {
	const n = pts.length - 1;
	const px = p[0];
	const py = p[1];
	let a = pts[n];
	let b = pts[0];
	let inside = 0;
	for (let i = 0; i <= n; a = b, b = pts[++i]) {
		inside = checkPolyPair(px, py, a[0], a[1], b[0], b[1], inside);
	}
	return inside;
};

/**
 * Returns a classifier for given point `p` with respect to the polygon defined
 * by `points`. Returns -1 if point is outside the polygon, 0 if on the boundary
 * (using `eps` as tolerance) or +1 if the point is inside.
 *
 * @param p
 * @param pts
 * @param eps
 */
export const classifyPointPolygon = (
	p: ReadonlyVec,
	pts: ReadonlyVec[],
	eps = EPS
) => {
	const n = pts.length - 1;
	const px = p[0];
	const py = p[1];
	let a = pts[n];
	let b = pts[0];
	let inside = -1;
	for (let i = 0; i <= n; a = b, b = pts[++i]) {
		inside = classifyPolyPair(px, py, a[0], a[1], b[0], b[1], inside, eps);
		if (inside === 0) return 0;
	}
	return inside === -1 ? -1 : 1;
};

/**
 * Helper function for {@link pointInPolygon2} to check point against a single
 * edge of the polygon boundary.
 *
 * @param px
 * @param py
 * @param ax
 * @param ay
 * @param bx
 * @param by
 * @param inside
 *
 * @internal
 */
export const checkPolyPair: FnN7 = (px, py, ax, ay, bx, by, inside) =>
	((ay < py && by >= py) || (by < py && ay >= py)) && (ax <= px || bx <= px)
		? inside ^ ~~(ax + ((py - ay) / (by - ay)) * (bx - ax) < px)
		: inside;

/**
 * Similar to {@link checkPolyPair}, but also considering the case that `p` lies
 * on the line segment `a` -> `b` (with tolerance `eps`). Returns 0 if that is
 * the case, otherwise -2 if inside, or -1 if outside.
 *
 * @param px
 * @param py
 * @param ax
 * @param ay
 * @param bx
 * @param by
 * @param inside
 * @param eps
 *
 * @internal
 */
export const classifyPolyPair = (
	px: number,
	py: number,
	ax: number,
	ay: number,
	bx: number,
	by: number,
	inside: number,
	eps = EPS
) => {
	const dax = ax - px;
	const day = ay - py;
	const dbx = bx - px;
	const dby = by - py;
	const dx = bx - ax;
	const dy = by - ay;
	const ieps = -eps;
	if (
		((dax <= eps && dbx >= ieps) || (dax >= ieps && dbx <= eps)) &&
		((day <= eps && dby >= ieps) || (day >= ieps && dby <= eps))
	) {
		const l = dx * dx + dy * dy;
		if (l > 1e-6) {
			const t = (-dax * dx - day * dy) / l;
			if (Math.hypot(px - (ax + t * dx), py - (ay + t * dy)) <= eps)
				return 0;
		}
	}
	return ((day < 0 && dby >= 0) || (dby < 0 && day >= 0)) &&
		(dax <= 0 || dbx <= 0)
		? inside ^ ~~(ax + (-day / dy) * dx < px)
		: inside;
};

/**
 * Returns a classifier for given point `p` with respect to the plane defined by
 * `normal` and `w` (plane normal form). Returns -1 if point is below the plane,
 * 0 if on the plane (using `eps` as tolerance) or +1 if the point is above.
 *
 * @param p
 * @param normal
 * @param w
 * @param eps
 */
export const classifyPointPlane = (
	p: ReadonlyVec,
	normal: ReadonlyVec,
	w: number,
	eps = EPS
) => sign(dot3(normal, p) - w, eps);

export const pointInBox: MultiVecOpImpl<
	Fn3<ReadonlyVec, ReadonlyVec, ReadonlyVec, boolean>
> = vop(0);

export const pointInRect = pointInBox.add(
	2,
	([x, y]: ReadonlyVec, pos: ReadonlyVec, size: ReadonlyVec) =>
		x >= pos[0] &&
		x <= pos[0] + size[0] &&
		y >= pos[1] &&
		y <= pos[1] + size[1]
);

export const pointInAABB = pointInBox.add(
	3,
	([x, y, z]: ReadonlyVec, pos: ReadonlyVec, size: ReadonlyVec) =>
		x >= pos[0] &&
		x <= pos[0] + size[0] &&
		y >= pos[1] &&
		y <= pos[1] + size[1] &&
		z >= pos[2] &&
		z <= pos[2] + size[2]
);

pointInBox.default((p, boxMin, boxSize) => {
	for (let i = p.length; i-- > 0; ) {
		const x = p[i];
		const y = boxMin[i];
		if (x < y || x > y + boxSize[i]) return false;
	}
	return true;
});

export const pointInCenteredBox: MultiVecOpImpl<
	Fn3<ReadonlyVec, ReadonlyVec, ReadonlyVec, boolean>
> = vop(0);

export const pointInCenteredRect = pointInCenteredBox.add(
	2,
	([x, y], pos, size) =>
		x >= pos[0] - size[0] &&
		x <= pos[0] + size[0] &&
		y >= pos[1] - size[1] &&
		y <= pos[1] + size[1]
);

export const pointInCenteredAABB = pointInCenteredBox.add(
	3,
	([x, y, z]: ReadonlyVec, pos: ReadonlyVec, size: ReadonlyVec) =>
		x >= pos[0] - size[0] &&
		x <= pos[0] + size[0] &&
		y >= pos[1] - size[1] &&
		y <= pos[1] + size[1] &&
		z >= pos[2] - size[2] &&
		z <= pos[2] + size[2]
);

pointInCenteredBox.default((p, boxCenter, boxExtent) => {
	for (let i = p.length; i-- > 0; ) {
		const x = p[i];
		const y = boxCenter[i];
		const z = boxExtent[i];
		if (x < y - z || x > y + z) return false;
	}
	return true;
});
