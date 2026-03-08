// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import {
	compareByKey,
	compareByKeys2,
	compareByKeys3,
	compareByKeys4,
	compareLex,
	composeComparators,
} from "../src/index.js";

test("compareByKey", () => {
	const src = [
		{ a: 2, b: 2 },
		{ a: 1, b: 1 },
		{ a: 2, b: 1 },
		{ a: 1, b: 2, c: 3 },
	];
	const res = [
		{ a: 1, b: 1 },
		{ a: 1, b: 2, c: 3 },
		{ a: 2, b: 2 },
		{ a: 2, b: 1 },
	];
	expect([...src].sort(compareByKey("a"))).toEqual(res);
	expect([...src].sort(compareByKey((x) => x.a))).toEqual(res);
});

test("compareByKeys2", () => {
	const src = [
		{ a: 2, b: 2 },
		{ a: 1, b: 1 },
		{ a: 2, b: 1 },
		{ a: 1, b: 2, c: 3 },
	];
	const res = [
		{ a: 1, b: 1 },
		{ a: 1, b: 2, c: 3 },
		{ a: 2, b: 1 },
		{ a: 2, b: 2 },
	];
	expect([...src].sort(compareByKeys2("a", "b"))).toEqual(res);
	expect(
		[...src].sort(
			compareByKeys2(
				(x) => x.a,
				(x) => x.b
			)
		)
	).toEqual(res);
});

test("compareByKeys3", () => {
	const src = [
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 2, c: 1 },
		{ a: 1, b: 1, c: 3 },
		{ a: 0, b: 1, c: 4 },
	];
	const res = [
		{ a: 0, b: 1, c: 4 },
		{ a: 1, b: 1, c: 3 },
		{ a: 1, b: 2, c: 1 },
		{ a: 1, b: 2, c: 3 },
	];
	expect([...src].sort(compareByKeys3("a", "b", "c"))).toEqual(res);
	expect(
		[...src].sort(
			compareByKeys3(
				(x) => x.a,
				(x) => x.b,
				(x) => x.c
			)
		)
	).toEqual(res);
});

test("compareByKeys4", () => {
	const src = [
		{ a: 1, b: 2, c: 3, d: 3 },
		{ a: 1, b: 2, c: 3, d: 2 },
		{ a: 1, b: 2, c: 3, d: 0 },
		{ a: 1, b: 2, c: 3, d: 1 },
	];
	const res = [
		{ a: 1, b: 2, c: 3, d: 0 },
		{ a: 1, b: 2, c: 3, d: 1 },
		{ a: 1, b: 2, c: 3, d: 2 },
		{ a: 1, b: 2, c: 3, d: 3 },
	];
	expect([...src].sort(compareByKeys4("a", "b", "c", "d"))).toEqual(res);
	expect(
		[...src].sort(
			compareByKeys4(
				(x) => x.a,
				(x) => x.b,
				(x) => x.c,
				(x) => x.d
			)
		)
	).toEqual(res);
});

test("compareLex", () => {
	expect(
		["2d", "16-bit", "base-36", "8bit", "1d", "base8"].sort(compareLex)
	).toEqual(["1d", "2d", "8bit", "16-bit", "base8", "base-36"]);
});

describe("composeComparators", () => {
	test("one", () => {
		const cmp = composeComparators(compareByKey<any, any>("a"));
		expect(cmp({ a: 1 }, { a: 1 })).toBe(0);
		expect(cmp({ a: 1 }, { a: 2 })).toBe(-1);
		expect(cmp({ a: 2 }, { a: 1 })).toBe(1);
	});

	test("two", () => {
		const cmp = composeComparators(
			compareByKey<any, any>("a"),
			compareByKey<any, any>("b")
		);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 1 })).toBe(0);
		expect(cmp({ a: 1, b: 1 }, { a: 2, b: 1 })).toBe(-1);
		expect(cmp({ a: 2, b: 1 }, { a: 1, b: 1 })).toBe(1);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 2 })).toBe(-1);
		expect(cmp({ a: 1, b: 2 }, { a: 1, b: 1 })).toBe(1);
	});

	test("three", () => {
		const cmp = composeComparators(
			compareByKey<any, any>("a"),
			compareByKey<any, any>("a"),
			compareByKey<any, any>("b")
		);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 1 })).toBe(0);
		expect(cmp({ a: 1, b: 1 }, { a: 2, b: 1 })).toBe(-1);
		expect(cmp({ a: 2, b: 1 }, { a: 1, b: 1 })).toBe(1);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 2 })).toBe(-1);
		expect(cmp({ a: 1, b: 2 }, { a: 1, b: 1 })).toBe(1);
	});

	test("four", () => {
		const cmp = composeComparators(
			compareByKey<any, any>("a"),
			compareByKey<any, any>("a"),
			compareByKey<any, any>("a"),
			compareByKey<any, any>("b")
		);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 1 })).toBe(0);
		expect(cmp({ a: 1, b: 1 }, { a: 2, b: 1 })).toBe(-1);
		expect(cmp({ a: 2, b: 1 }, { a: 1, b: 1 })).toBe(1);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 2 })).toBe(-1);
		expect(cmp({ a: 1, b: 2 }, { a: 1, b: 1 })).toBe(1);
	});

	test("any", () => {
		const cmp = composeComparators(
			compareByKey<any, any>("a"),
			compareByKey<any, any>("a"),
			compareByKey<any, any>("a"),
			compareByKey<any, any>("a"),
			compareByKey<any, any>("b")
		);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 1 })).toBe(0);
		expect(cmp({ a: 1, b: 1 }, { a: 2, b: 1 })).toBe(-1);
		expect(cmp({ a: 2, b: 1 }, { a: 1, b: 1 })).toBe(1);
		expect(cmp({ a: 1, b: 1 }, { a: 1, b: 2 })).toBe(-1);
		expect(cmp({ a: 1, b: 2 }, { a: 1, b: 1 })).toBe(1);
	});
});
