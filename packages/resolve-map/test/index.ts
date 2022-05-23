import type { Fn0 } from "@thi.ng/api";
import { group } from "@thi.ng/testament";
import * as tx from "@thi.ng/transducers";
import * as assert from "assert";
import { resolve, Resolved, resolved, ResolveFn } from "../src/index.js";

group("resolve-map", {
    simple: () => {
        assert.deepStrictEqual(
            resolve<{
                a: number;
                b: number;
            }>({ a: 1, b: "@a" }),
            {
                a: 1,
                b: 1,
            }
        );
    },

    "linked refs": () => {
        assert.deepStrictEqual(
            resolve<{
                a: number;
                b: number;
                c: number;
            }>({ a: "@c", b: "@a", c: 1 }),
            {
                a: 1,
                b: 1,
                c: 1,
            }
        );
    },

    "array refs": () => {
        assert.deepStrictEqual(
            resolve<{ a: number; b: number; c: number[] }>({
                a: "@c/1",
                b: "@a",
                c: [1, 2],
            }),
            {
                a: 2,
                b: 2,
                c: [1, 2],
            }
        );
    },

    "abs vs rel refs": () => {
        interface Inner {
            b: number;
            c: number;
        }
        assert.deepStrictEqual(
            resolve<{
                a1: Inner;
                a2: Inner;
                a3: Inner;
            }>({
                a1: { b: 1, c: "@b" },
                a2: { b: 2, c: "@b" },
                a3: { b: 3, c: "@/a1/b" },
            }),
            { a1: { b: 1, c: 1 }, a2: { b: 2, c: 2 }, a3: { b: 3, c: 1 } }
        );
    },

    "rel parent refs": () => {
        assert.deepStrictEqual(
            resolve<{
                a: { b: { c: number; d: number; e: number }; c: { d: number } };
                c: { d: number };
            }>({
                a: { b: { c: "@../c/d", d: "@c", e: "@/c/d" }, c: { d: 1 } },
                c: { d: 10 },
            }),
            { a: { b: { c: 1, d: 1, e: 10 }, c: { d: 1 } }, c: { d: 10 } }
        );
    },

    cycles: () => {
        assert.throws(() => resolve({ a: "@a" }));
        assert.throws(() => resolve({ a: { b: "@b" } }));
        assert.throws(() => resolve({ a: { b: "@/a" } }));
        assert.throws(() => resolve({ a: { b: "@/a/b" } }));
        assert.throws(() => resolve({ a: "@b", b: "@a" }));
    },

    "function refs": () => {
        assert.deepStrictEqual(
            resolve<{
                a: number;
                b: { c: number; d: number };
                e: number;
            }>({
                a: (x: ResolveFn) => x("b/c") * 10,
                b: { c: "@d", d: "@/e" },
                e: () => 1,
            }),
            { a: 10, b: { c: 1, d: 1 }, e: 1 }
        );
        const res = resolve<{
            a: number;
            b: { c: number; d: number };
            e: Fn0<number>;
        }>({
            a: (x: ResolveFn) => x("b/c")() * 10,
            b: { c: "@d", d: "@/e" },
            e: () => () => 1,
        });
        assert.strictEqual(res.a, 10);
        assert.strictEqual(res.b.c, res.e);
        assert.strictEqual(res.b.d, res.e);
        assert.strictEqual(res.e(), 1);
    },

    "function resolves only once": () => {
        let n = 0;
        assert.deepStrictEqual(
            resolve<{ a: number; b: { c: number; d: number }; e: number }>({
                a: (x: ResolveFn) => x("b/c"),
                b: { c: "@d", d: "@/e" },
                e: () => (n++, 1),
            }),
            { a: 1, b: { c: 1, d: 1 }, e: 1 }
        );
        assert.strictEqual(n, 1);
    },

    "deep resolve of yet unknown refs": () => {
        assert.deepStrictEqual(
            resolve<{
                a: number;
                b: { c: { d: { e: number } } };
                x: number;
            }>({
                a: "@b/c/d",
                b: ($: ResolveFn) => ({ c: { d: { e: $("/x") } } }),
                x: 1,
            }),
            { a: { e: 1 }, b: { c: { d: { e: 1 } } }, x: 1 }
        );
    },

    destructure: () => {
        const stats = {
            // sequence average
            mean: ({ src: a }: any) => tx.mean(a),
            // sequence range
            range: ({ min, max }: any) => max - min,
            // computes sequence min val
            min: ({ src }: any) => tx.min(src),
            // computes sequence max val
            max: ({ src }: any) => tx.max(src),
            // sorted copy
            sorted: ({ src }: any) => [...src].sort((a, b) => a - b),
            // standard deviation
            sd: ({ src, mean }: any) =>
                Math.sqrt(
                    tx.transduce(
                        tx.map((x: number) => Math.pow(x - mean, 2)),
                        tx.add(),
                        src
                    ) /
                        (src.length - 1)
                ),
            // compute 10th - 90th percentiles
            percentiles: ({ sorted }: any) => {
                return tx.transduce(
                    tx.map(
                        (x: number) =>
                            sorted[Math.floor((x / 100) * sorted.length)]
                    ),
                    tx.push(),
                    tx.range(10, 100, 5)
                );
            },
        };
        // prettier-ignore
        assert. deepStrictEqual(
            resolve({ ...stats, src: () => [1, 6, 7, 2, 4, 11, -3] }),
            {
                mean: 4,
                range: 14,
                min: -3,
                max: 11,
                sorted: [-3, 1, 2, 4, 6, 7, 11],
                sd: 4.546060565661952,
                percentiles: [-3, 1, 1, 1, 2, 2, 2, 4, 4, 4, 6, 6, 6, 7, 7, 7, 11, 11],
                src: [1, 6, 7, 2, 4, 11, -3]
            }
        );
    },

    "destructures w/ local renames": () => {
        assert.deepStrictEqual(
            resolve<{
                a: number;
                b: number;
            }>({ a: 1, b: ({ a: aa }: any) => aa }),
            {
                a: 1,
                b: 1,
            }
        );
    },

    "destructures w/ trailing comma": () => {
        interface Test {
            a: number;
            b: number;
            c: number;
        }
        assert.deepStrictEqual(
            // since prettier is running over this file
            // build function dynamically to force trailing comma
            resolve<Test>({
                a: 1,
                b: 2,
                c: new Function("{a,b,}", "return a + b"),
            }),
            { a: 1, b: 2, c: 3 },
            "comma only"
        );
        assert.deepStrictEqual(
            resolve<Test>({
                a: 1,
                b: 2,
                c: new Function("{ a, b, }", "return a + b"),
            }),
            { a: 1, b: 2, c: 3 },
            "comma & whitespaces"
        );
        assert.deepStrictEqual(
            resolve<Test>({
                a: 1,
                b: 2,
                c: new Function("{ a, b: bb,  }", "return a + bb"),
            }),
            { a: 1, b: 2, c: 3 },
            "comma & whitespaces & rename"
        );
    },

    "custom prefix": () => {
        assert.deepStrictEqual(
            resolve<{
                a: { b: { c: number; d: number; e: number }; c: { d: number } };
                c: { d: number };
            }>(
                {
                    a: {
                        b: { c: ">>>../c/d", d: ">>>c", e: ">>>/c/d" },
                        c: { d: 1 },
                    },
                    c: { d: 10 },
                },
                ">>>"
            ),
            { a: { b: { c: 1, d: 1, e: 10 }, c: { d: 1 } }, c: { d: 10 } }
        );
    },

    resolved: () => {
        interface Foo {
            a: Resolved<{ x: () => number; y: (() => number)[] }>;
            b: number;
            c: () => number;
        }
        const res = resolve<Foo>({
            a: ({ b }: Foo) => resolved({ x: () => b, y: [() => 1] }),
            b: () => 2,
            c: "@a/y/0",
        });
        assert.ok(res.a instanceof Resolved);
        assert.strictEqual(res.a.deref().x(), 2);
        assert.strictEqual(res.a.deref().y[0](), 1);
        assert.strictEqual(res.b, 2);
        assert.strictEqual(res.c(), 1);
    },
});
