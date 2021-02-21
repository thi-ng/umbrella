import * as assert from "assert";
import { exists, getIn, getInUnsafe, mutIn, setIn, setInUnsafe } from "../src";

describe("paths", () => {
    it("getIn", () => {
        const src: any = { a: { b: { c: [23, { d: 42 }] } } };
        assert.deepStrictEqual(getInUnsafe(src, "a"), src.a);
        assert.deepStrictEqual(getInUnsafe(src, "a.b"), src.a.b);
        assert.deepStrictEqual(getInUnsafe(src, "a.b.c"), src.a.b.c);
        assert.deepStrictEqual(getInUnsafe(src, "a.b.c.d"), undefined);
        assert.deepStrictEqual(getInUnsafe(src, "a.b.c.0"), 23);
        assert.deepStrictEqual(getInUnsafe(src, "a.b.c.1"), src.a.b.c[1]);
        assert.deepStrictEqual(getInUnsafe(src, "a.b.c.1.d"), src.a.b.c[1].d);
    });

    it("getIn (emtpy leaves)", () => {
        assert.strictEqual(getIn(0, []), 0);
        assert.strictEqual(getIn("", [0]), undefined);
        assert.strictEqual(getIn("", ["length"]), 0);
        assert.strictEqual(getIn([""], [0]), "");
        assert.strictEqual(getInUnsafe([""], [0, "length"]), 0);
        assert.strictEqual(getIn([[""]], [0, 0, "length"]), 0);
        assert.strictEqual(getIn([[[""]]], [0, 0, 0, "length"]), 0);
        assert.strictEqual(getIn([[[[""]]]], [0, 0, 0, 0, "length"]), 0);
    });

    it("setIn (len = 0)", () => {
        assert.deepStrictEqual(setInUnsafe({ a: { b: { c: 23 } } }, "", 1), 1);
        assert.deepStrictEqual(setInUnsafe({ a: { b: { c: 23 } } }, [], 1), 1);
        assert.deepStrictEqual(setInUnsafe(null, [], 1), 1);
    });

    it("setIn (len = 1)", () => {
        assert.deepStrictEqual(setIn({ a: 23 }, ["a"], 24), {
            a: 24,
        });
        assert.deepStrictEqual(
            setInUnsafe({ a: { b: { c: 23 } } }, ["d"], 24),
            {
                a: { b: { c: 23 } },
                d: 24,
            }
        );
        assert.deepStrictEqual(setInUnsafe({ x: 23 }, "a", 24), {
            x: 23,
            a: 24,
        });
        assert.deepStrictEqual(setInUnsafe(null, "a", 24), { a: 24 });
    });

    it("setIn (len = 2)", () => {
        assert.deepStrictEqual(setIn({ a: { b: 23 } }, ["a", "b"], 24), {
            a: { b: 24 },
        });
        assert.deepStrictEqual(
            setInUnsafe({ a: { b: { c: 23 } } }, "a.d", 24),
            {
                a: { b: { c: 23 }, d: 24 },
            }
        );
        assert.deepStrictEqual(setInUnsafe({ x: 23 }, "a.b", 24), {
            x: 23,
            a: { b: 24 },
        });
        assert.deepStrictEqual(setInUnsafe(null, "a.b", 24), { a: { b: 24 } });
    });

    it("setIn (len = 3)", () => {
        assert.deepStrictEqual(
            setIn({ a: { b: { c: 23 } } }, ["a", "b", "c"], 24),
            {
                a: { b: { c: 24 } },
            }
        );
        assert.deepStrictEqual(
            setInUnsafe({ a: { b: { c: 23 } } }, "a.b.d", 24),
            {
                a: { b: { c: 23, d: 24 } },
            }
        );
        assert.deepStrictEqual(setInUnsafe({ x: 23 }, "a.b.c", 24), {
            x: 23,
            a: { b: { c: 24 } },
        });
        assert.deepStrictEqual(setInUnsafe(null, "a.b.c", 24), {
            a: { b: { c: 24 } },
        });
    });

    it("setIn (len = 4)", () => {
        assert.deepStrictEqual(
            setIn({ a: { b: { c: { d: 23 } } } }, ["a", "b", "c", "d"], 24),
            {
                a: { b: { c: { d: 24 } } },
            }
        );
        assert.deepStrictEqual(
            setInUnsafe({ a: { b: { c: 23 } } }, "a.b.d.e", 24),
            {
                a: { b: { c: 23, d: { e: 24 } } },
            }
        );
        assert.deepStrictEqual(setInUnsafe({ x: 23 }, "a.b.c.d", 24), {
            x: 23,
            a: { b: { c: { d: 24 } } },
        });
        assert.deepStrictEqual(setInUnsafe(null, "a.b.c.d", 24), {
            a: { b: { c: { d: 24 } } },
        });
    });

    it("setIn (len = 5)", () => {
        assert.deepStrictEqual(
            setIn(
                { a: { b: { c: { d: { e: 23 } } } } },
                ["a", "b", "c", "d", "e"],
                24
            ),
            { a: { b: { c: { d: { e: 24 } } } } }
        );
        assert.deepStrictEqual(
            setInUnsafe({ a: { b: { c: 23 } } }, "a.b.d.e.f", 24),
            {
                a: { b: { c: 23, d: { e: { f: 24 } } } },
            }
        );
        assert.deepStrictEqual(setInUnsafe({ x: 23 }, "a.b.c.d.e", 24), {
            x: 23,
            a: { b: { c: { d: { e: 24 } } } },
        });
        assert.deepStrictEqual(setInUnsafe(null, "a.b.c.d.e", 24), {
            a: { b: { c: { d: { e: 24 } } } },
        });
    });

    it("setIn arr", () => {
        assert.deepStrictEqual(setIn([1, 2], [0], 10), [10, 2]);
        assert.deepStrictEqual(setIn(<any[]>[[1, 2], 3], [0, 1], 10), [
            [1, 10],
            3,
        ]);
        assert.deepStrictEqual(setInUnsafe([[1, 2, 3], 4], [0, 1, 2], 10), [
            [1, { 2: 10 }, 3],
            4,
        ]);
        assert.deepStrictEqual(
            setInUnsafe([[1, 2, 3], 4], [0, 1, 2, "a"], 10),
            [[1, { 2: { a: 10 } }, 3], 4]
        );
        assert.deepStrictEqual(
            setInUnsafe([[1, 2, 3], 4], [0, 1, 2, "a", "b"], 10),
            [[1, { 2: { a: { b: 10 } } }, 3], 4]
        );
    });

    it("immutable", () => {
        const a = { x: { y: { z: 1 } }, u: { v: 2 } };
        const b = setInUnsafe(a, "a.b.c", 3);
        assert.deepStrictEqual(b, {
            x: { y: { z: 1 } },
            u: { v: 2 },
            a: { b: { c: 3 } },
        });
        assert.deepStrictEqual(a, { x: { y: { z: 1 } }, u: { v: 2 } });
        assert.ok(a.x === b.x);
        assert.ok(a.x.y === b.x.y);
        assert.ok(a.u === b.u);
    });

    it("exists", () => {
        const a: any = { a: { b: null } };
        const b: any = { x: { y: { z: [1, 2, { u: 3, v: undefined }] } } };
        assert.ok(!exists(null, "x.y.z"), "x.y.z");
        assert.ok(!exists(0, "x.y.z"), "x.y.z");
        assert.ok(exists("", "length"), "length");
        assert.ok(exists(a, "a.b"), "a.b");
        assert.ok(!exists(a, "a.b.c"), "a.b.c");
        assert.ok(exists(b, "x"), "x");
        assert.ok(exists(b, "x.y.z"), "x.y.z");
        assert.ok(exists(b, "x.y.z.2.u"), "x.y.z.2.u");
        assert.ok(exists(b, "x.y.z.2.v"), "x.y.z.2.v");
        assert.ok(!exists(b, "x.y.z.3"), "x.y.z.3");
        assert.ok(!exists(b, "x.y.z.3.u"), "x.y.z.3.u");
        assert.ok(!exists(b, "x.z.y.2.u"), "x.z.y.2.u");
    });

    it("mutIn", () => {
      const a: any = {};
      assert.throws(() => mutIn(a, ['__proto__', 'polluted'], true))
    })
});
