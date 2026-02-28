// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { equiv } from "@thi.ng/equiv";
import { FLAG_BITMAP, FLAG_DICT, Table, ZERO_PLUS } from "../src/index.js";
import type { NumericArray } from "@thi.ng/api";

const checkSingle = (type: string, flags = 0) => {
	const table = new Table<{ a: number }>({ a: { type, flags } });
	table.addRows([{ a: 100 }, { a: 101 }, { a: 102 }, { a: 103 }]);
	expect([...table.query().or("a", 101)]).toEqual([{ a: 101, __row: 1 }]);
	expect([...table.query().or("a", [101, 102])]).toEqual([
		{ a: 101, __row: 1 },
		{ a: 102, __row: 2 },
	]);
	expect([...table.query().and("a", 101)]).toEqual([{ a: 101, __row: 1 }]);
	expect([...table.query().and("a", [101, 102])]).toEqual([]);
	expect([...table.query().nor("a", 101)]).toEqual([
		{ a: 100, __row: 0 },
		{ a: 102, __row: 2 },
		{ a: 103, __row: 3 },
	]);
	expect([...table.query().nor("a", [101, 102])]).toEqual([
		{ a: 100, __row: 0 },
		{ a: 103, __row: 3 },
	]);
	expect([...table.query().nand("a", 101)]).toEqual([
		{ a: 100, __row: 0 },
		{ a: 102, __row: 2 },
		{ a: 103, __row: 3 },
	]);
	expect([...table.query().nand("a", [101, 102])]).toEqual([
		{ a: 100, __row: 0 },
		{ a: 101, __row: 1 },
		{ a: 102, __row: 2 },
		{ a: 103, __row: 3 },
	]);
	expect([...table.query().matchColumn("a", (x) => x == 101)]).toEqual([
		{ a: 101, __row: 1 },
	]);
	expect([
		...table.query().matchPartialRow(["a"], (x) => x.a == 101),
	]).toEqual([{ a: 101, __row: 1 }]);
	expect([...table.query().matchRow((x) => x.a > 101)]).toEqual([
		{ a: 102, __row: 2 },
		{ a: 103, __row: 3 },
	]);
	// compound queries
	expect([
		...table
			.query()
			.matchColumn("a", (x) => x > 101)
			.matchColumn("a", (x) => x == 103),
	]).toEqual([{ a: 103, __row: 3 }]);
	expect([
		...table
			.query()
			.matchColumn("a", (x) => x > 101)
			.or("a", [103, 104]),
	]).toEqual([{ a: 103, __row: 3 }]);
	expect([
		...table
			.query()
			.matchColumn("a", (x) => x > 101)
			.nor("a", [103, 104]),
	]).toEqual([{ a: 102, __row: 2 }]);
	expect([
		...table
			.query()
			.matchColumn("a", (x) => x > 101)
			.and("a", 103),
	]).toEqual([{ a: 103, __row: 3 }]);
	expect([
		...table
			.query()
			.matchColumn("a", (x) => x > 101)
			.nand("a", 103),
	]).toEqual([{ a: 102, __row: 2 }]);
};

const checkTuple = (flags = 0) => {
	const table = new Table<{ a: string[] }>({
		a: {
			type: "str",
			cardinality: ZERO_PLUS,
			flags,
		},
	});
	table.addRows([
		{ a: ["a", "b"] },
		{ a: ["b", "c"] },
		{ a: ["a", "c", "d"] },
		{ a: ["d", "c", "b"] },
		{ a: ["e", "b"] },
		{ a: ["e"] },
	]);
	expect([...table.query().or("a", "a")]).toEqual([
		{ a: ["a", "b"], __row: 0 },
		{ a: ["a", "c", "d"], __row: 2 },
	]);
	expect([...table.query().or("a", ["a", "b"])]).toEqual([
		{ a: ["a", "b"], __row: 0 },
		{ a: ["b", "c"], __row: 1 },
		{ a: ["a", "c", "d"], __row: 2 },
		{ a: ["d", "c", "b"], __row: 3 },
		{ a: ["e", "b"], __row: 4 },
	]);
	expect([...table.query().and("a", "a")]).toEqual([
		{ a: ["a", "b"], __row: 0 },
		{ a: ["a", "c", "d"], __row: 2 },
	]);
	expect([...table.query().and("a", ["a", "b"])]).toEqual([
		{ a: ["a", "b"], __row: 0 },
	]);
	expect([...table.query().nor("a", "a")]).toEqual([
		{ a: ["b", "c"], __row: 1 },
		{ a: ["d", "c", "b"], __row: 3 },
		{ a: ["e", "b"], __row: 4 },
		{ a: ["e"], __row: 5 },
	]);
	expect([...table.query().nor("a", ["a", "b"])]).toEqual([
		{ a: ["e"], __row: 5 },
	]);
	expect([...table.query().nand("a", "a")]).toEqual([
		{ a: ["b", "c"], __row: 1 },
		{ a: ["d", "c", "b"], __row: 3 },
		{ a: ["e", "b"], __row: 4 },
		{ a: ["e"], __row: 5 },
	]);
	expect([...table.query().nand("a", ["a", "b"])]).toEqual([
		{ a: ["b", "c"], __row: 1 },
		{ a: ["a", "c", "d"], __row: 2 },
		{ a: ["d", "c", "b"], __row: 3 },
		{ a: ["e", "b"], __row: 4 },
		{ a: ["e"], __row: 5 },
	]);
	expect([...table.query().matchColumn("a", (x) => x.includes("e"))]).toEqual(
		[
			{ a: ["e", "b"], __row: 4 },
			{ a: ["e"], __row: 5 },
		]
	);
	expect([
		...table.query().matchPartialRow(["a"], (x) => x.a.includes("e")),
	]).toEqual([
		{ a: ["e", "b"], __row: 4 },
		{ a: ["e"], __row: 5 },
	]);
	expect([...table.query().matchRow((x) => x.a.includes("e"))]).toEqual([
		{ a: ["e", "b"], __row: 4 },
		{ a: ["e"], __row: 5 },
	]);
};

