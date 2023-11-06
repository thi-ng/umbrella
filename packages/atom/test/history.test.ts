import { expect, test } from "bun:test";
import { Atom, defCursor, defHistory } from "../src/index.js";

let a: Atom<any>;
let add = (x: number) => x + 1;

const init = () => {
	a = new Atom({ a: 10, b: { c: 20, d: 30 }, e: 40 });
};

test("has initial state", () => {
	init();
	let c = defCursor(a, ["b", "c"]);
	let h = defHistory(c, 3);
	expect(h.history.length).toBe(0);
	expect(h.future.length).toBe(0);
	expect(h.deref()).toBe(c.deref());
});

test("does record & shift (simple)", () => {
	init();
	let c = defCursor(a, ["b", "c"]);
	let h = defHistory(c, 3);
	h.swap(add);
	expect(h.history.length).toBe(1);
	expect(h.history).toEqual([20]);

	h.swap(add);
	expect(h.history.length).toBe(2);
	expect(h.history).toEqual([20, 21]);

	h.swap(add);
	expect(h.history.length).toBe(3);
	expect(h.history).toEqual([20, 21, 22]);

	h.swap(add);
	expect(h.history.length).toBe(3);
	expect(h.history).toEqual([21, 22, 23]);
});

test("does record & shift (nested)", () => {
	init();
	let c = defCursor(a, ["b"]);
	let h = defHistory(c, 3);
	h.swap((s) => ({ ...s, c: 21 }));
	expect(h.history.length).toBe(1);
	expect(h.history).toEqual([{ c: 20, d: 30 }]);

	h.swap((s) => ({ ...s, d: 31 }));
	expect(h.history.length).toBe(2);
	expect(h.history).toEqual([
		{ c: 20, d: 30 },
		{ c: 21, d: 30 },
	]);

	h.swap((s) => ({ ...s, x: 100 }));
	expect(h.history.length).toBe(3);
	expect(h.history).toEqual([
		{ c: 20, d: 30 },
		{ c: 21, d: 30 },
		{ c: 21, d: 31 },
	]);

	h.reset(null);
	expect(h.history.length).toBe(3);
	expect(h.history).toEqual([
		{ c: 21, d: 30 },
		{ c: 21, d: 31 },
		{ c: 21, d: 31, x: 100 },
	]);

	h.clear();
	expect(h.history.length).toBe(0);
	expect(h.future.length).toBe(0);
});

test("doesn't record if same val", () => {
	init();
	let h = defHistory(a, 3);
	h.reset(a.deref());
	expect(h.history.length).toBe(0);
	h.swap((s) => s);
	expect(h.history.length).toBe(0);
});

test("does undo / redo", () => {
	init();
	let c = defCursor(a, ["b", "c"]);
	let h = defHistory(c, 3);
	h.swap(add); // 21
	h.swap(add); // 22
	h.swap(add); // 23
	expect(c.deref()).toBe(23);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 23, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([20, 21, 22]);

	expect(h.undo()).toBe(22);
	expect(c.deref()).toBe(22);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 22, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([20, 21]);
	expect(h.future).toEqual([23]);

	expect(h.undo()).toBe(21);
	expect(c.deref()).toBe(21);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 21, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([20]);
	expect(h.future).toEqual([23, 22]);

	expect(h.undo()).toBe(20);
	expect(c.deref()).toBe(20);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 20, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([]);
	expect(h.future).toEqual([23, 22, 21]);

	expect(h.undo()).toBeUndefined();

	expect(h.redo()).toBe(21);
	expect(c.deref()).toBe(21);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 21, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([20]);
	expect(h.future).toEqual([23, 22]);

	expect(h.redo()).toBe(22);
	expect(c.deref()).toBe(22);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 22, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([20, 21]);
	expect(h.future).toEqual([23]);

	expect(h.redo()).toBe(23);
	expect(c.deref()).toBe(23);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 23, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([20, 21, 22]);
	expect(h.future).toEqual([]);

	expect(h.redo()).toBeUndefined();

	h.swap(add); // 24
	expect(c.deref()).toBe(24);
	expect(a.deref()).toEqual({
		a: 10,
		b: { c: 24, d: 30 },
		e: 40,
	});
	expect(h.history).toEqual([21, 22, 23]);

	h.reset(c.deref());
	expect(c.deref()).toBe(24);
});
