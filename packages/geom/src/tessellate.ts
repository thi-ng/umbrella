import type { Maybe } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { earCut } from "@thi.ng/geom-tessellate/earcut";
import {
	earCutComplex,
	earCutComplexPrepare,
} from "@thi.ng/geom-tessellate/earcut-complex";
import { edgeSplit } from "@thi.ng/geom-tessellate/edge-split";
import { inset } from "@thi.ng/geom-tessellate/inset";
import { quadFan } from "@thi.ng/geom-tessellate/quad-fan";
import { rimTris } from "@thi.ng/geom-tessellate/rim-tris";
import {
	tessellate as _tessellate,
	tessellateQueue,
} from "@thi.ng/geom-tessellate/tessellate";
import { triFan } from "@thi.ng/geom-tessellate/tri-fan";
import { triFanSplit } from "@thi.ng/geom-tessellate/tri-fan-split";
import { range } from "@thi.ng/transducers/range";
import type { IShape, Tessellation, Tessellator } from "./api.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Group } from "./api/group.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Iteratively tessellates shape using provided
 * [`Tessellator`](https://docs.thi.ng/umbrella/geom-tessellate/types/Tessellator.html)
 * functions. See
 * [thi.ng/geom-tessellate](https://thi.ng/thi.ng/geom-tessellate) package for
 * more details.
 *
 * @remarks
 * Implemented for all shapes supported by {@link vertices}. For groups, every
 * child shape will be tessellated individually, but results combined into a
 * single
 * [`Tessellation`](https://docs.thi.ng/umbrella/geom-tessellate/types/Tessellation.html).
 *
 * {@link ComplexPolygon}s will **always** be first tessellated via
 * {@link TESSELLATE_EARCUT_COMPLEX} as a first pass (so you don't need to
 * specify that one). This is currently the only method considering holes and/or
 * suitable for concave shapes.
 *
 * The following tessellator presets are available:
 *
 * - {@link TESSELLATE_EARCUT}
 * - {@link TESSELLATE_EARCUT_COMPLEX}
 * - {@link TESSELLATE_EDGE_SPLIT}
 * - {@link TESSELLATE_INSET}
 * - {@link TESSELLATE_QUAD_FAN}
 * - {@link TESSELLATE_RIM_TRIS}
 * - {@link TESSELLATE_TRI_FAN}
 * - {@link TESSELLATE_TRI_FAN_SPLIT}
 *
 * @param shape
 * @param tessellators
 */
export const tessellate = defmulti<IShape, Iterable<Tessellator>, Tessellation>(
	__dispatch,
	{},
	{
		[DEFAULT]: ($: IShape, fns: Iterable<Tessellator>) =>
			_tessellate(vertices($), fns),

		complexpoly: ($, fns) => {
			const { boundary, children } = <ComplexPolygon>$;
			const [points, holes] = earCutComplexPrepare(
				boundary.points,
				children.map((c) => c.points)
			);
			const tess = earCutComplex(holes)({ points, indices: [] }, [
				...range(points.length),
			]);
			const tessellators = ensureArray(fns);
			return tessellators.length
				? tessellateQueue(tess.points, tess.indices, tessellators)
				: tess;
		},

		group: ($, fns) => {
			let res: Maybe<Tessellation>;
			fns = ensureArray(fns);
			for (let child of (<Group>$).children) {
				const tess = tessellate(child, fns);
				if (res) {
					const offset = res.points.length;
					res.points.push(...tess.points);
					for (let ids of tess.indices) {
						res.indices.push(ids.map((x) => x + offset));
					}
				} else {
					res = tess;
				}
			}
			return res!;
		},
	}
);

/**
 * Alias for thi.ng/geom-tessellate
 * [`earCut`](https://docs.thi.ng/umbrella/geom-tessellate/functions/earCut.html)
 */
export const TESSELLATE_EARCUT = earCut;
/**
 * Higher-order tessellator. Alias for thi.ng/geom-tessellate
 * [`earCut`](https://docs.thi.ng/umbrella/geom-tessellate/functions/earCut.html)
 */
export const TESSELLATE_EARCUT_COMPLEX = earCutComplex;
/**
 * Alias for thi.ng/geom-tessellate
 * [`edgeSplit`](https://docs.thi.ng/umbrella/geom-tessellate/functions/edgeSplit.html)
 */
export const TESSELLATE_EDGE_SPLIT = edgeSplit;
/**
 * Alias for thi.ng/geom-tessellate
 * [`inset`](https://docs.thi.ng/umbrella/geom-tessellate/functions/inset.html)
 */
export const TESSELLATE_INSET = inset;
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
