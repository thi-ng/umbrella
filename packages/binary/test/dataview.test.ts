// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { DATAVIEW } from "../src/index.js";

// prettier-ignore
const SRC = [
	0x11, 0x22, 0x33, 0x44,
	0x3f, 0x80, 0x00, 0x00,
	0x40, 0x09, 0x21, 0xfb,
	0x54, 0x44, 0x2d, 0x18
];

test("u8", () => {
	expect(DATAVIEW.getU8(SRC, 5)).toBe(0x80);
});
test("i8", () => {
	expect(DATAVIEW.getI8(SRC, 5)).toBe(-128);
});

test("u16", () => {
	expect(DATAVIEW.getU16(SRC, 4, false)).toBe(0x3f80);
	expect(DATAVIEW.getU16(SRC, 4)).toBe(0x803f);
});
test("i16", () => {
	expect(DATAVIEW.getI16(SRC, 4, false)).toBe(0x3f80);
	expect(DATAVIEW.getI16(SRC, 4)).toBe(-0x7fc1);
});

test("u32", () => {
	expect(DATAVIEW.getU32(SRC, 0, false)).toBe(0x11223344);
	expect(DATAVIEW.getU32(SRC, 0)).toBe(0x44332211);
});
test("i32", () => {
	expect(DATAVIEW.getI32(SRC, 2, false)).toBe(0x33443f80);
	expect(DATAVIEW.getI32(SRC, 2)).toBe(-0x7fc0bbcd);
});

test("f32", () => {
	expect(DATAVIEW.getF32(SRC, 4, false)).toBe(1.0);
	expect(DATAVIEW.getF32(SRC, 4)).toBe(4.600602988224807e-41);
});

test("f64", () => {
	expect(DATAVIEW.getF64(SRC, 8, false)).toBe(Math.PI);
	expect(DATAVIEW.getF64(SRC, 8)).toBe(3.207375630676366e-192);
});
