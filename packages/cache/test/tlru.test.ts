import { delayed } from "@thi.ng/compose";
import { beforeEach, expect, test } from "bun:test";
import { TLRUCache } from "../src/index.js";

let c: TLRUCache<string, number>;
let evicts: any[];

beforeEach(() => {
	evicts = [];
	c = new TLRUCache(
		[
			["a", 1],
			["b", 2],
			["c", 3],
		],
		{
			maxlen: 4,
			ttl: 10,
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
	expect(evicts).toEqual([["a", 1]]);
});

test("get lru", () => {
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

test("get ttl", async () => {
	expect(c.set("a", 10, 100)).toBe(10);
	await delayed(null, 20);
	expect(c.has("b")).toBeFalse();
	expect(c.has("c")).toBeFalse();
	expect(evicts).toEqual([
		["b", 2],
		["c", 3],
	]);
	expect([...c.keys()]).toEqual(["a"]);
});

test("getSet ttl", async () => {
	await delayed(null, 20);
	const v = await c.getSet("a", () => Promise.resolve(10));
	expect(v).toBe(10);
	expect(c.has("b")).toBeFalse();
	expect(c.has("c")).toBeFalse();
	expect([...evicts]).toEqual([
		["a", 1],
		["b", 2],
		["c", 3],
	]);
	expect([...c.keys()]).toEqual(["a"]);
	expect([...c.values()]).toEqual([10]);
});
