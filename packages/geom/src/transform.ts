import type { FnU } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Attribs, IShape, IShape2, IShape3 } from "@thi.ng/geom-api";
import type { ReadonlyMat } from "@thi.ng/matrices";
import { mulV, mulV23, mulV44 } from "@thi.ng/matrices/mulv";
import type { Vec } from "@thi.ng/vectors";
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
import { Text } from "./api/text.js";
import { Triangle } from "./api/triangle.js";
import { Triangle3 } from "./api/triangle3.js";
import { asPath } from "./as-path.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __ensureNoArc } from "./internal/error.js";
import {
	__segmentTransformer,
	__transformedShape as tx,
	__transformedShape3 as tx3,
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
		ellipse: "$aspath",
		group3: "group",
	},
	{
		$aspath: ($: IShape2, mat) => transform(asPath($), mat),

		bpatch: tx(BPatch),

		complexpoly: ($: ComplexPolygon, mat) =>
			new ComplexPolygon(
				transform($.boundary, mat),
				$.children.map((child) => transform(child, mat)),
				__copyAttribs($.attribs)
			),

		cubic: tx(Cubic),

		cubic3: tx(Cubic3),

		group: ($: Group, mat) => $.copyTransformed((x) => transform(x, mat)),

		line: tx(Line),

		line3: tx(Line3),

		path: ($: Path, mat) =>
			__transformPath($, Path, mat, (p) => mulV23([], mat, p)),

		path3: ($: Path3, mat) =>
			__transformPath($, Path3, mat, (p) => mulV44([], mat, p)),

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

		rect: ($: Rect, mat) =>
			transform(new Quad(vertices($), __copyAttribs($.attribs)), mat),

		text: ($: Text, mat) =>
			new Text(mulV([], mat, $.pos!), $.body, __copyAttribs($.attribs)),

		tri: tx(Triangle),

		tri3: tx(Triangle3),
	}
);

const __transformPath = <T extends Path | Path3>(
	$: T,
	ctor: { new (s: T["segments"], sub: T["subPaths"], attribs?: Attribs): T },
	mat: ReadonlyMat,
	fn: FnU<Vec>
) => {
	const $transformSegments = __segmentTransformer<any>((geo) => {
		__ensureNoArc(geo);
		return <any>transform(geo, mat);
	}, fn);
	return new ctor(
		$transformSegments($.segments),
		$.subPaths.map($transformSegments),
		__copyAttribs($.attribs)
	);
};
