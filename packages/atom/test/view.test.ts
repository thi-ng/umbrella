import { expect, test } from "bun:test";
import {
	View,
	defAtom,
	defCursor,
	defView,
	type Atom,
	type IView,
} from "../src/index.js";

interface State {
	a: number;
	b: { c: number; d: number };
	e: number;
}

let a: Atom<State>;
let v: IView<number>;

const init = () => {
	a = defAtom({ a: 1, b: { c: 2, d: 3 }, e: 4 });
};

test("can be created from atom", () => {
	init();
	v = defView(a, ["e"]);
	expect(v instanceof View).toBeTrue();
	expect(v.deref()).toBe(4);
	v = defView(a, ["e"], (x) => x * 10);
	expect(v instanceof View).toBeTrue();
	expect(v.deref()).toBe(40);
});

test("can be created from cursor", () => {
	init();
	let c = defCursor(a, ["b"]);
	v = defView(c, ["d"]);
	expect(v instanceof View).toBeTrue();
	expect(v.deref()).toBe(3);
	v = defView(c, ["c"], (x: number) => x * 10);
	expect(v instanceof View).toBeTrue();
	expect(v.deref()).toBe(20);
});

test("can be deref'd", () => {
	init();
	expect(defView(a, ["b", "c"]).deref()).toBe(2);
	expect(defView(defCursor(a, ["b"]), ["d"]).deref()).toBe(3);
});

test("can be deref'd w/ transformer", () => {
	init();
	v = defView(a, ["b", "c"], (x) => x * 10);
	expect(v.deref()).toBe(20);
	expect(v.deref()).toBe(20);
});

test("can read .value", () => {
	init();
	expect(defView(a, ["b", "c"]).value).toBe(2);
	expect(defView(defCursor(a, ["b"]), ["d"]).value).toBe(3);
	// expect(new View(new Cursor(a, "b"), "d").value, 3);
	// expect(new Cursor(a, "b").addView("d").value, 3);
});

test("reflects updates", () => {
	init();
	v = defView(a, ["b", "c"], (x) => x * 10);
	expect(v.changed()).toBeTrue();
	expect(v.deref()).toBe(20);
	expect(v.changed()).toBeFalse();
	a.swapIn(["b", "c"], (x) => x + 1);
	expect(v.changed()).toBeTrue();
	expect(v.deref()).toBe(30);
	expect(v.changed()).toBeFalse();
});

test("reflects updates (initially undefined)", () => {
	init();
	const _a = <Atom<any>>a;
	const v = defView(_a, ["f"]);
	expect(v.changed()).toBeTrue();
	expect(v.deref()).toBeUndefined();
	expect(v.changed()).toBeFalse();
	_a.resetIn(["f"], 100);
	expect(v.changed()).toBeTrue();
	expect(v.deref()).toBe(100);
});

test("can be released", () => {
	init();
	v = defView(a, ["b", "c"]);
	expect(v.deref()).toBe(2);
	expect(v.changed()).toBeFalse();
	expect(v.release()).toBeTrue();
	expect(v.changed()).toBeTrue();
	expect(v.deref()).toBeUndefined();
	expect(v.changed()).toBeFalse();
	expect(v.deref()).toBeUndefined();
});

test("is lazy by default", () => {
	init();
	let x: number | undefined;
	v = defView(a, ["b", "c"], (y) => ((x = y), y * 10));
	expect(x).toBeUndefined();
	expect(v.deref()).toBe(20);
	expect(x).toBe(2);
	x = undefined;
	expect(v.deref()).toBe(20);
	expect(x).toBeUndefined();
});

test("can be eager", () => {
	init();
	let x: number | undefined;
	v = defView(a, ["b", "c"], (y) => ((x = y), y * 10), false);
	expect(x).toBe(2);
	expect(v.deref()).toBe(20);
	x = undefined;
	expect(v.deref()).toBe(20);
	expect(x).toBeUndefined();
});
