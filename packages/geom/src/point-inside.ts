import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import {
	pointInAABB,
	pointInCircle,
	pointInPolygon2,
	pointInRect,
	pointInSegment,
	pointInSegments,
	pointInTriangle2,
} from "@thi.ng/geom-isec/point";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { isInArray } from "@thi.ng/vectors/eqdelta";
import type { AABB } from "./api/aabb.js";
import type { Circle } from "./api/circle.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Line } from "./api/line.js";
import type { Points } from "./api/points.js";
import type { Polygon } from "./api/polygon.js";
import type { Polyline } from "./api/polyline.js";
import type { Rect } from "./api/rect.js";
import type { Triangle } from "./api/triangle.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Returns true if point `p` is inside the given shape.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link AABB}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Line} (if `p` is on line segment)
 * - {@link Points} (i.e. if `p` is one of the points in the cloud)
 * - {@link Points3} (same as w/ Points)
 * - {@link Polygon}
 * - {@link Polyline} (if `p` is on any of the line segments)
 * - {@link Quad}
 * - {@link Rect}
 * - {@link Sphere}
 * - {@link Triangle}
 *
 * @param shape
 * @param p
 */
export const pointInside: MultiFn2<IShape, ReadonlyVec, boolean> = defmulti<
	any,
	ReadonlyVec,
	boolean
>(
	__dispatch,
	{
		points3: "points",
		quad: "poly",
		sphere: "circle",
	},
	{
		aabb: ($: AABB, p: ReadonlyVec) => pointInAABB(p, $.pos, $.size),

		circle: ($: Circle, p) => pointInCircle(p, $.pos, $.r),

		complexpoly: ($: ComplexPolygon, p) =>
			pointInPolygon2(p, $.boundary.points)
				? !$.children.some((child) => pointInPolygon2(p, child.points))
				: false,

		line: ($: Line, p) => pointInSegment(p, $.points[0], $.points[1]),

		points: ({ points }: Points, p) => isInArray(p, points),

		poly: ($: Polygon, p) => pointInPolygon2(p, $.points) > 0,

		polyline: ($: Polyline, p) => pointInSegments(p, $.points, false),

		rect: ($: Rect, p: ReadonlyVec) => pointInRect(p, $.pos, $.size),

		tri: (tri: Triangle, p: ReadonlyVec) =>
			pointInTriangle2(p, ...(<[Vec, Vec, Vec]>tri.points)),
	}
);
