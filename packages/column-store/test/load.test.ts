// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { FLAG_BITMAP, FLAG_DICT, Table } from "../src/index.js";

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
