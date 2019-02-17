import { Pair } from "@thi.ng/api";

export const enum DegreeType {
    IN,
    OUT,
    BOTH,
}

export interface IAdjacencyMatrix {

    numEdges(): number;
    numVertices(): number;

    edges(): IterableIterator<Pair<number, number>>;

    addEdge(from: number, to: number): this;
    removeEdge(from: number, to: number): this;
    hasEdge(from: number, to: number): boolean;

    valence(id: number): number;
    neighbors(id: number): number[];
}
