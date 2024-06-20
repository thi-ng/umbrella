import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "./api.js";
import { AABB } from "./api/aabb.js";
import { Rect } from "./api/rect.js";
import { __unionBounds } from "./internal/bounds.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link union}.
 */
export type UnionFn = {
	(a: AABB, b: AABB): AABB;
	(a: Rect, b: Rect): Rect;
} & MultiFn2<IShape, IShape, IShape>;

/**
 * Computes shape "union" of given 2 shapes.
 *
 * @remarks
 * Currently only implemented for {@link AABB} and {@link Rect} to compute union
 * bounding boxes.
 *
 * @param a
 * @param b
 */
export const union = <UnionFn>defmulti<any, any, IShape>(
	__dispatch,
	{
		rect: "aabb",
	},
	{
		aabb: (a: AABB, b: AABB) =>
			new (<any>a.constructor)(
				...__unionBounds(a.pos, a.size, b.pos, b.size)
			),
	}
);
