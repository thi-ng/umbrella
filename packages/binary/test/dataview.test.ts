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
	const a: number[] = [];
	DATAVIEW.setU8(a, 0, 0xff);
	expect(a).toEqual([0xff]);
});
test("i8", () => {
	expect(DATAVIEW.getI8(SRC, 5)).toBe(-128);
	const a: number[] = [];
	DATAVIEW.setI8(a, 0, -1);
	expect(a).toEqual([0xff]);
});

test("u16", () => {
	expect(DATAVIEW.getU16(SRC, 4, false)).toBe(0x3f80);
	expect(DATAVIEW.getU16(SRC, 4)).toBe(0x803f);
	const a: number[] = [];
	DATAVIEW.setU16(a, 0, 0xaa55);
	expect(a).toEqual([0x55, 0xaa]);
	DATAVIEW.setU16(a, 0, 0xaa55, false);
	expect(a).toEqual([0xaa, 0x55]);
});
test("i16", () => {
	expect(DATAVIEW.getI16(SRC, 4, false)).toBe(0x3f80);
	expect(DATAVIEW.getI16(SRC, 4)).toBe(-0x7fc1);
	const a: number[] = [];
	DATAVIEW.setI16(a, 0, -2);
	expect(a).toEqual([0xfe, 0xff]);
	DATAVIEW.setI16(a, 0, -2, false);
	expect(a).toEqual([0xff, 0xfe]);
});

test("u32", () => {
	expect(DATAVIEW.getU32(SRC, 0, false)).toBe(0x11223344);
	expect(DATAVIEW.getU32(SRC, 0)).toBe(0x44332211);
	const a: number[] = [];
	DATAVIEW.setU32(a, 0, 0xaabbccdd);
	expect(a).toEqual([0xdd, 0xcc, 0xbb, 0xaa]);
	DATAVIEW.setU32(a, 0, 0xaabbccdd, false);
	expect(a).toEqual([0xaa, 0xbb, 0xcc, 0xdd]);
});
test("i32", () => {
	expect(DATAVIEW.getI32(SRC, 2, false)).toBe(0x33443f80);
	expect(DATAVIEW.getI32(SRC, 2)).toBe(-0x7fc0bbcd);
	const a: number[] = [];
	DATAVIEW.setI32(a, 0, -2);
	expect(a).toEqual([0xfe, 0xff, 0xff, 0xff]);
	DATAVIEW.setI32(a, 0, -2, false);
	expect(a).toEqual([0xff, 0xff, 0xff, 0xfe]);
});

test("u64", () => {
	expect(DATAVIEW.getU64(SRC, 4, false)).toBe(0x3f800000400921fbn);
	expect(DATAVIEW.getU64(SRC, 4)).toBe(0xfb2109400000803fn);
	const a: number[] = [];
	DATAVIEW.setU64(a, 0, 0x11223344_aabbccddn);
	expect(a).toEqual([0xdd, 0xcc, 0xbb, 0xaa, 0x44, 0x33, 0x22, 0x11]);
	DATAVIEW.setU64(a, 0, 0x11223344_aabbccddn, false);
	expect(a).toEqual([0x11, 0x22, 0x33, 0x44, 0xaa, 0xbb, 0xcc, 0xdd]);
});
test("i64", () => {
	expect(DATAVIEW.getI64(SRC, 4, false)).toBe(0x3f800000400921fbn);
	expect(DATAVIEW.getI64(SRC, 4)).toBe(-0x4def6bfffff7fc1n);
	const a: number[] = [];
	DATAVIEW.setI64(a, 0, -2n);
	expect(a).toEqual([0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
	DATAVIEW.setI64(a, 0, -2n, false);
	expect(a).toEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe]);
});

test("f32", () => {
	expect(DATAVIEW.getF32(SRC, 4, false)).toBe(1.0);
	expect(DATAVIEW.getF32(SRC, 4)).toBe(4.600602988224807e-41);
	const a: number[] = [];
	DATAVIEW.setF32(a, 0, -1);
	expect(a).toEqual([0x00, 0x00, 0x80, 0xbf]);
	DATAVIEW.setF32(a, 0, -1, false);
	expect(a).toEqual([0xbf, 0x80, 0x00, 0x00]);
});

test("f64", () => {
	expect(DATAVIEW.getF64(SRC, 8, false)).toBe(Math.PI);
	expect(DATAVIEW.getF64(SRC, 8)).toBe(3.207375630676366e-192);
	const a: number[] = [];
	DATAVIEW.setF64(a, 0, -1);
	expect(a).toEqual([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0xbf]);
	DATAVIEW.setF64(a, 0, -1, false);
	expect(a).toEqual([0xbf, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
});
