import { isNumber } from "@thi.ng/checks";
import * as assert from "assert";
import { Atom, Cursor, defAtom, defCursor } from "../src";

interface State {
    a: {
        b: {
            c: number;
            g: {
                h: number;
            };
        };
        d: {
            e: number;
        };
    };
    f: number;
}

describe("cursor", function () {
    let a: Atom<State>;
    let c: Cursor<any>;
    let src: any;

    beforeEach(() => {
        src = { a: { b: { c: 23, g: { h: 88 } }, d: { e: 42 } }, f: 66 };
        a = defAtom<State>(src);
    });

    it("can be deref'd (a)", () => {
        c = defCursor(a, ["a"]);
        assert.strictEqual(c.parent, a);
        assert.deepStrictEqual(c.deref(), src.a);
    });

    it("can be deref'd (a.b)", () => {
        c = defCursor(a, ["a", "b"]);
        assert.deepStrictEqual(c.deref(), src.a.b);
    });

    it("can be deref'd (a.b.c)", () => {
        c = defCursor(a, ["a", "b", "c"]);
        assert.strictEqual(c.deref(), src.a.b.c);
    });

    it("can be deref'd (path array)", () => {
        c = defCursor(a, ["a", "b", "g", "h"]);
        assert.strictEqual(c.deref(), src.a.b.g.h);
    });

    it("doesn't fail w/ invalid path", () => {
        c = defCursor(<Atom<any>>a, ["a", "b", "x", "y", "z"]);
        assert.strictEqual(c.deref(), undefined);
        c = defCursor(new Atom<any>(null), ["a"]);
        assert.strictEqual(c.deref(), undefined);
        c = defCursor(new Atom<any>(null), [0]);
        assert.strictEqual(c.deref(), undefined);
    });

    it("can be validated", () => {
        c = defCursor(a, ["a", "b", "c"], { validate: isNumber });
        assert.strictEqual(c.reset(42), 42);
        assert.strictEqual(c.reset("a"), 42);
        assert.strictEqual(c.reset(null), 42);
        assert.throws(() =>
            defCursor(<Atom<any>>a, ["x"], { validate: isNumber })
        );
    });

    it("can be swapped'd (a.b.c)", () => {
        c = defCursor(a, ["a", "b", "c"]);
        assert.strictEqual(
            c.swap((x) => x + 1),
            src.a.b.c + 1
        );
        assert.strictEqual(c.deref(), src.a.b.c + 1);
        assert.strictEqual(a.deref().a.b.c, src.a.b.c + 1);
        assert.strictEqual(a.deref().a.d, src.a.d);
        assert.strictEqual(a.deref().f, src.f);
        let v = c.deref();
        assert.strictEqual(c.reset(v), v);
        a.reset(a.deref());
        assert.strictEqual(c.deref(), v);
    });

    it("can be reset (a.b.c)", () => {
        c = defCursor(a, ["a", "b", "c"]);
        assert.strictEqual(c.reset(100), 100);
        assert.strictEqual(c.deref(), 100);
        assert.strictEqual(a.deref().a.b.c, 100);
        assert.strictEqual(a.deref().a.d, src.a.d);
        assert.strictEqual(a.deref().f, src.f);
    });

    it("can update invalid path (x.y.z)", () => {
        c = defCursor(<Atom<any>>a, ["x", "y", "z"]);
        let add = (x: any) => (x != null ? x + 1 : 0);
        assert.strictEqual(c.swap(add), 0);
        assert.strictEqual(c.deref(), 0);
        assert.strictEqual(c.swap(add), 1);
        assert.strictEqual(c.deref(), 1);
        assert.strictEqual(c.reset(100), 100);
        assert.strictEqual(c.deref(), 100);
        assert.strictEqual((<Atom<any>>a).deref().x.y.z, 100);
        assert.strictEqual(src.x, undefined);
    });

    it("reflects parent update", () => {
        c = defCursor(a, ["a", "d"]);
        assert.deepStrictEqual(c.deref(), src.a.d);
        let src2 = { a: { b: { c: 23 }, d: { e: 42 } }, f: 66 };
        (<Atom<any>>a).reset(src2);
        assert.deepStrictEqual(c.deref(), src2.a.d);
    });

    it("can be released", () => {
        c = defCursor(a, ["a"]);
        let id = c.id;
        assert.notEqual((<any>a)._watches[id], null);
        assert.ok(c.release());
        assert.strictEqual(c.parent, undefined);
        assert.strictEqual((<any>a)._watches[id], undefined);
    });

    it("can add & remove watch", () => {
        c = defCursor(a, ["a", "b", "c"]);
        assert.ok(
            c.addWatch("foo", () => {}),
            "can't add watch"
        );
        assert.ok(
            (<any>c).local._watches && (<any>c).local._watches.foo,
            "watch missing"
        );
        assert.ok(c.removeWatch("foo"), "can't remove watch");
        assert.ok(
            !c.removeWatch("foo"),
            "should fail to remove invalid watch id"
        );
    });

    it("can be watched", () => {
        c = defCursor(a, ["a", "b", "c"]);
        c.addWatch("foo", (id, prev, curr) => {
            assert.strictEqual(id, "foo", "wrong id");
            assert.strictEqual(prev, 23, "wrong prev");
            assert.strictEqual(curr, 24, "wrong curr");
        });
        c.swap((x) => x + 1);
    });
});
