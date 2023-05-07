import type { Fn2, Pair } from "@thi.ng/api";

export type DegreeType = "in" | "out" | "inout";

/**
 * @typeParam T - vertex type (default: `number`)
 */
export interface IGraph<T = number> {
	numEdges(): number;
	numVertices(): number;

	/**
	 * Returns iterator of all edges in the graph. Each edge is a tuple of
	 * `[from, to]`. For undirected graphs each edge will only be emitted once.
	 */
	edges(): IterableIterator<Edge<T>>;
	/**
	 * Attempts to add an edge between given vertex IDs. Depending on the actual
	 * implementation, only max. 1 edge per unique vertex pair is supported
	 * (currently only {@link AdjacencyList} supports multi-edges). If the graph
	 * is undirected, a symmetric edge might be created automatically. Returns
	 * true, if the edge was created.
	 *
	 * @param from -
	 * @param to -
	 */
	addEdge(from: T, to: T): boolean;
	/**
	 * Attempts to remove an edge for given vertex pair. Returns true, if
	 * successful.
	 *
	 * @param from -
	 * @param to -
	 */
	removeEdge(from: T, to: T): boolean;
	/**
	 * Returns true if an edge exists for the given vertex pair. For undirected
	 * graphs, the vertex order is irrelevant.
	 *
	 * @param from -
	 * @param to -
	 */
	hasEdge(from: T, to: T): boolean;
	/**
	 * Returns true if a vertex exists for the given id.
	 *
	 * @param id -
	 */
	hasVertex(id: T): boolean;
	/**
	 * Returns number of edges for given vertex. By default only outgoing edges
	 * are counted, but can be customized via given {@link DegreeType}. Note: In
	 * undirected graphs the `type` has no relevance and essentially is always
	 * `"inout"`.
	 *
	 * @param id -
	 * @param type -
	 */
	degree(id: T, type?: DegreeType): number;
	/**
	 * Returns neighbor IDs for given vertex, i.e. those vertices connected via
	 * edges starting *from* given vertex (or, in undirected graphs, the other
	 * vertices of edges which the given vertex is part of).
	 *
	 * @param id -
	 */
	neighbors(id: T): Iterable<number>;
	/**
	 * Only useful for directed graphs. Returns a new graph in which the
	 * direction of edges is inverted/flipped. I.e. an edge `a -> b` becomes `b
	 * -> a`.
	 */
	invert(): IGraph<T>;
}

export type Edge<T = number> = Pair<T, T>;

export type CostFn<T = number> = Fn2<T, T, number>;
