import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import { tessellate as _tessellate } from "@thi.ng/geom-tessellate/tessellate";
import type { Vec } from "@thi.ng/vectors";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Recursively tessellates shape using provided
 * [`Tessellator`](https://docs.thi.ng/umbrella/geom-api/types/Tessellator.html)
 * functions. See
 * [thi.ng/geom-tessellate](https://thi.ng/thi.ng/geom-tessellate) package for
 * more details.
 *
 * @remarks
 * Implemented for all shapes supported by {@link vertices}.
 *
 * @param shape
 * @param tessellators
 */
export const tessellate = defmulti<IShape, Tessellator[], Vec[][]>(
	__dispatch,
	{},
	{
		[DEFAULT]: ($: IShape, fns: Tessellator[]) =>
			_tessellate(vertices($), fns),
	}
);
