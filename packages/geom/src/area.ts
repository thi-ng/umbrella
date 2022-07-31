import type { MultiFn1O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { polyArea2 } from "@thi.ng/geom-poly-utils/area";
import { PI } from "@thi.ng/math/api";
import type { Vec } from "@thi.ng/vectors";
import { signedArea2 } from "@thi.ng/vectors/signed-area";
import type { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import type { Path } from "./api/path.js";
import type { Polygon } from "./api/polygon.js";
import type { Rect } from "./api/rect.js";
import type { Sphere } from "./api/sphere.js";
import type { Triangle } from "./api/triangle.js";
import { asPolygon } from "./as-polygon.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Computes the possibly signed (unsigned by default) surface area of given
 * `shape`. For groups calls itself for each child and returns sum of unsigned
 * areas.
 *
 * @remarks
 * In general, for polygons and triangles, the sign of the result can be used as
 * indication of the shapes orientation (clockwise / counterclockwise).
 *
 * For curves, lines, point clouds and rays the function returns 0.
 *
 * Currently implemented for:
 *
 * - {@link AABB}
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Line}
 * - {@link Path} (closed only & via poly conversion)
 * - {@link Plane}
 * - {@link Points}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Ray}
 * - {@link Rect}
 * - {@link Sphere}
 * - {@link Triangle}
 *
 * @param shape - shape to operate on
 * @param signed - true, if signed area
 */
export const area: MultiFn1O<IShape, boolean, number> = defmulti(
	__dispatch,
	{ quad: "poly" },
	{
		aabb: ({ size: [w, h, d] }: AABB) => 2 * (w * h + w * d + h * d),

		arc:
			// http://cut-the-knot.org/Generalization/Cavalieri2.shtml
			($: Arc) => 0.5 * Math.abs($.start - $.end) * $.r[0] * $.r[1],

		circle: ($: Circle) => PI * $.r ** 2,

		ellipse: ($: Ellipse) => PI * $.r[0] * $.r[1],

		group: ({ children }: Group) =>
			children.reduce((sum, $) => sum + area($, false), 0),

		path: ($: Path) => ($.closed ? area(asPolygon($)) : 0),

		plane: () => Infinity,

		poly: ($: Polygon, signed?) => {
			const area = polyArea2($.points);
			return signed ? area : Math.abs(area);
		},

		rect: ($: Rect) => $.size[0] * $.size[1],

		sphere: ($: Sphere) => 4 * PI * $.r ** 2,

		tri: ($: Triangle, signed?) => {
			const area = 0.5 * signedArea2(...(<[Vec, Vec, Vec]>$.points));
			return signed ? area : Math.abs(area);
		},

		[DEFAULT]: () => 0,
	}
);
