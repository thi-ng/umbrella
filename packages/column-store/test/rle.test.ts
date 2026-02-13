// SPDX-License-Identifier: Apache-2.0
import { typedArray, type TypedArray } from "@thi.ng/api";
import { describe, expect, test } from "bun:test";
import type { VectorColumn } from "../src/columns/vector.js";
import {
	FLAG_DICT,
	FLAG_RLE,
	OPTIONAL,
	Table,
	ZERO_PLUS,
	type ColumnSpec,
} from "../src/index.js";

const checkSingle = (
	spec: Partial<ColumnSpec> & { type: string },
	json: string,
	defaultVal: any = 0
) => {
	const table = new Table({ a: spec });
	table.addRow({ a: defaultVal });
	table.addRow({ a: defaultVal });
	table.addRow({ a: defaultVal });
	table.addRow({ a: 10 });
	table.addRow({ a: 10 });
	table.addRow({ a: 20 });
	expect(JSON.stringify(table.columns.a)).toBe(json);
	const table2 = Table.load(JSON.parse(JSON.stringify(table)));
	expect([...table2]).toEqual([
		{ a: defaultVal },
		{ a: defaultVal },
		{ a: defaultVal },
		{ a: 10 },
		{ a: 10 },
		{ a: 20 },
	]);
};

const checkVec = (
	spec: Partial<ColumnSpec> & { type: string },
	json: string,
	defaultVal: TypedArray = new Uint8Array([0, 0])
) => {
	const table = new Table({ a: spec });
	table.addRow({ a: defaultVal });
	table.addRow({ a: defaultVal });
	table.addRow({ a: defaultVal });
	table.addRow({ a: [10, 10] });
	table.addRow({ a: [10, 10] });
	table.addRow({ a: [20, 20] });
	expect(JSON.stringify(table.columns.a)).toBe(json);
	const table2 = Table.load(JSON.parse(JSON.stringify(table)));
	const type = (<VectorColumn>table2.columns.a).type;
	expect([...table2]).toEqual([
		{ a: defaultVal },
		{ a: defaultVal },
		{ a: defaultVal },
		{ a: typedArray(type, [10, 10]) },
		{ a: typedArray(type, [10, 10]) },
		{ a: typedArray(type, [20, 20]) },
	]);
};

describe("rle", () => {
	test("plain", () => {
		checkSingle(
			{ type: "num", flags: FLAG_RLE },
			`{"values":[0,3,10,2,20,1]}`
		);
		checkSingle(
			{ type: "num", flags: FLAG_RLE, cardinality: OPTIONAL },
			`{"values":[null,3,10,2,20,1]}`,
			null
		);
	});

	test("dict", () => {
		checkSingle(
			{ type: "num", flags: FLAG_DICT | FLAG_RLE },
			`{"dict":{"index":[0,10,20],"next":3},"values":[0,0,0,6,9,27,252,68,44,16]}`,
			0
		);
		checkSingle(
			{
				type: "num",
				flags: FLAG_DICT | FLAG_RLE,
				cardinality: OPTIONAL,
			},
			`{"dict":{"index":[10,20],"next":2},"values":[null,3,0,2,1,1]}`,
			null
		);
	});

	test("u8", () => {
		checkSingle(
			{ type: "u8", flags: FLAG_RLE },
			`{"values":[0,0,0,6,57,27,252,64,16,133,64,40]}`
		);
	});

	test("f32", () => {
		checkSingle(
			{ type: "f32", flags: FLAG_RLE },
			`{"values":[0,3,10,2,20,1]}`
		);
	});

	test("tuple", () => {
		expect(() =>
			checkSingle(
				{
					type: "num",
					flags: FLAG_RLE,
					cardinality: ZERO_PLUS,
				},
				""
			)
		).toThrow(`RLE not supported`);
	});

	test("dict-tuple", () => {
		expect(() =>
			checkSingle(
				{
					type: "num",
					flags: FLAG_DICT | FLAG_RLE,
					cardinality: ZERO_PLUS,
				},
				""
			)
		).toThrow(`RLE not supported`);
	});

	test("vec", () => {
		checkVec(
			{ type: "u8vec", flags: FLAG_RLE, cardinality: [2, 2] },
			`{"values":[0,0,0,12,57,27,252,160,17,133,66,40]}`
		);
		checkVec(
			{ type: "f32vec", flags: FLAG_RLE, cardinality: [2, 2] },
			`{"values":[0,6,10,4,20,2]}`,
			new Float32Array(2)
		);
	});
});
