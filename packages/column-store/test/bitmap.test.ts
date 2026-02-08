// SPDX-License-Identifier: Apache-2.0
import { expect, test, describe } from "bun:test";
import { FLAG_BITMAP, Table, type SerializedTable } from "../src/index.js";

const SRC: SerializedTable = {
	schema: { a: { cardinality: [0, 1], flags: FLAG_BITMAP, type: "num" } },
	columns: { a: { values: [null, 0, 1, 2, null] } },
	length: 5,
};

describe("bitmap index", () => {
	test("basics", () => {
		const t = Table.load(SRC);
		const colA = t.columns.a;

		const check = () => {
			expect(colA.bitmap).toBeDefined();
			expect([...colA.bitmap!.index.keys()]).toEqual([0, 1, 2]);
			for (let [k, v] of [
				[0, 2],
				[1, 4],
				[2, 8],
			]) {
				const buf = colA.bitmap!.index.get(k)?.buffer;
				expect(buf).toBeDefined();
				expect(buf!.length).toEqual(1);
				expect(buf![0]).toEqual(v);
			}
		};

		check();
		// force re-creation via .reindex()
		colA.bitmap = undefined;
		colA.reindex();
		check();
	});

	test("remove row", () => {
		const t = Table.load(SRC);
		const colA = t.columns.a;
		// remove row {a:null}
		t.removeRow(0);
		for (let [k, v] of [
			[0, 1],
			[1, 2],
			[2, 4],
		]) {
			expect(colA.bitmap!.index.get(k)?.buffer![0]).toEqual(v);
		}
		// remove row {a:1}
		t.removeRow(1);
		for (let [k, v] of [
			[0, 1],
			[1, 0],
			[2, 2],
		]) {
			expect(colA.bitmap!.index.get(k)?.buffer![0]).toEqual(v);
		}
		colA.reindex();
		expect([...colA.bitmap!.index.keys()]).toEqual([0, 2]);
		for (let [k, v] of [
			[0, 1],
			[2, 2],
		]) {
			expect(colA.bitmap!.index.get(k)?.buffer![0]).toEqual(v);
		}
	});
});
