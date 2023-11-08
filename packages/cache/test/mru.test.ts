import { beforeEach, expect, test } from "bun:test";
import { MRUCache } from "../src/index.js";

let c: MRUCache<string, number>;
let evicts: any[];

beforeEach(() => {
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
});

test("max length", () => {
	expect(c.length).toBe(3);
	c.set("d", 4);
	expect(c.length).toBe(4);
	c.set("e", 5);
	expect(c.length).toBe(4);
	expect(evicts).toEqual([["d", 4]]);
});

test("get", () => {
	expect(c.get("a")).toBe(1);
	expect(c.get("b")).toBe(2);
	expect([...c.keys()]).toEqual(["b", "a", "c"]);
	c.set("d", 4);
	expect([...c.keys()]).toEqual(["d", "b", "a", "c"]);
	c.set("e", 5);
	expect([...c.keys()]).toEqual(["e", "b", "a", "c"]);
	expect([...c.values()]).toEqual([5, 2, 1, 3]);
	expect(evicts).toEqual([["d", 4]]);
});
