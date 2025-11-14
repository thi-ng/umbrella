// SPDX-License-Identifier: Apache-2.0
import { delayed } from "@thi.ng/compose";
import { beforeEach, describe, expect, test } from "bun:test";
import { TLRUCache, type TLRUCacheEntry } from "../src/index.js";

let cache: TLRUCache<string, number>;
let evicts: any[];

beforeEach(() => {
	evicts = [];
	cache = new TLRUCache(
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
	expect(cache.length).toBe(3);
	cache.set("d", 4);
	expect(cache.length).toBe(4);
	cache.set("e", 5);
	expect(cache.length).toBe(4);
	expect(evicts).toEqual([["a", 1]]);
});

test("get lru", () => {
	expect(cache.get("a")).toBe(1);
	expect(cache.get("b")).toBe(2);
	expect([...cache.keys()]).toEqual(["c", "a", "b"]);
	cache.set("d", 4);
	expect([...cache.keys()]).toEqual(["c", "a", "b", "d"]);
	cache.set("e", 5);
	expect([...cache.keys()]).toEqual(["a", "b", "d", "e"]);
	expect([...cache.values()]).toEqual([1, 2, 4, 5]);
	expect(evicts).toEqual([["c", 3]]);
});

test("get ttl", async () => {
	expect(cache.set("a", 10, 100)).toBe(10);
	await delayed(null, 20);
	expect(cache.has("b")).toBeFalse();
	expect(cache.has("c")).toBeFalse();
	expect(evicts).toEqual([
		["b", 2],
		["c", 3],
	]);
	expect([...cache.keys()]).toEqual(["a"]);
});

test("getSet ttl", async () => {
	await delayed(null, 20);
	const v = await cache.getSet("a", () => Promise.resolve(10));
	expect(v).toBe(10);
	expect(cache.has("b")).toBeFalse();
	expect(cache.has("c")).toBeFalse();
	expect([...evicts]).toEqual([
		["a", 1],
		["b", 2],
		["c", 3],
	]);
	expect([...cache.keys()]).toEqual(["a"]);
	expect([...cache.values()]).toEqual([10]);
});

test("reset ttl", async (done) => {
	try {
		cache = new TLRUCache([["a", 1]], { ttl: 20, autoExtend: true });
		const pre = <TLRUCacheEntry<any, any>>{ ...[...cache][0][1] };
		expect(pre.ttl).toBe(20);
		await delayed(null, 10);
		expect(cache.get("a")).toBe(1);
		const post = <TLRUCacheEntry<any, any>>{ ...[...cache][0][1] };
		expect(post.t > pre.t).toBeTrue();
		await delayed(null, 30);
		expect(cache.get("a")).toBeUndefined();
	} finally {
		done();
	}
});

describe("maxsize", () => {
	test("adding element smaller than maxsize", () => {
		const cache = new TLRUCache(
			[
				["a", "foo"],
				["b", "bar"],
			],
			{
				maxlen: 3,
				ttl: 1000,
				maxsize: 8,
				ksize: (k) => k.length,
				vsize: (v) => v.length,
				release: (k, v) => evicts.push([k, v]),
			}
		);

		expect(cache.length).toBe(2);
		cache.set("c", "qux");
		expect(cache.length).toBe(2);
		expect(evicts).toEqual([["a", "foo"]]);
	});

	test("adding element bigger than maxsize", () => {
		const cache = new TLRUCache(
			[
				["a", "foo"],
				["b", "bar"],
			],
			{
				maxlen: 3,
				ttl: 1000,
				maxsize: 8,
				ksize: (k) => k.length,
				vsize: (v) => v.length,
				release: (k, v) => evicts.push([k, v]),
			}
		);

		expect(cache.length).toBe(2);
		cache.set("c", "123456789");
		expect(cache.length).toBe(0);
		expect(evicts).toEqual([
			["a", "foo"],
			["b", "bar"],
		]);
		cache.set("d", "12");
		expect(cache.length).toBe(1);
	});
});
