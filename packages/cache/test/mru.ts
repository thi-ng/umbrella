import * as assert from "assert";
import { MRUCache } from "../src/index";

describe("MRU", () => {
    let c: MRUCache<string, number>;
    let evicts: any[];

    beforeEach(() => {
        evicts = [];
        c = new MRUCache(
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
        assert.deepEqual(evicts, [["d", 4]]);
    });

    it("get", () => {
        assert.equal(c.get("a"), 1);
        assert.equal(c.get("b"), 2);
        assert.deepEqual([...c.keys()], ["b", "a", "c"]);
        c.set("d", 4);
        assert.deepEqual([...c.keys()], ["d", "b", "a", "c"]);
        c.set("e", 5);
        assert.deepEqual([...c.keys()], ["e", "b", "a", "c"]);
        assert.deepEqual([...c.values()], [5, 2, 1, 3]);
        assert.deepEqual(evicts, [["d", 4]]);
    });
});
