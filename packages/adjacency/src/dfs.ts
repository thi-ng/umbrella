import { BitField } from "@thi.ng/bitfield/bitfield";
import { DCons } from "@thi.ng/dcons/dcons";
import type { IGraph } from "./api.js";

export class DFS {
	graph: IGraph;
	marked: BitField;
	edges: Uint32Array;
	src: number;

	constructor(graph: IGraph, src: number) {
		this.graph = graph;
		this.src = src;
		const numV = graph.numVertices();
		this.edges = new Uint32Array(numV);
		this.marked = new BitField(numV);
		this.search(src);
	}

	search(id: number) {
		const { edges, marked } = this;
		marked.setAt(id);
		for (let n of this.graph.neighbors(id)) {
			if (!marked.at(n)) {
				edges[n] = id;
				this.search(n);
			}
		}
	}

	hasPathTo(id: number) {
		return this.marked.at(id) !== 0;
	}

	pathTo(id: number): Iterable<number> | undefined {
		if (!this.marked.at(id)) return;
		const { edges, src } = this;
		const path = new DCons<number>();
		for (; id !== src; id = edges[id]) {
			path.prepend(id);
		}
		path.prepend(id);
		return path;
	}
}

/**
 * One-off Depth-First path search from vertex `src` to `dest` in given `graph`.
 * If successful, returns path as iterable or undefined if no path connects the
 * given vertices.
 *
 * @param graph -
 * @param src -
 * @param dest -
 */
export const dfs = (graph: IGraph, src: number, dest: number) =>
	new DFS(graph, src).pathTo(dest);
