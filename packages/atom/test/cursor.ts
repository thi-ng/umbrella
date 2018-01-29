import * as assert from "assert";
import { Atom, Cursor } from "../src/index";

describe("cursor w/ path", function () {

    let a: Atom<any>;
    let c: Cursor<any>;
    let src;

    beforeEach(() => {
        src = { a: { b: { c: 23 }, d: { e: 42 } }, f: 66 };
        a = new Atom(src);
    });

    it("can be deref'd (a)", () => {
        c = new Cursor(a, "a");
        assert.deepStrictEqual(c.deref(), src.a);
    });

    it("can be deref'd (a.b)", () => {
        c = new Cursor(a, "a.b");
        assert.deepStrictEqual(c.deref(), src.a.b);
    });

    it("can be deref'd (a.b.c)", () => {
        c = new Cursor(a, "a.b.c");
        assert.equal(c.deref(), src.a.b.c);
    });

    it("doesn't fail w/ invalid path", () => {
        c = new Cursor(a, "a.b.x.y.z");
        assert.strictEqual(c.deref(), undefined);
    });

    it("can be swapped'd (a.b.c)", () => {
        c = new Cursor(a, "a.b.c");
        assert.equal(c.swap(x => x + 1), src.a.b.c + 1);
        assert.equal(c.deref(), src.a.b.c + 1);
        assert.equal(a.deref().a.b.c, src.a.b.c + 1);
        assert.strictEqual(a.deref().a.d, src.a.d);
        assert.strictEqual(a.deref().f, src.f);
    });

    it("can be reset (a.b.c)", () => {
        c = new Cursor(a, "a.b.c");
        assert.equal(c.reset(100), 100);
        assert.equal(c.deref(), 100);
        assert.equal(a.deref().a.b.c, 100);
        assert.strictEqual(a.deref().a.d, src.a.d);
        assert.strictEqual(a.deref().f, src.f);
    });

    it("can update invalid path (x.y.z)", () => {
        c = new Cursor(a, "x.y.z");
        assert.equal(c.swap(x => x != null ? x + 1 : 0), 0);
        assert.equal(c.deref(), 0);
        assert.equal(c.swap(x => x != null ? x + 1 : 0), 1);
        assert.equal(c.deref(), 1);
        assert.equal(c.reset(100), 100);
        assert.equal(c.deref(), 100);
        assert.equal(a.deref().x.y.z, 100);
        assert.strictEqual(src.x, undefined);
    });
});
