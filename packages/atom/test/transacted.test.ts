import { beforeEach, expect, test } from "bun:test";
import {
	Atom,
	Transacted,
	beginTransaction,
	defAtom,
	defTransacted,
	defView,
} from "../src/index.js";

interface State {
	a: number;
	b: number;
}

let db: Atom<State>;
let tx: Transacted<State>;

beforeEach(() => {
	db = defAtom({ a: 1, b: 2 });
	tx = defTransacted(db);
});

test("initial", () => {
	expect(db.deref()).toEqual({ a: 1, b: 2 });
	expect(tx.deref()).toEqual(db.deref());
});

test("transaction", () => {
	tx.begin();
	expect(tx.deref()).toEqual({ a: 1, b: 2 });
	expect(() => tx.begin()).toThrow();
	tx.swapIn(["a"], (x) => x + 10);
	tx.swapIn(["b"], (x) => x + 20);
	expect(tx.deref()).toEqual({ a: 11, b: 22 });
	expect(db.deref()).toEqual({ a: 1, b: 2 });
	expect(tx.commit()).toEqual({ a: 11, b: 22 });
	expect(tx.deref()).toEqual({ a: 11, b: 22 });
	expect(tx.deref()).toEqual(db.deref());
	expect(() => tx.commit()).toThrow();
});

test("cancel", () => {
	tx.begin();
	tx.swapIn(["a"], (x) => x + 10);
	expect(tx.deref()).toEqual({ a: 11, b: 2 });
	tx.cancel();
	expect(tx.deref()).toEqual({ a: 1, b: 2 });
	expect(tx.deref()).toEqual(db.deref());
	expect(() => tx.cancel()).toThrow();
});

test("no edits outside tx", () => {
	const _tx = <Transacted<any>>tx;
	expect(() => _tx.reset({})).toThrow();
	expect(() => _tx.swap(() => ({}))).toThrow();
	expect(() => _tx.resetIn(["a"], {})).toThrow();
	expect(() => _tx.swapIn(["a"], () => ({}))).toThrow();
	expect(() => (_tx.value = {})).toThrow();
});

test("no ext edits inside tx", () => {
	tx.begin();
	tx.resetIn(["a"], 10);
	expect(() => db.resetIn(["a"], 2)).toThrow();
	tx.commit();
	expect(db.deref()).toEqual({ a: 10, b: 2 });
	expect(tx.deref()).toEqual({ a: 10, b: 2 });

	tx.begin();
	tx.resetIn(["b"], 20);
	expect(() => db.resetIn(["b"], 3)).toThrow();
	tx.cancel();
	// `b=3` because we caught the guard error
	expect(db.deref()).toEqual({ a: 10, b: 3 });
	expect(tx.deref()).toEqual({ a: 10, b: 3 });
});

test("beginTransaction", () => {
	tx = beginTransaction(db);
	expect(tx instanceof Transacted).toBeTrue();
	tx.resetIn(["a"], 10);
	tx.commit();
	expect(db.deref()).toEqual({ a: 10, b: 2 });
});

test("race (2x transactions)", () => {
	let tx1 = beginTransaction(db);
	let tx2 = beginTransaction(db);
	tx1.resetIn(["a"], 10);
	tx2.resetIn(["b"], 20);
	expect(() => tx1.commit()).toThrow();
	tx2.commit();
	// tx2 succeeds only because we caught tx1.commit() error
	expect(db.deref()).toEqual({ a: 1, b: 20 });
});

test("nested transactions", () => {
	let tx1 = beginTransaction(db);
	tx1.resetIn(["a"], 10);
	let tx2 = beginTransaction(tx1);
	tx2.resetIn(["b"], 20);
	tx2.commit();
	expect(tx1.deref()).toEqual({ a: 10, b: 20 });
	tx1.commit();
	expect(db.deref()).toEqual({ a: 10, b: 20 });
	expect(tx1.deref()).toEqual({ a: 10, b: 20 });
});

test("watches", () => {
	let count = 0;
	const _tx = <Transacted<any>>tx;
	_tx.addWatch("foo", (id, old, curr) => {
		count++;
		expect(id).toBe("foo");
		expect(old).toEqual({ a: 1, b: 2 });
		expect(curr).toEqual({ a: 22 });
	});
	_tx.begin();
	_tx.reset({ a: 11 });
	_tx.reset({ a: 22 });
	_tx.commit();
	expect(count).toBe(1);
});

test("view (lazy)", () => {
	const acc: any[] = [];
	const _tx = <Transacted<any>>tx;
	const view = defView(_tx, ["a"], (x) => (acc.push(x), x), true);
	expect(view.deref()).toBe(1);
	_tx.begin();
	_tx.reset({ a: 11 });
	_tx.reset({ a: 22 });
	_tx.commit();
	expect(view.deref()).toBe(22);
	expect(acc).toEqual([1, 22]);
});

test("view (eager)", () => {
	const acc: any[] = [];
	const _tx = <Transacted<any>>tx;
	const view = defView(_tx, ["a"], (x) => (acc.push(x), x), false);
	_tx.begin();
	_tx.reset({ a: 11 });
	_tx.reset({ a: 22 });
	_tx.commit();
	expect(acc).toEqual([1, 22]);
	expect(view.deref()).toBe(22);
});
