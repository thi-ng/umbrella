import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { add2 } from "@thi.ng/vectors/add";
import { normalCW } from "@thi.ng/vectors/normal";
import { set2 } from "@thi.ng/vectors/set";
import { sub2 } from "@thi.ng/vectors/sub";
import { aabbWithCentroidAndMargin } from "./aabb.js";
import type { AABB } from "./api/aabb.js";
import { Circle } from "./api/circle.js";
import type { Line } from "./api/line.js";
import { Quad } from "./api/quad.js";
import type { Rect } from "./api/rect.js";
import { centroid } from "./centroid.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { rectWithCentroidAndMargin } from "./rect.js";

/**
 * Computes an offset shape (as in "path offsetting") of given shape and offset
 * distance `dist`.
 *
 * @remarks
 * Also see [thi.ng/geom-sdf](https://thi.ng/thi.ng/geom-sdf) package for more
 * flexible & advanced usage.
 *
 * Currently only implemented for:
 *
 * - {@link AABB}
 * - {@link Circle}
 * - {@link Line}
 * - {@link Rect}
 *
 * @param shape
 * @param dist
 */
export const offset: MultiFn2<IShape, number, IShape> = defmulti<
	any,
	number,
	IShape
>(
	__dispatch,
	{},
	{
		aabb: ($: AABB, n) =>
			aabbWithCentroidAndMargin(
				centroid($)!,
				$.size,
				n,
				__copyAttribs($)
			),

		circle: ($: Circle, n) =>
			new Circle(set2([], $.pos), Math.max($.r + n, 0)),

		line: ({ points: [a, b], attribs }: Line, n) => {
			const norm = normalCW([], a, b, n);
			return new Quad(
				[
					add2([], a, norm),
					add2([], b, norm),
					sub2([], b, norm),
					sub2([], a, norm),
				],
				{ ...attribs }
			);
		},

		rect: ($: Rect, n) =>
			rectWithCentroidAndMargin(
				centroid($)!,
				$.size,
				n,
				__copyAttribs($)
			),
	}
);
