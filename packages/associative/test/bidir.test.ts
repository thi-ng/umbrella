import { expect, test } from "bun:test";
import { defBidirIndex } from "../src/index.js";

test("addAll", () => {
	const idx = defBidirIndex("abc", { start: 100 });
	expect(idx.fwd).toEqual(
		new Map([
			["a", 100],
			["b", 101],
			["c", 102],
		])
	);
	expect(idx.rev).toEqual(
		new Map([
			[100, "a"],
			[101, "b"],
			[102, "c"],
		])
	);
});

test("getAll", () => {
	const idx = defBidirIndex("abc");
	expect(idx.getAll("cba")).toEqual([2, 1, 0]);
	expect(idx.getAllIDs([2, 1, 0])).toEqual(["c", "b", "a"]);
});

test("deleteAll", () => {
	const idx = defBidirIndex("abcd", { start: 100 });
	idx.deleteAll("bd");
	expect(idx.fwd).toEqual(
		new Map([
			["a", 100],
			["c", 102],
		])
	);
	expect(idx.rev).toEqual(
		new Map([
			[100, "a"],
			[102, "c"],
		])
	);
});
