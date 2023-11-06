import { isSet } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import {
	SparseSet16,
	SparseSet32,
	SparseSet8,
	defSparseSet,
} from "../src/index.js";

let set: SparseSet8;

const init = () => {
	set = new SparseSet8(8);
};

test("factory / max value", () => {
	init();
	let a = defSparseSet(0x100);
	a.into([0xff, 0x100]);
	expect(a instanceof SparseSet8).toBeTrue();
	expect([...a]).toEqual([0xff]);

	a = defSparseSet(0x10000);
	a.into([0xffff, 0x10000]);
	expect(a instanceof SparseSet16).toBeTrue();
	expect([...a]).toEqual([0xffff]);

	a = defSparseSet(0x10001);
	a.into([0x10000, 0x10001]);
	expect(a instanceof SparseSet32).toBeTrue();
	expect([...a]).toEqual([0x10000]);
});

test("ctor(n)", () => {
	init();
	expect(isSet(set)).toBeTrue();
	expect(set.size).toBe(0);
	expect(set.capacity).toBe(8);
});

test("ctor(arrays)", () => {
	init();
	const d = new Uint8Array(8);
	const s = new Uint8Array(8);
	set = new SparseSet8(d, s);
	expect(set.size).toBe(0);
	expect(set.capacity).toBe(8);
	expect(() => new SparseSet8(new Uint8Array(4), s)).toThrow();
});

test("add", () => {
	init();
	expect(
		equiv(
			set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]),
			new Set([0, 1, 2, 3, 4, 7])
		)
	).toBeTrue();
});

test("delete", () => {
	init();
	set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]);
	expect(set.delete(4)).toBeTrue();
	expect(equiv(set, new Set([0, 1, 2, 3, 7]))).toBeTrue();
	expect(set.delete(0)).toBeTrue();
	expect(equiv(set, new Set([1, 2, 3, 7]))).toBeTrue();
	expect(set.delete(7)).toBeTrue();
	expect(equiv(set, new Set([1, 2, 3]))).toBeTrue();
	expect(set.delete(7)).toBeFalse();
	expect(set.delete(4)).toBeFalse();
	set.add(4);
	expect(equiv(set, new Set([1, 2, 3, 4]))).toBeTrue();
});

test("has", () => {
	init();
	expect(set.has(0)).toBeFalse();
	set.add(0);
	set.add(0);
	expect(set.has(0)).toBeTrue();
	set.delete(0);
	expect(set.has(0)).toBeFalse();
	set.into([3, 1, 2]);
});
