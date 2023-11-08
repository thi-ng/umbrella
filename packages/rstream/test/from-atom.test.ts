import { Atom, Cursor, History } from "@thi.ng/atom";
import { expect, test } from "bun:test";
import { fromAtom } from "../src/index.js";

test("works with atom", (done) => {
	let a = new Atom(0);
	let src = fromAtom(a, { emitFirst: false });
	let calledNext = false;
	src.subscribe({
		next(x) {
			expect(x).toBe(23);
			calledNext = true;
		},
		done() {
			expect(calledNext).toBeTrue();
			done();
		},
		error() {
			expect().fail("called error()");
			return false;
		},
	});
	a.reset(23);
	src.done();
});

test("works with cursor", (done) => {
	let state = { a: { b: {}, d: { e: 42 } } };
	let a = new Atom(state);
	let c = new Cursor(a, "a.b.c");
	let src = fromAtom(c, { emitFirst: false });
	let calledNext = false;
	src.subscribe({
		next(x) {
			expect(x).toBe(23);
			calledNext = true;
		},
		done() {
			expect(calledNext).toBeTrue();
			expect(a.deref()).toEqual({
				a: { b: { c: 23 }, d: { e: 42 } },
			});
			expect(a.deref().a.d).toEqual(state.a.d);
			done();
		},
		error() {
			expect().fail("called error()");
			return false;
		},
	});
	c.reset(23);
	src.done();
});

test("works with history (single)", () => {
	let a = new Atom({});
	let c = new Cursor(a, "a.b");
	let h = new History(c);
	let src = fromAtom<any>(h);
	let buf: any[] = [];
	src.subscribe({
		next(x) {
			buf.push(x);
		},
	});
	h.reset(1);
	h.reset(2);
	h.reset({ c: 3 });
	expect(a.deref()).toEqual({ a: { b: { c: 3 } } });
	h.undo();
	expect(a.deref()).toEqual({ a: { b: 2 } });
	h.redo();
	expect(a.deref()).toEqual({ a: { b: { c: 3 } } });
	h.undo();
	expect(a.deref()).toEqual({ a: { b: 2 } });
	h.undo();
	expect(a.deref()).toEqual({ a: { b: 1 } });
	h.undo();
	expect(a.deref()).toEqual({ a: { b: undefined } });
	src.done();
	expect(buf).toEqual([
		undefined,
		1,
		2,
		{ c: 3 },
		2,
		{ c: 3 },
		2,
		1,
		undefined,
	]);
});

test("works with history (multiple)", () => {
	let a = new Atom({});
	let h = new History(a);
	let c1 = new Cursor(a, "a.b");
	let c2 = new Cursor(a, "c");
	let src1 = fromAtom(c1);
	let src2 = fromAtom(c2);
	let buf1: any[] = [];
	let buf2: any[] = [];
	src1.subscribe({
		next(x) {
			buf1.push(x);
		},
	});
	src2.subscribe({
		next(x) {
			buf2.push(x);
		},
	});
	h.record();
	c1.reset(1);

	h.record();
	c1.reset(2);
	c2.reset(10);

	h.record();
	c1.reset(3);

	h.record();
	c2.reset(20);

	expect(buf1).toEqual([undefined, 1, 2, 3]);
	expect(buf2).toEqual([undefined, 10, 20]);

	h.undo();
	h.undo();
	h.redo();
	h.redo();
	h.undo();
	h.undo();
	h.undo();
	h.undo();
	src1.done();
	src2.done();

	expect(buf1).toEqual([undefined, 1, 2, 3, 2, 3, 2, 1, undefined]);
	expect(buf2).toEqual([undefined, 10, 20, 10, 20, 10, undefined]);
});