const checkVec = (flags = 0) => {
	const table = new Table<{ a: NumericArray }>({
		a: {
			type: "f32vec",
			cardinality: [2, 2],
			flags,
		},
	});
	table.addRows([{ a: [1, 2] }, { a: [10, 20] }, { a: [100, 200] }]);
	expect([...table.query().or("a", [10, 20])]).toEqual([
		{ a: new Float32Array([10, 20]), __row: 1 },
	]);
	expect([
		...table.query().or("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([
		{ a: new Float32Array([10, 20]), __row: 1 },
		{ a: new Float32Array([100, 200]), __row: 2 },
	]);
	expect([...table.query().and("a", [10, 20])]).toEqual([
		{ a: new Float32Array([10, 20]), __row: 1 },
	]);
	expect([
		...table.query().and("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([]);
	expect([...table.query().nor("a", [10, 20])]).toEqual([
		{ a: new Float32Array([1, 2]), __row: 0 },
		{ a: new Float32Array([100, 200]), __row: 2 },
	]);
	expect([
		...table.query().nor("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([{ a: new Float32Array([1, 2]), __row: 0 }]);
	expect([...table.query().nand("a", [10, 20])]).toEqual([
		{ a: new Float32Array([1, 2]), __row: 0 },
		{ a: new Float32Array([100, 200]), __row: 2 },
	]);
	expect([
		...table.query().nand("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([
		{ a: new Float32Array([1, 2]), __row: 0 },
		{ a: new Float32Array([10, 20]), __row: 1 },
		{ a: new Float32Array([100, 200]), __row: 2 },
	]);
	expect([
		...table.query().matchColumn("a", (x) => equiv(x, [10, 20])),
	]).toEqual([{ a: new Float32Array([10, 20]), __row: 1 }]);
	expect([
		...table.query().matchPartialRow(["a"], (x) => equiv(x.a, [10, 20])),
	]).toEqual([{ a: new Float32Array([10, 20]), __row: 1 }]);
	expect([...table.query().matchRow((x) => equiv(x.a, [10, 20]))]).toEqual([
		{ a: new Float32Array([10, 20]), __row: 1 },
	]);
};

checkVec();

describe("query", () => {
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

	test("tuple", () => {
		checkTuple();
		checkTuple(FLAG_BITMAP);
	});

	test("dict-tuple", () => {
		checkTuple(FLAG_DICT);
		checkTuple(FLAG_DICT | FLAG_BITMAP);
	});

	test("vec", () => {
		checkVec();
		checkVec(FLAG_BITMAP);
	});

	test("valueRange", () => {
		const table = new Table<{ a: number }>({ a: { type: "num" } });
		table.addRows([
			{ a: 100 },
			{ a: 101 },
			{ a: 102 },
			{ a: 103 },
			{ a: 110 },
		]);
		expect([...table.query().valueRange("a", 100, 101)]).toEqual([
			{ a: 100, __row: 0 },
			{ a: 101, __row: 1 },
		]);
		expect([...table.query().valueRange("a", 103)]).toEqual([
			{ a: 103, __row: 3 },
			{ a: 110, __row: 4 },
		]);
		expect([...table.query().valueRange("a", 103, 105)]).toEqual([
			{ a: 103, __row: 3 },
		]);
		expect([...table.query().valueRange("a", 90, 100)]).toEqual([
			{ a: 100, __row: 0 },
		]);
		expect([...table.query().valueRange("a", 90, 99)]).toEqual([]);
		expect([...table.query().valueRange("a", 111)]).toEqual([]);
	});

	test("rowRange", () => {
		const table = new Table<{ a: number }>({ a: { type: "num" } });
		table.addRows([
			{ a: 100 },
			{ a: 101 },
			{ a: 102 },
			{ a: 103 },
			{ a: 110 },
		]);
		expect([...table.query().rowRange(0, 2)]).toEqual([
			{ a: 100, __row: 0 },
			{ a: 101, __row: 1 },
		]);
		expect([...table.query().rowRange(2, 3)]).toEqual([
			{ a: 102, __row: 2 },
		]);
		expect([...table.query().rowRange(3)]).toEqual([
			{ a: 103, __row: 3 },
			{ a: 110, __row: 4 },
		]);
		expect([...table.query().rowRange(5)]).toEqual([]);
	});
});
