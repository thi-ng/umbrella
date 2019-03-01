import { BitField } from "@thi.ng/bitfield";
import { IGraph } from "./api";

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
        this.marked.setAt(id);
        for (let n of this.graph.neighbors(id)) {
            if (!this.marked.at(n)) {
                this.edges[n] = id;
                this.search(n);
            }
        }
    }

    hasPathTo(id: number) {
        return this.marked.at(id) !== 0;
    }

    pathTo(id: number) {
        if (!this.hasPathTo(id)) return;
        const path = [];
        for (let i = id; i !== this.src; i = this.edges[i]) {
            path.push(i);
        }
        path.push(this.src);
        return path;
    }
}
