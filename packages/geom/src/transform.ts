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
import { mulV } from "@thi.ng/matrices/mulv";
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
				<Polygon>transform($.boundary, mat),
				$.children.map((child) => <Polygon>transform(child, mat))
			),

		cubic: tx(Cubic),

		cubic3: tx(Cubic3),

		group: ($: Group, mat) =>
			$.copyTransformed((x) => <IHiccupShape2>transform(x, mat)),

		line: tx(Line),

		line3: tx(Line3),

		path: ($: Path, mat) => {
			const $transformSegments = __segmentTransformer<PathSegment2>(
				(geo) => {
					__ensureNoArc(geo);
					return <IShape2>transform(geo, mat);
				},
				(p) => mulV([], mat, p)
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

		poly3: tx(Polygon3),

		polyline: tx(Polyline),

		polyline3: tx(Polyline3),

		quad: tx(Quad),

		quad3: tx(Quad3),

		quadratic: tx(Quadratic),

		quadratic3: tx(Quadratic3),

		rect: ($: Rect, mat) =>
			transform(new Quad(vertices($), __copyAttribs($)), mat),

		text: ($: Text, mat) =>
			new Text(mulV([], mat, $.pos!), $.body, __copyAttribs($)),

		tri: tx(Triangle),

		tri3: tx(Triangle3),
	}
);
