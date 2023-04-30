import type { Nullable } from "@thi.ng/api";
import type { DegreeType, Edge, IGraph } from "./api.js";
import { __into, __invert, __toDot } from "./utils.js";

export class AdjacencyList implements IGraph<number> {
	adjacency: number[][] = [];
	indegree: number[] = [];
	protected numE = 0;
	protected numV = 0;

	constructor(edges?: Iterable<Edge>) {
		edges && __into(this, edges);
	}

	numEdges(): number {
		return this.numE;
	}

	numVertices(): number {
		return this.numV;
	}

	*vertices() {
		const { adjacency } = this;
		for (let i = 0, n = adjacency.length; i < n; i++) {
			if (adjacency[i]) yield i;
		}
	}

	*edges() {
		const { adjacency } = this;
		for (let i = 0, n = adjacency.length; i < n; i++) {
			const vertex = adjacency[i];
			if (!vertex) continue;
			for (let j of vertex) yield <Edge>[i, j];
		}
	}

	addVertex(id: number) {
		this.ensureVertexData(id);
	}

	removeVertex(id: number) {
		const { adjacency, indegree } = this;
		const vertex = adjacency[id];
		if (!vertex) return false;
		// remove outgoing
		while (vertex.length) {
			indegree[vertex.pop()!]--;
			this.numE--;
		}
		delete adjacency[id];
		// remove incoming
		for (let i = 0, n = adjacency.length; i < n && indegree[id] > 0; i++) {
			const vertex = adjacency[i];
			if (!vertex) continue;
			while (vertex.includes(id)) this.removeEdge(i, id);
		}
		this.numV--;
		return true;
	}

	addEdge(from: number, to: number) {
		const vertex = this.ensureVertexData(from);
		this.ensureVertexData(to);
		vertex.push(to);
		this.indegree[to]++;
		this.numE++;
		return true;
	}

	removeEdge(from: number, to: number) {
		const vertex = this.adjacency[from];
		if (vertex) {
			const dest = vertex.indexOf(to);
			if (dest >= 0) {
				vertex.splice(dest, 1);
				this.numE--;
				this.indegree[to]--;
				return true;
			}
		}
		return false;
	}

	hasVertex(id: number) {
		return !!this.adjacency[id];  
	}

	hasEdge(from: number, to: number) {
		const vertex = this.adjacency[from];
		return vertex ? vertex.includes(to) : false;
	}

	degree(id: number, type: DegreeType = "out") {
		let degree = 0;
		const vertex = this.adjacency[id];
		if (vertex) {
			if (type !== "in") degree += vertex.length;
			if (type !== "out") degree += this.indegree[id];
		}
		return degree;
	}

	neighbors(id: number): Iterable<number> {
		return [...(this.adjacency[id] || [])];
	}

	invert(): AdjacencyList {
		return __invert(new AdjacencyList(), this.edges());
	}

	toDot(ids?: string[]) {
		return __toDot(this.edges(), false, ids);
	}

	toString() {
		const { adjacency } = this;
		const res: string[] = [];
		for (let i = 0, n = adjacency.length; i < n; i++) {
			if (adjacency[i]) {
				res.push(
					`${i}: [${[...adjacency[i]!]
						.sort((a, b) => a - b)
						.join(", ")}]`
				);
			}
		}
		return res.join("\n");
	}

	protected ensureVertexData(id: number) {
		const vertex = this.adjacency[id];
		if (vertex) return vertex;
		this.numV++;
		this.indegree[id] = 0;
		return (this.adjacency[id] = []);
	}
}

export const defAdjList = (edges?: Iterable<Edge>) => new AdjacencyList(edges);

export const adjListFromAdjacency = (src: Nullable<number[]>[]) => {
	const res = new AdjacencyList();
	for (let i = 0, n = src.length; i < n; i++) {
		const v = src[i];
		if (!v) continue;
		for (let w of v) res.addEdge(i, w);
	}
	return res;
};
