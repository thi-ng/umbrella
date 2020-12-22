import type { Fn2, Pair } from "@thi.ng/api";

export type DegreeType = "in" | "out" | "both";

export interface IGraph {
    numEdges(): number;
    numVertices(): number;

    edges(): IterableIterator<Pair<number, number>>;

    addEdge(from: number, to: number): this;
    removeEdge(from: number, to: number): this;
    hasEdge(from: number, to: number): boolean;

    valence(id: number): number;
    neighbors(id: number): number[];
}

export type CostFn = Fn2<number, number, number>;
