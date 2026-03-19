// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import type { DictColumn } from "../src/columns/dict.js";
import { FLAG_DICT, Table } from "../src/index.js";

describe("reindex", () => {
	test("dict", () => {
		const table = new Table({
			a: { type: "str", cardinality: [0, 1], flags: FLAG_DICT },
		});
		table.addRows(
			["c", "b", "a", "a", null, "a", "c"].map((x) => ({ a: x }))
		);
		expect((<DictColumn>table.columns.a).dict.fwd).toEqual(
			new Map([
				["c", 0],
				["b", 1],
				["a", 2],
			])
		);
		table.reindex();
		// keys should be sorted by frequency
		expect((<DictColumn>table.columns.a).dict.fwd).toEqual(
			new Map([
				["a", 0],
				["c", 1],
				["b", 2],
			])
		);
	});

	test("dict tuple", () => {
		const table = new Table({
			a: { type: "str", cardinality: [0, 5], flags: FLAG_DICT },
		});
		table.addRows(
			[["c", "b", "a"], null, ["a", "a", "c"]].map((x) => ({ a: x }))
		);
		expect((<DictColumn>table.columns.a).dict.fwd).toEqual(
			new Map([
				["c", 0],
				["b", 1],
				["a", 2],
			])
		);
		table.reindex();
		// keys should be sorted by frequency
		expect((<DictColumn>table.columns.a).dict.fwd).toEqual(
			new Map([
				["a", 0],
				["c", 1],
				["b", 2],
			])
		);
	});
});
