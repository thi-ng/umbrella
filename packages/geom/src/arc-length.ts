import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { perimeter } from "@thi.ng/geom-poly-utils/perimeter";
import { PI, TAU } from "@thi.ng/math/api";
import { dist } from "@thi.ng/vectors/dist";
import type { Circle } from "./api/circle.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Path } from "./api/path.js";
import type { Polygon } from "./api/polygon.js";
import type { Rect } from "./api/rect.js";
import type { Triangle } from "./api/triangle.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Returns the arc length / perimeter / circumference of the given shape. For
 * groups calls {@link arcLength} for each child and returns the sum of results.
 *
 * Implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Ellipse}
 * - {@link Group} (total sum of child circumferences)
 * - {@link Group3} (total sum of child circumferences)
 * - {@link Line}
 * - {@link Line3}
 * - {@link Path}
 * - {@link Path3}
 * - {@link Polygon}
 * - {@link Polygon3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Quadratic}
 * - {@link Quadratic3}
 * - {@link Rect}
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * For all other types the function returns 0.
 *
 * @param shape
 */
export const arcLength: MultiFn1<IShape, number> = defmulti(
	__dispatch,
	{
		arc: "$aspolyline",
		cubic: "$aspolyline",
		cubic3: "$aspolyline",
		group3: "group",
		line3: "line",
		path3: "path",
		poly3: "poly",
		polyline3: "polyline",
		quad: "poly",
		quad3: "poly",
		quadratic: "$aspolyline",
		quadratic3: "$aspolyline",
		tri: "poly",
		tri3: "tri",
	},
	{
		[DEFAULT]: () => 0,

		$aspoly: ($) => asPolygon($).reduce((acc, p) => acc + arcLength(p), 0),

		$aspolyline: ($) =>
			asPolyline($).reduce((acc, p) => acc + arcLength(p), 0),

		circle: ($: Circle) => TAU * $.r,

		complexpoly: ($: ComplexPolygon) =>
			[$.boundary, ...$.children].reduce(
				(acc, c) => acc + arcLength(c),
				0
			),

		ellipse: ({ r: [a, b] }: Ellipse) =>
			// Ramanujan approximation
			// https://www.mathsisfun.com/geometry/ellipse-perimeter.html
			PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (3 * b + a))),

		group: ({ children }: Group) =>
			children.reduce((sum, $) => sum + arcLength($), 0),

		line: ({ points }: Line) => dist(points[0], points[1]),

		path: ($: Path) => {
			return ($.closed ? asPolygon($) : asPolyline($)).reduce(
				(acc, p) => acc + arcLength(p),
				0
			);
		},

		poly: ({ points }: Polygon) => perimeter(points, points.length, true),

		polyline: ({ points }: Polygon) => perimeter(points),

		rect: ({ size: [w, h] }: Rect) => 2 * (w + h),

		tri: ({ points }: Triangle) =>
			dist(points[0], points[1]) +
			dist(points[1], points[2]) +
			dist(points[2], points[0]),
	}
);
