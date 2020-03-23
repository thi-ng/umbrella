import { setIn, updateIn } from "@thi.ng/paths";
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
    let s: IView<number>;

    beforeEach(() => {
        a = new Atom({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it("can be created from atom", () => {
        s = defView(a, ["e"]);
        assert.ok(s instanceof View);
        assert.equal(s.deref(), 4);
        s = defView(a, ["e"], (x) => x * 10);
        assert.ok(s instanceof View);
        assert.equal(s.deref(), 40);
    });

    it("can be created from cursor", () => {
        let c = defCursor(a, ["b"]);
        s = defView(c, ["d"]);
        assert.ok(s instanceof View);
        assert.equal(s.deref(), 3);
        s = defView(c, ["c"], (x: number) => x * 10);
        assert.ok(s instanceof View);
        assert.equal(s.deref(), 20);
    });

    it("can be deref'd", () => {
        assert.equal(defView(a, ["b", "c"]).deref(), 2);
        assert.equal(defView(defCursor(a, ["b"]), ["d"]).deref(), 3);
    });

    it("can be deref'd w/ transformer", () => {
        s = defView(a, ["b", "c"], (x) => x * 10);
        assert.equal(s.deref(), 20);
        assert.equal(s.deref(), 20);
    });

    it("can read .value", () => {
        assert.equal(defView(a, ["b", "c"]).value, 2);
        assert.equal(defView(defCursor(a, ["b"]), ["d"]).value, 3);
        // assert.equal(new View(new Cursor(a, "b"), "d").value, 3);
        // assert.equal(new Cursor(a, "b").addView("d").value, 3);
    });

    it("reflects updates", () => {
        s = defView(a, ["b", "c"], (x) => x * 10);
        assert.ok(s.changed(), "not dirty");
        assert.equal(s.deref(), 20);
        assert.ok(!s.changed(), "changed");
        a.swap((state) => updateIn(state, "b.c", (x) => x + 1));
        assert.ok(s.changed(), "not dirty #2");
        assert.equal(s.deref(), 30);
        assert.ok(!s.changed(), "changed #2");
    });

    it("reflects updates (initially undefined)", () => {
        s = defView(<Atom<any>>a, ["f"]);
        assert.ok(s.changed(), "not dirty");
        assert.equal(s.deref(), undefined);
        assert.ok(!s.changed(), "changed");
        a.swap((state) => setIn(state, "f", 100));
        assert.ok(s.changed(), "not dirty #2");
        assert.equal(s.deref(), 100);
    });

    it("can be released", () => {
        s = defView(a, ["b", "c"]);
        assert.equal(s.deref(), 2);
        assert.ok(!s.changed(), "changed");
        assert.ok(s.release());
        assert.ok(s.changed(), "not dirty");
        assert.equal(s.deref(), undefined);
        assert.ok(!s.changed(), "changed #2");
        assert.equal(s.deref(), undefined);
    });

    it("is lazy by default", () => {
        let x;
        s = defView(a, ["b", "c"], (y) => ((x = y), y * 10));
        assert.equal(x, undefined);
        assert.equal(s.deref(), 20);
        assert.equal(x, 2);
        x = undefined;
        assert.equal(s.deref(), 20);
        assert.equal(x, undefined);
    });

    it("can be eager", () => {
        let x;
        s = defView(a, ["b", "c"], (y) => ((x = y), y * 10), false);
        assert.equal(x, 2);
        assert.equal(s.deref(), 20);
        x = undefined;
        assert.equal(s.deref(), 20);
        assert.equal(x, undefined);
    });
});
