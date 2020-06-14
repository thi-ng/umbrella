import { EquivMap } from "@thi.ng/associative";
import { LRUCache } from "@thi.ng/cache";
import * as assert from "assert";
import * as m from "../src/index";

describe("memoize", () => {
    it("memoize1", () => {
        const calls: number[] = [];
        const f = m.memoize1<number, number>((x) => (calls.push(x), x * 10));
        assert.equal(f(1), 10);
        assert.equal(f(2), 20);
        assert.equal(f(2), 20);
        assert.equal(f(1), 10);
        assert.equal(f(3), 30);
        assert.deepEqual(calls, [1, 2, 3]);
    });

    it("memoize1 (equivmap)", () => {
        const calls: number[][] = [];
        const f = m.memoize1<number[], number>(
            (x) => (calls.push(x), x[0] + x[1]),
            new EquivMap()
        );
        assert.equal(f([1, 2]), 3);
        assert.equal(f([3, 4]), 7);
        assert.equal(f([3, 4]), 7);
        assert.equal(f([1, 2]), 3);
        assert.equal(f([5, 6]), 11);
        assert.deepEqual(calls, [
            [1, 2],
            [3, 4],
            [5, 6],
        ]);
    });

    it("memoize1 (lru)", () => {
        const calls: number[][] = [];
        const cache = new LRUCache(null, {
            maxlen: 3,
            map: () => new EquivMap(),
        });
        const f = m.memoize1<number[], number>(
            (x) => (calls.push(x), x[0] + x[1]),
            cache
        );
        assert.equal(f([1, 2]), 3);
        assert.equal(f([3, 4]), 7);
        assert.equal(f([3, 4]), 7);
        assert.equal(f([1, 2]), 3);
        assert.equal(f([5, 6]), 11);
        assert.equal(f([7, 8]), 15);
        assert.equal(f([3, 4]), 7); // <-- recompute
        assert.deepEqual(calls, [
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
            [3, 4],
        ]);
        assert.deepEqual(
            [...cache.keys()],
            [
                [5, 6],
                [7, 8],
                [3, 4],
            ]
        );
    });
});
