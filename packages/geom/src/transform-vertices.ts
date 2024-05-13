import type { Fn } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type {
	IHiccupShape2,
	IShape,
	IShape2,
	IShape3,
	PathSegment2,
} from "@thi.ng/geom-api";
import type { ReadonlyMat } from "@thi.ng/matrices";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Arc } from "./api/arc.js";
import { BPatch } from "./api/bpatch.js";
import type { Circle } from "./api/circle.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Cubic } from "./api/cubic.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { Points } from "./api/points.js";
import { Points3 } from "./api/points3.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { Quad } from "./api/quad.js";
import { Quadratic } from "./api/quadratic.js";
import type { Rect } from "./api/rect.js";
import { Triangle } from "./api/triangle.js";
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
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Line}
 * - {@link Path}
 * - {@link Points}
 * - {@link Points3}
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
 * @param fn
 */
export const transformVertices = <TransformVerticesFn>(
	defmulti<any, TransformVertexFn, IShape>(
		__dispatch,
		{
			arc: "$aspolyline",
			circle: "$aspoly",
			ellipse: "$aspoly",
			rect: "$aspoly",
		},
		{
			$aspoly: ($, fn) => transformVertices(asPolygon($)[0], fn),

			$aspolyline: ($: IShape, fn) =>
				transformVertices(asPolyline($)[0], fn),

			bpatch: tx(BPatch),

			complexpoly: ($: ComplexPolygon, fn) =>
				new ComplexPolygon(
					<Polygon>transformVertices($.boundary, fn),
					$.children.map(
						(child) => <Polygon>transformVertices(child, fn)
					)
				),

			cubic: tx(Cubic),

			group: ($: Group, fn) =>
				$.copyTransformed(
					(x) => <IHiccupShape2>transformVertices(x, fn)
				),

			line: tx(Line),

			path: ($: Path, fn) => {
				const $transformSegments = __segmentTransformer<PathSegment2>(
					(geo) => {
						__ensureNoArc(geo);
						return <IShape2>transformVertices(geo, fn);
					},
					fn
				);
				return new Path(
					$transformSegments($.segments),
					$.subPaths.map($transformSegments),
					__copyAttribs($)
				);
			},

			points: tx(Points),

			points3: tx3(Points3),

			poly: tx(Polygon),

			polyline: tx(Polyline),

			quad: tx(Quad),

			quadratic: tx(Quadratic),

			tri: tx(Triangle),
		}
	)
);
