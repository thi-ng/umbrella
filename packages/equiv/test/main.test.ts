import { expect, test } from "bun:test";
import { equiv } from "../src/index.js";

test("null", () => {
	expect(equiv(null, null)).toBeTrue();
	expect(equiv(null, undefined)).toBeTrue();
	expect(equiv(undefined, null)).toBeTrue();
});

test("boolean", () => {
	expect(equiv(null, false)).toBeFalse();
	expect(equiv(false, null)).toBeFalse();
	expect(equiv(undefined, false)).toBeFalse();
	expect(equiv(false, undefined)).toBeFalse();
});

test("number", () => {
	expect(equiv(null, 0)).toBeFalse();
	expect(equiv(0, null)).toBeFalse();
	expect(equiv(0, undefined)).toBeFalse();
	expect(equiv(undefined, 0)).toBeFalse();

	expect(equiv(0, 0)).toBeTrue();
	expect(equiv(0, 0.0)).toBeTrue();
	expect(equiv(0, 1)).toBeFalse();
	expect(equiv(1, 0)).toBeFalse();
	expect(equiv(0, "0")).toBeFalse();
	expect(equiv("0", 0)).toBeFalse();
	expect(equiv(0, [0])).toBeFalse();
	expect(equiv([0], 0)).toBeFalse();
});

test("string", () => {
	expect(equiv(null, "")).toBeFalse();
	expect(equiv("", null)).toBeFalse();
	expect(equiv("a", "a")).toBeTrue();
	expect(equiv("a", "ab")).toBeFalse();
});

test("array", () => {
	expect(equiv([], [])).toBeTrue();
	expect(equiv([], [])).toBeTrue();
	expect(equiv([], { length: 0 })).toBeTrue();
	expect(equiv({ length: 0 }, [])).toBeTrue();
	expect(equiv(["a"], ["a"])).toBeTrue();
	expect(equiv(["a"], ["b"])).toBeFalse();
});

test("object", () => {
	expect(equiv(undefined, {})).toBeFalse();
	expect(equiv({}, undefined)).toBeFalse();
	expect(equiv(null, {})).toBeFalse();
	expect(equiv({}, null)).toBeFalse();

	expect(equiv({}, {})).toBeTrue();
	expect(equiv({}, [])).toBeFalse();
	expect(equiv([], {})).toBeFalse();
	expect(equiv({ a: 0 }, { a: 0 })).toBeTrue();
	expect(equiv({ a: 0, b: { c: 1 } }, { a: 0, b: { c: 1 } })).toBeTrue();
	expect(equiv({ a: 0, b: { c: 1 } }, { a: 0, b: { c: 2 } })).toBeFalse();
	expect(equiv({ a: 0, b: { c: 1 } }, { a: 0, b: {} })).toBeFalse();
});

test("equiv impl", () => {
	class A {
		a: any;
		constructor(a: any) {
			this.a = a;
		}

		equiv(b: any) {
			return equiv(this.a, b);
		}
	}

	expect(equiv(new A(1), null)).toBeFalse();
	expect(equiv(new A(1), undefined)).toBeFalse();
	expect(equiv(null, new A(1))).toBeFalse();
	expect(equiv(undefined, new A(1))).toBeFalse();
	expect(equiv(new A(1), new A(1))).toBeTrue();
	expect(equiv(new A(1), 1)).toBeTrue();
	expect(equiv(1, new A(1))).toBeTrue();
	expect(
		equiv(1, {
			equiv(x: number) {
				return x === 1;
			},
		})
	).toBeTrue();
	expect(
		equiv(
			{
				equiv(x: number) {
					return x === 1;
				},
			},
			1
		)
	).toBeTrue();
	expect(equiv(new A(1), new A(2))).toBeFalse();
	expect(equiv(new A(1), 2)).toBeFalse();
});

test("set", () => {
	const a = new Set([1, 2, 3]);
	expect(equiv(a, a)).toBeTrue();
	expect(equiv(a, new Set([3, 2, 1]))).toBeTrue();
	expect(
		equiv(
			new Set([{ a: 1 }, new Set([{ b: 2 }, [3]])]),
			new Set([new Set([[3], { b: 2 }]), { a: 1 }])
		)
	).toBeTrue();
	expect(equiv(a, new Set([3, 2, 0]))).toBeFalse();
	expect(equiv(a, [3, 2, 0])).toBeFalse();
	expect(
		equiv(
			a,
			new Map([
				[3, 3],
				[2, 2],
				[1, 1],
			])
		)
	).toBeFalse();
	expect(equiv(a, null)).toBeFalse();
	expect(equiv(null, a)).toBeFalse();
});

test("date", () => {
	const a = new Date(123456);
	expect(equiv(a, a)).toBeTrue();
	expect(equiv(a, new Date(123456))).toBeTrue();
	expect(equiv(a, new Date(123))).toBeFalse();
});

test("regexp", () => {
	const a = /(\w+)/g;
	expect(equiv(a, a)).toBeTrue();
	expect(equiv(a, /(\w+)/g)).toBeTrue();
	expect(equiv(a, /(\w+)/)).toBeFalse();
	expect(equiv(a, /(\w*)/g)).toBeFalse();
});
