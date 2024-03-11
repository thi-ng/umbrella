import { beforeEach, expect, test } from "bun:test";
import { LRUCache } from "../src/index.js";

let c: LRUCache<string, number>;
let evicts: any[];
let updates: any[];

beforeEach(() => {
	updates = [];
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
			update: (k, v, v2) => updates.push([k, v, v2]),
		}
	);
});

test("max length", () => {
	expect(c.length).toBe(3);
	c.set("d", 4);
	expect(c.length).toBe(4);
	c.set("e", 5);
	expect(c.length).toBe(4);
	expect(evicts).toEqual([["a", 1]]);
});

test("get", () => {
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

test("set", () => {
	expect(updates).toEqual([]);
	c.set("a", 10);
	c.set("b", 20);
	c.set("c", 30);
	c.set("a", 100);
	expect(updates).toEqual([
		["a", 1, 10],
		["b", 2, 20],
		["c", 3, 30],
		["a", 10, 100],
	]);
});
