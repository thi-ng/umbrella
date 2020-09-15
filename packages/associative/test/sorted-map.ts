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
        assert.strictEqual(m.size, 3);
        m.set("a", 10);
        assert.strictEqual(m.size, 3);
        m.set("d", 10);
        assert.strictEqual(m.size, 4);
        m.delete("d");
        assert.strictEqual(m.size, 3);
        m.delete("d");
        assert.strictEqual(m.size, 3);
    });

    it("clear", () => {
        m.clear();
        assert.strictEqual(m.size, 0);
        assert.deepStrictEqual([...m.entries()], []);
    });

    it("empty", () => {
        const m2 = m.empty();
        assert.strictEqual(m.size, 3);
        assert.strictEqual(m2.size, 0);
        assert.deepStrictEqual([...m2.entries()], []);
    });

    it("copy", () => {
        assert.deepStrictEqual(m.copy(), m);
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
        assert.deepStrictEqual(["a", 1], m.first());
        m.set("A", 10);
        assert.deepStrictEqual(["A", 10], m.first());
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
        assert.deepStrictEqual(
            [...m],
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries rev", () => {
    //     assert. deepStrictEqual([...m.entries(undefined, true)], [["c", 3], ["b", 2], ["a", 1]]);
    // });

    it("entries a", () => {
        assert.deepStrictEqual(
            [...m.entries("a")],
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries a rev", () => {
    //     assert. deepStrictEqual([...m.entries("a", true)], [["a", 1]]);
    // });

    it("entries aa", () => {
        assert.deepStrictEqual(
            [...m.entries("aa")],
            [
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries aa rev", () => {
    //     assert. deepStrictEqual([...m.entries("aa", true)], [["a", 1]]);
    // });

    it("entries bb", () => {
        assert.deepStrictEqual([...m.entries("bb")], [["c", 3]]);
    });

    // it("entries bb rev", () => {
    //     assert. deepStrictEqual([...m.entries("bb", true)], [["b", 2], ["a", 1]]);
    // });

    it("entries c", () => {
        assert.deepStrictEqual([...m.entries("c")], [["c", 3]]);
    });

    // it("entries c rev", () => {
    //     assert. deepStrictEqual([...m.entries("c", true)], [["c", 3], ["b", 2], ["a", 1]]);
    // });

    it("entries 0", () => {
        assert.deepStrictEqual(
            [...m.entries("0")],
            [
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]
        );
    });

    // it("entries 0 rev", () => {
    //     assert. deepStrictEqual([...m.entries("0", true)], []);
    // });

    it("entries d", () => {
        assert.deepStrictEqual([...m.entries("d")], []);
    });

    // it("entries d rev", () => {
    //     assert. deepStrictEqual([...m.entries("d", true)], [["c", 3], ["b", 2], ["a", 1]]);
    // });

    it("keys", () => {
        assert.deepStrictEqual([...m.keys()], ["a", "b", "c"]);
        m.set("aa", 0);
        m.set("d", 0);
        assert.deepStrictEqual([...m.keys()], ["a", "aa", "b", "c", "d"]);
    });

    it("values", () => {
        assert.deepStrictEqual([...m.values()], [1, 2, 3]);
        m.set("aa", 0);
        m.set("d", 0);
        assert.deepStrictEqual([...m.values()], [1, 0, 2, 3, 0]);
    });

    it("comparator", () => {
        m = defSortedMap(
            { a: 1, b: 2, c: 3 },
            {
                compare: (a: string, b: string) =>
                    a === b ? 0 : a < b ? 1 : -1,
            }
        );
        assert.deepStrictEqual(
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
            assert.deepStrictEqual([...m.keys()], keys);
        }
    });
});
