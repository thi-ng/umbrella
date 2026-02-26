// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { FLAG_BITMAP, FLAG_DICT, OPTIONAL, Table } from "../src/index.js";

describe("addColumn", () => {
	test("plain", () => {
		const table = new Table({ a: { type: "num" } });
		table.addRow({ a: 100 });
		const colB = table.addColumn("b", {
			type: "str",
			cardinality: OPTIONAL,
			flags: FLAG_BITMAP,
		});
		const colC = table.addColumn("c", {
			type: "str",
			cardinality: OPTIONAL,
			flags: FLAG_BITMAP,
			default: "n/a",
		});
		expect([...table]).toEqual([{ a: 100, b: null, c: "n/a" }]);
		table.addRow({ a: 101, b: "ok" });
		expect([...table]).toEqual([
			{ a: 100, b: null, c: "n/a" },
			{ a: 101, b: "ok", c: "n/a" },
		]);
		expect(colB.bitmap!.index.size).toBe(1);
		expect(colB.bitmap!.ensure(colB.valueKey("ok"))?.buffer).toEqual(
			new Uint32Array([2])
		);
		expect(colC.bitmap!.ensure(colC.valueKey("n/a"))?.buffer).toEqual(
			new Uint32Array([3])
		);
		// can't add required column without default
		expect(() => table.addColumn("d", { type: "str" })).toThrow();
	});

	test("tuple", () => {
		const table = new Table({ a: { type: "num" } });
		table.addRow({ a: 100 });
		const colB = table.addColumn("b", {
			type: "str",
			cardinality: [0, 4],
			flags: FLAG_BITMAP,
		});
		const colC = table.addColumn("c", {
			type: "str",
			cardinality: [0, 4],
			flags: FLAG_BITMAP,
			default: ["n/a"],
		});
		expect([...table]).toEqual([{ a: 100, b: null, c: ["n/a"] }]);
		table.addRow({ a: 101, b: ["ok"] });
		expect([...table]).toEqual([
			{ a: 100, b: null, c: ["n/a"] },
			{ a: 101, b: ["ok"], c: ["n/a"] },
		]);
		expect(colB.bitmap!.index.size).toBe(1);
		expect(colB.bitmap!.ensure(colB.valueKey("ok")[0])?.buffer).toEqual(
			new Uint32Array([2])
		);
		expect(colC.bitmap!.ensure(colC.valueKey("n/a")[0])?.buffer).toEqual(
			new Uint32Array([3])
		);
		// can't add required column without default
		expect(() =>
			table.addColumn("d", { type: "str", cardinality: [1, 2] })
		).toThrow();
	});

	test("dict", () => {
		const table = new Table({ a: { type: "num" } });
		table.addRow({ a: 100 });
		const colB = table.addColumn("b", {
			type: "str",
			cardinality: OPTIONAL,
			flags: FLAG_BITMAP | FLAG_DICT,
		});
		const colC = table.addColumn("c", {
			type: "str",
			cardinality: OPTIONAL,
			flags: FLAG_BITMAP | FLAG_DICT,
			default: "n/a",
		});
		expect([...table]).toEqual([{ a: 100, b: null, c: "n/a" }]);
		table.addRow({ a: 101, b: "ok" });
		expect([...table]).toEqual([
			{ a: 100, b: null, c: "n/a" },
			{ a: 101, b: "ok", c: "n/a" },
		]);
		expect(colB.bitmap!.index.size).toBe(1);
		expect(colB.bitmap!.ensure(colB.valueKey("ok"))?.buffer).toEqual(
			new Uint32Array([2])
		);
		expect(colC.bitmap!.ensure(colC.valueKey("n/a"))?.buffer).toEqual(
			new Uint32Array([3])
		);
	});

	test("dict tuple", () => {
		const table = new Table({ a: { type: "num" } });
		table.addRow({ a: 100 });
		const colB = table.addColumn("b", {
			type: "str",
			cardinality: [0, 4],
			flags: FLAG_BITMAP | FLAG_DICT,
		});
		const colC = table.addColumn("c", {
			type: "str",
			cardinality: [0, 4],
			flags: FLAG_BITMAP | FLAG_DICT,
			default: ["n/a"],
		});
		expect([...table]).toEqual([{ a: 100, b: null, c: ["n/a"] }]);
		table.addRow({ a: 101, b: ["ok"] });
		expect([...table]).toEqual([
			{ a: 100, b: null, c: ["n/a"] },
			{ a: 101, b: ["ok"], c: ["n/a"] },
		]);
		expect(colB.bitmap!.index.size).toBe(1);
		expect(colB.bitmap!.ensure(colB.valueKey("ok")[0])?.buffer).toEqual(
			new Uint32Array([2])
		);
		expect(colC.bitmap!.ensure(colC.valueKey("n/a")[0])?.buffer).toEqual(
			new Uint32Array([3])
		);
		// can't add required column without default
		expect(() =>
			table.addColumn("d", {
				type: "str",
				cardinality: [1, 2],
				flags: FLAG_DICT,
			})
		).toThrow();
	});

	test("typed", () => {
		const table = new Table({ a: { type: "num" } });
		table.addRow({ a: 100 });
		const colB = table.addColumn("b", {
			type: "i8",
			cardinality: OPTIONAL,
			flags: FLAG_BITMAP,
			default: -1,
		});
		expect([...table]).toEqual([{ a: 100, b: -1 }]);
		table.addRow({ a: 101 });
		table.addRow({ a: 102, b: 1 });
		expect([...table]).toEqual([
			{ a: 100, b: -1 },
			{ a: 101, b: -1 },
			{ a: 102, b: 1 },
		]);
		expect(colB.bitmap!.index.size).toBe(2);
		expect(colB.bitmap!.ensure(-1)?.buffer).toEqual(new Uint32Array([3]));
		expect(colB.bitmap!.ensure(1)?.buffer).toEqual(new Uint32Array([4]));
		// can't add required column without default
		expect(() => table.addColumn("c", { type: "i8" })).toThrow();
	});

	test("vec", () => {
		const table = new Table({ a: { type: "num" } });
		table.addRow({ a: 100 });
		const colB = table.addColumn("b", {
			type: "i8vec",
			cardinality: [0, 2],
			flags: FLAG_BITMAP,
			default: [-1, -1],
		});
		expect([...table]).toEqual([{ a: 100, b: new Int8Array([-1, -1]) }]);
		table.addRow({ a: 101 });
		table.addRow({ a: 102, b: [1, 2] });
		expect([...table]).toEqual([
			{ a: 100, b: new Int8Array([-1, -1]) },
			{ a: 101, b: new Int8Array([-1, -1]) },
			{ a: 102, b: new Int8Array([1, 2]) },
		]);
		expect(colB.bitmap!.index.size).toBe(2);
		expect(colB.bitmap!.ensure(colB.valueKey([-1, -1]))?.buffer).toEqual(
			new Uint32Array([0b11])
		);
		expect(colB.bitmap!.ensure(colB.valueKey([1, 2]))?.buffer).toEqual(
			new Uint32Array([0b100])
		);
		// can't add required column without default
		expect(() =>
			table.addColumn("c", {
				type: "i8vec",
				cardinality: [0, 2],
			})
		).toThrow();
	});
});
