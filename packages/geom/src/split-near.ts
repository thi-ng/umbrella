// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { closestT } from "@thi.ng/geom-closest-point/line";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { splitCubicNearPoint } from "@thi.ng/geom-splines/cubic-split";
import { quadraticSplitNearPoint } from "@thi.ng/geom-splines/quadratic-split";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { IShape, IShape2, IShape3, PCLikeConstructor } from "./api.js";
import type { Cubic } from "./api/cubic.js";
import type { Cubic3 } from "./api/cubic3.js";
import type { Line } from "./api/line.js";
import type { Line3 } from "./api/line3.js";
import type { Polyline } from "./api/polyline.js";
import type { Polyline3 } from "./api/polyline3.js";
import type { Quadratic } from "./api/quadratic.js";
import type { Quadratic3 } from "./api/quadratic3.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";
import { __splitLineAt } from "./internal/split.js";

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
		{
			cubic3: "cubic",
			line3: "line",
			polyline3: "polyline",
			quadratic3: "quadratic",
		},
		{
			cubic: (
				{ attribs, points: [a, b, c, d], constructor: ctor }: Cubic,
				p
			) =>
				__pointArraysAsShapes(
					<PCLikeConstructor>ctor,
					splitCubicNearPoint(p, a, b, c, d),
					attribs,
					false
				),

			line: ($: Line, p) =>
				__splitLineAt($, closestT(p, $.points[0], $.points[1])),

			polyline: ({ attribs, points, constructor: ctor }: Polyline, p) =>
				__pointArraysAsShapes(
					<PCLikeConstructor>ctor,
					new Sampler(points).splitNear(p),
					attribs
				),

			quadratic: (
				{ attribs, points: [a, b, c], constructor: ctor }: Quadratic,
				p
			) =>
				__pointArraysAsShapes(
					<PCLikeConstructor>ctor,
					quadraticSplitNearPoint(p, a, b, c),
					attribs,
					false
				),
		}
	)
);
