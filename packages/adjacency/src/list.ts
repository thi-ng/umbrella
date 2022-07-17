import type { DegreeType, Edge, IGraph } from "./api.js";
import { into, invert, toDot } from "./utils.js";

export class AdjacencyList implements IGraph<number> {
    vertices: number[][] = [];
    indegree: number[] = [];
    protected numE = 0;
    protected numV = 0;

    constructor(edges?: Iterable<Edge>) {
        edges && into(this, edges);
    }

    numEdges(): number {
        return this.numE;
    }

    numVertices(): number {
        return this.numV;
    }

    *edges() {
        const vertices = this.vertices;
        for (let i = 0, n = vertices.length; i < n; i++) {
            const vertex = vertices[i];
            if (!vertex) continue;
            for (let j of vertex) yield <Edge>[i, j];
        }
    }

    addVertex(id: number) {
        this.ensureVertexData(id);
    }

    removeVertex(id: number) {
        const { vertices, indegree } = this;
        const vertex = vertices[id];
        if (!vertex) return false;
        // remove outgoing
        while (vertex.length) {
            const to = vertex.pop()!;
            indegree[to]--;
            this.numE--;
        }
        delete vertices[id];
        // remove incoming
        for (let i = 0, n = vertices.length; i < n && indegree[id] > 0; i++) {
            const vertex = this.vertices[i];
            if (!vertex) continue;
            while (vertex.includes(id)) this.removeEdge(i, id);
            if (!vertex.length) delete this.vertices[i];
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
        const vertex = this.vertices[from];
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

    hasEdge(from: number, to: number) {
        const vertex = this.vertices[from];
        return vertex ? vertex.includes(to) : false;
    }

    degree(id: number, type: DegreeType = "out") {
        let degree = 0;
        const vertex = this.vertices[id];
        if (vertex) {
            if (type !== "in") degree += vertex.length;
            if (type !== "out") degree += this.indegree[id];
        }
        return degree;
    }

    neighbors(id: number): Iterable<number> {
        return [...(this.vertices[id] || [])];
    }

    invert(): AdjacencyList {
        return invert(new AdjacencyList(), this.edges());
    }

    toString() {
        const vertices = this.vertices;
        const res: string[] = [];
        for (let i = 0, n = vertices.length; i < n; i++) {
            if (vertices[i]) {
                res.push(
                    `${i}: [${[...vertices[i]!]
                        .sort((a, b) => a - b)
                        .join(", ")}]`
                );
            }
        }
        return res.join("\n");
    }

    toDot(ids?: string[]) {
        return toDot(this.edges(), false, ids);
    }

    protected ensureVertexData(id: number) {
        const vertex = this.vertices[id];
        if (vertex) return vertex;
        this.numV++;
        this.indegree[id] = 0;
        return (this.vertices[id] = []);
    }
}

export const defAdjList = (edges?: Iterable<Edge>) => new AdjacencyList(edges);
