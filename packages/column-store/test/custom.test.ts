// SPDX-License-Identifier: Apache-2.0
import { readJSON, writeJSON } from "@thi.ng/file-io";
import { test } from "bun:test";
import {
	FLAG_BITMAP,
	FLAG_DICT,
	FLAG_RLE,
	FLAG_UNIQUE,
	OPTIONAL,
	Table,
	ZERO_PLUS,
} from "../src/index.js";

test("basic", () => {
	const table = new Table<{ id: number; tags: string[] }>({
		id: { type: "u8" },
		tags: {
			type: "str",
			cardinality: ZERO_PLUS,
			flags: FLAG_DICT | FLAG_UNIQUE | FLAG_BITMAP,
			default: ["unsorted"],
		},
	});
	table.addRows([
		{ id: 100, tags: ["a", "a", "c", "b"] },
		{ id: 101, tags: ["a", "d", "b"] },
		{ id: 102 },
	]);
	console.log([...table.query().and("tags", ["a"])]);
	// console.log(table.columns.id);
	//console.log(JSON.stringify(table, null, 4));
	// console.log([...table]);
	// console.log([...table.columns.tags.bitmap!.rowIDs(4, table.length)]);
});

test("load table", () => {
	const table = Table.load<{ id: number; tags: string[] }>({
		schema: {
			id: {
				cardinality: [1, 1],
				flags: FLAG_BITMAP,
				default: 0,
				type: "u8",
			},
			tags: {
				cardinality: [0, 4],
				flags: 7,
				default: ["unsorted"],
				type: "str",
			},
		},
		columns: {
			id: {
				values: [100, 101, 102],
			},
			tags: {
				dict: {
					index: ["a", "c", "b", "d", "unsorted"],
					next: 5,
				},
				values: [[0, 1, 2], [0, 3, 2], [4]],
			},
		},
		length: 3,
	});
	// table.reindex();
	table.addRow({ id: 103 });
	// for (let i = 4; i < 34; i += 2) table.addRow({ id: 100 + i });
	table.addRow({ id: 255, tags: ["a", "e"] });
	// console.log(JSON.stringify(table, null, 4));
	table.removeRow(1);
	//table.removeRow(2);
	// table.reindex();
	console.log(JSON.stringify(table, null, 4));
	// console.log(table);
	console.log([...table]);
	console.log([...table.columns.tags.bitmap!.rowIDs(0, table.length)]);
	console.log([...table.query().and("tags", ["a"])]);
});

