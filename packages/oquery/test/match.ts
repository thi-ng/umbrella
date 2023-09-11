import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { matchPattern, matchStrings, query } from "../src/index.js";

const DB = [
	{ id: 0, tags: ["a", "b"] },
	{ id: 1, tags: ["c", "b"] },
	{ id: 2, tags: ["c", "a"] },
	{ id: 3, tags: ["a", "aaa"], extra: "yes" },
	{ id: 4, tags: ["c"] },
];

group("oquery matchers", {
	matchStrings: () => {
		assert.deepStrictEqual(query(DB, [matchStrings("tags", ["a"])]), [
			DB[0],
			DB[2],
			DB[3],
		]);
		assert.deepStrictEqual(query(DB, [matchStrings("tags", ["a", "b"])]), [
			DB[0],
		]);
		assert.deepStrictEqual(
			query(DB, [matchStrings("tags", ["a", "b"], true)]),
			[DB[0], DB[1], DB[2], DB[3]]
		);
		assert.deepStrictEqual(query(DB, [matchStrings("tags", ["a", "!b"])]), [
			DB[2],
			DB[3],
		]);
		assert.deepStrictEqual(
			query(DB, [matchStrings("tags", ["a", "!b", "c"])]),
			[DB[2]]
		);
		assert.deepStrictEqual(
			query(DB, [matchStrings("tags", ["a", "!b", "c"], true)]),
			[DB[2], DB[3], DB[4]]
		);
		assert.deepStrictEqual(
			query(DB, [matchStrings("tags", ["c", "d"])]),
			[]
		);
		assert.deepStrictEqual(
			query(DB, [matchStrings("tags", ["c", "d"], true)]),
			[DB[1], DB[2], DB[4]]
		);
	},

	matchPattern: () => {
		assert.deepStrictEqual(query(DB, [matchPattern("extra", "*")]), [
			DB[3],
		]);
		assert.deepStrictEqual(query(DB, [matchPattern("id", "=2")]), [DB[2]]);
		assert.deepStrictEqual(query(DB, [matchPattern("id", ">2")]), [
			DB[3],
			DB[4],
		]);
	},

	combined: () => {
		assert.deepStrictEqual(
			query(DB, [
				matchStrings("tags", ["a"]),
				matchPattern("tags", "a{2,}"),
			]),
			[DB[3]]
		);
	},
});
