import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { defAdjList } from "../src/index.js"

group("adjacency (list)", {
    directed: () => {
        const m = defAdjList([
            [1, 2],
            [2, 0],
        ]);
        assert.ok(m.hasEdge(1, 2));
        assert.ok(m.hasEdge(2, 0));
        assert.ok(!m.hasEdge(2, 1));
        assert.ok(!m.hasEdge(0, 2));
        assert.deepStrictEqual(m.neighbors(1), [2]);
        assert.deepStrictEqual(m.neighbors(2), [0]);
        assert.strictEqual(m.degree(1), 1);
        assert.deepStrictEqual(
            [...m.edges()],
            [
                [1, 2],
                [2, 0],
            ]
        );
        console.log(m.toString());
    },
});
