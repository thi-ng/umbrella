import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { partitionSync, step } from "../src/index.js"

const src = [
    ["a", 1],
    ["a", 2],
    ["d", 100],
    ["b", 10],
    ["b", 11],
    ["c", 0],
    ["a", 3],
];

group("partitionSync", {
    "default behavior": () => {
        assert.deepStrictEqual(
            [...partitionSync(["a", "b"], { key: (x) => x[0] }, src)],
            [
                { a: ["a", 2], b: ["b", 10] },
                { b: ["b", 11], a: ["a", 3] },
            ]
        );
    },

    "no reset": () => {
        assert.deepStrictEqual(
            [
                ...partitionSync(
                    ["a", "b"],
                    {
                        key: (x) => x[0],
                        reset: false,
                    },
                    src
                ),
            ],
            [
                { a: ["a", 2], b: ["b", 10] },
                { a: ["a", 2], b: ["b", 11] },
                { a: ["a", 3], b: ["b", 11] },
            ]
        );
    },

    "key removal (via set only)": () => {
        const keys = new Set(["a", "b", "t"]);
        const f = step(
            partitionSync(keys, {
                key: (x: any) => x[0],
                reset: false,
            })
        );

        assert.strictEqual(f(["t", 0]), undefined);
        assert.strictEqual(f(["a", 0]), undefined);
        keys.delete("a");
        assert.strictEqual(f(["t", 1]), undefined);
        assert.strictEqual(f(["a", 1]), undefined);
        assert.deepStrictEqual(f(["b", 2]), {
            a: ["a", 0],
            t: ["t", 1],
            b: ["b", 2],
        });
        assert.deepStrictEqual(f(["t", 2]), {
            a: ["a", 0],
            t: ["t", 2],
            b: ["b", 2],
        });
    },

    "key add/removal (hook)": () => {
        const keys = new Set(["a", "b", "t"]);
        const xform = partitionSync(keys, {
            key: (x: any) => x[0],
            reset: false,
        });
        const f = step(xform);

        assert.strictEqual(f(["t", 0]), undefined);
        assert.strictEqual(f(["a", 0]), undefined);
        xform.delete("a");
        assert.deepStrictEqual(keys, new Set(["b", "t"]));
        assert.strictEqual(f(["t", 1]), undefined);
        assert.strictEqual(f(["a", 1]), undefined);
        assert.deepStrictEqual(f(["b", 2]), {
            t: ["t", 1],
            b: ["b", 2],
        });
        xform.add("a");
        assert.deepStrictEqual(xform.keys(), new Set(["a", "b", "t"]));
        assert.deepStrictEqual(f(["a", 2]), {
            a: ["a", 2],
            t: ["t", 1],
            b: ["b", 2],
        });
        xform.clear();
        assert.strictEqual(f(["a", 3]), undefined);
        xform.add("a");
        assert.deepStrictEqual(f(["a", 4]), { a: ["a", 4] });
    },

    "back pressure": () => {
        assert.deepStrictEqual(
            [
                ...partitionSync(
                    ["a", "b", "c"],
                    { backPressure: 3, key: (x) => x[0], all: false },
                    // prettier-ignore
                    ["a1", "b1", "a2", "c1", "c2", "a3", "a4", "b2", "c3", "b3", "b4", "c4", "c5"]
                ),
            ],
            [
                { a: "a1", b: "b1", c: "c1" },
                { a: "a2", c: "c2", b: "b2" },
                { a: "a3", c: "c3", b: "b3" },
                { a: "a4", b: "b4", c: "c4" },
            ]
        );
        assert.throws(() => [
            ...partitionSync(
                ["a", "b"],
                { backPressure: 1, key: (x) => x[0] },
                ["a1", "a2"]
            ),
            "pressure limit",
        ]);
    },
});
