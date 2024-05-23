import type { Maybe } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { cubicSplitAt } from "@thi.ng/geom-splines/cubic-split";
import { quadraticSplitAt } from "@thi.ng/geom-splines/quadratic-split";
import { PI, TAU } from "@thi.ng/math/api";
import { fit01 } from "@thi.ng/math/fit";
import { set2 } from "@thi.ng/vectors/set";
import { Arc } from "./api/arc.js";
import { Circle } from "./api/circle.js";
import { Cubic } from "./api/cubic.js";
import { Line } from "./api/line.js";
import { Polyline } from "./api/polyline.js";
import { Quadratic } from "./api/quadratic.js";
import { __copyAttribsRaw } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";
import { __splitLine } from "./internal/split.js";
import { absDiff } from "@thi.ng/math/abs";

export type SplitAtFn = {
	(shape: Arc, t: number): [Arc, Arc];
	(shape: Circle, t: number): [Arc, Arc];
	(shape: Cubic, t: number): [Cubic, Cubic];
	(shape: Line, t: number): [Line, Line];
	(shape: Polyline, t: number): [Polyline, Polyline];
	(shape: Quadratic, t: number): [Quadratic, Quadratic];
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
 * - {@link Line}
 * - {@link Polyline}
 * - {@link Quadratic}
 *
 * @param shape
 * @param t
 */
export const splitAt = <SplitAtFn>defmulti<any, number, Maybe<IShape[]>>(
	__dispatch,
	{},
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
					__copyAttribsRaw(attribs)
				),
				new Arc(
					set2([], pos),
					set2([], r),
					axis,
					theta,
					end,
					absDiff(theta, end) >= PI,
					cw,
					__copyAttribsRaw(attribs)
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
					__copyAttribsRaw(attribs)
				),
				new Arc(
					set2([], pos),
					[r, r],
					0,
					theta,
					TAU,
					t < 0.5,
					true,
					__copyAttribsRaw(attribs)
				),
			];
		},

		cubic: ({ attribs, points }: Cubic, t: number) =>
			cubicSplitAt(points[0], points[1], points[2], points[3], t).map(
				(pts) => new Cubic(pts, { ...attribs })
			),

		line: ({ attribs, points }: Line, t) =>
			__splitLine(points[0], points[1], t).map(
				(pts) => new Line(pts, { ...attribs })
			),

		polyline: ($: Polyline, t) =>
			__pointArraysAsShapes(
				Polyline,
				new Sampler($.points).splitAt(t),
				$.attribs
			),

		quadratic: ({ attribs, points }: Quadratic, t: number) =>
			quadraticSplitAt(points[0], points[1], points[2], t).map(
				(pts) => new Quadratic(pts, { ...attribs })
			),
	}
);
