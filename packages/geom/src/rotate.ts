import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape2, IShape2, PathSegment2 } from "@thi.ng/geom-api";
import { rotate as $rotate } from "@thi.ng/vectors/rotate";
import type { Arc } from "./api/arc.js";
import { BPatch } from "./api/bpatch.js";
import { Circle } from "./api/circle.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
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
import { __ensureNoArc } from "./internal/error.js";
import { __rotatedShape as tx } from "./internal/rotate.js";
import { __segmentTransformer } from "./internal/transform.js";

export type RotateFn = {
	(shape: Arc, theta: number): Path;
	(shape: Ellipse, theta: number): Path;
	(shape: Rect, theta: number): Polygon;
	<T extends IShape2>(shape: T, theta: number): T;
} & MultiFn2<IShape2, number, IShape2>;

/**
 * Rotates given 2D shape by `theta` (in radians).
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link BPatch}
 * - {@link Circle}
 * - {@link ComplexPolygon}
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
export const rotate = <RotateFn>defmulti<any, number, IShape2>(
	__dispatch,
	{
		arc: "$aspath",
		ellipse: "$aspath",
		rect: "$aspoly",
	},
	{
		$aspath: ($, theta) => rotate(asPath($), theta),

		$aspoly: ($, theta) => rotate(asPolygon($)[0], theta),

		bpatch: tx(BPatch),

		circle: ($: Circle, theta) =>
			new Circle($rotate([], $.pos, theta), $.r, __copyAttribs($)),

		complexpoly: ($: ComplexPolygon, theta) =>
			new ComplexPolygon(
				<Polygon>rotate($.boundary, theta),
				$.children.map((child) => <Polygon>rotate(child, theta))
			),

		cubic: tx(Cubic),

		group: ($: Group, theta) =>
			$.copyTransformed((x) => <IHiccupShape2>rotate(x, theta)),

		line: tx(Line),

		path: ($: Path, theta) => {
			const $rotateSegments = __segmentTransformer<PathSegment2>(
				(geo) => {
					__ensureNoArc(geo);
					return rotate(geo, theta);
				},
				(p) => $rotate([], p, theta)
			);
			return new Path(
				$rotateSegments($.segments),
				$.subPaths.map($rotateSegments),
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

		text: ($: Text, theta) =>
			new Text($rotate([], $.pos, theta), $.body, __copyAttribs($)),

		tri: tx(Triangle),
	}
);
