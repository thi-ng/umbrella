// SPDX-License-Identifier: Apache-2.0
import type { Edge } from "@thi.ng/adjacency";
import { defAdjBitMatrix } from "@thi.ng/adjacency/binary";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { partition } from "@thi.ng/transducers/partition";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import type { GroupAttribs, ITessellation } from "./api.js";
import { Group } from "./api/group.js";
import { Polygon } from "./api/polygon.js";

/**
 * Creates a group of polygons from the given tessellation. If `attribs` are
 * given, they will be used as the group's attribs.
 *
 * @remarks
 * Also see:
 *
 * - [ITessellation](https://docs.thi.ng/umbrella/geom-tessellate/interfaces/ITessellation.html)
 * - {@link edgesFromTessellation}
 * - {@link edgePointsFromTessellation}
 * - {@link graphFromTessellation}
 *
 * @param tess
 * @param attribs
 */
export const groupFromTessellation = (
	tess: ITessellation,
	attribs?: GroupAttribs
) =>
	new Group(
		attribs,
		tess.faces.map((ids) => new Polygon(tess.pointsForIDs(ids)))
	);

/**
 * Create a directed or undirected graph from the given tessellation. The graph
 * is stored as
 * [`AdjacencyBitMatrix`](https://docs.thi.ng/umbrella/adjacency/classes/AdjacencyBitMatrix.html)
 * and can be edited, queried, and analyzed further.
 *
 * @remarks
 * Also see:
 *
 * - [ITessellation](https://docs.thi.ng/umbrella/geom-tessellate/interfaces/ITessellation.html)
 * - {@link edgesFromTessellation}
 * - {@link edgePointsFromTessellation}
 * - {@link groupFromTessellation}
 *
 * @param tessel
 */
export const graphFromTessellation = (
	{ points, faces }: ITessellation,
	directed = false
) =>
	defAdjBitMatrix(
		points.length,
		<Iterable<Edge>>(
			mapcat((ids) => partition(2, 1, wrapSides(ids, 0, 1)), faces)
		),
		!directed
	);

/**
 * Returns an iterable of unique edges in the given tessellation, where each
 * edge is a 2-tuple of point indices `[a,b]`, each referring to points in the
 * tessellation's `points` array.
 *
 * @remarks
 * Also see:
 *
 * - [ITessellation](https://docs.thi.ng/umbrella/geom-tessellate/interfaces/ITessellation.html)
 * - {@link edgePointsFromTessellation}
 * - {@link graphFromTessellation}
 * - {@link groupFromTessellation}
 *
 * @example
 * ```ts
 * import * as g from "@thi.ng/geom";
 *
 * // tessellate rect into a triangle fan
 * const tess = g.tessellate(g.rect(100), [g.TESSELLATE_TRI_FAN]);
 *
 * // extract unique edges (ignoring direction)
 * console.log([...g.edgesFromTessellation(tess)]);
 * // [[ 3, 4 ], [ 2, 3 ], [ 2, 4 ], [ 1, 2 ],
 * //  [ 1, 4 ], [ 0, 1 ], [ 0, 3 ], [ 0, 4 ]]
 * ```
 *
 * @param tess
 */
export const edgesFromTessellation = (tess: ITessellation) =>
	graphFromTessellation(tess, false).edges();

/**
 * Similar to {@link edgesFromTessellation}, but returns edges as pairs of
 * points (instead of point IDs).
 *
 * @remarks
 * Also see:
 *
 * - [ITessellation](https://docs.thi.ng/umbrella/geom-tessellate/interfaces/ITessellation.html)
 * - {@link edgesFromTessellation}
 * - {@link graphFromTessellation}
 * - {@link groupFromTessellation}
 *
 * @param tess
 */
export const edgePointsFromTessellation = (tess: ITessellation) =>
	map(
		(e) => tess.pointsForIDs(e),
		graphFromTessellation(tess, false).edges()
	);
