import * as assert from "assert";
import { exists, getIn, setIn } from "../src/index";

describe("paths", () => {
    it("getIn", () => {
        const src: any = { a: { b: { c: [23, { d: 42 }] } } };
        assert.deepStrictEqual(getIn(src, "a"), src.a);
        assert.deepStrictEqual(getIn(src, "a.b"), src.a.b);
        assert.deepStrictEqual(getIn(src, "a.b.c"), src.a.b.c);
        assert.deepStrictEqual(getIn(src, "a.b.c.d"), undefined);
        assert.deepStrictEqual(getIn(src, "a.b.c.0"), 23);
        assert.deepStrictEqual(getIn(src, "a.b.c.1"), src.a.b.c[1]);
        assert.deepStrictEqual(getIn(src, "a.b.c.1.d"), src.a.b.c[1].d);
    });

    it("setIn (len = 0)", () => {
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "", 1),
            1
        );
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, [], 1),
            1
        );
        assert.deepEqual(
            setIn(null, [], 1),
            1
        );
    });

    it("setIn (len = 1)", () => {
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "a", 24),
            { a: 24 }
        );
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "d", 24),
            { a: { b: { c: 23 } }, d: 24 }
        );
        assert.deepEqual(
            setIn({ x: 23 }, "a", 24),
            { x: 23, a: 24 }
        );
        assert.deepEqual(
            setIn(null, "a", 24),
            { a: 24 }
        );
    });

    it("setIn (len = 2)", () => {
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "a.b", 24),
            { a: { b: 24 } }
        );
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "a.d", 24),
            { a: { b: { c: 23 }, d: 24 } }
        );
        assert.deepEqual(
            setIn({ x: 23 }, "a.b", 24),
            { x: 23, a: { b: 24 } }
        );
        assert.deepEqual(
            setIn(null, "a.b", 24),
            { a: { b: 24 } }
        );
    });

    it("setIn (len = 3)", () => {
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "a.b.c", 24),
            { a: { b: { c: 24 } } }
        );
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "a.b.d", 24),
            { a: { b: { c: 23, d: 24 } } }
        );
        assert.deepEqual(
            setIn({ x: 23 }, "a.b.c", 24),
            { x: 23, a: { b: { c: 24 } } }
        );
        assert.deepEqual(
            setIn(null, "a.b.c", 24),
            { a: { b: { c: 24 } } }
        );
    });

    it("setIn (len = 4)", () => {
        assert.deepEqual(
            setIn({ a: { b: { c: { d: 23 } } } }, "a.b.c.d", 24),
            { a: { b: { c: { d: 24 } } } }
        );
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "a.b.d.e", 24),
            { a: { b: { c: 23, d: { e: 24 } } } }
        );
        assert.deepEqual(
            setIn({ x: 23 }, "a.b.c.d", 24),
            { x: 23, a: { b: { c: { d: 24 } } } }
        );
        assert.deepEqual(
            setIn(null, "a.b.c.d", 24),
            { a: { b: { c: { d: 24 } } } }
        );
    });

    it("setIn (len = 5)", () => {
        assert.deepEqual(
            setIn({ a: { b: { c: { d: { e: 23 } } } } }, "a.b.c.d.e", 24),
            { a: { b: { c: { d: { e: 24 } } } } }
        );
        assert.deepEqual(
            setIn({ a: { b: { c: 23 } } }, "a.b.d.e.f", 24),
            { a: { b: { c: 23, d: { e: { f: 24 } } } } }
        );
        assert.deepEqual(
            setIn({ x: 23 }, "a.b.c.d.e", 24),
            { x: 23, a: { b: { c: { d: { e: 24 } } } } }
        );
        assert.deepEqual(
            setIn(null, "a.b.c.d.e", 24),
            { a: { b: { c: { d: { e: 24 } } } } }
        );
    });

    it("setIn arr", () => {
        assert.deepEqual(
            setIn([1, 2], 0, 10),
            [10, 2]
        );
        assert.deepEqual(
            setIn([[1, 2], 3], [0, 1], 10),
            [[1, 10], 3]
        );
        assert.deepEqual(
            setIn([[1, 2, 3], 4], [0, 1, 2], 10),
            [[1, { 2: 10 }, 3], 4]
        );
        assert.deepEqual(
            setIn([[1, 2, 3], 4], [0, 1, 2, "a"], 10),
            [[1, { 2: { a: 10 } }, 3], 4]
        );
        assert.deepEqual(
            setIn([[1, 2, 3], 4], [0, 1, 2, "a", "b"], 10),
            [[1, { 2: { a: { b: 10 } } }, 3], 4]
        );
    });

    it("immutable", () => {
        const a = { x: { y: { z: 1 } }, u: { v: 2 } };
        const b = setIn(a, "a.b.c", 3);
        assert.deepEqual(
            b,
            { x: { y: { z: 1 } }, u: { v: 2 }, a: { b: { c: 3 } } }
        );
        assert.deepEqual(
            a,
            { x: { y: { z: 1 } }, u: { v: 2 } }
        );
        assert(a.x === b.x);
        assert(a.x.y === b.x.y);
        assert(a.u === b.u);
    });

    it("exists", () => {
        const a = { a: { b: null } };
        const b = { x: { y: { z: [1, 2, { u: 3, v: undefined }] } } };
        assert(!exists(null, "x.y.z"), "x.y.z");
        assert(!exists(0, "x.y.z"), "x.y.z");
        assert(exists("", "length"), "length");
        assert(exists(a, "a.b"), "a.b");
        assert(!exists(a, "a.b.c"), "a.b.c");
        assert(exists(b, "x"), "x");
        assert(exists(b, "x.y.z"), "x.y.z");
        assert(exists(b, "x.y.z.2.u"), "x.y.z.2.u");
        assert(exists(b, "x.y.z.2.v"), "x.y.z.2.v");
        assert(!exists(b, "x.y.z.3"), "x.y.z.3");
        assert(!exists(b, "x.y.z.3.u"), "x.y.z.3.u");
        assert(!exists(b, "x.z.y.2.u"), "x.z.y.2.u");
    })
});
