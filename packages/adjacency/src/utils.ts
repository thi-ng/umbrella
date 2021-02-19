import type { Pair } from "@thi.ng/api";
import type { Edge, IGraph } from "./api";

/** @internal */
export const toDot = (
    edges: Iterable<Pair<number, number>>,
    undirected: boolean,
    ids?: string[]
) => {
    const [type, sep] = undirected ? ["graph", "--"] : ["digraph", "->"];
    const res = [`${type} g {`];
    for (let e of edges) {
        res.push(
            ids
                ? `"${ids[e[0]]}"${sep}"${ids[e[1]]}";`
                : `"${e[0]}"${sep}"${e[1]}";`
        );
    }
    res.push(`}`);
    return res.join("\n");
};

/** @internal */
export const into = (graph: IGraph, edges: Iterable<Edge>) => {
    for (let e of edges) {
        graph.addEdge(e[0], e[1]);
    }
};

/** @internal */
export const invert = <T extends IGraph>(graph: T, edges: Iterable<Edge>) => {
    for (let e of edges) {
        graph.addEdge(e[1], e[0]);
    }
    return graph;
};
