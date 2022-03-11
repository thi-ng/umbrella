import { BitField } from "@thi.ng/bitfield/bitfield";
import { DCons } from "@thi.ng/dcons/dcons";
import type { CostFn, IGraph } from "./api.js";

export class BFS {
    graph: IGraph;
    marked: BitField;
    edges: Uint32Array;
    dist: Uint32Array;

    constructor(graph: IGraph, src: number, cost: CostFn = () => 1) {
        this.graph = graph;
        const numV = graph.numVertices();
        this.edges = new Uint32Array(numV);
        this.dist = new Uint32Array(numV);
        this.marked = new BitField(numV);
        this.search(src, cost);
    }

    protected search(id: number, cost: CostFn) {
        const queue = new DCons<number>().cons(id);
        const { dist, edges, graph, marked } = this;
        dist.fill(0xffffffff);
        dist[id] = 0;
        marked.setAt(id);
        while (queue.length) {
            const v = queue.drop()!;
            for (let n of graph.neighbors(v)) {
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

    pathTo(id: number): Iterable<number> | undefined {
        if (!this.marked.at(id)) return;
        const { dist, edges } = this;
        const path = new DCons<number>();
        for (; dist[id] > 0; id = edges[id]) {
            path.cons(id);
        }
        path.cons(id);
        return path;
    }
}

/**
 * One-off Breadth-First / shortest path search between `src` and `dest` in
 * `graph`, with optional `cost` function. If successful, returns path as
 * iterable or undefined if no path connects the given vertices.
 *
 * @remarks
 * For repeated queries starting from the same `src` vertex, it's much better &
 * faster to create an {@link BFS} instance to re-use internal state and use
 * {@link BFS.pathTo} to check/obtain paths.
 *
 * By default all edges have an uniform cost, i.e. the overall path cost is
 * topological distance.
 *
 * Reference:
 * - https://en.wikipedia.org/wiki/Breadth-first_search
 * - https://algs4.cs.princeton.edu/40graphs/
 *
 * @param graph - 
 * @param src - 
 * @param dest - 
 * @param cost - 
 */
export const bfs = (graph: IGraph, src: number, dest: number, cost?: CostFn) =>
    new BFS(graph, src, cost).pathTo(dest);
