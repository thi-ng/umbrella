import type { IDeref } from "@thi.ng/api";
import { expect, test } from "bun:test";
import { defElement, type AttribVal } from "../src/index.js";

test("defElement", () => {
	type Foo = Partial<{ b: number; c: number }>;
	const el = defElement<Foo>("a");
	const el2 = defElement<Foo>("a", { b: 1 });
	expect(el()).toEqual(["a", null]);
	expect(el2()).toEqual(["a", { b: 1 }]);
	expect(el(null)).toEqual(["a", null]);
	expect(el2(null)).toEqual(["a", { b: 1 }]);
	expect(el(null, "body")).toEqual(["a", null, "body"]);
	expect(el2(null, "body")).toEqual(["a", { b: 1 }, "body"]);
	expect(el({ c: 2 })).toEqual(["a", { c: 2 }]);
	expect(el2({ c: 2 })).toEqual(["a", { b: 1, c: 2 }]);
	expect(el({ c: 2 }, "body")).toEqual(["a", { c: 2 }, "body"]);
	expect(el2({ c: 2 }, "body")).toEqual(["a", { b: 1, c: 2 }, "body"]);
	expect(el("#id.foo")).toEqual(["a#id.foo", null]);
	expect(el2("#id.foo")).toEqual(["a#id.foo", { b: 1 }]);
	expect(el("#id.foo", { c: 2 })).toEqual(["a#id.foo", { c: 2 }]);
	expect(el2("#id.foo", { c: 2 })).toEqual(["a#id.foo", { b: 1, c: 2 }]);
	expect(el("#id.foo", { c: 2 }, "body")).toEqual([
		"a#id.foo",
		{ c: 2 },
		"body",
	]);
	expect(el2("#id.foo", { c: 2 }, "body")).toEqual([
		"a#id.foo",
		{ b: 1, c: 2 },
		"body",
	]);
	expect(el("#id.foo", null, "body")).toEqual(["a#id.foo", null, "body"]);
	expect(el2("#id.foo", null, "body")).toEqual([
		"a#id.foo",
		{ b: 1 },
		"body",
	]);
});

test("compile errors", () => {
	class D<T> implements IDeref<T | undefined> {
		constructor(private x?: T) {}
		deref() {
			return this.x;
		}
	}

	const el = defElement<{ a: AttribVal<number> }, never>("a");
	el({ a: new D() });
	el({ a: new D(2) });
	// compile errors:
	// el({ b: new D("x") }); // wrong attrib type
	// el(null, "body"); // no body allowed
});
