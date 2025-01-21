// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "./api.js";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { madd } from "@thi.ng/vectors/madd";
import { mixBilinear } from "@thi.ng/vectors/mix-bilinear";
import type { Quad } from "./api/quad.js";
import type { Rect } from "./api/rect.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Projects given point `uv` (normalized coords) into the target space defined
 * by `shape` and writes result to `out` (or returns new vector).
 *
 * @remarks
 * See {@link mapPoint} for reverse operation. Both functions together can be
 * used to warp points from one shape into another.
 *
 * Currently only implemented for these shape types:
 *
 * - {@link AABB}
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Rect}
 *
 * @param shape - shape to operate on
 * @param uv - point to map in UV space
 * @param out - result
 */
export const unmapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti<
	any,
	ReadonlyVec,
	Maybe<Vec>,
	Vec
>(
	__dispatch,
	{
		aabb: "rect",
		quad3: "quad",
	},
	{
		quad: ({ points }: Quad, uv, out = []) =>
			mixBilinear(
				out,
				points[0],
				points[1],
				points[3],
				points[2],
				uv[0],
				uv[1]
			),

		rect: ($: Rect, uvw: ReadonlyVec, out = []) =>
			madd(out, $.size, uvw, $.pos),
	}
);
