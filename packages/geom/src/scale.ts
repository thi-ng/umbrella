import { isNumber } from "@thi.ng/checks/is-number";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	IShape,
	IShape2,
	IShape3,
	PathSegment2,
	PathSegment3,
} from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mul2, mul3 } from "@thi.ng/vectors/mul";
import { mulN2, mulN3 } from "@thi.ng/vectors/muln";
import { normalize2, normalize3 } from "@thi.ng/vectors/normalize";
import { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import { BPatch } from "./api/bpatch.js";
import { Circle } from "./api/circle.js";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Cubic } from "./api/cubic.js";
import { Cubic3 } from "./api/cubic3.js";
import { Ellipse } from "./api/ellipse.js";
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
import { Ray } from "./api/ray.js";
import { Ray3 } from "./api/ray3.js";
import { Rect } from "./api/rect.js";
import { Sphere } from "./api/sphere.js";
import { Text } from "./api/text.js";
import { Triangle } from "./api/triangle.js";
import { Triangle3 } from "./api/triangle3.js";
import { __asVec } from "./internal/args.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __scaledShape as tx } from "./internal/scale.js";
import { __segmentTransformer } from "./internal/transform.js";

/**
 * Function overrides for {@link scale}.
 */
export type ScaleFn = {
	(shape: Circle, factor: number): Circle;
	(shape: Circle, factor: ReadonlyVec): Ellipse;
	<T extends IShape2>(shape: T, factor: number | ReadonlyVec): T;
	<T extends IShape3>(shape: T, factor: number | ReadonlyVec): T;
} & MultiFn2<IShape, number | ReadonlyVec, IShape>;

/**
 * Scales given shape uniformly or non-uniformly by given `factor`.
 *
 * @remarks
 * Scaling non-uniformly might result in different result types, e.g.
 * {@link Circle} => {@link Ellipse}.
 *
 * Currently implemented for:
 *
 * - {@link AABB}
 * - {@link Arc}
 * - {@link BPatch}
 * - {@link Circle}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Dummy} (returns `undefined`)
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
 * - {@link Ray3}
 * - {@link Rect}
 * - {@link Sphere}
 * - {@link Text}
 * - {@link Triangle}
 *
 * @param shape
 * @param factor
 */
export const scale = <ScaleFn>defmulti<any, number | ReadonlyVec, IShape>(
	__dispatch,
	{ group3: "group" },
	{
		aabb: ($: AABB, delta) => {
			delta = __asVec(delta, 3);
			return new AABB(
				mul3([], $.pos, delta),
				mul3([], $.size, delta),
				__copyAttribs($.attribs)
			);
		},

		arc: ($: Arc, delta) => {
			delta = __asVec(delta);
			const a = $.copy();
			mul2(null, a.pos, delta);
			mul2(null, a.r, delta);
			return a;
		},

		bpatch: tx(BPatch),

		circle: ($: Circle, delta) =>
			isNumber(delta)
				? new Circle(
						mulN2([], $.pos, delta),
						$.r * delta,
						__copyAttribs($.attribs)
				  )
				: new Ellipse(
						mul2([], $.pos, delta),
						mulN2([], delta, $.r),
						__copyAttribs($.attribs)
				  ),

		complexpoly: ($: ComplexPolygon, delta) =>
			new ComplexPolygon(
				scale($.boundary, delta),
				$.children.map((child) => scale(child, delta)),
				__copyAttribs($.attribs)
			),

		cubic: tx(Cubic),

		cubic3: tx(Cubic3),

		dummy: ($) => $,

		ellipse: ($: Ellipse, delta) => {
			delta = __asVec(delta);
			return new Ellipse(
				mul2([], $.pos, delta),
				mul2([], $.r, delta),
				__copyAttribs($.attribs)
			);
		},

		group: ($: Group, delta) => $.copyTransformed((x) => scale(x, delta)),

		line: tx(Line),

		line3: tx(Line3),

		path: ($: Path, delta) => {
			delta = __asVec(delta);
			const $scaleSegments = __segmentTransformer<PathSegment2>(
				(geo) => scale(geo, delta),
				(p) => mul2([], p, <ReadonlyVec>delta)
			);
			return new Path(
				$scaleSegments($.segments),
				$.subPaths.map($scaleSegments),
				__copyAttribs($.attribs)
			);
		},

		path3: ($: Path3, delta) => {
			delta = __asVec(delta);
			const $scaleSegments = __segmentTransformer<PathSegment3>(
				(geo) => scale(geo, delta),
				(p) => mul3([], p, <ReadonlyVec>delta)
			);
			return new Path3(
				$scaleSegments($.segments),
				$.subPaths.map($scaleSegments),
				__copyAttribs($.attribs)
			);
		},

		points: tx(Points),

		points3: tx(Points3),

		poly: tx(Polygon),

		poly3: tx(Polygon3),

		polyline: tx(Polyline),

		polyline3: tx(Polyline3),

		quad: tx(Quad),

		quad3: tx(Quad3),

		quadratic: tx(Quadratic),

		quadratic3: tx(Quadratic3),

		ray: ($: Ray, delta) => {
			delta = __asVec(delta);
			return new Ray(
				mul2([], $.pos, delta),
				normalize2(null, mul2([], $.dir, delta)),
				__copyAttribs($.attribs)
			);
		},

		ray3: ($: Ray3, delta) => {
			delta = __asVec(delta);
			return new Ray3(
				mul3([], $.pos, delta),
				normalize3(null, mul3([], $.dir, delta)),
				__copyAttribs($.attribs)
			);
		},

		rect: ($: Rect, delta) => {
			delta = __asVec(delta);
			return new Rect(
				mul2([], $.pos, delta),
				mul2([], $.size, delta),
				__copyAttribs($.attribs)
			);
		},

		sphere: ($: Sphere, delta) =>
			isNumber(delta)
				? new Sphere(
						mulN3([], $.pos, delta),
						$.r * delta,
						__copyAttribs($.attribs)
				  )
				: unsupported("can't non-uniformly scale sphere"),

		text: ($: Text, delta) =>
			new Text(
				mul2([], $.pos, __asVec(delta)),
				$.body,
				__copyAttribs($.attribs)
			),

		tri: tx(Triangle),

		tri3: tx(Triangle3),
	}
);
