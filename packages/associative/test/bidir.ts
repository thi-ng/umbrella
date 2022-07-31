import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defBidirIndex } from "../src/index.js";

group("BidirIndex", {
	addAll: () => {
		const idx = defBidirIndex("abc", { start: 100 });
		assert.deepStrictEqual(
			idx.fwd,
			new Map([
				["a", 100],
				["b", 101],
				["c", 102],
			])
		);
		assert.deepStrictEqual(
			idx.rev,
			new Map([
				[100, "a"],
				[101, "b"],
				[102, "c"],
			])
		);
	},
	getAll: () => {
		const idx = defBidirIndex("abc");
		assert.deepStrictEqual(idx.getAll("cba"), [2, 1, 0]);
		assert.deepStrictEqual(idx.getAllIDs([2, 1, 0]), ["c", "b", "a"]);
	},
	deleteAll: () => {
		const idx = defBidirIndex("abcd", { start: 100 });
		idx.deleteAll("bd");
		assert.deepStrictEqual(
			idx.fwd,
			new Map([
				["a", 100],
				["c", 102],
			])
		);
		assert.deepStrictEqual(
			idx.rev,
			new Map([
				[100, "a"],
				[102, "c"],
			])
		);
	},
});
