import { expect, test } from "bun:test";
import { LRUCache } from "../src/index.js";

let c: LRUCache<string, number>;
let evicts: any[];

const init = () => {
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
};

test("max length", () => {
	init();
	expect(c.length).toBe(3);
	c.set("d", 4);
	expect(c.length).toBe(4);
	c.set("e", 5);
	expect(c.length).toBe(4);
	expect(evicts).toEqual([["a", 1]]);
});

test("get", () => {
	init();
	expect(c.get("a")).toBe(1);
	expect(c.get("b")).toBe(2);
	expect([...c.keys()]).toEqual(["c", "a", "b"]);
	c.set("d", 4);
	expect([...c.keys()]).toEqual(["c", "a", "b", "d"]);
	c.set("e", 5);
	expect([...c.keys()]).toEqual(["a", "b", "d", "e"]);
	expect([...c.values()]).toEqual([1, 2, 4, 5]);
	expect(evicts).toEqual([["c", 3]]);
});
