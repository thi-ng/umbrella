import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { ReadonlyMat } from "@thi.ng/matrices";
import { mulV23, mulV344 } from "@thi.ng/matrices/mulv";
import type { IShape, IShape2, IShape3 } from "./api.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Path } from "./api/path.js";
import { Path3 } from "./api/path3.js";
import { Points } from "./api/points.js";
import { Points3 } from "./api/points3.js";
import { Quad } from "./api/quad.js";
import type { Rect } from "./api/rect.js";
import { Text } from "./api/text.js";
import { asPath } from "./as-path.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __ensureNoArc } from "./internal/error.js";
import {
	__segmentTransformer,
	__transformedPoints,
} from "./internal/transform.js";
import { vertices } from "./vertices.js";

/**
 * Function overrides for {@link transform}.
 */
export type TransformFn = {
	(shape: Arc, mat: ReadonlyMat): Path;
	(shape: Circle, mat: ReadonlyMat): Path;
	(shape: Ellipse, mat: ReadonlyMat): Path;
	(shape: Rect, mat: ReadonlyMat): Quad;
	<T extends IShape2>(shape: T, mat: ReadonlyMat): T;
	<T extends IShape3>(shape: T, mat: ReadonlyMat): T;
} & MultiFn2<IShape, ReadonlyMat, IShape>;

/**
 * Transforms given shape with provided matrix.
 *
 * @remarks
 * A 2x3 transform matrix is assumed for 2D shapes and 4x4 matrix for 3D shapes.
 * Some shape types will be automatically converted to other types prior to
 * transformation because they cannot be reliably represented in their original
 * type anymore, this includes:
 *
 * - {@link Arc} => {@link Path} (cubics)
 * - {@link Circle} => {@link Path} (cubics)
 * - {@link Ellipse} => {@link Path} (cubics)
 * - {@link Rect} => {@link Quad}
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
 * - {@link Ray}
 * - {@link Rect}
 * - {@link Text}
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * @param shape
 * @param mat
 */
export const transform = <TransformFn>defmulti<any, ReadonlyMat, IShape>(
	__dispatch,
	{
		arc: "$aspath",
		circle: "$aspath",
		complexpoly: "group",
		bpatch: "points",
		cubic: "points",
		cubic3: "points3",
		ellipse: "$aspath",
		group3: "group",
		line: "points",
		line3: "points3",
		poly: "points",
		poly3: "points3",
		polyline: "points",
		polyline3: "points3",
		quad: "points",
		quad3: "points3",
		quadratic: "points",
		quadratic3: "points3",
		tri: "points",
		tri3: "points3",
	},
	{
		$aspath: ($: IShape2, mat) => transform(asPath($), mat),

		extra: ($) => $,

		group: ($: Group, mat) => $.copyTransformed((x) => transform(x, mat)),

		path: ($: Path, mat) =>
			$.copyTransformed(
				__segmentTransformer<any>(
					(geo) => {
						__ensureNoArc(geo);
						return <any>transform(geo, mat);
					},
					(p) => mulV23([], mat, p)
				)
			),

		path3: ($: Path3, mat) =>
			$.copyTransformed(
				__segmentTransformer<any>(
					(geo) => {
						__ensureNoArc(geo);
						return <any>transform(geo, mat);
					},
					(p) => mulV344([], mat, p)!
				)
			),

		points: ($: Points, mat) =>
			$.copyTransformed((points) =>
				__transformedPoints(points, mat, mulV23)
			),

		points3: ($: Points3, mat) =>
			$.copyTransformed((points) =>
				__transformedPoints(points, mat, <any>mulV344)
			),

		rect: ($: Rect, mat) =>
			transform(new Quad(vertices($), __copyAttribs($.attribs)), mat),

		text: ($: Text, mat) =>
			new Text(mulV23([], mat, $.pos!), $.body, __copyAttribs($.attribs)),
	}
);
