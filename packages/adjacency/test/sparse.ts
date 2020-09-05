import type { Pair } from "@thi.ng/api";
import { AdjacencyMatrix } from "../src/index";
import * as assert from "assert";

const edges: Pair<number, number>[] = [
    [2, 3],
    [0, 1],
    [5, 4],
    [2, 0],
];

describe("adjacency (sparse)", () => {
    it("fromEdges, undirected", () => {
        const m = AdjacencyMatrix.fromEdges(6, edges, true);
        assert.deepEqual(m.rows, [0, 2, 3, 5, 6, 7, 8], "rows");
        assert.deepEqual(m.cols, [1, 2, 0, 0, 3, 2, 5, 4], "cols");
        assert.equal(m.numEdges(), 4, "numEdges");
        assert.deepEqual(
            [...m.edges()],
            [
                [0, 1],
                [0, 2],
                [2, 3],
                [4, 5],
            ],
            "edges"
        );
    });
});