test.todo(
	"convert",
	() => {
		type Schema = {
			_id: string;
			_hash: string;
			_type: number;
			_mime: string;
			_tags: string[];
			"exif:width": number;
			"exif:height": number;
			"exif:duration": number;
			"dc:creator": string;
			"dc:created": string;
			"dc:title": string;
		};
		// const db = readJSON("/Users/toxi/thing/notes2024/dev/db-test.json");
		const db = readJSON("/Volumes/Nirvana/notes/_db.json");
		const table = new Table<Schema>({
			_id: { type: "str" },
			_hash: { type: "str" },
			_type: { type: "u8", flags: FLAG_RLE },
			_mime: { type: "str", flags: FLAG_DICT | FLAG_BITMAP | FLAG_RLE },
			_tags: {
				type: "str",
				cardinality: [0, 100],
				flags: FLAG_DICT | FLAG_UNIQUE | FLAG_BITMAP,
			},
			"exif:width": {
				type: "u16",
				cardinality: OPTIONAL,
				default: 0,
				flags: FLAG_RLE,
			},
			"exif:height": {
				type: "u16",
				cardinality: OPTIONAL,
				default: 0,
				flags: FLAG_RLE,
			},
			"exif:duration": {
				type: "u16",
				cardinality: OPTIONAL,
				default: 0,
				flags: FLAG_RLE,
			},
			"dc:creator": {
				type: "str",
				cardinality: OPTIONAL,
				flags: FLAG_RLE,
			},
			"dc:title": {
				type: "str",
				cardinality: OPTIONAL,
				flags: FLAG_RLE,
			},
			"dc:created": {
				type: "str",
				cardinality: OPTIONAL,
				flags: FLAG_RLE,
			},
		});
		for (let x of db) {
			try {
				table.addRow({
					_id: x._id,
					_hash: x._hash,
					_type: x._type,
					_mime: x._mime,
					_tags: x._tags,
					"exif:width": x._props["exif:width"],
					"exif:height": x._props["exif:height"],
					"exif:duration": x._props["exif:duration"],
					"dc:creator": x._props["author"],
					"dc:title": x._props["title"],
					"dc:created": x._props["date:created"],
				});
			} catch (e) {
				console.log("error", x);
				throw e;
			}
		}
		// benchmark(() => JSON.stringify(table));
		writeJSON("_db-columns.json", table);
		const tags = ["3d", "bw", "voxel"];
		/*
		suite(
			[
				{
					title: "bitmap",
					// fn: () => [
					// 	...table.columns.tags.bitmap!.rowIDs(tagID, table.length),
					// ],
					fn: () => [...table.query().and("tags", tags)],
				},
				{
					title: "search",
					// fn: () => {
					// 	const res = [];
					// 	for (let i = 0; i < table.length; i++) {
					// 		if (
					// 			(<EnumArrayColumn>table.columns.tags).values[
					// 				i
					// 			]?.includes(tagID)
					// 		) {
					// 			res.push(i);
					// 		}
					// 	}
					// 	return res;
					// },
					fn: () => {
						table.columns.tags.bitmap = undefined;
						return [...table.query().and("tags", tags)];
					},
				},
			],
			{
				warmup: 1000,
				iter: 1e5,
			}
		);
		*/
		//table.columns._tags.reindex();
		//assert(!!table.columns._tags.bitmap);
		const results = [...table.query().and("_tags", tags)];
		console.log(results.length, results);
		// const results = [...table.columns.tags.bitmap!.rowIDs(tagID, table.length)];
		// console.log(
		// 	(<EnumArrayColumn>table.columns.tags).dict.getID(tagID),
		// 	results.length,
		// 	results.map((x) => table.getRow(x))
		// );
	},
	{ timeout: 60000 }
);

test("update row", () => {
	const table = new Table<{ a: string[] }>({
		a: {
			type: "str",
			cardinality: [1, 4],
			flags: FLAG_DICT | FLAG_BITMAP | FLAG_UNIQUE,
		},
	});
	table.addRow({ a: ["foo"] });
	table.updateRow(0, { a: ["bar", "boo"] });
	table.reindex();
	console.log(JSON.stringify(table, null, 4));
	console.log(JSON.stringify(table.columns.a.bitmap, null, 4));
	table.columns.a.replaceValue("bar", "boo");
	table.reindex();
	console.log(JSON.stringify(table, null, 4));
	console.log(JSON.stringify(table.columns.a.bitmap, null, 4));
});

test("vec column", () => {
	let table = new Table<{ a: number[] }>({
		a: {
			type: "f32vec",
			cardinality: [0, 3],
			default: [-1, -1, -1],
			flags: FLAG_BITMAP,
			opts: { prec: 2 },
		},
	});
	table.addRow({});
	table.addRow({ a: [1.126, 2, 3] });
	console.log(table.columns.a.bitmap);
	console.log(JSON.stringify(table));

	table = Table.load<{ a: number[] }>({
		schema: {
			a: {
				cardinality: [0, 3],
				flags: 0,
				type: "f32vec",
				default: [-1, -1, -1],
				opts: { prec: 2 },
			},
		},
		columns: { a: { values: [-1, -1, -1, 1.13, 2, 3, 10, 20, 30] } },
		length: 3,
	});
	console.log(table.getRow(1));
	console.log(table.columns.a.bitmap?.index);

	console.log([
		...table.query().or("a", [
			[10, 20, 30],
			[1.13, 2, 3],
		]),
	]);
});
