import { shuffle } from "@thi.ng/arrays";
import { equiv } from "@thi.ng/equiv";
import { range, repeat, zip } from "@thi.ng/transducers";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defSortedMap, SortedMap } from "../src";

let m: SortedMap<any, any>;

group(
    "SortedMap",
    {
        size: () => {
            assert.strictEqual(m.size, 3);
            m.set("a", 10);
            assert.strictEqual(m.size, 3);
            m.set("d", 10);
            assert.strictEqual(m.size, 4);
            m.delete("d");
            assert.strictEqual(m.size, 3);
            m.delete("d");
            assert.strictEqual(m.size, 3);
        },

        clear: () => {
            m.clear();
            assert.strictEqual(m.size, 0);
            assert.deepStrictEqual([...m.entries()], []);
        },

        empty: () => {
            const m2 = m.empty();
            assert.strictEqual(m.size, 3);
            assert.strictEqual(m2.size, 0);
            assert.deepStrictEqual([...m2.entries()], []);
        },

        copy: () => {
            assert.deepStrictEqual(m.copy(), m);
        },

        equiv: () => {
            assert.ok(equiv(m.copy(), m));
            assert.ok(!equiv(m, new SortedMap<any, any>()));
        },

        has: () => {
            assert.ok(m.has("a"));
            assert.ok(m.has("b"));
            assert.ok(m.has("c"));
            assert.ok(!m.has("aa"));
            assert.ok(!m.has("d"));
            assert.ok(!m.has("@"));
        },

        first: () => {
            assert.deepStrictEqual(["a", 1], m.first());
            m.set("A", 10);
            assert.deepStrictEqual(["A", 10], m.first());
        },

        get: () => {
            assert.strictEqual(m.get("a"), 1);
            assert.strictEqual(m.get("b"), 2);
            assert.strictEqual(m.get("c"), 3);
            assert.strictEqual(m.get("aa"), undefined);
            assert.strictEqual(m.get("d"), undefined);
            assert.strictEqual(m.get("@", -1), -1);
        },

        entries: () => {
            assert.deepStrictEqual(
                [...m],
                [
                    ["a", 1],
                    ["b", 2],
                    ["c", 3],
                ]
            );
        },

        // "entries rev": () => {
        //     assert. deepStrictEqual([...m.entries(undefined, true)], [["c", 3], ["b", 2], ["a", 1]]);
        // },

        "entries a": () => {
            assert.deepStrictEqual(
                [...m.entries("a")],
                [
                    ["a", 1],
                    ["b", 2],
                    ["c", 3],
                ]
            );
        },

        // "entries a rev": () => {
        //     assert. deepStrictEqual([...m.entries("a", true)], [["a", 1]]);
        // },

        "entries aa": () => {
            assert.deepStrictEqual(
                [...m.entries("aa")],
                [
                    ["b", 2],
                    ["c", 3],
                ]
            );
        },

        // "entries aa rev": () => {
        //     assert. deepStrictEqual([...m.entries("aa", true)], [["a", 1]]);
        // },

        "entries bb": () => {
            assert.deepStrictEqual([...m.entries("bb")], [["c", 3]]);
        },

        // "entries bb rev": () => {
        //     assert. deepStrictEqual([...m.entries("bb", true)], [["b", 2], ["a", 1]]);
        // },

        "entries c": () => {
            assert.deepStrictEqual([...m.entries("c")], [["c", 3]]);
        },

        // "entries c rev": () => {
        //     assert. deepStrictEqual([...m.entries("c", true)], [["c", 3], ["b", 2], ["a", 1]]);
        // },

        "entries 0": () => {
            assert.deepStrictEqual(
                [...m.entries("0")],
                [
                    ["a", 1],
                    ["b", 2],
                    ["c", 3],
                ]
            );
        },

        // "entries 0 rev": () => {
        //     assert. deepStrictEqual([...m.entries("0", true)], []);
        // });

        "entries d": () => {
            assert.deepStrictEqual([...m.entries("d")], []);
        },

        // "entries d rev": () => {
        //     assert. deepStrictEqual([...m.entries("d", true)], [["c", 3], ["b", 2], ["a", 1]]);
        // },

        keys: () => {
            assert.deepStrictEqual([...m.keys()], ["a", "b", "c"]);
            m.set("aa", 0);
            m.set("d", 0);
            assert.deepStrictEqual([...m.keys()], ["a", "aa", "b", "c", "d"]);
        },

        values: () => {
            assert.deepStrictEqual([...m.values()], [1, 2, 3]);
            m.set("aa", 0);
            m.set("d", 0);
            assert.deepStrictEqual([...m.values()], [1, 0, 2, 3, 0]);
        },

        comparator: () => {
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
        },

        fuzz: () => {
            const keys = [...range(32)];
            for (let i = 0; i < 1000; i++) {
                m = new SortedMap(zip(shuffle(keys.slice()), repeat(1)));
                assert.deepStrictEqual([...m.keys()], keys);
            }
        },
    },
    {
        beforeEach: () => {
            m = defSortedMap({ a: 1, b: 2, c: 3 });
        },
    }
);
