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
import { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { Points } from "./api/points.js";
import { Points3 } from "./api/points3.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { Quad } from "./api/quad.js";
import { Quadratic } from "./api/quadratic.js";
import { Ray } from "./api/ray.js";
import { Rect } from "./api/rect.js";
import { Sphere } from "./api/sphere.js";
import { Text } from "./api/text.js";
import { Triangle } from "./api/triangle.js";
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
 * - {@link Sphere}
 * - {@link Text}
 * - {@link Triangle}
 *
 * @param shape
 * @param offset
 */
export const translate = <TranslateFn>defmulti<any, ReadonlyVec, IShape>(
	__dispatch,
	{},
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

		ellipse: ($: Ellipse, delta) =>
			new Ellipse(
				add2([], $.pos, delta),
				set2([], $.r),
				__copyAttribs($.attribs)
			),

		group: ($: Group, delta) =>
			$.copyTransformed((x) => translate(x, delta)),

		line: tx(Line),

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

		polyline: tx(Polyline),

		quad: tx(Quad),

		quadratic: tx(Quadratic),

		ray: ($: Ray, delta) =>
			new Ray(add2([], $.pos, delta), $.dir, __copyAttribs($.attribs)),

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
	}
);
