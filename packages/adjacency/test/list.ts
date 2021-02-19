import * as assert from "assert";
import { defAdjList } from "../src";

describe("adjacency (list)", () => {
    it("directed", () => {
        const m = defAdjList([
            [1, 2],
            [2, 0],
        ]);
        assert(m.hasEdge(1, 2));
        assert(m.hasEdge(2, 0));
        assert(!m.hasEdge(2, 1));
        assert(!m.hasEdge(0, 2));
        assert.deepStrictEqual(m.neighbors(1), [2]);
        assert.deepStrictEqual(m.neighbors(2), [0]);
        assert.deepStrictEqual(m.valence(1), 1);
        assert.deepStrictEqual(
            [...m.edges()],
            [
                [1, 2],
                [2, 0],
            ]
        );
        console.log(m.toString());
    });
});
