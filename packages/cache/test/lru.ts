import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { LRUCache } from "../src/index.js";

let c: LRUCache<string, number>;
let evicts: any[];

group(
	"LRU",
	{
		"max length": () => {
			assert.strictEqual(c.length, 3);
			c.set("d", 4);
			assert.strictEqual(c.length, 4);
			c.set("e", 5);
			assert.strictEqual(c.length, 4);
			assert.deepStrictEqual(evicts, [["a", 1]]);
		},

		get: () => {
			assert.strictEqual(c.get("a"), 1);
			assert.strictEqual(c.get("b"), 2);
			assert.deepStrictEqual([...c.keys()], ["c", "a", "b"]);
			c.set("d", 4);
			assert.deepStrictEqual([...c.keys()], ["c", "a", "b", "d"]);
			c.set("e", 5);
			assert.deepStrictEqual([...c.keys()], ["a", "b", "d", "e"]);
			assert.deepStrictEqual([...c.values()], [1, 2, 4, 5]);
			assert.deepStrictEqual(evicts, [["c", 3]]);
		},
	},
	{
		beforeEach: () => {
			evicts = [];
			c = new LRUCache(
				[
					["a", 1],
					["b", 2],
					["c", 3],
				],
				{
					maxlen: 4,
					release: (k, v) => evicts.push([k, v]),
				}
			);
		},
	}
);
