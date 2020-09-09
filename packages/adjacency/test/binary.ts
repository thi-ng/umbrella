import type { Pair } from "@thi.ng/api";
import * as assert from "assert";
import { AdjacencyBitMatrix } from "../src/index";

const edges: Pair<number, number>[] = [
    [2, 3],
    [0, 1],
    [5, 4],
    [2, 0],
];

describe("adjacency (bitmatrix)", () => {
    it("fromEdges, undirected", () => {
        const m = AdjacencyBitMatrix.fromEdges(6, edges, true);
        assert.deepStrictEqual(
            [...m.mat.data.slice(0, 6)],
            [
                1610612736,
                2147483648,
                2415919104,
                536870912,
                67108864,
                134217728,
            ],
            "data"
        );
        assert.strictEqual(m.numEdges(), 4, "numEdges");
        assert.deepStrictEqual(
            [...m.edges()],
            [
                [4, 5],
                [2, 3],
                [0, 1],
                [0, 2],
            ],
            "edges"
        );
    });
});
