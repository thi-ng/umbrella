import { shuffle } from "@thi.ng/arrays";
import { equiv } from "@thi.ng/equiv";
import { XsAdd } from "@thi.ng/random";
import { range, repeat, zip } from "@thi.ng/transducers";
import { expect, test } from "bun:test";
import { SortedMap, defSortedMap } from "../src/index.js";

let m: SortedMap<any, any>;

const init = () => {
	m = defSortedMap({ a: 1, b: 2, c: 3 });
};

test("size", () => {
	init();
	expect(m.size).toBe(3);
	m.set("a", 10);
	expect(m.size).toBe(3);
	m.set("d", 10);
	expect(m.size).toBe(4);
	expect(m.delete("d"));
	expect(m.size).toBe(3);
	expect(!m.delete("d"));
	expect(m.size).toBe(3);
});

test("clear", () => {
	init();
	m.clear();
	expect(m.size).toBe(0);
	expect([...m.entries()]).toEqual([]);
	expect(m.delete("a")).toBeFalse();
	expect(m.size).toBe(0);
});

test("empty", () => {
	init();
	const m2 = m.empty();
	expect(m.size).toBe(3);
	expect(m2.size).toBe(0);
	expect([...m2.entries()]).toEqual([]);
});

test("copy", () => {
	init();
	expect(m.copy()).toEqual(m);
});

test("equiv", () => {
	init();
	expect(equiv(m.copy(), m)).toBeTrue();
	expect(equiv(m, new SortedMap<any, any>())).toBeFalse();
});

test("has", () => {
	init();
	expect(m.has("a")).toBeTrue();
	expect(m.has("b")).toBeTrue();
	expect(m.has("c")).toBeTrue();
	expect(m.has("aa")).toBeFalse();
	expect(m.has("d")).toBeFalse();
	expect(m.has("@")).toBeFalse();
});

test("first", () => {
	init();
	expect(["a", 1]).toEqual(m.first()!);
	m.set("A", 10);
	expect(["A", 10]).toEqual(m.first()!);
});

test("get", () => {
	init();
	expect(m.get("a")).toBe(1);
	expect(m.get("b")).toBe(2);
	expect(m.get("c")).toBe(3);
	expect(m.get("aa")).toBeUndefined();
	expect(m.get("d")).toBeUndefined();
	expect(m.get("@", -1)).toBe(-1);
});

test("entries", () => {
	init();
	expect([...m]).toEqual([
		["a", 1],
		["b", 2],
		["c", 3],
	]);
});

// "entries rev": () => {
//     assert. deepStrictEqual([...m.entries(undefined, true)], [["c", 3], ["b", 2], ["a", 1]]);
// },

test("entries a", () => {
	init();
	expect([...m.entries("a")]).toEqual([
		["a", 1],
		["b", 2],
		["c", 3],
	]);
});

// "entries a rev": () => {
//     assert. deepStrictEqual([...m.entries("a", true)], [["a", 1]]);
// },

test("entries aa", () => {
	init();
	expect([...m.entries("aa")]).toEqual([
		["b", 2],
		["c", 3],
	]);
});

// "entries aa rev": () => {
//     assert. deepStrictEqual([...m.entries("aa", true)], [["a", 1]]);
// },

test("entries bb", () => {
	init();
	expect([...m.entries("bb")]).toEqual([["c", 3]]);
});

// "entries bb rev": () => {
//     assert. deepStrictEqual([...m.entries("bb", true)], [["b", 2], ["a", 1]]);
// },

test("entries c", () => {
	init();
	expect([...m.entries("c")]).toEqual([["c", 3]]);
});

// "entries c rev": () => {
//     assert. deepStrictEqual([...m.entries("c", true)], [["c", 3], ["b", 2], ["a", 1]]);
// },

test("entries 0", () => {
	init();
	expect([...m.entries("0")]).toEqual([
		["a", 1],
		["b", 2],
		["c", 3],
	]);
});

// "entries 0 rev": () => {
//     assert. deepStrictEqual([...m.entries("0", true)], []);
// });

test("entries d", () => {
	init();
	expect([...m.entries("d")]).toEqual([]);
});

// "entries d rev": () => {
//     assert. deepStrictEqual([...m.entries("d", true)], [["c", 3], ["b", 2], ["a", 1]]);
// },

test("keys", () => {
	init();
	expect([...m.keys()]).toEqual(["a", "b", "c"]);
	m.set("aa", 0);
	m.set("d", 0);
	expect([...m.keys()]).toEqual(["a", "aa", "b", "c", "d"]);
});

test("values", () => {
	init();
	expect([...m.values()]).toEqual([1, 2, 3]);
	m.set("aa", 0);
	m.set("d", 0);
	expect([...m.values()]).toEqual([1, 0, 2, 3, 0]);
});

test("comparator", () => {
	init();
	m = defSortedMap(
		{ a: 1, b: 2, c: 3 },
		{
			compare: (a: string, b: string) => (a === b ? 0 : a < b ? 1 : -1),
		}
	);
	expect([
		["c", 3],
		["b", 2],
		["a", 1],
	]).toEqual([...m.entries()]);
});

test("fuzz", () => {
	init();
	const keys = [...range(32)];
	for (let i = 0; i < 1000; i++) {
		m = new SortedMap(zip(shuffle(keys.slice()), repeat(1)));
		expect([...m.keys()]).toEqual(keys);
	}
});

test("fuzzSetDelete", () => {
	init();
	const s = defSortedMap<number, number>(null, {
		compare: (a, b) => a - b,
	});
	const N = 1e5;
	const M = 1e4;
	for (let i = 0; i < N; i++) {
		s.set((Math.random() * M) | 0, i);
		s.delete((Math.random() * M) | 0);
	}
});

test("updateValue", () => {
	init();
	m = defSortedMap(
		[
			["one", 1],
			["two", 2],
			["three", 3],
		],
		{ rnd: new XsAdd(0xdecafbad) }
	);
	expect([...m.values()]).toEqual([1, 3, 2]);
	m.set("one", 10);
	m.set("three", 30);
	expect([...m.values()]).toEqual([10, 30, 2]);
});
