// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { FLAG_BITMAP, FLAG_DICT, Table } from "../src/index.js";

const checkSingle = (type: string, flags = 0) => {
	const a = new Table<any>({ a: { type, flags } });
	a.addRows([{ a: 100 }, { a: 101 }, { a: 102 }, { a: 100 }]);
	expect(a.indexOf("a", 100)).toBe(0);
	expect(a.indexOf("a", 101)).toBe(1);
	expect(a.indexOf("a", 102)).toBe(2);
	expect(a.indexOf("a", 100, 1)).toBe(3);
	expect(a.indexOf("a", 103)).toBe(-1);
	expect(a.indexOf("a", 102, 0, 2)).toBe(-1);
	expect(a.indexOf("b", 100)).toBe(-1);

	expect(a.lastIndexOf("a", 100)).toBe(3);
	expect(a.lastIndexOf("a", 100, 0, 3)).toBe(0);
	expect(a.lastIndexOf("a", 100, 1, 3)).toBe(-1);
	expect(a.lastIndexOf("a", 104)).toBe(-1);
};

const checkTuple = (type: string, flags = 0) => {
	const a = new Table<any>({ a: { type, flags, cardinality: [2, 2] } });
	a.addRows([
		{ a: [100, 100] },
		{ a: [101, 101] },
		{ a: [102, 102] },
		{ a: [100, 100] },
	]);
	expect(a.indexOf("a", [100, 100])).toBe(0);
	expect(a.indexOf("a", [101, 101])).toBe(1);
	expect(a.indexOf("a", [102, 102])).toBe(2);
	expect(a.indexOf("a", [100, 100], 1)).toBe(3);
	expect(a.indexOf("a", [103, 103])).toBe(-1);
	expect(a.indexOf("a", [102, 102], 0, 2)).toBe(-1);
	expect(a.indexOf("b", [100, 100])).toBe(-1);
	expect(a.indexOf("a", null)).toBe(-1);

	expect(a.lastIndexOf("a", [100, 100])).toBe(3);
	expect(a.lastIndexOf("a", [100, 100], 0, 3)).toBe(0);
	expect(a.lastIndexOf("a", [100, 100], 1, 3)).toBe(-1);
};

describe("indexOf / lastIndexOf", () => {
	test("plain", () => checkSingle("num"));
	test("plain bitmap", () => checkSingle("num", FLAG_BITMAP));
	test("dict", () => checkSingle("num", FLAG_DICT));
	test("dict bitmap", () => checkSingle("num", FLAG_DICT | FLAG_BITMAP));
	test("u8", () => checkSingle("u8"));
	test("u8 bitmap", () => checkSingle("u8", FLAG_BITMAP));
	test("tuple", () => checkTuple("num"));
	test("dict tuple", () => checkTuple("num", FLAG_DICT));
	test("dict tuple bitmap", () => checkTuple("num", FLAG_DICT | FLAG_BITMAP));
	test("vec", () => checkTuple("u8vec"));
	test("vec bitmap", () => checkTuple("u8vec", FLAG_BITMAP));
});

describe("load", () => {
	test("plain", () => {
		const a = Table.load({
			schema: { a: { type: "num", cardinality: [1, 1], flags: 0 } },
			columns: { a: { values: [10, 11] } },
			length: 2,
		});
		expect([...a]).toEqual([{ a: 10 }, { a: 11 }]);
	});

	test("plain bitmap", () => {
		const a = Table.load({
			schema: {
				a: { type: "num", cardinality: [1, 1], flags: FLAG_BITMAP },
			},
			columns: { a: { values: [10, 11] } },
			length: 2,
		});
		expect([...a]).toEqual([{ a: 10 }, { a: 11 }]);
		expect([...a.columns.a.bitmap!.index.keys()]).toEqual([10, 11]);
	});

	test("dict", () => {
		const a = Table.load({
			schema: {
				a: { type: "str", cardinality: [1, 1], flags: FLAG_DICT },
			},
			columns: {
				a: {
					dict: { index: ["a", "b"], next: 2 },
					values: [0, 1],
				},
			},
			length: 2,
		});
		expect([...a]).toEqual([{ a: "a" }, { a: "b" }]);
	});

	test("dict bitmap", () => {
		const a = Table.load({
			schema: {
				a: {
					type: "num",
					cardinality: [1, 1],
					flags: FLAG_DICT | FLAG_BITMAP,
				},
			},
			columns: {
				a: {
					dict: { index: ["a", "b"], next: 2 },
					values: [0, 1],
				},
			},
			length: 2,
		});
		expect([...a]).toEqual([{ a: "a" }, { a: "b" }]);
		expect([...a.columns.a.bitmap!.index.keys()]).toEqual([0, 1]);
	});

	test("tuple", () => {
		const a = Table.load({
			schema: { a: { type: "num", cardinality: [0, 4], flags: 0 } },
			columns: {
				a: {
					values: [
						[1, 2],
						[10, 20],
					],
				},
			},
			length: 2,
		});
		expect([...a]).toEqual([{ a: [1, 2] }, { a: [10, 20] }]);
	});

	test("tuple bitmap", () => {
		const a = Table.load({
			schema: {
				a: { type: "num", cardinality: [0, 4], flags: FLAG_BITMAP },
			},
			columns: {
				a: {
					values: [
						[1, 2],
						[10, 20],
					],
				},
			},
			length: 2,
		});
		expect([...a]).toEqual([{ a: [1, 2] }, { a: [10, 20] }]);
		expect([...a.columns.a.bitmap!.index.keys()]).toEqual([1, 2, 10, 20]);
	});

	test("dict tuple", () => {
		const a = Table.load({
			schema: {
				a: { type: "str", cardinality: [0, 4], flags: FLAG_DICT },
			},
			columns: {
				a: {
					dict: { index: ["a", "b", "c", "d"], next: 5 },
					values: [
						[0, 1],
						[1, 2, 3],
					],
				},
			},
			length: 2,
		});
		expect([...a]).toEqual([{ a: ["a", "b"] }, { a: ["b", "c", "d"] }]);
	});

	test("dict tuple bitmap", () => {
		const a = Table.load({
			schema: {
				a: {
					type: "str",
					cardinality: [0, 4],
					flags: FLAG_DICT | FLAG_BITMAP,
				},
			},
			columns: {
				a: {
					dict: { index: ["a", "b", "c", "d"], next: 4 },
					values: [
						[0, 1],
						[1, 2, 3],
					],
				},
			},
			length: 2,
		});
		expect([...a]).toEqual([{ a: ["a", "b"] }, { a: ["b", "c", "d"] }]);
		expect([...a.columns.a.bitmap!.index.keys()]).toEqual([0, 1, 2, 3]);
	});

	test("vec", () => {
		const a = Table.load({
			schema: { a: { type: "u8vec", cardinality: [2, 2], flags: 0 } },
			columns: { a: { values: [1, 2, 10, 20] } },
			length: 2,
		});
		expect([...a]).toEqual([
			{ a: new Uint8Array([1, 2]) },
			{ a: new Uint8Array([10, 20]) },
		]);
	});

	test("vec bitmap", () => {
		const a = Table.load({
			schema: {
				a: { type: "u8vec", cardinality: [2, 2], flags: FLAG_BITMAP },
			},
			columns: { a: { values: [1, 2, 10, 20] } },
			length: 2,
		});
		expect([...a]).toEqual([
			{ a: new Uint8Array([1, 2]) },
			{ a: new Uint8Array([10, 20]) },
		]);
		expect([...a.columns.a.bitmap!.index.keys()]).toEqual(["1|2", "10|20"]);
	});
});
