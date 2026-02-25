// SPDX-License-Identifier: Apache-2.0
import { expect, test, describe } from "bun:test";
import {
	Bitfield,
	FLAG_BITMAP,
	Table,
	type SerializedTable,
} from "../src/index.js";

const SRC: SerializedTable<{ a: number }> = {
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

	test("first", () => {
		const field = new Bitfield();
		expect(field.first()).toBe(-1);
		field.setBit(9);
		field.setBit(29);
		field.setBit(66);
		expect(field.first()).toBe(9);
		expect(field.first(9)).toBe(9);
		expect(field.first(10)).toBe(29);
		expect(field.first(32)).toBe(66);
		expect(field.first(67)).toBe(-1);
		expect(field.first(67, 1000)).toBe(-1);
		expect(field.first(30, 64)).toBe(-1);
	});

	test("last", () => {
		const field = new Bitfield();
		expect(field.last()).toBe(-1);
		expect(field.last(0, 100)).toBe(-1);
		field.setBit(9);
		field.setBit(29);
		field.setBit(69);
		field.setBit(71);
		expect(field.last()).toBe(71);
		expect(field.last(0, 71)).toBe(69);
		expect(field.last(0, 69)).toBe(29);
		expect(field.last(29, 69)).toBe(29);
		expect(field.last(30, 69)).toBe(-1);
		expect(field.last(0, 20)).toBe(9);
		expect(field.last(0, 9)).toBe(-1);
		expect(field.last(71)).toBe(71);
	});

	test("fill", () => {
		expect(new Bitfield().fill(1, 4, 30).buffer).toEqual(
			new Uint32Array([0b00111111_11111111_11111111_11110000])
		);
		expect(
			new Bitfield(new Uint32Array([-1])).fill(0, 4, 30).buffer
		).toEqual(new Uint32Array([0b11_000000_00000000_00000000_0000_1111]));
		expect(new Bitfield().fill(1, 28, 32).buffer).toEqual(
			new Uint32Array([0b11110000_00000000_00000000_00000000, 0])
		);
		expect(new Bitfield().fill(1, 28, 34).buffer).toEqual(
			new Uint32Array([0b11110000_00000000_00000000_00000000, 0b11])
		);
		expect(
			new Bitfield(new Uint32Array([-1, -1])).fill(0, 28, 34).buffer
		).toEqual(
			new Uint32Array([
				0b0000_1111_11111111_11111111_11111111,
				0b11111111_11111111_11111111_11111100,
			])
		);
		expect(new Bitfield().fill(1, 28, 66).buffer).toEqual(
			new Uint32Array([0b11110000_00000000_00000000_00000000, -1, 0b11])
		);
		expect(
			new Bitfield(new Uint32Array([-1, -1, -1])).fill(0, 28, 66).buffer
		).toEqual(
			new Uint32Array([
				0b0000_1111_11111111_11111111_11111111, 0,
				0b11111111_11111111_11111111_11111100,
			])
		);
	});
});
