import { isNumber } from "@thi.ng/checks";
import { expect, test } from "bun:test";
import { Atom, Cursor, defAtom, defCursor } from "../src/index.js";

interface State {
	a: {
		b: {
			c: number;
			g: {
				h: number;
			};
		};
		d: {
			e: number;
		};
	};
	f: number;
}

let a: Atom<State>;
let c: Cursor<any>;
let src: any;

const init = () => {
	src = { a: { b: { c: 23, g: { h: 88 } }, d: { e: 42 } }, f: 66 };
	a = defAtom<State>(src);
};

test("can be deref'd (a)", () => {
	init();
	c = defCursor(a, ["a"]);
	expect(c.parent).toBe(a);
	expect(c.deref()).toEqual(src.a);
});

test("can be deref'd (a.b)", () => {
	init();
	c = defCursor(a, ["a", "b"]);
	expect(c.deref()).toEqual(src.a.b);
});

test("can be deref'd (a.b.c)", () => {
	init();
	c = defCursor(a, ["a", "b", "c"]);
	expect(c.deref()).toBe(src.a.b.c);
});

test("can be deref'd (path array)", () => {
	init();
	c = defCursor(a, ["a", "b", "g", "h"]);
	expect(c.deref()).toBe(src.a.b.g.h);
});

test("doesn't fail w/ invalid path", () => {
	init();
	c = defCursor(<Atom<any>>a, ["a", "b", "x", "y", "z"]);
	expect(c.deref()).toBeUndefined();
	c = defCursor(new Atom<any>(null), ["a"]);
	expect(c.deref()).toBeUndefined();
	c = defCursor(new Atom<any>(null), [0]);
	expect(c.deref()).toBeUndefined();
});

test("can be validated", () => {
	init();
	c = defCursor(a, ["a", "b", "c"], { validate: isNumber });
	expect(c.reset(42)).toBe(42);
	expect(c.reset("a")).toBe(42);
	expect(c.reset(null)).toBe(42);
	expect(() =>
		defCursor(<Atom<any>>a, ["x"], { validate: isNumber })
	).toThrow();
});

test("can be swapped'd (a.b.c)", () => {
	init();
	c = defCursor(a, ["a", "b", "c"]);
	expect(c.swap((x) => x + 1)).toBe(src.a.b.c + 1);
	expect(c.deref()).toBe(src.a.b.c + 1);
	expect(a.deref().a.b.c).toBe(src.a.b.c + 1);
	expect(a.deref().a.d).toBe(src.a.d);
	expect(a.deref().f).toBe(src.f);
	let v = c.deref();
	expect(c.reset(v)).toBe(v);
	a.reset(a.deref());
	expect(c.deref()).toBe(v);
});

test("can be reset (a.b.c)", () => {
	init();
	c = defCursor(a, ["a", "b", "c"]);
	expect(c.reset(100)).toBe(100);
	expect(c.deref()).toBe(100);
	expect(a.deref().a.b.c).toBe(100);
	expect(a.deref().a.d).toBe(src.a.d);
	expect(a.deref().f).toBe(src.f);
});

test("can update invalid path (x.y.z)", () => {
	init();
	c = defCursor(<Atom<any>>a, ["x", "y", "z"]);
	let add = (x: any) => (x != null ? x + 1 : 0);
	expect(c.swap(add)).toBe(0);
	expect(c.deref()).toBe(0);
	expect(c.swap(add)).toBe(1);
	expect(c.deref()).toBe(1);
	expect(c.reset(100)).toBe(100);
	expect(c.deref()).toBe(100);
	expect((<Atom<any>>a).deref().x.y.z).toBe(100);
	expect(src.x).toBeUndefined();
});

test("reflects parent update", () => {
	init();
	c = defCursor(a, ["a", "d"]);
	expect(c.deref()).toEqual(src.a.d);
	let src2 = { a: { b: { c: 23 }, d: { e: 42 } }, f: 66 };
	(<Atom<any>>a).reset(src2);
	expect(c.deref()).toEqual(src2.a.d);
});

test("can be released", () => {
	init();
	c = defCursor(a, ["a"]);
	let id = c.id;
	expect((<any>a)._watches[id]).not.toBeNull();
	expect(c.release()).toBeTrue();
	expect(c.parent).toBeUndefined();
	expect((<any>a)._watches[id]).toBeUndefined();
});

test("can add & remove watch", () => {
	init();
	c = defCursor(a, ["a", "b", "c"]);
	expect(c.addWatch("foo", () => {})).toBeTrue();
	expect(
		(<any>c).local._watches && (<any>c).local._watches.foo
	).toBeFunction();
	expect(c.removeWatch("foo")).toBeTrue();
	expect(c.removeWatch("foo")).toBeFalse();
});

test("can be watched", () => {
	init();
	c = defCursor(a, ["a", "b", "c"]);
	c.addWatch("foo", (id, prev, curr) => {
		expect(id).toBe("foo");
		expect(prev).toBe(23);
		expect(curr).toBe(24);
	});
	c.swap((x) => x + 1);
});
