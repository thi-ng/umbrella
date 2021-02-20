import * as assert from "assert";
import { defAdjBitMatrix, Edge } from "../src";

const edges: Edge[] = [
    [2, 3],
    [0, 1],
    [5, 4],
    [2, 0],
];

describe("adjacency (bitmatrix)", () => {
    it("directed", () => {
        const m = defAdjBitMatrix(4, [[1, 2]], false);
        assert(m.hasEdge(1, 2));
        assert.deepStrictEqual(m.neighbors(1), [2]);
        assert.deepStrictEqual(m.neighbors(2), []);
        assert.strictEqual(m.degree(1), 1);
        assert.strictEqual(m.degree(2), 0);
        assert.deepStrictEqual([...m.edges()], [[1, 2]]);
        console.log(m.toString());
    });

    it("undirected", () => {
        const m = defAdjBitMatrix(6, edges, true);
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
