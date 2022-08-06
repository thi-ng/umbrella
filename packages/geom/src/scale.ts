import { isNumber } from "@thi.ng/checks/is-number";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { unsupported } from "@thi.ng/errors/unsupported";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mul2, mul3 } from "@thi.ng/vectors/mul";
import { mulN2, mulN3 } from "@thi.ng/vectors/muln";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import { Circle } from "./api/circle.js";
import { Cubic } from "./api/cubic.js";
import { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { Points, Points3 } from "./api/points.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { Quad } from "./api/quad.js";
import { Quadratic } from "./api/quadratic.js";
import { Ray } from "./api/ray.js";
import { Rect } from "./api/rect.js";
import { Sphere } from "./api/sphere.js";
import { Text } from "./api/text.js";
import { Triangle } from "./api/triangle.js";
import { __asVec } from "./internal/args.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __scaledShape as tx } from "./internal/scale.js";

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
 * - {@link Circle}
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
 * @param factor
 */
export const scale: MultiFn2<IShape, number | ReadonlyVec, IShape> = defmulti<
	any,
	number | ReadonlyVec,
	IShape
>(
	__dispatch,
	{},
	{
		aabb: ($: AABB, delta) => {
			delta = __asVec(delta, 3);
			return new AABB(
				mul3([], $.pos, delta),
				mul3([], $.size, delta),
				__copyAttribs($)
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
						__copyAttribs($)
				  )
				: new Ellipse(
						mul2([], $.pos, delta),
						mulN2([], delta, $.r),
						__copyAttribs($)
				  ),

		cubic: tx(Cubic),

		ellipse: ($: Ellipse, delta) => {
			delta = __asVec(delta);
			return new Ellipse(
				mul2([], $.pos, delta),
				mul2([], $.r, delta),
				__copyAttribs($)
			);
		},

		group: ($: Group, delta) =>
			$.copyTransformed((x) => <IHiccupShape>scale(x, delta)),

		line: tx(Line),

		path: ($: Path, delta) => {
			delta = __asVec(delta);
			return new Path(
				$.segments.map((s) =>
					s.geo
						? {
								type: s.type,
								geo: <any>scale(s.geo, delta),
						  }
						: {
								type: s.type,
								point: mul2([], s.point!, <ReadonlyVec>delta),
						  }
				),
				__copyAttribs($)
			);
		},

		points: tx(Points),

		points3: tx(Points3),

		poly: tx(Polygon),

		polyline: tx(Polyline),

		quad: tx(Quad),

		quadratic: tx(Quadratic),

		ray: ($: Ray, delta) => {
			delta = __asVec(delta);
			return new Ray(
				mul2([], $.pos, delta),
				normalize2(null, mul2([], $.dir, delta)),
				__copyAttribs($)
			);
		},

		rect: ($: Rect, delta) => {
			delta = __asVec(delta);
			return new Rect(
				mul2([], $.pos, delta),
				mul2([], $.size, delta),
				__copyAttribs($)
			);
		},

		sphere: ($: Sphere, delta) =>
			isNumber(delta)
				? new Sphere(
						mulN3([], $.pos, delta),
						$.r * delta,
						__copyAttribs($)
				  )
				: unsupported("can't non-uniformly scale sphere"),

		text: ($: Text, delta) =>
			new Text(mul2([], $.pos, __asVec(delta)), $.body, __copyAttribs($)),

		tri: tx(Triangle),
	}
);
