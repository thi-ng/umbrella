import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { Atom, defCursor, defHistory } from "../src/index.js"

let a: Atom<any>;
let add = (x: number) => x + 1;

group(
    "history",
    {
        "has initial state": () => {
            let c = defCursor(a, ["b", "c"]);
            let h = defHistory(c, 3);
            assert.strictEqual(h.history.length, 0);
            assert.strictEqual(h.future.length, 0);
            assert.strictEqual(h.deref(), c.deref());
        },

        "does record & shift (simple)": () => {
            let c = defCursor(a, ["b", "c"]);
            let h = defHistory(c, 3);
            h.swap(add);
            assert.strictEqual(h.history.length, 1);
            assert.deepStrictEqual(h.history, [20]);

            h.swap(add);
            assert.strictEqual(h.history.length, 2);
            assert.deepStrictEqual(h.history, [20, 21]);

            h.swap(add);
            assert.strictEqual(h.history.length, 3);
            assert.deepStrictEqual(h.history, [20, 21, 22]);

            h.swap(add);
            assert.strictEqual(h.history.length, 3);
            assert.deepStrictEqual(h.history, [21, 22, 23]);
        },

        "does record & shift (nested)": () => {
            let c = defCursor(a, ["b"]);
            let h = defHistory(c, 3);
            h.swap((s) => ({ ...s, c: 21 }));
            assert.strictEqual(h.history.length, 1);
            assert.deepStrictEqual(h.history, [{ c: 20, d: 30 }]);

            h.swap((s) => ({ ...s, d: 31 }));
            assert.strictEqual(h.history.length, 2);
            assert.deepStrictEqual(h.history, [
                { c: 20, d: 30 },
                { c: 21, d: 30 },
            ]);

            h.swap((s) => ({ ...s, x: 100 }));
            assert.strictEqual(h.history.length, 3);
            assert.deepStrictEqual(h.history, [
                { c: 20, d: 30 },
                { c: 21, d: 30 },
                { c: 21, d: 31 },
            ]);

            h.reset(null);
            assert.strictEqual(h.history.length, 3);
            assert.deepStrictEqual(h.history, [
                { c: 21, d: 30 },
                { c: 21, d: 31 },
                { c: 21, d: 31, x: 100 },
            ]);

            h.clear();
            assert.strictEqual(h.history.length, 0);
            assert.strictEqual(h.future.length, 0);
        },

        "doesn't record if same val": () => {
            let h = defHistory(a, 3);
            h.reset(a.deref());
            assert.strictEqual(h.history.length, 0);
            h.swap((s) => s);
            assert.strictEqual(h.history.length, 0);
        },

        "does undo / redo": () => {
            let c = defCursor(a, ["b", "c"]);
            let h = defHistory(c, 3);
            h.swap(add); // 21
            h.swap(add); // 22
            h.swap(add); // 23
            assert.strictEqual(c.deref(), 23);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 23, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, [20, 21, 22]);

            assert.strictEqual(h.undo(), 22);
            assert.strictEqual(c.deref(), 22);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 22, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, [20, 21]);
            assert.deepStrictEqual(h.future, [23]);

            assert.strictEqual(h.undo(), 21);
            assert.strictEqual(c.deref(), 21);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 21, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, [20]);
            assert.deepStrictEqual(h.future, [23, 22]);

            assert.strictEqual(h.undo(), 20);
            assert.strictEqual(c.deref(), 20);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 20, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, []);
            assert.deepStrictEqual(h.future, [23, 22, 21]);

            assert.strictEqual(h.undo(), undefined);

            assert.strictEqual(h.redo(), 21);
            assert.strictEqual(c.deref(), 21);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 21, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, [20]);
            assert.deepStrictEqual(h.future, [23, 22]);

            assert.strictEqual(h.redo(), 22);
            assert.strictEqual(c.deref(), 22);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 22, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, [20, 21]);
            assert.deepStrictEqual(h.future, [23]);

            assert.strictEqual(h.redo(), 23);
            assert.strictEqual(c.deref(), 23);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 23, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, [20, 21, 22]);
            assert.deepStrictEqual(h.future, []);

            assert.strictEqual(h.redo(), undefined);

            h.swap(add); // 24
            assert.strictEqual(c.deref(), 24);
            assert.deepStrictEqual(a.deref(), {
                a: 10,
                b: { c: 24, d: 30 },
                e: 40,
            });
            assert.deepStrictEqual(h.history, [21, 22, 23]);

            h.reset(c.deref());
            assert.strictEqual(c.deref(), 24);
        },
    },
    {
        beforeEach: () => {
            a = new Atom({ a: 10, b: { c: 20, d: 30 }, e: 40 });
        },
    }
);
