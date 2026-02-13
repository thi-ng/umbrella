// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { FLAG_BITMAP, FLAG_DICT, Table } from "../src/index.js";

const checkSingle = (type: string, flags = 0) => {
	const a = new Table({ a: { type, flags } });
	a.addRows([{ a: 100 }, { a: 101 }, { a: 102 }, { a: 100 }]);
	expect(a.indexOf("a", 100)).toBe(0);
	expect(a.indexOf("a", 101)).toBe(1);
	expect(a.indexOf("a", 102)).toBe(2);
	expect(a.indexOf("a", 100, 1)).toBe(3);
	expect(a.indexOf("a", 103)).toBe(-1);
	expect(a.indexOf("a", 102, 0, 2)).toBe(-1);
	expect(a.indexOf("b", 100)).toBe(-1);
};

const checkTuple = (type: string, flags = 0) => {
	const a = new Table({ a: { type, flags, cardinality: [2, 2] } });
	a.addRows([
		{ a: [100, 100] },
		{ a: [101, 101] },
		{ a: [102, 102] },
		{ a: [100, 100] },
	]);
	expect(a.indexOf("a", [100, 100])).toBe(0);
	expect(a.indexOf("a", [101, 101])).toBe(1);
	expect(a.indexOf("a", [102, 102])).toBe(2);
	expect(a.indexOf("a", [100, 100], 1)).toBe(3);
	expect(a.indexOf("a", [103, 103])).toBe(-1);
	expect(a.indexOf("a", [102, 102], 0, 2)).toBe(-1);
	expect(a.indexOf("b", [100, 100])).toBe(-1);
};

describe("indexOf", () => {
	test("plain", () => checkSingle("num"));
	test("plain bitmap", () => checkSingle("num", FLAG_BITMAP));
	test("dict", () => checkSingle("num", FLAG_DICT));
	test("dict bitmap", () => checkSingle("num", FLAG_DICT | FLAG_BITMAP));
	test("u8", () => checkSingle("u8"));
	test("u8 bitmap", () => checkSingle("u8", FLAG_BITMAP));
	test("tuple", () => checkTuple("num"));
	test("dict tuple", () => checkTuple("num", FLAG_DICT));
	test("vec", () => checkTuple("u8vec"));
	test("vec bitmap", () => checkTuple("u8vec", FLAG_BITMAP));
});
