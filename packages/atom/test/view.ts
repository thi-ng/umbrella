import * as assert from "assert";
import { IView } from "../src/api";
import { Atom } from "../src/atom";
import { defCursor } from "../src/cursor";
import { defView, View } from "../src/view";

interface State {
    a: number;
    b: { c: number; d: number };
    e: number;
}

describe("view", () => {
    let a: Atom<State>;
    let v: IView<number>;

    beforeEach(() => {
        a = new Atom({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it("can be created from atom", () => {
        v = defView(a, ["e"]);
        assert.ok(v instanceof View);
        assert.strictEqual(v.deref(), 4);
        v = defView(a, ["e"], (x) => x * 10);
        assert.ok(v instanceof View);
        assert.strictEqual(v.deref(), 40);
    });

    it("can be created from cursor", () => {
        let c = defCursor(a, ["b"]);
        v = defView(c, ["d"]);
        assert.ok(v instanceof View);
        assert.strictEqual(v.deref(), 3);
        v = defView(c, ["c"], (x: number) => x * 10);
        assert.ok(v instanceof View);
        assert.strictEqual(v.deref(), 20);
    });

    it("can be deref'd", () => {
        assert.strictEqual(defView(a, ["b", "c"]).deref(), 2);
        assert.strictEqual(defView(defCursor(a, ["b"]), ["d"]).deref(), 3);
    });

    it("can be deref'd w/ transformer", () => {
        v = defView(a, ["b", "c"], (x) => x * 10);
        assert.strictEqual(v.deref(), 20);
        assert.strictEqual(v.deref(), 20);
    });

    it("can read .value", () => {
        assert.strictEqual(defView(a, ["b", "c"]).value, 2);
        assert.strictEqual(defView(defCursor(a, ["b"]), ["d"]).value, 3);
        // assert.strictEqual(new View(new Cursor(a, "b"), "d").value, 3);
        // assert.strictEqual(new Cursor(a, "b").addView("d").value, 3);
    });

    it("reflects updates", () => {
        v = defView(a, ["b", "c"], (x) => x * 10);
        assert.ok(v.changed(), "not dirty");
        assert.strictEqual(v.deref(), 20);
        assert.ok(!v.changed(), "changed");
        a.swapIn(["b", "c"], (x) => x + 1);
        assert.ok(v.changed(), "not dirty #2");
        assert.strictEqual(v.deref(), 30);
        assert.ok(!v.changed(), "changed #2");
    });

    it("reflects updates (initially undefined)", () => {
        const _a = <Atom<any>>a;
        const v = defView(_a, ["f"]);
        assert.ok(v.changed(), "not dirty");
        assert.strictEqual(v.deref(), undefined);
        assert.ok(!v.changed(), "changed");
        _a.resetIn(["f"], 100);
        assert.ok(v.changed(), "not dirty #2");
        assert.strictEqual(v.deref(), 100);
    });

    it("can be released", () => {
        v = defView(a, ["b", "c"]);
        assert.strictEqual(v.deref(), 2);
        assert.ok(!v.changed(), "changed");
        assert.ok(v.release());
        assert.ok(v.changed(), "not dirty");
        assert.strictEqual(v.deref(), undefined);
        assert.ok(!v.changed(), "changed #2");
        assert.strictEqual(v.deref(), undefined);
    });

    it("is lazy by default", () => {
        let x;
        v = defView(a, ["b", "c"], (y) => ((x = y), y * 10));
        assert.strictEqual(x, undefined);
        assert.strictEqual(v.deref(), 20);
        assert.strictEqual(x, 2);
        x = undefined;
        assert.strictEqual(v.deref(), 20);
        assert.strictEqual(x, undefined);
    });

    it("can be eager", () => {
        let x;
        v = defView(a, ["b", "c"], (y) => ((x = y), y * 10), false);
        assert.strictEqual(x, 2);
        assert.strictEqual(v.deref(), 20);
        x = undefined;
        assert.strictEqual(v.deref(), 20);
        assert.strictEqual(x, undefined);
    });
});
