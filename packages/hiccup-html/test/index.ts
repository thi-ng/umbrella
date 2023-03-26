import type { IDeref } from "@thi.ng/api";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defElement, type AttribVal } from "../src/index.js";

group("hiccup-html", {
	defElement: () => {
		type Foo = Partial<{ b: number; c: number }>;
		const el = defElement<Foo>("a");
		const el2 = defElement<Foo>("a", { b: 1 });
		assert.deepStrictEqual(el(), ["a", null]);
		assert.deepStrictEqual(el2(), ["a", { b: 1 }]);
		assert.deepStrictEqual(el(null), ["a", null]);
		assert.deepStrictEqual(el2(null), ["a", { b: 1 }]);
		assert.deepStrictEqual(el(null, "body"), ["a", null, "body"]);
		assert.deepStrictEqual(el2(null, "body"), ["a", { b: 1 }, "body"]);
		assert.deepStrictEqual(el({ c: 2 }), ["a", { c: 2 }]);
		assert.deepStrictEqual(el2({ c: 2 }), ["a", { b: 1, c: 2 }]);
		assert.deepStrictEqual(el({ c: 2 }, "body"), ["a", { c: 2 }, "body"]);
		assert.deepStrictEqual(el2({ c: 2 }, "body"), [
			"a",
			{ b: 1, c: 2 },
			"body",
		]);
		assert.deepStrictEqual(el("#id.foo"), ["a#id.foo", null]);
		assert.deepStrictEqual(el2("#id.foo"), ["a#id.foo", { b: 1 }]);
		assert.deepStrictEqual(el("#id.foo", { c: 2 }), ["a#id.foo", { c: 2 }]);
		assert.deepStrictEqual(el2("#id.foo", { c: 2 }), [
			"a#id.foo",
			{ b: 1, c: 2 },
		]);
		assert.deepStrictEqual(el("#id.foo", { c: 2 }, "body"), [
			"a#id.foo",
			{ c: 2 },
			"body",
		]);
		assert.deepStrictEqual(el2("#id.foo", { c: 2 }, "body"), [
			"a#id.foo",
			{ b: 1, c: 2 },
			"body",
		]);
		assert.deepStrictEqual(el("#id.foo", null, "body"), [
			"a#id.foo",
			null,
			"body",
		]);
		assert.deepStrictEqual(el2("#id.foo", null, "body"), [
			"a#id.foo",
			{ b: 1 },
			"body",
		]);
	},

	"compile errors": () => {
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
	},
});
