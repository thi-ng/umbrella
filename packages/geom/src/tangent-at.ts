import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { cubicTangentAt } from "@thi.ng/geom-splines/cubic-tangent";
import { quadraticTangentAt } from "@thi.ng/geom-splines/quadratic-tangent";
import { cossin } from "@thi.ng/math/angle";
import { HALF_PI, TAU } from "@thi.ng/math/api";
import type { Vec } from "@thi.ng/vectors";
import { direction2 } from "@thi.ng/vectors/direction";
import type { Cubic } from "./api/cubic.js";
import type { Line } from "./api/line.js";
import type { Rect } from "./api/rect.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Computes tangent on shape/boundary at normalized parametric position `t`.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Line}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param shape
 * @param t
 */
export const tangentAt: MultiFn2<IShape, number, Vec | undefined> = defmulti<
	any,
	number,
	Vec | undefined
>(
	__dispatch,
	{
		quad: "poly",
		tri: "poly",
	},
	{
		circle: (_, t) => cossin(TAU * t + HALF_PI),

		cubic: ({ points }: Cubic, t) =>
			cubicTangentAt([], points[0], points[1], points[2], points[3], t),

		line: ({ points }: Line) => direction2([], points[0], points[1]),

		poly: ($: PCLike, t) => new Sampler($.points, true).tangentAt(t),

		polyline: ($: PCLike, t) => new Sampler($.points).tangentAt(t),

		quadratic: ({ points }: Cubic, t) =>
			quadraticTangentAt([], points[0], points[1], points[2], t),

		rect: ($: Rect, t) => new Sampler(vertices($), true).tangentAt(t),
	}
);
