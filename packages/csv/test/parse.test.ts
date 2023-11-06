import { expect, test } from "bun:test";
import { parseCSV, parseCSVFromString } from "../src/index.js";

test("header", () => {
	expect([...parseCSV({ header: ["a", "b", "c"] }, ["1,2,3"])]).toEqual([
		{ a: "1", b: "2", c: "3" },
	]);
});

test("column mapping (obj)", () => {
	expect([
		...parseCSV(
			{
				cols: {
					a: { alias: "aa", tx: (x) => x.toUpperCase() },
					b: { alias: "bb", tx: (x, row) => row.aa + x },
				},
			},
			["a,b,c", "foo,23,42", "bar,66,88"]
		),
	]).toEqual([
		{ aa: "FOO", bb: "FOO23", c: "42" },
		{ aa: "BAR", bb: "BAR66", c: "88" },
	]);
});

test("column mapping (array, no header)", () => {
	expect([
		...parseCSV(
			{
				all: false,
				header: [],
				cols: [
					{ tx: (x) => x.toUpperCase() },
					null,
					{ alias: "cc", tx: (x, row) => row[0] + x },
				],
			},
			["foo,23,42", "bar,66,88"]
		),
	]).toEqual([
		{ 0: "FOO", cc: "FOO42" },
		{ 0: "BAR", cc: "BAR88" },
	]);
});

test("column mapping (array, w/ header)", () => {
	expect([
		...parseCSV(
			{
				all: false,
				header: ["a", "b", "c"],
				cols: [
					{ tx: (x) => x.toUpperCase() },
					null,
					{ alias: "cc", tx: (x, row) => row.a + x },
				],
			},
			["foo,23,42", "bar,66,88"]
		),
	]).toEqual([
		{ a: "FOO", cc: "FOO42" },
		{ a: "BAR", cc: "BAR88" },
	]);
});

test("quotes", () => {
	expect([
		...parseCSVFromString({}, `a,b,c\n"ha ""he""\nho","2,",3\n4,,6`),
	]).toEqual([
		{ a: `ha "he"\nho`, b: "2,", c: "3" },
		{ a: "4", b: "", c: "6" },
	]);
});

test("quotes in header", () => {
	expect([
		...parseCSVFromString(
			{},
			`"foo","bar\nbaz","fin,\n#ignore"\n#ignore2\n1,2,3\n`
		),
	]).toEqual([{ foo: "1", "bar\nbaz": "2", "fin,\n#ignore": "3" }]);
});
