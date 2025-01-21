// SPDX-License-Identifier: Apache-2.0
import { isNumber } from "@thi.ng/checks/is-number";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { unsupported } from "@thi.ng/errors/unsupported";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mul, mul2, mul3 } from "@thi.ng/vectors/mul";
import { mulN2, mulN3 } from "@thi.ng/vectors/muln";
import { normalize2, normalize3 } from "@thi.ng/vectors/normalize";
import type { IShape, IShape2, IShape3 } from "./api.js";
import { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import { Circle } from "./api/circle.js";
import { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import type { Path } from "./api/path.js";
import type { Path3 } from "./api/path3.js";
import type { Points } from "./api/points.js";
import type { Points3 } from "./api/points3.js";
import { Ray } from "./api/ray.js";
import { Ray3 } from "./api/ray3.js";
import { Rect } from "./api/rect.js";
import { Sphere } from "./api/sphere.js";
import { Text } from "./api/text.js";
import { __asVec } from "./internal/args.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
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
 * - {@link Ellipse}
 * - {@link Extra} (returns `undefined`)
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
	{
		bpatch: "points",
		complexpoly: "group",
		cubic: "points",
		cubic3: "points3",
		group3: "group",
		line: "points",
		line3: "points3",
		path3: "path",
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

		ellipse: ($: Ellipse, delta) => {
			delta = __asVec(delta);
			return new Ellipse(
				mul2([], $.pos, delta),
				mul2([], $.r, delta),
				__copyAttribs($.attribs)
			);
		},

		extra: ($) => $,

		group: ($: Group, delta) => $.copyTransformed((x) => scale(x, delta)),

		path: ($: Path, delta) => {
			delta = __asVec(delta);
			return $.copyTransformed(
				__segmentTransformer(
					(geo) => scale(geo, delta),
					(p) => mul([], p, <ReadonlyVec>delta)
				)
			);
		},

		points: ($: Points, delta) =>
			$.copyTransformed((points) =>
				points.map(
					isNumber(delta)
						? (x) => mulN2([], x, delta)
						: (x) => mul2([], x, delta)
				)
			),

		points3: ($: Points3, delta) =>
			$.copyTransformed((points) =>
				points.map(
					isNumber(delta)
						? (x) => mulN3([], x, delta)
						: (x) => mul3([], x, delta)
				)
			),

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
	}
);
