import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PathSegment2 } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add2, add3 } from "@thi.ng/vectors/add";
import { set2, set3 } from "@thi.ng/vectors/set";
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
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __segmentTransformer } from "./internal/transform.js";
import { __translatedShape as tx } from "./internal/translate.js";

/**
 * Function overrides for {@link translate}.
 */
export type TranslateFn = {
	<T extends IShape>(shape: T, offset: ReadonlyVec): T;
} & MultiFn2<IShape, ReadonlyVec, IShape>;

/**
 * Translates given shape by given `offset` vector.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link AABB}
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
 * - {@link Path}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Ray}
 * - {@link Rect}
 * - {@link Sphere}
 * - {@link Text}
 * - {@link Triangle}
 *
 * @param shape
 * @param offset
 */
export const translate = <TranslateFn>defmulti<any, ReadonlyVec, IShape>(
	__dispatch,
	{ group3: "group" },
	{
		aabb: ($: AABB, delta) =>
			new AABB(
				add3([], $.pos, delta),
				set3([], $.size),
				__copyAttribs($.attribs)
			),

		arc: ($: Arc, delta) => {
			const a = $.copy();
			add2(null, a.pos, delta);
			return a;
		},

		bpatch: tx(BPatch),

		circle: ($: Circle, delta) =>
			new Circle(add2([], $.pos, delta), $.r, __copyAttribs($.attribs)),

		complexpoly: ($: ComplexPolygon, delta) =>
			new ComplexPolygon(
				translate($.boundary, delta),
				$.children.map((child) => translate(child, delta)),
				__copyAttribs($.attribs)
			),

		cubic: tx(Cubic),

		cubic3: tx(Cubic3),

		ellipse: ($: Ellipse, delta) =>
			new Ellipse(
				add2([], $.pos, delta),
				set2([], $.r),
				__copyAttribs($.attribs)
			),

		extra: ($) => $,

		group: ($: Group, delta) =>
			$.copyTransformed((x) => translate(x, delta)),

		line: tx(Line),

		line3: tx(Line3),

		path: ($: Path, delta: ReadonlyVec) => {
			const $translateSegments = __segmentTransformer<PathSegment2>(
				(geo) => translate(geo, delta),
				(p) => add2([], p, delta)
			);
			return new Path(
				$translateSegments($.segments),
				$.subPaths.map($translateSegments),
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

		ray: ($: Ray, delta) =>
			new Ray(add2([], $.pos, delta), $.dir, __copyAttribs($.attribs)),

		ray3: ($: Ray3, delta) =>
			new Ray3(add3([], $.pos, delta), $.dir, __copyAttribs($.attribs)),

		rect: ($: Rect, delta) =>
			new Rect(
				add2([], $.pos, delta),
				set2([], $.size),
				__copyAttribs($.attribs)
			),

		sphere: ($: Sphere, delta) =>
			new Sphere(add3([], $.pos, delta), $.r, __copyAttribs($.attribs)),

		text: ($: Text, delta) =>
			new Text(add2([], $.pos, delta), $.body, __copyAttribs($.attribs)),

		tri: tx(Triangle),

		tri3: tx(Triangle3),
	}
);
