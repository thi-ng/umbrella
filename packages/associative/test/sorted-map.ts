import { shuffle } from "@thi.ng/arrays";
import { equiv } from "@thi.ng/equiv";
import { range, repeat, zip } from "@thi.ng/transducers";
import * as assert from "assert";
import { defSortedMap, SortedMap } from "../src/sorted-map";

describe("SortedMap", () => {
    let m: SortedMap<any, any>;

    beforeEach(() => {
        m = defSortedMap({ a: 1, b: 2, c: 3 });
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

    it("clear", () => {
        m.clear();
        assert.equal(m.size, 0);
        assert.deepEqual([...m.entries()], []);
    });

    it("empty", () => {
        const m2 = m.empty();
        assert.equal(m.size, 3);
        assert.equal(m2.size, 0);
        assert.deepEqual([...m2.entries()], []);
    });

    it("copy", () => {
        assert.deepEqual(m.copy(), m);
    });

    it("equiv", () => {
        assert.ok(equiv(m.copy(), m));
        assert.ok(!equiv(m, new SortedMap<any, any>()));
    });

    it("has", () => {
        assert(m.has("a"));
        assert(m.has("b"));
        assert(m.has("c"));
        assert(!m.has("aa"));
        assert(!m.has("d"));
        assert(!m.has("@"));
    });

    it("first", () => {
        assert.deepEqual(["a", 1], m.first());
        m.set("A", 10);
        assert.deepEqual(["A", 10], m.first());
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
        assert.deepEqual(
            [...m],
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries rev", () => {
    //     assert.deepEqual([...m.entries(undefined, true)], [["c", 3], ["b", 2], ["a", 1]]);
    // });

    it("entries a", () => {
        assert.deepEqual(
            [...m.entries("a")],
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries a rev", () => {
    //     assert.deepEqual([...m.entries("a", true)], [["a", 1]]);
    // });

    it("entries aa", () => {
        assert.deepEqual(
            [...m.entries("aa")],
            [
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries aa rev", () => {
    //     assert.deepEqual([...m.entries("aa", true)], [["a", 1]]);
    // });

    it("entries bb", () => {
        assert.deepEqual([...m.entries("bb")], [["c", 3]]);
    });

    // it("entries bb rev", () => {
    //     assert.deepEqual([...m.entries("bb", true)], [["b", 2], ["a", 1]]);
    // });

    it("entries c", () => {
        assert.deepEqual([...m.entries("c")], [["c", 3]]);
    });

    // it("entries c rev", () => {
    //     assert.deepEqual([...m.entries("c", true)], [["c", 3], ["b", 2], ["a", 1]]);
    // });

    it("entries 0", () => {
        assert.deepEqual(
            [...m.entries("0")],
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries 0 rev", () => {
    //     assert.deepEqual([...m.entries("0", true)], []);
    // });

    it("entries d", () => {
        assert.deepEqual([...m.entries("d")], []);
    });

    // it("entries d rev", () => {
    //     assert.deepEqual([...m.entries("d", true)], [["c", 3], ["b", 2], ["a", 1]]);
    // });

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

    it("comparator", () => {
        m = defSortedMap(
            { a: 1, b: 2, c: 3 },
            {
                compare: (a: string, b: string) =>
                    a === b ? 0 : a < b ? 1 : -1,
            }
        );
        assert.deepEqual(
            [
                ["c", 3],
                ["b", 2],
                ["a", 1],
            ],
            [...m.entries()]
        );
    });

    it("fuzz", () => {
        const keys = [...range(32)];
        for (let i = 0; i < 1000; i++) {
            m = new SortedMap(zip(shuffle(keys.slice()), repeat(1)));
            assert.deepEqual([...m.keys()], keys);
        }
    });
});
