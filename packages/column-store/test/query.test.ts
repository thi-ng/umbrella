// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { equiv } from "@thi.ng/equiv";
import { FLAG_BITMAP, FLAG_DICT, Table, ZERO_PLUS } from "../src/index.js";

const checkSingle = (type: string, flags = 0) => {
	const table = new Table({ a: { type, flags } });
	table.addRows([{ a: 100 }, { a: 101 }, { a: 102 }, { a: 103 }]);
	expect([...table.query().or("a", 101)]).toEqual([{ a: 101 }]);
	expect([...table.query().or("a", [101, 102])]).toEqual([
		{ a: 101 },
		{ a: 102 },
	]);
	expect([...table.query().and("a", 101)]).toEqual([{ a: 101 }]);
	expect([...table.query().and("a", [101, 102])]).toEqual([]);
	expect([...table.query().nor("a", 101)]).toEqual([
		{ a: 100 },
		{ a: 102 },
		{ a: 103 },
	]);
	expect([...table.query().nor("a", [101, 102])]).toEqual([
		{ a: 100 },
		{ a: 103 },
	]);
	expect([...table.query().nand("a", 101)]).toEqual([
		{ a: 100 },
		{ a: 102 },
		{ a: 103 },
	]);
	expect([...table.query().nand("a", [101, 102])]).toEqual([
		{ a: 100 },
		{ a: 101 },
		{ a: 102 },
		{ a: 103 },
	]);
	expect([...table.query().matchColumn("a", (x) => x == 101)]).toEqual([
		{ a: 101 },
	]);
	expect([
		...table.query().matchPartialRow(["a"], (x) => x.a == 101),
	]).toEqual([{ a: 101 }]);
	expect([...table.query().matchRow((x) => x.a > 101)]).toEqual([
		{ a: 102 },
		{ a: 103 },
	]);
};

const checkTuple = (flags = 0) => {
	const table = new Table({
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
		{ a: ["a", "b"] },
		{ a: ["a", "c", "d"] },
	]);
	expect([...table.query().or("a", ["a", "b"])]).toEqual([
		{ a: ["a", "b"] },
		{ a: ["b", "c"] },
		{ a: ["a", "c", "d"] },
		{ a: ["d", "c", "b"] },
		{ a: ["e", "b"] },
	]);
	expect([...table.query().and("a", "a")]).toEqual([
		{ a: ["a", "b"] },
		{ a: ["a", "c", "d"] },
	]);
	expect([...table.query().and("a", ["a", "b"])]).toEqual([
		{ a: ["a", "b"] },
	]);
	expect([...table.query().nor("a", "a")]).toEqual([
		{ a: ["b", "c"] },
		{ a: ["d", "c", "b"] },
		{ a: ["e", "b"] },
		{ a: ["e"] },
	]);
	expect([...table.query().nor("a", ["a", "b"])]).toEqual([{ a: ["e"] }]);
	expect([...table.query().nand("a", "a")]).toEqual([
		{ a: ["b", "c"] },
		{ a: ["d", "c", "b"] },
		{ a: ["e", "b"] },
		{ a: ["e"] },
	]);
	expect([...table.query().nand("a", ["a", "b"])]).toEqual([
		{ a: ["b", "c"] },
		{ a: ["a", "c", "d"] },
		{ a: ["d", "c", "b"] },
		{ a: ["e", "b"] },
		{ a: ["e"] },
	]);
	expect([...table.query().matchColumn("a", (x) => x.includes("e"))]).toEqual(
		[{ a: ["e", "b"] }, { a: ["e"] }]
	);
	expect([
		...table.query().matchPartialRow(["a"], (x) => x.a.includes("e")),
	]).toEqual([{ a: ["e", "b"] }, { a: ["e"] }]);
	expect([...table.query().matchRow((x) => x.a.includes("e"))]).toEqual([
		{ a: ["e", "b"] },
		{ a: ["e"] },
	]);
};

const checkVec = (flags = 0) => {
	const table = new Table({
		a: {
			type: "f32vec",
			cardinality: [2, 2],
			flags,
		},
	});
	table.addRows([{ a: [1, 2] }, { a: [10, 20] }, { a: [100, 200] }]);
	expect([...table.query().or("a", [10, 20])]).toEqual([
		{ a: new Float32Array([10, 20]) },
	]);
	expect([
		...table.query().or("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([
		{ a: new Float32Array([10, 20]) },
		{ a: new Float32Array([100, 200]) },
	]);
	expect([...table.query().and("a", [10, 20])]).toEqual([
		{ a: new Float32Array([10, 20]) },
	]);
	expect([
		...table.query().and("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([]);
	expect([...table.query().nor("a", [10, 20])]).toEqual([
		{ a: new Float32Array([1, 2]) },
		{ a: new Float32Array([100, 200]) },
	]);
	expect([
		...table.query().nor("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([{ a: new Float32Array([1, 2]) }]);
	expect([...table.query().nand("a", [10, 20])]).toEqual([
		{ a: new Float32Array([1, 2]) },
		{ a: new Float32Array([100, 200]) },
	]);
	expect([
		...table.query().nand("a", [
			[10, 20],
			[100, 200],
		]),
	]).toEqual([
		{ a: new Float32Array([1, 2]) },
		{ a: new Float32Array([10, 20]) },
		{ a: new Float32Array([100, 200]) },
	]);
	expect([
		...table.query().matchColumn("a", (x) => equiv(x, [10, 20])),
	]).toEqual([{ a: new Float32Array([10, 20]) }]);
	expect([
		...table.query().matchPartialRow(["a"], (x) => equiv(x.a, [10, 20])),
	]).toEqual([{ a: new Float32Array([10, 20]) }]);
	expect([...table.query().matchRow((x) => equiv(x.a, [10, 20]))]).toEqual([
		{ a: new Float32Array([10, 20]) },
	]);
};

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
});
