import type { Maybe } from "@thi.ng/api";
import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike, PathSegment } from "./api.js";
import { closestPoint as closestPointArc } from "@thi.ng/geom-arc/closest-point";
import {
	closestPointAABB,
	closestPointRect,
} from "@thi.ng/geom-closest-point/box";
import { closestPointCircle } from "@thi.ng/geom-closest-point/circle";
import {
	closestPointPolyline,
	closestPointSegment,
} from "@thi.ng/geom-closest-point/line";
import { closestPointPlane } from "@thi.ng/geom-closest-point/plane";
import { closestPointArray } from "@thi.ng/geom-closest-point/points";
import { closestPointCubic } from "@thi.ng/geom-splines/cubic-closest-point";
import { closestPointQuadratic } from "@thi.ng/geom-splines/quadratic-closest-point";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { add2, add3 } from "@thi.ng/vectors/add";
import { distSq2 } from "@thi.ng/vectors/distsq";
import { set2 } from "@thi.ng/vectors/set";
import type { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Cubic } from "./api/cubic.js";
import type { Line } from "./api/line.js";
import type { Path } from "./api/path.js";
import type { Plane } from "./api/plane.js";
import type { Quadratic } from "./api/quadratic.js";
import type { Rect } from "./api/rect.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Computes closest point to `p` on boundary of given shape. Writes result in
 * optionally provided output vector (or creates new one if omitted).
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link AABB}
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Line}
 * - {@link Path}
 * - {@link Plane}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Rect}
 * - {@link Sphere}
 *
 * @param shape
 * @param p
 * @param out
 */
export const closestPoint: MultiFn2O<
	IShape,
	ReadonlyVec,
	Vec,
	Maybe<Vec>
> = defmulti<any, ReadonlyVec, Maybe<Vec>, Maybe<Vec>>(
	__dispatch,
	{
		quad: "poly",
		points3: "points",
		sphere: "circle",
		tri: "poly",
	},
	{
		aabb: ($: AABB, p, out) =>
			closestPointAABB(p, $.pos, add3([], $.pos, $.size), out),

		arc: ($: Arc, p, out) =>
			closestPointArc(p, $.pos, $.r, $.axis, $.start, $.end, out),

		circle: ($: Circle, p, out) => closestPointCircle(p, $.pos, $.r, out),

		complexpoly: ($: ComplexPolygon, p, out) => {
			out = closestPointPolyline(p, $.boundary.points, true, out);
			let minD = distSq2(p, out!);
			let tmp: Vec = [];
			for (let child of $.children) {
				closestPointPolyline(p, child.points, true, tmp);
				const d = distSq2(p, tmp);
				if (d < minD) {
					minD = d;
					set2(out!, tmp);
				}
			}
			return out;
		},

		cubic: ({ points }: Cubic, p, out) =>
			closestPointCubic(
				p,
				points[0],
				points[1],
				points[2],
				points[3],
				out
			),

		line: ({ points }: Line, p, out) =>
			closestPointSegment(p, points[0], points[1], out),

		path: ($: Path, p, out) => {
			let minD = Infinity;
			const $closestPSegment = (segments: PathSegment[]) => {
				for (let s of segments) {
					if (!s.geo) continue;
					const q = closestPoint(s.geo, p)!;
					if (!q) continue;
					const d = distSq2(p, q);
					if (d < minD) {
						minD = d;
						out = set2(out || [], q);
					}
				}
			};
			$closestPSegment($.segments);
			for (let sub of $.subPaths) $closestPSegment(sub);
			return out;
		},

		plane: ($: Plane, p, out) => closestPointPlane(p, $.normal, $.w, out),

		points: ($: PCLike, p, out) => closestPointArray(p, $.points, out),

		poly: ($: PCLike, p, out) =>
			closestPointPolyline(p, $.points, true, out),

		polyline: ($: PCLike, p, out) =>
			closestPointPolyline(p, $.points, false, out),

		quadratic: ({ points }: Quadratic, p, out) =>
			closestPointQuadratic(p, points[0], points[1], points[2], out),

		rect: ($: Rect, p, out) =>
			closestPointRect(p, $.pos, add2([], $.pos, $.size), out),
	}
);
