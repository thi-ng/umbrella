import { expect, test } from "bun:test";
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

test("matchStrings", () => {
	expect(query(DB, [matchStrings("tags", ["a"])])).toEqual([
		DB[0],
		DB[2],
		DB[3],
	]);
	expect(query(DB, [matchStrings("tags", ["a", "b"])])).toEqual([DB[0]]);
	expect(
		query(DB, [matchStrings("tags", ["a", "b"], { union: true })])
	).toEqual([DB[0], DB[1], DB[2], DB[3]]);
	expect(query(DB, [matchStrings("tags", ["a", "!b"])])).toEqual([
		DB[2],
		DB[3],
	]);
	expect(query(DB, [matchStrings("tags", ["a", "!b", "c"])])).toEqual([
		DB[2],
	]);
	expect(
		query(DB, [matchStrings("tags", ["a", "!b", "c"], { union: true })])
	).toEqual([DB[2], DB[3], DB[4]]);
	expect(query(DB, [matchStrings("tags", ["c", "d"])])).toEqual([]);
	expect(
		query(DB, [matchStrings("tags", ["c", "d"], { union: true })])
	).toEqual([DB[1], DB[2], DB[4]]);
});

test("matchMultiple", () => {
	const $DB = DB.map(({ id, tags }) => ({
		id,
		tags: tags.map((t) => ({ name: t })),
	}));
	expect(
		query($DB, [
			matchMultiple("tags", ["a"], ["b"], {
				value: (tags) => tags.map((t: any) => t.name),
			}),
		])
	).toEqual([$DB[2], $DB[3]]);
});

test("matchPattern", () => {
	expect(query(DB, [matchPattern("extra", "*")])).toEqual([DB[3]]);
	expect(query(DB, [matchPattern("id", "=2")])).toEqual([DB[2]]);
	expect(query(DB, [matchPattern("id", ">2")])).toEqual([DB[3], DB[4]]);
});

test("combined", () => {
	expect(
		query(DB, [matchStrings("tags", ["a"]), matchPattern("tags", "a{2,}")])
	).toEqual([DB[3]]);
});
