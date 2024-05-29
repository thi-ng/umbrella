import type { Maybe } from "@thi.ng/api";
import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import {
	classifyPointInCircle,
	classifyPointInTriangle2,
	classifyPointPlane,
	classifyPointPolygon,
	classifyPointSegment2,
} from "@thi.ng/geom-isec/point";
import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Circle } from "./api/circle.js";
import type { Line } from "./api/line.js";
import type { Plane } from "./api/plane.js";
import type { Polygon } from "./api/polygon.js";
import type { Triangle } from "./api/triangle.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Classifies point `p` with respect to given shape. Returns -1 if `p` is
 * inside, 1 if outside  or 0 if `p` is on the shape boundary (using optional
 * tolerance `eps`, default: 1e-6).
 *
 * @remarks
 * Currently only implemented for:
 *
 * - {@link Circle}
 * - {@link Line} (-1 = right/clockwise, +1 = left/counterclockwise)
 * - {@link Plane} (-1 = below, +1 = above)
 * - {@link Polygon}
 * - {@link Sphere}
 * - {@link Triangle}
 *
 * The [thi.ng/geom-sdf](https://thi.ng/thi.ng/geom-sdf) package provides a much
 * more comprehensive feature set (incl. support for more shapes) to perform
 * similar checks as this function.
 *
 * Also see:
 * - {@link closestPoint}
 * - {@link pointInside}
 * - {@link proximity}
 *
 * @param shape
 * @param p
 * @param eps
 */
export const classifyPoint: MultiFn2O<IShape, ReadonlyVec, number, number> =
	defmulti<any, ReadonlyVec, Maybe<number>, number>(
		__dispatch,
		{ sphere: "circle" },
		{
			circle: ($: Circle, p, eps = EPS) =>
				classifyPointInCircle(p, $.pos, $.r, eps),

			line: ({ points: [a, b] }: Line, p, eps = EPS) =>
				classifyPointSegment2(p, a, b, eps),

			plane: ($: Plane, p, eps = EPS) =>
				classifyPointPlane(p, $.normal, $.w, eps),

			poly: ($: Polygon, p, eps = EPS) =>
				classifyPointPolygon(p, $.points, eps),

			tri: ({ points }: Triangle, p: ReadonlyVec, eps = EPS) =>
				classifyPointInTriangle2(
					p,
					points[0],
					points[1],
					points[2],
					eps
				),
		}
	);
