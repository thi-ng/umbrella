// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { sortByCachedKey } from "@thi.ng/arrays/sort-cached";
import { DisjointSet } from "@thi.ng/disjoint-set";

/**
 * Computes the Minimum Spanning Tree from given weighted `edges`, using
 * Kruskal's algorithm (O(E log V)).
 *
 * @remarks
 * Edges can be of any type, but requires unsigned integer vertex IDs. The
 * latter can be extracted via the user supplied `verts` function. The edge
 * weights are extracted via the `cost` function.
 *
 * The `maxID` arg should equal or greater than the largest vertex ID referenced
 * by the given edges.
 *
 * The function returns a new array of the original edges, satisfying the MST
 * criteria. The result edges will be in ascending order, based on the supplied
 * cost function. The cost function is called once for each edge and return
 * values will be cached prior to sorting (see
 * [`sortByCachedKey`](https://docs.thi.ng/umbrella/arrays/functions/sortByCachedKey.html)
 * for details).
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
 *
 * @example
 * ```ts tangle:../export/mst.ts
 * import { mst } from "@thi.ng/adjacency";
 * import { distSq } from "@thi.ng/vectors";
 *
 * // 2D vectors
 * const verts = [[0,0], [0,1], [1,1], [1,2], [4,2]]
 *
 * // connections (vertex ID pairs)
 * const edges = [[0,1], [0,4], [1,2], [1,3], [2,3], [2,4]]
 *
 * console.log(
 *   mst(
 *     edges,
 *     // max vertex ID
 *     4,
 *     // cost function (cartesian distance)
 *     ([a, b]) => distSq(verts[a], verts[b]),
 *     // edge vertex IDs
 *     (e) => e
 *   )
 * );
 * // [ [ 1, 2 ], [ 2, 3 ], [ 0, 1 ], [ 2, 4 ] ]
 * ```
 *
 * @param edges - edge pairs
 * @param maxID - max vertex ID (+1)
 * @param cost - cost function
 * @param verts - vertices / graph nodes
 *
 * @typeParam T - edge type
 */
export const mst = <T>(
	edges: T[],
	maxID: number,
	cost: Fn<T, number>,
	verts: Fn<T, [number, number]>
) => {
	const graph = new DisjointSet(maxID + 1);
	const res: T[] = [];
	for (let e of sortByCachedKey(edges, cost)) {
		const v = verts(e);
		if (!graph.unified(v[0], v[1])) {
			graph.union(v[0], v[1]);
			res.push(e);
		}
	}
	return res;
};
