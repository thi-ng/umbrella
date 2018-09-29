import * as assert from "assert";

import { setIn, updateIn } from "@thi.ng/paths";

import { IView } from "../src/api";
import { Atom } from "../src/atom";
import { Cursor } from "../src/cursor";
import { View } from "../src/view";

describe("view", () => {

    let a: Atom<any>;
    let s: IView<number>;

    beforeEach(() => {
        a = new Atom({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it("can be created from atom", () => {
        s = a.addView("e");
        assert(s instanceof View);
        assert.equal(s.deref(), 4);
        s = a.addView("e", (x) => x * 10);
        assert(s instanceof View);
        assert.equal(s.deref(), 40);
    });

    it("can be created from cursor", () => {
        let c = new Cursor(a, "b");
        s = c.addView("d");
        assert(s instanceof View);
        assert.equal(s.deref(), 3);
        s = c.addView("c", (x: number) => x * 10);
        assert(s instanceof View);
        assert.equal(s.deref(), 20);
    });

    it("can be deref'd", () => {
        assert.equal(new View(a, "b.c").deref(), 2);
        assert.equal(new View(new Cursor(a, "b"), "d").deref(), 3);
    });

    it("can be deref'd w/ transformer", () => {
        s = new View(a, "b.c", (x) => x * 10)
        assert.equal(s.deref(), 20);
        assert.equal(s.deref(), 20);
    });

    it("can read .value", () => {
        assert.equal(new View(a, "b.c").value, 2);
        assert.equal(a.addView("b.c").value, 2);
        assert.equal(new View(new Cursor(a, "b"), "d").value, 3);
        assert.equal(new Cursor(a, "b").addView("d").value, 3);
    });

    it("reflects updates", () => {
        s = new View(a, "b.c", (x) => x * 10);
        assert(s.changed(), "not dirty");
        assert.equal(s.deref(), 20);
        assert(!s.changed(), "changed");
        a.swap((state) => updateIn(state, "b.c", (x) => x + 1));
        assert(s.changed(), "not dirty #2");
        assert.equal(s.deref(), 30);
        assert(!s.changed(), "changed #2");
    });

    it("reflects updates (initially undefined)", () => {
        s = new View(a, "f");
        assert(s.changed(), "not dirty");
        assert.equal(s.deref(), undefined);
        assert(!s.changed(), "changed");
        a.swap((state) => setIn(state, "f", 100));
        assert(s.changed(), "not dirty #2");
        assert.equal(s.deref(), 100);
    });

    it("can be released", () => {
        s = new View(a, "b.c")
        assert.equal(s.deref(), 2);
        assert(!s.changed(), "changed");
        assert(s.release());
        assert(s.changed(), "not dirty");
        assert.equal(s.deref(), undefined);
        assert(!s.changed(), "changed #2");
        assert.equal(s.deref(), undefined);
    });

    it("is lazy by default", () => {
        let x;
        s = a.addView("b.c", (y) => (x = y, y * 10));
        assert.equal(x, undefined);
        assert.equal(s.deref(), 20);
        assert.equal(x, 2);
        x = undefined;
        assert.equal(s.deref(), 20);
        assert.equal(x, undefined);
    });

    it("can be eager", () => {
        let x;
        s = a.addView("b.c", (y) => (x = y, y * 10), false);
        assert.equal(x, 2);
        assert.equal(s.deref(), 20);
        x = undefined;
        assert.equal(s.deref(), 20);
        assert.equal(x, undefined);
    });
});
