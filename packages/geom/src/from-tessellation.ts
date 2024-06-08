import type { Edge } from "@thi.ng/adjacency";
import { defAdjBitMatrix } from "@thi.ng/adjacency/binary";
import type { GroupAttribs, Tessellation } from "@thi.ng/geom-api";
import { indexedPoints } from "@thi.ng/geom-tessellate/tessellate";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { partition } from "@thi.ng/transducers/partition";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import { Group } from "./api/group.js";
import { Polygon } from "./api/polygon.js";

/**
 * Creates a group of polygons from the given tessellation. If `attribs` are
 * given, they will be used as the group's attribs.
 *
 * @param tess
 * @param attribs
 */
export const groupFromTessellation = (
	tess: Tessellation,
	attribs?: GroupAttribs
) =>
	new Group(
		attribs,
		tess.indices.map((ids) => new Polygon(indexedPoints(tess.points, ids)))
	);

/**
 * Create a directed or undirected graph from the given tessellation. The graph
 * is stored as
 * [`AdjacencyBitMatrix`](https://docs.thi.ng/umbrella/adjacency/classes/AdjacencyBitMatrix.html)
 * and can be edited, queried, and analyzed further.
 *
 * @remarks
 * Also see {@link edgesFromTessellation}, {@link edgePointsFromTessellation}.
 *
 * @param tessel
 */
export const graphFromTessellation = (
	{ points, indices }: Tessellation,
	directed = false
) =>
	defAdjBitMatrix(
		points.length,
		<Iterable<Edge>>(
			mapcat((ids) => partition(2, 1, wrapSides(ids, 0, 1)), indices)
		),
		!directed
	);

/**
 * Returns an iterable of unique edges in the given tessellation, where each
 * edge is a 2-tuple of point indices `[a,b]`, each referring to points in the
 * tessellation's `points` array.
 *
 * @remarks
 *
 * @example
 * ``ts
 * import * as g from "@thi.ng/geom";
 *
 * // tessellate rect into a triangle fan
 * const tess = g.tessellate(g.rect(100), [g.TESSELLATE_TRI_FAN]);
 *
 * // extract unique edges (ignoring direction)
 * console.log([...g.uniqueEdgesFromTessellation(tess)]);
 * // [[ 3, 4 ], [ 2, 3 ], [ 2, 4 ], [ 1, 2 ],
 * //  [ 1, 4 ], [ 0, 1 ], [ 0, 3 ], [ 0, 4 ]]
 * ```
 *
 * @param tess
 */
export const edgesFromTessellation = (tess: Tessellation) =>
	graphFromTessellation(tess, false).edges();

/**
 * Similar to {@link edgesFromTessellation}, but returns edges as pairs of
 * points (instead of point IDs).
 *
 * @param tess
 */
export const edgePointsFromTessellation = (tess: Tessellation) =>
	map(
		(e) => indexedPoints(tess.points, e),
		graphFromTessellation(tess, false).edges()
	);
