import * as assert from "assert";
import { Atom, defView, Transacted } from "../src/index";

describe("transacted", () => {
    let db: Atom<any>;
    let tx: Transacted<any>;

    beforeEach(() => {
        db = new Atom({ a: 1, b: 2 });
        tx = new Transacted(db);
    });

    it("initial", () => {
        assert.deepEqual(db.deref(), { a: 1, b: 2 });
        assert.deepStrictEqual(tx.deref(), db.deref());
    });

    it("transaction", () => {
        tx.begin();
        assert.deepEqual(tx.deref(), { a: 1, b: 2 });
        assert.throws(() => tx.begin(), "no nested tx");
        tx.swapIn(["a"], (x: number) => x + 10);
        tx.swapIn(["b"], (x: number) => x + 20);
        assert.deepEqual(tx.deref(), { a: 11, b: 22 });
        assert.deepEqual(db.deref(), { a: 1, b: 2 });
        assert.deepEqual(tx.commit(), { a: 11, b: 22 });
        assert.deepEqual(tx.deref(), { a: 11, b: 22 });
        assert.deepStrictEqual(tx.deref(), db.deref());
        assert.throws(() => tx.commit(), "no double commit");
    });

    it("cancel", () => {
        tx.begin();
        tx.swapIn(["a"], (x: number) => x + 10);
        assert.deepEqual(tx.deref(), { a: 11, b: 2 });
        tx.cancel();
        assert.deepEqual(tx.deref(), { a: 1, b: 2 });
        assert.deepStrictEqual(tx.deref(), db.deref());
        assert.throws(() => tx.cancel(), "no double cancel");
    });

    it("no edits outside tx", () => {
        assert.throws(() => tx.reset({}), "no reset");
        assert.throws(() => tx.swap(() => ({})), "no swap");
        assert.throws(() => tx.resetIn(["a"], {}), "no resetIn");
        assert.throws(() => tx.swapIn(["a"], () => ({})), "no swapIn");
        assert.throws(() => (tx.value = {}), "no .value");
    });

    it("watches", () => {
        let count = 0;
        tx.addWatch("foo", (id, old, curr) => {
            count++;
            assert.equal(id, "foo");
            assert.deepEqual(old, { a: 1, b: 2 });
            assert.deepEqual(curr, { a: 22 });
        });
        tx.begin();
        tx.reset({ a: 11 });
        tx.reset({ a: 22 });
        tx.commit();
        assert.equal(count, 1);
    });

    it("view (lazy)", () => {
        const acc: any[] = [];
        const view = defView(tx, ["a"], (x) => (acc.push(x), x), true);
        assert.equal(view.deref(), 1);
        tx.begin();
        tx.reset({ a: 11 });
        tx.reset({ a: 22 });
        tx.commit();
        assert.equal(view.deref(), 22);
        assert.deepEqual(acc, [1, 22]);
    });

    it("view (eager)", () => {
        const acc: any[] = [];
        const view = defView(tx, ["a"], (x) => (acc.push(x), x), false);
        tx.begin();
        tx.reset({ a: 11 });
        tx.reset({ a: 22 });
        tx.commit();
        assert.deepEqual(acc, [1, 22]);
        assert.equal(view.deref(), 22);
    });
});
