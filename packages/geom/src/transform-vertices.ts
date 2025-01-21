// SPDX-License-Identifier: Apache-2.0
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, IShape2, IShape3, TransformVertexFn } from "./api.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Path } from "./api/path.js";
import { Points } from "./api/points.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import type { Rect } from "./api/rect.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __dispatch } from "./internal/dispatch.js";
import { __ensureNoArc } from "./internal/error.js";
import {
	__segmentTransformer,
	__transformedPointsWith,
} from "./internal/transform.js";

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
 * - {@link Extra}
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
			complexpoly: "group",
			ellipse: "$aspoly",
			group3: "group",
			bpatch: "points",
			cubic: "points",
			cubic3: "points",
			line: "points",
			line3: "points",
			path3: "path",
			points3: "points",
			poly: "points",
			poly3: "points",
			polyline: "points",
			polyline3: "points",
			quad: "points",
			quad3: "points",
			quadratic: "points",
			quadratic3: "points",
			rect: "$aspoly",
			tri: "points",
			tri3: "points",
		},
		{
			$aspoly: ($, fn) => transformVertices(asPolygon($)[0], fn),

			$aspolyline: ($: IShape, fn) =>
				transformVertices(asPolyline($)[0], fn),

			extra: ($) => $,

			group: ($: Group, fn) =>
				$.copyTransformed((x) => transformVertices(x, fn)),

			path: ($: Path, fn) =>
				$.copyTransformed(
					__segmentTransformer<any>((geo) => {
						__ensureNoArc(geo);
						return <any>transformVertices(geo, fn);
					}, fn)
				),

			points: ($: Points, fn) =>
				$.copyTransformed((pts) => __transformedPointsWith(pts, fn)),
		}
	)
);
