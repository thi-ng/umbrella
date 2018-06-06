import * as tx from "@thi.ng/transducers";
import * as assert from "assert";

import { resolveMap } from "../src/index";

describe("resolve-map", () => {

    it("simple", () => {
        assert.deepEqual(
            resolveMap({ a: 1, b: "@a" }),
            { a: 1, b: 1 }
        );
    });

    it("linked refs", () => {
        assert.deepEqual(
            resolveMap({ a: "@c", b: "@a", c: 1 }),
            { a: 1, b: 1, c: 1 }
        );
    });

    it("array refs", () => {
        assert.deepEqual(
            resolveMap({ a: "@c/1", b: "@a", c: [1, 2] }),
            { a: 2, b: 2, c: [1, 2] }
        );
    });

    it("abs vs rel refs", () => {
        assert.deepEqual(
            resolveMap({ a1: { b: 1, c: "@b" }, a2: { b: 2, c: "@b" }, a3: { b: 3, c: "@/a1/b" } }),
            { a1: { b: 1, c: 1 }, a2: { b: 2, c: 2 }, a3: { b: 3, c: 1 } }
        );
    });

    it("rel parent refs", () => {
        assert.deepEqual(
            resolveMap({ a: { b: { c: "@../c/d", d: "@c", e: "@/c/d" }, c: { d: 1 } }, c: { d: 10 } }),
            { a: { b: { c: 1, d: 1, e: 10 }, c: { d: 1 } }, c: { d: 10 } }
        );
    })

    it("cycles", () => {
        assert.throws(() => resolveMap({ a: "@a" }));
        assert.throws(() => resolveMap({ a: { b: "@b" } }));
        assert.throws(() => resolveMap({ a: { b: "@/a" } }));
        assert.throws(() => resolveMap({ a: { b: "@/a/b" } }));
        assert.throws(() => resolveMap({ a: "@b", b: "@a" }));
    });

    it("function refs", () => {
        assert.deepEqual(
            resolveMap({ a: (x) => x("b/c") * 10, b: { c: "@d", d: "@/e" }, e: () => 1 }),
            { a: 10, b: { c: 1, d: 1 }, e: 1 }
        );
        const res = resolveMap({ a: (x) => x("b/c")() * 10, b: { c: "@d", d: "@/e" }, e: () => () => 1 });
        assert.equal(res.a, 10);
        assert.strictEqual(res.b.c, res.e);
        assert.strictEqual(res.b.d, res.e);
        assert.strictEqual(res.e(), 1);
    });

    it("function resolves only once", () => {
        let n = 0;
        assert.deepEqual(
            resolveMap({ a: (x) => x("b/c"), b: { c: "@d", d: "@/e" }, e: () => (n++ , 1) }),
            { a: 1, b: { c: 1, d: 1 }, e: 1 }
        );
        assert.equal(n, 1);
    });

    it("destructure", () => {
        const stats = {
            // sequence average
            mean: ({ src }) => tx.reduce(tx.mean(), src),
            // sequence range
            range: ({ min, max }) => max - min,
            // computes sequence min val
            min: ({ src }) => tx.reduce(tx.min(), src),
            // computes sequence max val
            max: ({ src }) => tx.reduce(tx.max(), src),
            // sorted copy
            sorted: ({ src }) => [...src].sort((a, b) => a - b),
            // standard deviation
            sd: ({ src, mean }) =>
                Math.sqrt(
                    tx.transduce(tx.map((x: number) => Math.pow(x - mean, 2)), tx.add(), src) /
                    (src.length - 1)),
            // compute 10th - 90th percentiles
            percentiles: ({ sorted }) => {
                return tx.transduce(
                    tx.map((x: number) => sorted[Math.floor(x / 100 * sorted.length)]),
                    tx.push(),
                    tx.range(10, 100, 5)
                );
            }
        };
        console.log(resolveMap({ ...stats, src: () => [1, 6, 7, 2, 4, 11, -3] }));
    });
});
