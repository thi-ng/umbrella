// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { defBitField } from "../src/index.js";

test("setAt (boolean)", () => {
	const bf = defBitField(8);
	expect(bf.at(1)).toBeFalsy();
	bf.setAt(1, true);
	expect(bf.at(1)).toBeTruthy();
});

test("setAt (number)", () => {
	const bf = defBitField(8);
	expect(bf.at(1)).toBeFalsy();
	bf.setAt(1, 4);
	expect(bf.at(1)).toBeTruthy();
});

test("positions", () => {
	expect([
		// prettier-ignore
		...defBitField([
			0, 0, 1, 0, 1, 0, 1, 1,
			0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 1, 0, 0,
			1, 1,
		]).positions(),
	]).toEqual([2, 4, 6, 7, 21, 24, 25]);
});

test("similarity", () => {
	const bits = [0, 1, 1, 0, 1, 0];
	const a = defBitField(bits);
	expect(a.similarity(a)).toBe(1);
	expect(a.similarity(bits)).toBe(1);
	expect(a.similarity([0, 1, 0, 0, 1, 0]).toFixed(3)).toBe(
		(2 / 3).toFixed(3)
	);
	expect(a.similarity([0, 0, 1, 0, 0, 0]).toFixed(3)).toBe(
		(1 / 3).toFixed(3)
	);
	expect(a.similarity([0, 0, 0, 0, 0, 0])).toBe(0);
	expect(() => a.similarity([])).toThrow();
});

test("firstZero", () => {
	const a = defBitField(32);
	a.data.set([255, 0b0011_0111, 255, 255]);
	expect(a.firstZero()).toBe(8);
	expect(a.firstZero(8)).toBe(8);
	expect(a.firstZero(9)).toBe(9);
	expect(a.firstZero(10)).toBe(12);
	expect(a.firstZero(12)).toBe(12);
	expect(a.firstZero(13)).toBe(-1);
});

test("firstOne", () => {
	const a = defBitField(32);
	a.data.set([0, 0b1100_1000, 0, 0]);
	expect(a.firstOne()).toBe(8);
	expect(a.firstOne(8)).toBe(8);
	expect(a.firstOne(9)).toBe(9);
	expect(a.firstOne(10)).toBe(12);
	expect(a.firstOne(12)).toBe(12);
	expect(a.firstOne(13)).toBe(-1);
});
