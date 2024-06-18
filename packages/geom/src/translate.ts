import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add2, add3 } from "@thi.ng/vectors/add";
import { set2, set3 } from "@thi.ng/vectors/set";
import type { IShape, PathSegment2, PathSegment3 } from "./api.js";
import { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import { Circle } from "./api/circle.js";
import { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Path } from "./api/path.js";
import type { Path3 } from "./api/path3.js";
import { Points } from "./api/points.js";
import { Points3 } from "./api/points3.js";
import { Ray } from "./api/ray.js";
import { Ray3 } from "./api/ray3.js";
import { Rect } from "./api/rect.js";
import { Sphere } from "./api/sphere.js";
import { Text } from "./api/text.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __segmentTransformer } from "./internal/transform.js";

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
	{
		bpatch: "points",
		cubic: "points",
		cubic3: "points3",
		complexpoly: "group",
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

		circle: ($: Circle, delta) =>
			new Circle(add2([], $.pos, delta), $.r, __copyAttribs($.attribs)),

		ellipse: ($: Ellipse, delta) =>
			new Ellipse(
				add2([], $.pos, delta),
				set2([], $.r),
				__copyAttribs($.attribs)
			),

		extra: ($) => $,

		group: ($: Group, delta) =>
			$.copyTransformed((x) => translate(x, delta)),

		path: ($: Path, delta) =>
			$.copyTransformed(
				__segmentTransformer<PathSegment2>(
					(geo) => translate(geo, delta),
					(p) => add2([], p, delta)
				)
			),

		path3: ($: Path3, delta) =>
			$.copyTransformed(
				__segmentTransformer<PathSegment3>(
					(geo) => translate(geo, delta),
					(p) => add3([], p, delta)
				)
			),

		points: ($: Points, delta) =>
			$.copyTransformed((points) =>
				points.map((x) => add2([], x, delta))
			),

		points3: ($: Points3, delta) =>
			$.copyTransformed((points) =>
				points.map((x) => add3([], x, delta))
			),

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
	}
);
