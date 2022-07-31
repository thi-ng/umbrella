import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
import { rotate as $rotate } from "@thi.ng/vectors/rotate";
import type { Arc } from "./api/arc.js";
import { Circle } from "./api/circle.js";
import { Cubic } from "./api/cubic.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { Points } from "./api/points.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { Quad } from "./api/quad.js";
import { Quadratic } from "./api/quadratic.js";
import { Ray } from "./api/ray.js";
import type { Rect } from "./api/rect.js";
import { Text } from "./api/text.js";
import { Triangle } from "./api/triangle.js";
import { asPath } from "./as-path.js";
import { asPolygon } from "./as-polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __rotatedShape as tx } from "./internal/rotate.js";

/**
 * Rotates given 2D shape by `theta` (in radians).
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Line}
 * - {@link Path}
 * - {@link Points}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Ray}
 * - {@link Rect}
 * - {@link Text}
 * - {@link Triangle}
 *
 * @param shape
 * @param theta
 */
export const rotate: MultiFn2<IShape, number, IShape> = defmulti<
	any,
	number,
	IShape
>(
	__dispatch,
	{},
	{
		arc: ($: Arc, theta) => {
			const a = $.copy();
			$rotate(null, a.pos, theta);
			return a;
		},

		circle: ($: Circle, theta) =>
			new Circle($rotate([], $.pos, theta), $.r, __copyAttribs($)),

		cubic: tx(Cubic),

		ellipse: ($: Ellipse, theta) => rotate(asPath($), theta),

		group: ($: Group, theta) =>
			$.copyTransformed((x) => <IHiccupShape>rotate(x, theta)),

		line: tx(Line),

		path: ($: Path, theta) => {
			return new Path(
				$.segments.map((s) =>
					s.geo
						? {
								type: s.type,
								geo: <any>rotate(s.geo, theta),
						  }
						: {
								type: s.type,
								point: $rotate([], s.point!, theta),
						  }
				),
				__copyAttribs($)
			);
		},

		points: tx(Points),

		poly: tx(Polygon),

		polyline: tx(Polyline),

		quad: tx(Quad),

		quadratic: tx(Quadratic),

		ray: ($: Ray, theta) => {
			return new Ray(
				$rotate([], $.pos, theta),
				$rotate([], $.dir, theta),
				__copyAttribs($)
			);
		},

		rect: ($: Rect, theta) => rotate(asPolygon($), theta),

		text: ($: Text, theta) =>
			new Text($rotate([], $.pos, theta), $.body, __copyAttribs($)),

		tri: tx(Triangle),
	}
);
