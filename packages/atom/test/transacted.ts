import * as assert from "assert";
import {
    Atom,
    defView,
    Transacted,
    defAtom,
    defTransacted,
} from "../src/index";

interface State {
    a: number;
    b: number;
}

describe("transacted", () => {
    let db: Atom<State>;
    let tx: Transacted<State>;

    beforeEach(() => {
        db = defAtom({ a: 1, b: 2 });
        tx = defTransacted(db);
    });

    it("initial", () => {
        assert.deepEqual(db.deref(), { a: 1, b: 2 });
        assert.deepStrictEqual(tx.deref(), db.deref());
    });

    it("transaction", () => {
        tx.begin();
        assert.deepEqual(tx.deref(), { a: 1, b: 2 });
        assert.throws(() => tx.begin(), "no nested tx");
        tx.swapIn(["a"], (x) => x + 10);
        tx.swapIn(["b"], (x) => x + 20);
        assert.deepEqual(tx.deref(), { a: 11, b: 22 });
        assert.deepEqual(db.deref(), { a: 1, b: 2 });
        assert.deepEqual(tx.commit(), { a: 11, b: 22 });
        assert.deepEqual(tx.deref(), { a: 11, b: 22 });
        assert.deepStrictEqual(tx.deref(), db.deref());
        assert.throws(() => tx.commit(), "no double commit");
    });

    it("cancel", () => {
        tx.begin();
        tx.swapIn(["a"], (x) => x + 10);
        assert.deepEqual(tx.deref(), { a: 11, b: 2 });
        tx.cancel();
        assert.deepEqual(tx.deref(), { a: 1, b: 2 });
        assert.deepStrictEqual(tx.deref(), db.deref());
        assert.throws(() => tx.cancel(), "no double cancel");
    });

    it("no edits outside tx", () => {
        const _tx = <Transacted<any>>tx;
        assert.throws(() => _tx.reset({}), "no reset");
        assert.throws(() => _tx.swap(() => ({})), "no swap");
        assert.throws(() => _tx.resetIn(["a"], {}), "no resetIn");
        assert.throws(() => _tx.swapIn(["a"], () => ({})), "no swapIn");
        assert.throws(() => (_tx.value = {}), "no .value");
    });

    it("watches", () => {
        let count = 0;
        const _tx = <Transacted<any>>tx;
        _tx.addWatch("foo", (id, old, curr) => {
            count++;
            assert.equal(id, "foo");
            assert.deepEqual(old, { a: 1, b: 2 });
            assert.deepEqual(curr, { a: 22 });
        });
        _tx.begin();
        _tx.reset({ a: 11 });
        _tx.reset({ a: 22 });
        _tx.commit();
        assert.equal(count, 1);
    });

    it("view (lazy)", () => {
        const acc: any[] = [];
        const _tx = <Transacted<any>>tx;
        const view = defView(_tx, ["a"], (x) => (acc.push(x), x), true);
        assert.equal(view.deref(), 1);
        _tx.begin();
        _tx.reset({ a: 11 });
        _tx.reset({ a: 22 });
        _tx.commit();
        assert.equal(view.deref(), 22);
        assert.deepEqual(acc, [1, 22]);
    });

    it("view (eager)", () => {
        const acc: any[] = [];
        const _tx = <Transacted<any>>tx;
        const view = defView(_tx, ["a"], (x) => (acc.push(x), x), false);
        _tx.begin();
        _tx.reset({ a: 11 });
        _tx.reset({ a: 22 });
        _tx.commit();
        assert.deepEqual(acc, [1, 22]);
        assert.equal(view.deref(), 22);
    });
});
