import * as assert from "assert";

import { SortedMap } from "../src/sorted-map";

describe("SortedMap", () => {

    let m: SortedMap<any, any>;

    beforeEach(() => {
        m = SortedMap.fromObject({ a: 1, b: 2, c: 3 });
    });


    it("size", () => {
        assert.equal(m.size, 3);
        m.set("a", 10);
        assert.equal(m.size, 3);
        m.set("d", 10);
        assert.equal(m.size, 4);
        m.delete("d");
        assert.equal(m.size, 3);
        m.delete("d");
        assert.equal(m.size, 3);
    });

    it("has", () => {
        assert(m.has("a"));
        assert(m.has("b"));
        assert(m.has("c"));
        assert(!m.has("aa"));
        assert(!m.has("d"));
        assert(!m.has("@"));
    });

    it("get", () => {
        assert.strictEqual(m.get("a"), 1);
        assert.strictEqual(m.get("b"), 2);
        assert.strictEqual(m.get("c"), 3);
        assert.strictEqual(m.get("aa"), undefined);
        assert.strictEqual(m.get("d"), undefined);
        assert.strictEqual(m.get("@", -1), -1);
    });

    it("entries", () => {
        assert.deepEqual([...m], [["a", 1], ["b", 2], ["c", 3]]);
    });

    it("entries rev", () => {
        assert.deepEqual([...m.entries(undefined, true)], [["c", 3], ["b", 2], ["a", 1]]);
    });

    it("entries a", () => {
        assert.deepEqual([...m.entries("a")], [["a", 1], ["b", 2], ["c", 3]]);
    });

    it("entries a rev", () => {
        assert.deepEqual([...m.entries("a", true)], [["a", 1]]);
    });

    it("entries aa", () => {
        assert.deepEqual([...m.entries("aa")], [["b", 2], ["c", 3]]);
    });

    it("entries aa rev", () => {
        assert.deepEqual([...m.entries("aa", true)], [["a", 1]]);
    });

    it("entries bb", () => {
        assert.deepEqual([...m.entries("bb")], [["c", 3]]);
    });

    it("entries bb rev", () => {
        assert.deepEqual([...m.entries("bb", true)], [["b", 2], ["a", 1]]);
    });

    it("entries c", () => {
        assert.deepEqual([...m.entries("c")], [["c", 3]]);
    });

    it("entries c rev", () => {
        assert.deepEqual([...m.entries("c", true)], [["c", 3], ["b", 2], ["a", 1]]);
    });

    it("entries 0", () => {
        assert.deepEqual([...m.entries("0")], [["a", 1], ["b", 2], ["c", 3]]);
    });

    it("entries 0 rev", () => {
        assert.deepEqual([...m.entries("0", true)], []);
    });

    it("entries d", () => {
        assert.deepEqual([...m.entries("d")], []);
    });

    it("entries d rev", () => {
        assert.deepEqual([...m.entries("d", true)], [["c", 3], ["b", 2], ["a", 1]]);
    });

    it("keys", () => {
        assert.deepEqual([...m.keys()], ["a", "b", "c"]);
        m.set("aa", 0);
        m.set("d", 0);
        assert.deepEqual([...m.keys()], ["a", "aa", "b", "c", "d"]);
    });

    it("values", () => {
        assert.deepEqual([...m.values()], [1, 2, 3]);
        m.set("aa", 0);
        m.set("d", 0);
        assert.deepEqual([...m.values()], [1, 0, 2, 3, 0]);
    });
});
