import * as assert from "assert";
import { partitionSync, step } from "../src";

describe("partitionSync", () => {
    const src = [
        ["a", 1],
        ["a", 2],
        ["d", 100],
        ["b", 10],
        ["b", 11],
        ["c", 0],
        ["a", 3]
    ];

    it("default behavior", () => {
        assert.deepEqual(
            [...partitionSync(["a", "b"], { key: (x) => x[0] }, src)],
            [{ a: ["a", 2], b: ["b", 10] }, { b: ["b", 11], a: ["a", 3] }]
        );
    });

    it("no reset", () => {
        assert.deepEqual(
            [
                ...partitionSync(
                    ["a", "b"],
                    {
                        key: (x) => x[0],
                        reset: false
                    },
                    src
                )
            ],
            [
                { a: ["a", 2], b: ["b", 10] },
                { a: ["a", 2], b: ["b", 11] },
                { a: ["a", 3], b: ["b", 11] }
            ]
        );
    });

    it("key removal", () => {
        const keys = new Set(["a", "b", "t"]);
        const f = step(
            partitionSync(keys, {
                key: (x: any) => x[0],
                reset: false
            })
        );

        assert.equal(f(["t", 0]), undefined);
        assert.equal(f(["a", 0]), undefined);
        keys.delete("a");
        assert.equal(f(["t", 1]), undefined);
        assert.equal(f(["a", 1]), undefined);
        assert.deepEqual(f(["b", 2]), {
            a: ["a", 0],
            t: ["t", 1],
            b: ["b", 2]
        });
        assert.deepEqual(f(["t", 2]), {
            a: ["a", 0],
            t: ["t", 2],
            b: ["b", 2]
        });
    });
});
