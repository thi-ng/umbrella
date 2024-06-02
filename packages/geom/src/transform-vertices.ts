import type { Fn } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Attribs, IShape, IShape2, IShape3 } from "@thi.ng/geom-api";
import type { ReadonlyMat } from "@thi.ng/matrices";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Arc } from "./api/arc.js";
import { BPatch } from "./api/bpatch.js";
import type { Circle } from "./api/circle.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Cubic } from "./api/cubic.js";
import { Cubic3 } from "./api/cubic3.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Line3 } from "./api/line3.js";
import { Path } from "./api/path.js";
import { Path3 } from "./api/path3.js";
import { Points } from "./api/points.js";
import { Points3 } from "./api/points3.js";
import { Polygon } from "./api/polygon.js";
import { Polygon3 } from "./api/polygon3.js";
import { Polyline } from "./api/polyline.js";
import { Polyline3 } from "./api/polyline3.js";
import { Quad } from "./api/quad.js";
import { Quad3 } from "./api/quad3.js";
import { Quadratic } from "./api/quadratic.js";
import { Quadratic3 } from "./api/quadratic3.js";
import type { Rect } from "./api/rect.js";
import { Triangle } from "./api/triangle.js";
import { Triangle3 } from "./api/triangle3.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __ensureNoArc } from "./internal/error.js";
import {
	__segmentTransformer,
	__transformedShapePoints as tx,
	__transformedShapePoints3 as tx3,
} from "./internal/transform.js";

export type TransformVertexFn = Fn<ReadonlyVec, ReadonlyMat>;

/**
 * Function overrides for {@link transformVertices}.
 */
export type TransformVerticesFn = {
	(shape: Arc, fn: TransformVertexFn): Polyline;
	(shape: Circle, fn: TransformVertexFn): Polygon;
	(shape: Ellipse, fn: TransformVertexFn): Polygon;
	(shape: Rect, fn: TransformVertexFn): Polygon;
	<T extends IShape2>(shape: T, fn: TransformVertexFn): T;
	<T extends IShape3>(shape: T, fn: TransformVertexFn): T;
} & MultiFn2<IShape, TransformVertexFn, IShape>;

/**
 * Similar to {@link transform}. Transforms vertices of given shape with
 * provided function, which is being called for each vertex individually and
 * should produce a transformation matrix.
 *
 * @remark
 * Some shape types will be automatically converted to other types prior to
 * transformation because they cannot be reliably represented in their original
 * type anymore, this includes:
 *
 * - {@link Arc} => {@link Path} (cubics)
 * - {@link Circle} => {@link Path} (cubics)
 * - {@link Ellipse} => {@link Path} (cubics)
 * - {@link Rect} => {@link Polygon}
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link BPatch}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Group3}
 * - {@link Line}
 * - {@link Line3}
 * - {@link Path}
 * - {@link Path3}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Polygon}
 * - {@link Polygon3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Quadratic}
 * - {@link Quadratic3}
 * - {@link Rect}
 * - {@link Text}
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * @param shape
 * @param fn
 */
export const transformVertices = <TransformVerticesFn>(
	defmulti<any, TransformVertexFn, IShape>(
		__dispatch,
		{
			arc: "$aspolyline",
			circle: "$aspoly",
			ellipse: "$aspoly",
			group3: "group",
			rect: "$aspoly",
		},
		{
			$aspoly: ($, fn) => transformVertices(asPolygon($)[0], fn),

			$aspolyline: ($: IShape, fn) =>
				transformVertices(asPolyline($)[0], fn),

			bpatch: tx(BPatch),

			complexpoly: ($: ComplexPolygon, fn) =>
				new ComplexPolygon(
					transformVertices($.boundary, fn),
					$.children.map((child) => transformVertices(child, fn)),
					__copyAttribs($.attribs)
				),

			cubic: tx(Cubic),

			cubic3: tx(Cubic3),

			group: ($: Group, fn) =>
				$.copyTransformed((x) => transformVertices(x, fn)),

			line: tx(Line),

			line3: tx(Line3),

			path: ($: Path, fn) => __transformPath($, Path, fn),

			path3: ($: Path3, fn) => __transformPath($, Path3, fn),

			points: tx(Points),

			points3: tx3(Points3),

			poly: tx(Polygon),

			poly3: tx(Polygon3),

			polyline: tx(Polyline),

			polyline3: tx(Polyline3),

			quad: tx(Quad),

			quad3: tx(Quad3),

			quadratic: tx(Quadratic),

			quadratic3: tx(Quadratic3),

			tri: tx(Triangle),

			tri3: tx(Triangle3),
		}
	)
);

const __transformPath = <T extends Path | Path3>(
	$: T,
	ctor: { new (s: T["segments"], sub: T["subPaths"], attribs?: Attribs): T },
	fn: TransformVertexFn
) => {
	const $transformSegments = __segmentTransformer<any>((geo) => {
		__ensureNoArc(geo);
		return <any>transformVertices(geo, fn);
	}, fn);
	return new ctor(
		$transformSegments($.segments),
		$.subPaths.map($transformSegments),
		__copyAttribs($.attribs)
	);
};
