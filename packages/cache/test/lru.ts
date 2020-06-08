import * as assert from "assert";
import { LRUCache } from "../src/index";

describe("LRU", () => {
    let c: LRUCache<string, number>;
    let evicts: any[];

    beforeEach(() => {
        evicts = [];
        c = new LRUCache(
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ],
            {
                maxlen: 4,
                release: (k, v) => evicts.push([k, v]),
            }
        );
    });

    it("max length", () => {
        assert.equal(c.length, 3);
        c.set("d", 4);
        assert.equal(c.length, 4);
        c.set("e", 5);
        assert.equal(c.length, 4);
        assert.deepEqual(evicts, [["a", 1]]);
    });

    it("get", () => {
        assert.equal(c.get("a"), 1);
        assert.equal(c.get("b"), 2);
        assert.deepEqual([...c.keys()], ["c", "a", "b"]);
        c.set("d", 4);
        assert.deepEqual([...c.keys()], ["c", "a", "b", "d"]);
        c.set("e", 5);
        assert.deepEqual([...c.keys()], ["a", "b", "d", "e"]);
        assert.deepEqual([...c.values()], [1, 2, 4, 5]);
        assert.deepEqual(evicts, [["c", 3]]);
    });
});
