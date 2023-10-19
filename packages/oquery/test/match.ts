import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	matchMultiple,
	matchPattern,
	matchStrings,
	query,
} from "../src/index.js";

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
			query(DB, [matchStrings("tags", ["a", "b"], { union: true })]),
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
			query(DB, [
				matchStrings("tags", ["a", "!b", "c"], { union: true }),
			]),
			[DB[2], DB[3], DB[4]]
		);
		assert.deepStrictEqual(
			query(DB, [matchStrings("tags", ["c", "d"])]),
			[]
		);
		assert.deepStrictEqual(
			query(DB, [matchStrings("tags", ["c", "d"], { union: true })]),
			[DB[1], DB[2], DB[4]]
		);
	},

	matchMultiple: () => {
		const $DB = DB.map(({ id, tags }) => ({
			id,
			tags: tags.map((t) => ({ name: t })),
		}));
		assert.deepStrictEqual(
			query($DB, [
				matchMultiple("tags", ["a"], ["b"], {
					value: (tags) => tags.map((t: any) => t.name),
				}),
			]),
			[$DB[2], $DB[3]]
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
