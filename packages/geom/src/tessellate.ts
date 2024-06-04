import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import { earCut2 } from "@thi.ng/geom-tessellate/earcut";
import {
	edgeSplit,
	edgeSplitWithThreshold,
} from "@thi.ng/geom-tessellate/edge-split";
import { tesselInset } from "@thi.ng/geom-tessellate/inset";
import { quadFan } from "@thi.ng/geom-tessellate/quad-fan";
import { rimTris } from "@thi.ng/geom-tessellate/rim-tris";
import { tessellate as _tessellate } from "@thi.ng/geom-tessellate/tessellate";
import { triFan } from "@thi.ng/geom-tessellate/tri-fan";
import {
	triFanSplit,
	triFanSplitWithThreshold,
} from "@thi.ng/geom-tessellate/tri-fan-split";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { Vec } from "@thi.ng/vectors";
import { Group } from "./api/group.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Iteratively tessellates shape using provided
 * [`Tessellator`](https://docs.thi.ng/umbrella/geom-api/types/Tessellator.html)
 * functions. See
 * [thi.ng/geom-tessellate](https://thi.ng/thi.ng/geom-tessellate) package for
 * more details.
 *
 * @remarks
 * Implemented for all shapes supported by {@link vertices}. For groups, every
 * child shape will be tessellated individually.
 *
 * The following tessellator presets are available:
 *
 * - {@link TESSELLATE_EARCUT}
 * - {@link TESSELLATE_EDGE_SPLIT}
 * - {@link TESSELLATE_EDGE_SPLIT_THRESHOLD}
 * - {@link TESSELLATE_INSET}
 * - {@link TESSELLATE_QUAD_FAN}
 * - {@link TESSELLATE_RIM_TRIS}
 * - {@link TESSELLATE_TRI_FAN}
 * - {@link TESSELLATE_TRI_FAN_SPLIT}
 * - {@link TESSELLATE_TRI_FAN_SPLIT_THRESHOLD}
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
 * Higher-order tessellator. Alias for thi.ng/geom-tessellate
 * [`edgeSplitWithThreshold`](https://docs.thi.ng/umbrella/geom-tessellate/functions/edgeSplit.html)
 */
export const TESSELLATE_EDGE_SPLIT_THRESHOLD = edgeSplitWithThreshold;
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
/**
 * Alias for thi.ng/geom-tessellate
 * [`triFanSplit`](https://docs.thi.ng/umbrella/geom-tessellate/functions/triFanSplit.html)
 */
export const TESSELLATE_TRI_FAN_SPLIT = triFanSplit;
/**
 * Alias for thi.ng/geom-tessellate
 * [`triFanSplitWithThreshold`](https://docs.thi.ng/umbrella/geom-tessellate/functions/triFanSplitWithThreshold.html)
 */
export const TESSELLATE_TRI_FAN_SPLIT_THRESHOLD = triFanSplitWithThreshold;
