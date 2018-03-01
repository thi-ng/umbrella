import * as assert from "assert";
import { Atom, Cursor } from "../src/index";

describe("cursor w/ path", function () {

    let a: Atom<any>;
    let c: Cursor<any>;
    let src;

    beforeEach(() => {
        src = { a: { b: { c: 23, g: { h: 88 } }, d: { e: 42 } }, f: 66 };
        a = new Atom(src);
    });

    it("can be deref'd (a)", () => {
        c = new Cursor(a, "a");
        assert.strictEqual(c.parent, a);
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

    it("can be deref'd (path array)", () => {
        c = new Cursor(a, ["a", "b", "g", "h"]);
        assert.equal(c.deref(), src.a.b.g.h);
    });

    it("doesn't fail w/ invalid path", () => {
        c = new Cursor(a, "a.b.x.y.z");
        assert.strictEqual(c.deref(), undefined);
        c = new Cursor(new Atom(null), "a");
        assert.strictEqual(c.deref(), undefined);
        c = new Cursor(new Atom(null), 0);
        assert.strictEqual(c.deref(), undefined);
    });

    it("can be deref'd w/ getter", () => {
        c = new Cursor(a, (s) => s.a.b, (s, x) => ({ ...s, a: { ...s.a, b: x } }));
        assert.strictEqual(c.deref(), src.a.b);
    });

    it("can be swapped'd (a.b.c)", () => {
        c = new Cursor(a, "a.b.c");
        assert.equal(c.swap(x => x + 1), src.a.b.c + 1);
        assert.equal(c.deref(), src.a.b.c + 1);
        assert.equal(a.deref().a.b.c, src.a.b.c + 1);
        assert.strictEqual(a.deref().a.d, src.a.d);
        assert.strictEqual(a.deref().f, src.f);
        let v = c.deref();
        assert.equal(c.reset(v), v);
        a.reset(a.deref());
        assert.equal(c.deref(), v);
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
        let add = (x) => x != null ? x + 1 : 0;
        assert.equal(c.swap(add), 0);
        assert.equal(c.deref(), 0);
        assert.equal(c.swap(add), 1);
        assert.equal(c.deref(), 1);
        assert.equal(c.reset(100), 100);
        assert.equal(c.deref(), 100);
        assert.equal(a.deref().x.y.z, 100);
        assert.strictEqual(src.x, undefined);
    });

    it("reflects parent update", () => {
        c = new Cursor(a, "a.d");
        assert.deepStrictEqual(c.deref(), src.a.d);
        let src2 = { a: { b: { c: 23 }, d: { e: 42 } }, f: 66 };
        a.reset(src2);
        assert.deepStrictEqual(c.deref(), src2.a.d);
    });

    it("can be released", () => {
        c = new Cursor(a, "a");
        let id = c.id;
        assert.notEqual((<any>a)._watches[id], null);
        assert(c.release());
        assert.strictEqual(c.parent, undefined);
        assert.strictEqual((<any>a)._watches[id], undefined);
    });

    it("can add & remove watch", () => {
        c = new Cursor(a, "a.b.c");
        assert(c.addWatch("foo", () => { }), "can't add watch");
        assert((<any>c).local._watches && (<any>c).local._watches.foo, "watch missing");
        assert(c.removeWatch("foo"), "can't remove watch");
        assert(!c.removeWatch("foo"), "should fail to remove invalid watch id");
    });

    it("can be watched", () => {
        c = new Cursor(a, "a.b.c");
        c.addWatch("foo", (id, prev, curr) => {
            assert.equal(id, "foo", "wrong id");
            assert.equal(prev, 23, "wrong prev");
            assert.equal(curr, 24, "wrong curr");
        });
        c.swap((x) => x + 1);
    });
});
