// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { FLAG_BITMAP, FLAG_DICT, Table } from "../src/index.js";
import type { DictColumn } from "../src/columns/dict.js";

const checkSingle = (type: string, flags = 0) => {
	const a = new Table<any>({ a: { type, flags } });
	a.addRows([{ a: 100 }, { a: 101 }, { a: 102 }, { a: 103 }]);
	expect([...a.slice()]).toEqual([...a]);
	expect([...a.slice(2)]).toEqual([{ a: 102 }, { a: 103 }]);
	expect([...a.slice(2, 10)]).toEqual([{ a: 102 }, { a: 103 }]);
	expect([...a.slice(1, 2)]).toEqual([{ a: 101 }]);
	expect([...a.slice(-10, 10)]).toEqual([...a]);
	expect([...a.slice(-1, 0)]).toEqual([]);
	if (flags & FLAG_BITMAP) {
		expect(a.slice().columns.a.bitmap!.index).toEqual(
			a.columns.a.bitmap!.index
		);
		expect(a.slice(2).columns.a.bitmap!.index.size).toBe(2);
	}
	if (flags & FLAG_DICT) {
		expect((<DictColumn>a.slice().columns.a).dict).toEqual(
			(<DictColumn>a.columns.a).dict
		);
		expect((<DictColumn>a.slice(2).columns.a).dict.fwd).toEqual(
			new Map([
				[102, 0],
				[103, 1],
			])
		);
	}
};

describe("slice", () => {
	test("plain", () => {
		checkSingle("num");
		checkSingle("num", FLAG_BITMAP);
	});
	test("dict", () => {
		checkSingle("num", FLAG_DICT);
		checkSingle("num", FLAG_DICT | FLAG_BITMAP);
	});
	test("u8", () => {
		checkSingle("u8");
		checkSingle("u8", FLAG_BITMAP);
	});
});

test("getRows", () => {
	const table = new Table({ a: { type: "num" } });
	table.addRows([{ a: 100 }, { a: 101 }, { a: 102 }, { a: 103 }, { a: 104 }]);
	expect([...table.getRows(3)]).toEqual([{ a: 103 }, { a: 104 }]);
	expect([...table.getRows(3, 10)]).toEqual([{ a: 103 }, { a: 104 }]);
	expect([...table.getRows(0, 2)]).toEqual([{ a: 100 }, { a: 101 }]);
	expect([...table.getRows(0, 0)]).toEqual([]);
	expect([...table.getRows(10)]).toEqual([]);
	expect([...table.getRows(3, 10, true)]).toEqual([
		{ a: 103, __row: 3 },
		{ a: 104, __row: 4 },
	]);
});

test("getPartialsRows", () => {
	const table = new Table({ a: { type: "num" }, b: { type: "str" } });
	table.addRows([
		{ a: 100, b: "a" },
		{ a: 101, b: "b" },
		{ a: 102, b: "c" },
		{ a: 103, b: "d" },
		{ a: 104, b: "e" },
	]);
	expect([...table.getPartialRows(["a"], 3)]).toEqual([
		{ a: 103 },
		{ a: 104 },
	]);
	expect([...table.getPartialRows(["b"], 3)]).toEqual([
		{ b: "d" },
		{ b: "e" },
	]);
	expect([...table.getPartialRows(["a"], 3, 10)]).toEqual([
		{ a: 103 },
		{ a: 104 },
	]);
	expect([...table.getPartialRows(["a"], 0, 2)]).toEqual([
		{ a: 100 },
		{ a: 101 },
	]);
	expect([...table.getPartialRows([], 0, 0)]).toEqual([]);
	expect([...table.getPartialRows([], 10)]).toEqual([]);
	expect([...table.getPartialRows(["a"], 3, 10, true)]).toEqual([
		{ a: 103, __row: 3 },
		{ a: 104, __row: 4 },
	]);
});
