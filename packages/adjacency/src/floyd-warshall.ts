import { outOfBounds } from "@thi.ng/errors/out-of-bounds";
import type { CostFn, IGraph } from "./api.js";

/**
 * Implementation of the Floyd-Warshall algorithm for finding _all_ shortest
 * paths in a directed graph, optionally with positive or negative edge weights.
 * A single execution of the algorithm will find the lengths (summed weights) of
 * shortest paths between all pairs of vertices.
 *
 * @remarks
 * The default cost function is topological distance (i.e. every edge has a
 * length/cost of 1).
 *
 * Paths & accumulated distances can be queried via {@link FloydWarshall.path}
 * and {@link FloydWarshall.distance}.
 *
 * This algorithm is quite memory hungry and requires `|V| * |V| * 8 bytes`,
 * i.e. ~8MB for a graph with 1000 nodes. If possible, use {@link BFS} to
 * perform individual shortest-path queries (rather than this global approach).
 *
 * Reference:
 * - https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
 */
export class FloydWarshall {
	dist: Float32Array;
	next: Int32Array;
	numV: number;

	/**
	 * Instantiates and pre-computes all shortest paths in given `graph`. See
	 * class comments for details.
	 *
	 * @param graph
	 * @param cost
	 */
	constructor(graph: IGraph<number>, cost: CostFn = () => 1) {
		const numV = (this.numV = graph.numVertices());
		const dist = (this.dist = new Float32Array(numV * numV).fill(Infinity));
		const next = (this.next = new Int32Array(numV * numV).fill(-1));
		for (let [u, v] of graph.edges()) {
			const idx = u * numV + v;
			dist[idx] = cost(u, v);
			next[idx] = v;
		}
		for (let v = 0; v < numV; v++) {
			const idx = v * numV + v;
			dist[idx] = 0;
			next[idx] = v;
		}
		for (let k = 0; k < numV; k++) {
			for (let i = 0; i < numV; i++) {
				const idxIK = i * numV + k;
				for (let j = 0; j < numV; j++) {
					const idxIJ = i * numV + j;
					const idxKJ = k * numV + j;
					const minD = dist[idxIK] + dist[idxKJ];
					if (dist[idxIJ] > minD) {
						dist[idxIJ] = minD;
						next[idxIJ] = next[idxIK];
					}
				}
			}
		}
	}

	/**
	 * Returns shortest distance between vertices `a` and `b`, or `undefined` if
	 * no connecting path exists. Throws an error if either `a` or `b` are out
	 * of bounds.
	 *
	 * @param a
	 * @param b
	 */
	distance(a: number, b: number): number | undefined {
		this.ensurePair(a, b);
		return this.dist[a * this.numV + b];
	}

	/**
	 * Returns iterator of vertex IDs of path between `a` and `b` (if any).
	 * Throws an error if either `a` or `b` are out of bounds.
	 *
	 * @param a
	 * @param b
	 */
	*path(a: number, b: number) {
		this.ensurePair(a, b);
		const { next, numV } = this;
		if (next[a * numV + b] === -1) return;
		yield a;
		while (a !== b) {
			a = next[a * numV + b];
			yield a;
		}
	}

	protected ensureIndex(id: number) {
		!(id >= 0 && id < this.numV) && outOfBounds(id);
	}

	protected ensurePair(a: number, b: number) {
		this.ensureIndex(a);
		this.ensureIndex(b);
	}
}

/**
 * Factory function for {@link FloydWarshall}.
 *
 * @param graph
 * @param cost
 */
export const floydWarshall = (graph: IGraph<number>, cost?: CostFn) =>
	new FloydWarshall(graph, cost);
