import { expect, test } from "bun:test";
import { f32u16, f32u8, u16f32, u8f32 } from "../src/index.js";

const VALS8 = [
	[-1.2, 0x80, -1],
	[-1, 0x80],
	[-0.5, 0xc0],
	[0.5, 0x3f],
	[1, 0x7f],
	[1.2, 0x7f, 1],
];

const VALS16 = [
	[-1.2, 0x8000, -1],
	[-1, 0x8000],
	[-0.5, 0xc000],
	[0.5, 0x3fff],
	[1, 0x7fff],
	[1.2, 0x7fff, 1],
];

test("f32u8", () => {
	for (let [f, u] of VALS8) {
		expect(f32u8(f)).toBe(u);
	}
});

test("u8f32", () => {
	for (let [f, u, f2] of VALS8) {
		expect(u8f32(u)).toBeCloseTo(f2 || f, 2);
	}
});

test("f32u16", () => {
	for (let [f, u] of VALS16) {
		expect(f32u16(f)).toBe(u);
	}
});

test("u16f32", () => {
	for (let [f, u, f2] of VALS16) {
		expect(u16f32(u)).toBeCloseTo(f2 || f, 4);
	}
});
