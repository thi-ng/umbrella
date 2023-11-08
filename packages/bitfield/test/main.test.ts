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
