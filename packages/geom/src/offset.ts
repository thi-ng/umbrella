// SPDX-License-Identifier: Apache-2.0
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { offsetConvex } from "@thi.ng/geom-poly-utils/offset-convex";
import { add2 } from "@thi.ng/vectors/add";
import { normalCW } from "@thi.ng/vectors/normal";
import { set2 } from "@thi.ng/vectors/set";
import { sub2 } from "@thi.ng/vectors/sub";
import { aabbWithCentroidAndMargin } from "./aabb.js";
import type { IShape } from "./api.js";
import type { AABB } from "./api/aabb.js";
import { Circle } from "./api/circle.js";
import type { Line } from "./api/line.js";
import { Polygon } from "./api/polygon.js";
import { Quad } from "./api/quad.js";
import type { Rect } from "./api/rect.js";
import { centroid } from "./centroid.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { rectWithCentroidAndMargin } from "./rect.js";
import { ComplexPolygon } from "./api/complex-polygon.js";

/**
 * Function overrides for {@link offset}.
 */
export type OffsetFn = {
	(shape: AABB, dist: number): AABB;
	(shape: Circle, dist: number): Circle;
	(shape: Line, dist: number): Quad;
	(shape: Rect, dist: number): Rect;
} & MultiFn2<IShape, number, IShape>;

/**
 * Computes an offset shape (as in "path offsetting") of given shape and offset
 * distance `dist`.
 *
 * @remarks
 * The implementation for polygons and convex polygons is _very_ naive and only
 * intended for (some basic) convex cases. See
 * [thi.ng/geom-sdf](https://thi.ng/thi.ng/geom-sdf) package for more flexible &
 * advanced usage.
 *
 * For complex polygons, the vertex order of holes plays a role here (assumed to
 * be the reverse of the boundary's order).
 *
 * Currently only implemented for:
 *
 * - {@link AABB}
 * - {@link Circle}
 * - {@link ComplexPolygon} (convex only)
 * - {@link Line}
 * - {@link Polygon} (convex only)
 * - {@link Rect}
 *
 * @param shape
 * @param dist
 */
export const offset = <OffsetFn>defmulti<any, number, IShape>(
	__dispatch,
	{},
	{
		aabb: ($: AABB, n) =>
			aabbWithCentroidAndMargin(
				centroid($)!,
				$.size,
				n,
				__copyAttribs($.attribs)
			),

		circle: ($: Circle, n) =>
			new Circle(set2([], $.pos), Math.max($.r + n, 0)),

		complexpoly: ({ boundary, children, attribs }: ComplexPolygon, n) =>
			new ComplexPolygon(
				<Polygon>offset(boundary, n),
				children.map(
					(x) => <Polygon>offset(x, n),
					__copyAttribs(attribs)
				)
			),

		line: ({ points: [a, b], attribs }: Line, n) => {
			const norm = normalCW([], a, b, n);
			return new Quad(
				[
					add2([], a, norm),
					add2([], b, norm),
					sub2([], b, norm),
					sub2([], a, norm),
				],
				__copyAttribs(attribs)
			);
		},

		poly: ({ points, attribs }: Polygon, n) =>
			new Polygon(offsetConvex(points, n), __copyAttribs(attribs)),

		rect: ($: Rect, n) =>
			rectWithCentroidAndMargin(
				centroid($)!,
				$.size,
				n,
				__copyAttribs($.attribs)
			),
	}
);
