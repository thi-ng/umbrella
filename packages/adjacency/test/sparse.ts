import type { Pair } from "@thi.ng/api";
import * as assert from "assert";
import { defAdjMatrix } from "../src";

const edges: Pair<number, number>[] = [
    [2, 3],
    [0, 1],
    [5, 4],
    [2, 0],
];

describe("adjacency (sparse)", () => {
    it("edges directed", () => {
        const m = defAdjMatrix(4, [], false);
        m.addEdge(1, 2);
        assert(m.hasEdge(1, 2));
        assert.deepStrictEqual(m.neighbors(1), [2]);
        assert.deepStrictEqual(m.neighbors(2), []);
        assert.deepStrictEqual(m.valence(1), 1);
        assert.deepStrictEqual([...m.edges()], [[1, 2]]);
    });

    it("fromEdges, undirected", () => {
        const m = defAdjMatrix(6, edges, true);
        assert.deepStrictEqual(m.rows, [0, 2, 3, 5, 6, 7, 8], "rows");
        assert.deepStrictEqual(m.cols, [1, 2, 0, 0, 3, 2, 5, 4], "cols");
        assert.strictEqual(m.numEdges(), 4, "numEdges");
        assert.deepStrictEqual(
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
