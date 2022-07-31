import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { MRUCache } from "../src/index.js";

let c: MRUCache<string, number>;
let evicts: any[];

group(
	"MRU",
	{
		"max length": () => {
			assert.strictEqual(c.length, 3);
			c.set("d", 4);
			assert.strictEqual(c.length, 4);
			c.set("e", 5);
			assert.strictEqual(c.length, 4);
			assert.deepStrictEqual(evicts, [["d", 4]]);
		},

		get: () => {
			assert.strictEqual(c.get("a"), 1);
			assert.strictEqual(c.get("b"), 2);
			assert.deepStrictEqual([...c.keys()], ["b", "a", "c"]);
			c.set("d", 4);
			assert.deepStrictEqual([...c.keys()], ["d", "b", "a", "c"]);
			c.set("e", 5);
			assert.deepStrictEqual([...c.keys()], ["e", "b", "a", "c"]);
			assert.deepStrictEqual([...c.values()], [5, 2, 1, 3]);
			assert.deepStrictEqual(evicts, [["d", 4]]);
		},
	},
	{
		beforeEach: () => {
			evicts = [];
			c = new MRUCache(
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
