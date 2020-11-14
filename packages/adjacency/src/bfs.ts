import { BitField } from "@thi.ng/bitfield";
import { isNumber } from "@thi.ng/checks";
import { DCons } from "@thi.ng/dcons";
import type { CostFn, IGraph } from "./api";

export class BFS {
    graph: IGraph;
    marked: BitField;
    edges: Uint32Array;
    dist: Uint32Array;

    constructor(graph: IGraph, src: number | Iterable<number>, cost?: CostFn) {
        this.graph = graph;
        const numV = graph.numVertices();
        this.edges = new Uint32Array(numV);
        this.dist = new Uint32Array(numV);
        this.marked = new BitField(numV);
        this.search(isNumber(src) ? [src] : src, cost);
    }

    search(ids: Iterable<number>, cost: CostFn = () => 1) {
        const queue = new DCons<number>(ids);
        const { dist, edges, marked } = this;
        dist.fill(0xffffffff);
        for (let id of ids) {
            dist[id] = 0;
            marked.setAt(id);
        }
        while (queue.length) {
            const v = queue.drop()!;
            for (let n of this.graph.neighbors(v)) {
                const c = dist[v] + cost(v, n);
                if (c < dist[n] || !marked.at(n)) {
                    edges[n] = v;
                    dist[n] = c;
                    marked.setAt(n);
                    queue.push(n);
                }
            }
        }
    }

    hasPathTo(id: number) {
        return this.marked.at(id) !== 0;
    }

    pathTo(id: number) {
        if (!this.hasPathTo(id)) return;
        const path: number[] = [];
        const { dist, edges } = this;
        let i = id;
        for (; dist[i] > 0; i = edges[i]) {
            path.push(i);
        }
        path.push(i);
        return path;
    }
}
