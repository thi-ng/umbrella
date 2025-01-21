// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import {
	centerOfWeight2,
	complexCenterOfWeight2,
} from "@thi.ng/geom-poly-utils/center-of-weight";
import type { Vec } from "@thi.ng/vectors";
import type { IShape } from "./api.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Polygon } from "./api/polygon.js";
import { centroid } from "./centroid.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Attempts to compute the center of weight (CoW) for given `shape`, otherwise
 * returns `undefined`.
 *
 * @remarks
 * The actual CoW is only available for these types:
 *
 * - {@link ComplexPolygon}
 * - {@link Polygon}
 *
 * For all other shapes, the normal {@link centroid} calculation will be used.
 * Also see {@link centroidOfBounds}.
 *
 * @param shape
 * @param out
 */
export const centerOfWeight: MultiFn1O<IShape, Vec, Maybe<Vec>> = defmulti<
	any,
	Maybe<Vec>,
	Maybe<Vec>
>(
	__dispatch,
	{},
	{
		[DEFAULT]: ($: IShape, out?: Vec) => centroid($, out),

		complexpoly: ($: ComplexPolygon, out?) =>
			complexCenterOfWeight2(
				$.boundary.points,
				$.children.map((c) => c.points),
				out
			),

		poly: ($: Polygon, out) => centerOfWeight2($.points, out),
	}
);
