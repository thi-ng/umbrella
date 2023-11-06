import { isNumber } from "@thi.ng/checks";
import { expect, test } from "bun:test";
import { Atom } from "../src/index.js";

let a: Atom<any>;

const init = () => {
	a = new Atom(23);
};

test("can be deref'd", () => {
	init();
	expect(a.deref()).toBe(23);
});

test("can be equiv'd", () => {
	init();
	expect(a.equiv(a)).toBeTrue();
	expect(a.equiv(new Atom(23))).toBeFalse();
});

test("can be reset", () => {
	init();
	expect(a.reset(24)).toBe(24);
	expect(a.deref()).toBe(24);
});

test("can be swapped", () => {
	init();
	expect(a.swap((x) => x + 1)).toBe(24);
	expect(a.deref()).toBe(24);
});

test("can add & remove watch", () => {
	init();
	expect(a.addWatch("foo", () => {})).toBeTrue();
	expect((<any>a)._watches && (<any>a)._watches.foo).toBeFunction();
	expect(a.removeWatch("foo")).toBeTrue();
	expect(a.removeWatch("foo")).toBeFalse();
});

test("can be watched", () => {
	init();
	a.addWatch("foo", (id, prev, curr) => {
		expect(id).toBe("foo");
		expect(prev).toBe(23);
		expect(curr).toBe(24);
	});
	a.swap((x) => x + 1);
});

test("can be validated", () => {
	init();
	expect(() => new Atom("", isNumber)).toThrow();
	a = new Atom(1, isNumber);
	expect(a.reset(2)).toBe(2);
	expect(a.reset("3")).toBe(2);
	expect(a.reset(null)).toBe(2);
	expect(a.swap(() => "3")).toBe(2);
	expect(a.swap(() => null)).toBe(2);
});
