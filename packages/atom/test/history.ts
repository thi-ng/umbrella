import * as assert from "assert";
import { Atom } from "../src/atom";
import { Cursor } from "../src/cursor";
import { History } from "../src/history";

describe("history", () => {
    let a: Atom<any>;
    let add = (x: number) => x + 1;

    beforeEach(() => {
        a = new Atom({ a: 10, b: { c: 20, d: 30 }, e: 40 });
    });

    it("has initial state", () => {
        let c = new Cursor(a, "b.c");
        let h = new History(c, 3);
        assert.equal(h.history.length, 0);
        assert.equal(h.future.length, 0);
        assert.equal(h.deref(), c.deref());
    });

    it("does record & shift (simple)", () => {
        let c = new Cursor<number>(a, "b.c");
        let h = new History(c, 3);
        h.swap(add);
        assert.equal(h.history.length, 1);
        assert.deepEqual(h.history, [20]);

        h.swap(add);
        assert.equal(h.history.length, 2);
        assert.deepEqual(h.history, [20, 21]);

        h.swap(add);
        assert.equal(h.history.length, 3);
        assert.deepEqual(h.history, [20, 21, 22]);

        h.swap(add);
        assert.equal(h.history.length, 3);
        assert.deepEqual(h.history, [21, 22, 23]);
    });

    it("does record & shift (nested)", () => {
        let c = new Cursor<any>(a, "b");
        let h = new History(c, 3);
        h.swap((s) => ({ ...s, c: 21 }));
        assert.equal(h.history.length, 1);
        assert.deepEqual(h.history, [{ c: 20, d: 30 }]);

        h.swap((s) => ({ ...s, d: 31 }));
        assert.equal(h.history.length, 2);
        assert.deepEqual(h.history, [{ c: 20, d: 30 }, { c: 21, d: 30 }]);

        h.swap((s) => ({ ...s, x: 100 }));
        assert.equal(h.history.length, 3);
        assert.deepEqual(h.history, [
            { c: 20, d: 30 },
            { c: 21, d: 30 },
            { c: 21, d: 31 }
        ]);

        h.reset(null);
        assert.equal(h.history.length, 3);
        assert.deepEqual(h.history, [
            { c: 21, d: 30 },
            { c: 21, d: 31 },
            { c: 21, d: 31, x: 100 }
        ]);

        h.clear();
        assert.equal(h.history.length, 0);
        assert.equal(h.future.length, 0);
    });

    it("doesn't record if same val", () => {
        let h = new History(a, 3);
        h.reset(a.deref());
        assert.equal(h.history.length, 0);
        h.swap((s) => s);
        assert.equal(h.history.length, 0);
    });

    it("does undo / redo", () => {
        let c = new Cursor<number>(a, "b.c");
        let h = new History(c, 3);
        h.swap(add); // 21
        h.swap(add); // 22
        h.swap(add); // 23
        assert.equal(c.deref(), 23);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 23, d: 30 }, e: 40 });
        assert.deepEqual(h.history, [20, 21, 22]);

        assert.equal(h.undo(), 22);
        assert.equal(c.deref(), 22);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 22, d: 30 }, e: 40 });
        assert.deepEqual(h.history, [20, 21]);
        assert.deepEqual(h.future, [23]);

        assert.equal(h.undo(), 21);
        assert.equal(c.deref(), 21);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 21, d: 30 }, e: 40 });
        assert.deepEqual(h.history, [20]);
        assert.deepEqual(h.future, [23, 22]);

        assert.equal(h.undo(), 20);
        assert.equal(c.deref(), 20);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 20, d: 30 }, e: 40 });
        assert.deepEqual(h.history, []);
        assert.deepEqual(h.future, [23, 22, 21]);

        assert.strictEqual(h.undo(), undefined);

        assert.equal(h.redo(), 21);
        assert.equal(c.deref(), 21);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 21, d: 30 }, e: 40 });
        assert.deepEqual(h.history, [20]);
        assert.deepEqual(h.future, [23, 22]);

        assert.equal(h.redo(), 22);
        assert.equal(c.deref(), 22);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 22, d: 30 }, e: 40 });
        assert.deepEqual(h.history, [20, 21]);
        assert.deepEqual(h.future, [23]);

        assert.equal(h.redo(), 23);
        assert.equal(c.deref(), 23);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 23, d: 30 }, e: 40 });
        assert.deepEqual(h.history, [20, 21, 22]);
        assert.deepEqual(h.future, []);

        assert.strictEqual(h.redo(), undefined);

        h.swap(add); // 24
        assert.equal(c.deref(), 24);
        assert.deepEqual(a.deref(), { a: 10, b: { c: 24, d: 30 }, e: 40 });
        assert.deepEqual(h.history, [21, 22, 23]);

        h.reset(c.deref());
        assert.equal(c.deref(), 24);
    });
});
