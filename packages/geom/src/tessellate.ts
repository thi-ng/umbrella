import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import { earCut2 } from "@thi.ng/geom-tessellate/earcut";
import { edgeSplit } from "@thi.ng/geom-tessellate/edge-split";
import { tesselInset } from "@thi.ng/geom-tessellate/inset";
import { quadFan } from "@thi.ng/geom-tessellate/quad-fan";
import { rimTris } from "@thi.ng/geom-tessellate/rim-tris";
import { tessellate as _tessellate } from "@thi.ng/geom-tessellate/tessellate";
import { triFan } from "@thi.ng/geom-tessellate/tri-fan";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { Vec } from "@thi.ng/vectors";
import { Group } from "./api/group.js";
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
 * Implemented for all shapes supported by {@link vertices}. For groups, every
 * child shape will be tessellated individually.
 *
 * @param shape
 * @param tessellators
 */
export const tessellate = defmulti<IShape, Tessellator[], Iterable<Vec[]>>(
	__dispatch,
	{},
	{
		[DEFAULT]: ($: IShape, fns: Tessellator[]) =>
			_tessellate(vertices($), fns),

		group: ($, fns) =>
			mapcat((x) => _tessellate(vertices(x), fns), (<Group>$).children),
	}
);

/**
 * Alias for thi.ng/geom-tessellate
 * [`earCut2`](https://docs.thi.ng/umbrella/geom-tessellate/functions/earCut2.html)
 */
export const TESSELLATE_EARCUT = earCut2;
/**
 * Alias for thi.ng/geom-tessellate
 * [`edgeSplit`](https://docs.thi.ng/umbrella/geom-tessellate/functions/edgeSplit.html)
 */
export const TESSELLATE_EDGE_SPLIT = edgeSplit;
/**
 * Alias for thi.ng/geom-tessellate
 * [`tesselInset`](https://docs.thi.ng/umbrella/geom-tessellate/functions/tesselInset.html)
 */
export const TESSELLATE_INSET = tesselInset;
/**
 * Alias for thi.ng/geom-tessellate
 * [`quadFan`](https://docs.thi.ng/umbrella/geom-tessellate/functions/quadFan.html)
 */
export const TESSELLATE_QUAD_FAN = quadFan;
/**
 * Alias for thi.ng/geom-tessellate
 * [`rimTris`](https://docs.thi.ng/umbrella/geom-tessellate/functions/rimTris.html)
 */
export const TESSELLATE_RIM_TRIS = rimTris;
/**
 * Alias for thi.ng/geom-tessellate
 * [`triFan`](https://docs.thi.ng/umbrella/geom-tessellate/functions/triFan.html)
 */
export const TESSELLATE_TRI_FAN = triFan;
