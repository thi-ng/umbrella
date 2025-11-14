// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { cubicSplitAt } from "@thi.ng/geom-splines/cubic-split";
import { quadraticSplitAt } from "@thi.ng/geom-splines/quadratic-split";
import { absDiff } from "@thi.ng/math/abs";
import { PI, TAU } from "@thi.ng/math/api";
import { fit01 } from "@thi.ng/math/fit";
import { set2 } from "@thi.ng/vectors/set";
import type { IShape, IShape2, IShape3, PCLikeConstructor } from "./api.js";
import { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { Cubic } from "./api/cubic.js";
import type { Cubic3 } from "./api/cubic3.js";
import type { Line } from "./api/line.js";
import type { Line3 } from "./api/line3.js";
import type { Polyline } from "./api/polyline.js";
import type { Polyline3 } from "./api/polyline3.js";
import type { Quadratic } from "./api/quadratic.js";
import type { Quadratic3 } from "./api/quadratic3.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";
import { __splitLineAt } from "./internal/split.js";

/**
 * Function overrides for {@link splitAt}.
 */
export type SplitAtFn = {
	(shape: Arc, t: number): [Arc, Arc];
	(shape: Circle, t: number): [Arc, Arc];
	<T extends IShape2>(shape: T, t: number): T[];
	<T extends IShape3>(shape: T, t: number): T[];
} & MultiFn2<IShape, number, Maybe<IShape[]>>;

/**
 * Splits given shape in 2 parts at normalized parametric position `t`.
 *
 * @remarks
 * Currently only implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Line}
 * - {@link Line3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Quadratic}
 * - {@link Quadratic3}
 *
 * @param shape
 * @param t
 */
export const splitAt = <SplitAtFn>defmulti<any, number, Maybe<IShape[]>>(
	__dispatch,
	{
		cubic3: "cubic",
		line3: "line",
		polyline3: "polyline",
		quadratic3: "quadratic",
	},
	{
		arc: ({ pos, r, start, end, axis, cw, attribs }: Arc, t: number) => {
			const theta = fit01(t, start, end);
			return [
				new Arc(
					set2([], pos),
					set2([], r),
					axis,
					start,
					theta,
					absDiff(start, theta) >= PI,
					cw,
					__copyAttribs(attribs)
				),
				new Arc(
					set2([], pos),
					set2([], r),
					axis,
					theta,
					end,
					absDiff(theta, end) >= PI,
					cw,
					__copyAttribs(attribs)
				),
			];
		},

		circle: ({ pos, r, attribs }: Circle, t) => {
			const theta = t * TAU;
			return [
				new Arc(
					set2([], pos),
					[r, r],
					0,
					0,
					theta,
					t >= 0.5,
					true,
					__copyAttribs(attribs)
				),
				new Arc(
					set2([], pos),
					[r, r],
					0,
					theta,
					TAU,
					t < 0.5,
					true,
					__copyAttribs(attribs)
				),
			];
		},

		cubic: (
			{ attribs, points: [a, b, c, d], constructor: ctor }: Cubic,
			t: number
		) =>
			__pointArraysAsShapes(
				<PCLikeConstructor>ctor,
				cubicSplitAt(a, b, c, d, t),
				attribs,
				false
			),

		line: __splitLineAt,

		polyline: ({ attribs, points, constructor: ctor }: Polyline, t) =>
			__pointArraysAsShapes(
				<PCLikeConstructor>ctor,
				new Sampler(points).splitAt(t),
				attribs
			),

		quadratic: (
			{ attribs, points: [a, b, c], constructor: ctor }: Quadratic,
			t: number
		) =>
			__pointArraysAsShapes(
				<PCLikeConstructor>ctor,
				quadraticSplitAt(a, b, c, t),
				attribs,
				false
			),
	}
);
