import { isNumber } from "@thi.ng/checks";
import { beforeEach, expect, test } from "bun:test";
import { Atom } from "../src/index.js";

let a: Atom<any>;

beforeEach(() => {
	a = new Atom(23);
});

test("can be deref'd", () => {
	expect(a.deref()).toBe(23);
});

test("can be equiv'd", () => {
	expect(a.equiv(a)).toBeTrue();
	expect(a.equiv(new Atom(23))).toBeFalse();
});

test("can be reset", () => {
	expect(a.reset(24)).toBe(24);
	expect(a.deref()).toBe(24);
});

test("can be swapped", () => {
	expect(a.swap((x) => x + 1)).toBe(24);
	expect(a.deref()).toBe(24);
});

test("can add & remove watch", () => {
	expect(a.addWatch("foo", () => {})).toBeTrue();
	expect((<any>a)._watches && (<any>a)._watches.foo).toBeFunction();
	expect(a.removeWatch("foo")).toBeTrue();
	expect(a.removeWatch("foo")).toBeFalse();
});

test("can be watched", () => {
	a.addWatch("foo", (id, prev, curr) => {
		expect(id).toBe("foo");
		expect(prev).toBe(23);
		expect(curr).toBe(24);
	});
	a.swap((x) => x + 1);
});

test("can be validated", () => {
	expect(() => new Atom("", isNumber)).toThrow();
	a = new Atom(1, isNumber);
	expect(a.reset(2)).toBe(2);
	expect(a.reset("3")).toBe(2);
	expect(a.reset(null)).toBe(2);
	expect(a.swap(() => "3")).toBe(2);
	expect(a.swap(() => null)).toBe(2);
});
