import * as assert from "assert";
import { group } from "@thi.ng/testament";
import {
    Atom,
    beginTransaction,
    defAtom,
    defTransacted,
    defView,
    Transacted,
} from "../src/index.js"

interface State {
    a: number;
    b: number;
}

let db: Atom<State>;
let tx: Transacted<State>;

group(
    "transacted",
    {
        initial: () => {
            assert.deepStrictEqual(db.deref(), { a: 1, b: 2 });
            assert.deepStrictEqual(tx.deref(), db.deref());
        },

        transaction: () => {
            tx.begin();
            assert.deepStrictEqual(tx.deref(), { a: 1, b: 2 });
            assert.throws(() => tx.begin(), "no nested tx");
            tx.swapIn(["a"], (x) => x + 10);
            tx.swapIn(["b"], (x) => x + 20);
            assert.deepStrictEqual(tx.deref(), { a: 11, b: 22 });
            assert.deepStrictEqual(db.deref(), { a: 1, b: 2 });
            assert.deepStrictEqual(tx.commit(), { a: 11, b: 22 });
            assert.deepStrictEqual(tx.deref(), { a: 11, b: 22 });
            assert.deepStrictEqual(tx.deref(), db.deref());
            assert.throws(() => tx.commit(), "no double commit");
        },

        cancel: () => {
            tx.begin();
            tx.swapIn(["a"], (x) => x + 10);
            assert.deepStrictEqual(tx.deref(), { a: 11, b: 2 });
            tx.cancel();
            assert.deepStrictEqual(tx.deref(), { a: 1, b: 2 });
            assert.deepStrictEqual(tx.deref(), db.deref());
            assert.throws(() => tx.cancel(), "no double cancel");
        },

        "no edits outside tx": () => {
            const _tx = <Transacted<any>>tx;
            assert.throws(() => _tx.reset({}), "no reset");
            assert.throws(() => _tx.swap(() => ({})), "no swap");
            assert.throws(() => _tx.resetIn(["a"], {}), "no resetIn");
            assert.throws(() => _tx.swapIn(["a"], () => ({})), "no swapIn");
            assert.throws(() => (_tx.value = {}), "no .value");
        },

        "no ext edits inside tx": () => {
            tx.begin();
            tx.resetIn(["a"], 10);
            assert.throws(() => db.resetIn(["a"], 2));
            tx.commit();
            assert.deepStrictEqual(db.deref(), { a: 10, b: 2 });
            assert.deepStrictEqual(tx.deref(), { a: 10, b: 2 });

            tx.begin();
            tx.resetIn(["b"], 20);
            assert.throws(() => db.resetIn(["b"], 3));
            tx.cancel();
            // `b=3` because we caught the guard error
            assert.deepStrictEqual(db.deref(), { a: 10, b: 3 });
            assert.deepStrictEqual(tx.deref(), { a: 10, b: 3 });
        },

        beginTransaction: () => {
            tx = beginTransaction(db);
            assert.ok(tx instanceof Transacted);
            tx.resetIn(["a"], 10);
            tx.commit();
            assert.deepStrictEqual(db.deref(), { a: 10, b: 2 });
        },

        "race (2x transactions)": () => {
            let tx1 = beginTransaction(db);
            let tx2 = beginTransaction(db);
            tx1.resetIn(["a"], 10);
            tx2.resetIn(["b"], 20);
            assert.throws(() => tx1.commit());
            tx2.commit();
            // tx2 succeeds only because we caught tx1.commit() error
            assert.deepStrictEqual(db.deref(), { a: 1, b: 20 });
        },

        "nested transactions": () => {
            let tx1 = beginTransaction(db);
            tx1.resetIn(["a"], 10);
            let tx2 = beginTransaction(tx1);
            tx2.resetIn(["b"], 20);
            tx2.commit();
            assert.deepStrictEqual(tx1.deref(), { a: 10, b: 20 });
            tx1.commit();
            assert.deepStrictEqual(db.deref(), { a: 10, b: 20 });
            assert.deepStrictEqual(tx1.deref(), { a: 10, b: 20 });
        },

        watches: () => {
            let count = 0;
            const _tx = <Transacted<any>>tx;
            _tx.addWatch("foo", (id, old, curr) => {
                count++;
                assert.strictEqual(id, "foo");
                assert.deepStrictEqual(old, { a: 1, b: 2 });
                assert.deepStrictEqual(curr, { a: 22 });
            });
            _tx.begin();
            _tx.reset({ a: 11 });
            _tx.reset({ a: 22 });
            _tx.commit();
            assert.strictEqual(count, 1);
        },

        "view (lazy)": () => {
            const acc: any[] = [];
            const _tx = <Transacted<any>>tx;
            const view = defView(_tx, ["a"], (x) => (acc.push(x), x), true);
            assert.strictEqual(view.deref(), 1);
            _tx.begin();
            _tx.reset({ a: 11 });
            _tx.reset({ a: 22 });
            _tx.commit();
            assert.strictEqual(view.deref(), 22);
            assert.deepStrictEqual(acc, [1, 22]);
        },

        "view (eager)": () => {
            const acc: any[] = [];
            const _tx = <Transacted<any>>tx;
            const view = defView(_tx, ["a"], (x) => (acc.push(x), x), false);
            _tx.begin();
            _tx.reset({ a: 11 });
            _tx.reset({ a: 22 });
            _tx.commit();
            assert.deepStrictEqual(acc, [1, 22]);
            assert.strictEqual(view.deref(), 22);
        },
    },
    {
        beforeEach: () => {
            db = defAtom({ a: 1, b: 2 });
            tx = defTransacted(db);
        },
    }
);
