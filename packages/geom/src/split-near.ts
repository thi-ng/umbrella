import type { Maybe } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, IShape2, IShape3 } from "./api.js";
import { closestT } from "@thi.ng/geom-closest-point/line";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { clamp01 } from "@thi.ng/math/interval";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { Cubic } from "./api/cubic.js";
import { Cubic3 } from "./api/cubic3.js";
import { Line } from "./api/line.js";
import { Line3 } from "./api/line3.js";
import { Polyline } from "./api/polyline.js";
import { Polyline3 } from "./api/polyline3.js";
import { Quadratic } from "./api/quadratic.js";
import { Quadratic3 } from "./api/quadratic3.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";
import {
	__splitCubicNear,
	__splitLineAt,
	__splitQuadraticNear,
} from "./internal/split.js";

/**
 * Function overrides for {@link splitNearPoint}.
 */
export type SplitNearPointFn = {
	<T extends IShape2>(shape: T, p: ReadonlyVec): T[];
	<T extends IShape3>(shape: T, p: ReadonlyVec): T[];
} & MultiFn2<IShape, ReadonlyVec, Maybe<IShape[]>>;

/**
 * Similar to {@link splitAt}, but instead of taking a normalized parametric
 * split position, splits the given curve at the closest point to `p`.
 *
 * @remarks
 * Currently only implemented for:
 *
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Line}
 * - {@link Line3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Quadratic}
 * - {@link Quadratic3}
 *
 * @param shape - shape to operate on
 * @param p - split point
 */
export const splitNearPoint = <SplitNearPointFn>(
	defmulti<any, ReadonlyVec, Maybe<IShape[]>>(
		__dispatch,
		{},
		{
			cubic: ({ points, attribs }: Cubic, p) =>
				__splitCubicNear(Cubic, p, points, attribs),

			cubic3: ({ points, attribs }: Cubic3, p) =>
				__splitCubicNear(Cubic3, p, points, attribs),

			line: ({ points, attribs }: Line, p) => {
				const t = closestT(p, points[0], points[1]) || 0;
				return __splitLineAt(Line, points, clamp01(t), attribs);
			},

			line3: ({ points, attribs }: Line3, p) => {
				const t = closestT(p, points[0], points[1]) || 0;
				return __splitLineAt(Line3, points, clamp01(t), attribs);
			},

			polyline: ($: Polyline, p) =>
				__pointArraysAsShapes(
					Polyline,
					new Sampler($.points).splitNear(p),
					$.attribs
				),

			polyline3: ($: Polyline, p) =>
				__pointArraysAsShapes(
					Polyline3,
					new Sampler($.points).splitNear(p),
					$.attribs
				),

			quadratic: ({ points, attribs }: Quadratic, p) =>
				__splitQuadraticNear(Quadratic, p, points, attribs),

			quadratic3: ({ points, attribs }: Quadratic, p) =>
				__splitQuadraticNear(Quadratic3, p, points, attribs),
		}
	)
);
