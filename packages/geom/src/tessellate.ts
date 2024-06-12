import type { Maybe } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { MultiFn2O } from "@thi.ng/defmulti";
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
	tessellateFaces,
	tessellateWith,
} from "@thi.ng/geom-tessellate/tessellate";
import {
	BasicTessellation,
	MeshTessellation,
} from "@thi.ng/geom-tessellate/tessellation";
import { triFan } from "@thi.ng/geom-tessellate/tri-fan";
import { triFanBoundary } from "@thi.ng/geom-tessellate/tri-fan-boundary";
import { triFanSplit } from "@thi.ng/geom-tessellate/tri-fan-split";
import type { IShape, ITessellation, Tessellator } from "./api.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Group } from "./api/group.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Iteratively tessellates shape using provided
 * [`Tessellator`](https://docs.thi.ng/umbrella/geom-tessellate/types/Tessellator.html)
 * functions and optional
 * [`ITessellation`](https://docs.thi.ng/umbrella/geom-tessellate/interfaces/ITessellation.html)
 * impl. See [thi.ng/geom-tessellate](https://thi.ng/thi.ng/geom-tessellate)
 * package for more details.
 *
 * @remarks
 * Implemented for all shapes supported by {@link vertices}. For groups, every
 * child shape will be tessellated individually, but results combined into a
 * single
 * [`ITessellation`](https://docs.thi.ng/umbrella/geom-tessellate/interfaces/ITessellation.html)
 * instance.
 *
 * {@link ComplexPolygon}s will **always** be first tessellated via
 * {@link TESSELLATE_EARCUT_COMPLEX} as a first pass (so you don't need to
 * specify that one). This is currently the only tessellation method considering
 * holes and is also recommended as first pass for concave polygons.
 *
 * If `tess` is not given, a {@link basicTessellation} will be used as default.
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
 * - {@link TESSELLATE_TRI_FAN_BOUNDARY}
 * - {@link TESSELLATE_TRI_FAN_SPLIT}
 *
 * @param shape
 * @param tessellators
 * @param tess
 */
export const tessellate: MultiFn2O<
	IShape,
	Iterable<Tessellator>,
	ITessellation,
	ITessellation
> = defmulti<
	IShape,
	Iterable<Tessellator>,
	Maybe<ITessellation>,
	ITessellation
>(
	__dispatch,
	{},
	{
		[DEFAULT]: (
			$: IShape,
			fns: Iterable<Tessellator>,
			tess: Maybe<ITessellation>
		) => tessellateWith(tess || new BasicTessellation(), vertices($), fns),

		complexpoly: ($, fns, tess) => {
			const { boundary, children } = <ComplexPolygon>$;
			const [points, holes] = earCutComplexPrepare(
				boundary.points,
				children.map((c) => c.points)
			);
			tess = tess || new BasicTessellation();
			const faces = earCutComplex(holes)(
				tess,
				[],
				tess.addPoints(points)
			);
			fns = ensureArray(fns);
			return (<Tessellator[]>fns).length
				? tessellateFaces(tess, faces, fns)
				: tess.addFaces(faces);
		},

		group: ($, fns, tess) => {
			fns = ensureArray(fns);
			tess = tess || new BasicTessellation();
			for (let child of (<Group>$).children) {
				tess = tessellate(child, fns, tess);
			}
			return tess!;
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
 * [`triFanBoundary`](https://docs.thi.ng/umbrella/geom-tessellate/functions/triFanBoundary.html)
 */
export const TESSELLATE_TRI_FAN_BOUNDARY = triFanBoundary;
/**
 * Alias for thi.ng/geom-tessellate
 * [`triFanSplit`](https://docs.thi.ng/umbrella/geom-tessellate/functions/triFanSplit.html)
 */
export const TESSELLATE_TRI_FAN_SPLIT = triFanSplit;

/**
 * Syntax sugar for creating a thi.ng/geom-tessellate
 * [`BasicTessellation`](https://docs.thi.ng/umbrella/geom-tessellate/classes/BasicTessellation.html).
 */
export const basicTessellation = () => new BasicTessellation();

/**
 * Syntax sugar for creating a new thi.ng/geom-tessellate
 * [`MeshTessellation`](https://docs.thi.ng/umbrella/geom-tessellate/classes/MeshTessellation.html)
 * for 2D or 3D geometry and vertex welding tolerance/distance `eps`
 *
 * @param dim
 * @param eps
 */
export const meshTessellation = (dim: 2 | 3, eps?: number) =>
	new MeshTessellation(dim, [], [], eps);
