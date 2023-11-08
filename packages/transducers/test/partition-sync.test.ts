import { expect, test } from "bun:test";
import { partitionSync, step } from "../src/index.js";

const src = [
	["a", 1],
	["a", 2],
	["d", 100],
	["b", 10],
	["b", 11],
	["c", 0],
	["a", 3],
];

test("default behavior", () => {
	expect([...partitionSync(["a", "b"], { key: (x) => x[0] }, src)]).toEqual([
		{ a: ["a", 2], b: ["b", 10] },
		{ b: ["b", 11], a: ["a", 3] },
	]);
});

test("no reset", () => {
	expect([
		...partitionSync(
			["a", "b"],
			{
				key: (x) => x[0],
				reset: false,
			},
			src
		),
	]).toEqual([
		{ a: ["a", 2], b: ["b", 10] },
		{ a: ["a", 2], b: ["b", 11] },
		{ a: ["a", 3], b: ["b", 11] },
	]);
});

test("key removal (via set only)", () => {
	const keys = new Set(["a", "b", "t"]);
	const f = step(
		partitionSync(keys, {
			key: (x: any) => x[0],
			reset: false,
		})
	);

	expect(f(["t", 0])).toBeUndefined();
	expect(f(["a", 0])).toBeUndefined();
	keys.delete("a");
	expect(f(["t", 1])).toBeUndefined();
	expect(f(["a", 1])).toBeUndefined();
	expect(f(["b", 2])).toEqual({
		a: ["a", 0],
		t: ["t", 1],
		b: ["b", 2],
	});
	expect(f(["t", 2])).toEqual({
		a: ["a", 0],
		t: ["t", 2],
		b: ["b", 2],
	});
});

test("key add/removal (hook)", () => {
	const keys = new Set(["a", "b", "t"]);
	const xform = partitionSync(keys, {
		key: (x: any) => x[0],
		reset: false,
	});
	const f = step(xform);

	expect(f(["t", 0])).toBeUndefined();
	expect(f(["a", 0])).toBeUndefined();
	xform.delete("a");
	expect(keys).toEqual(new Set(["b", "t"]));
	expect(f(["t", 1])).toBeUndefined();
	expect(f(["a", 1])).toBeUndefined();
	expect(f(["b", 2])).toEqual({
		t: ["t", 1],
		b: ["b", 2],
	});
	xform.add("a");
	expect(xform.keys()).toEqual(new Set(["a", "b", "t"]));
	expect(f(["a", 2])).toEqual({
		a: ["a", 2],
		t: ["t", 1],
		b: ["b", 2],
	});
	xform.clear();
	expect(f(["a", 3])).toBeUndefined();
	xform.add("a");
	expect(f(["a", 4])).toEqual({ a: ["a", 4] });
});

test("back pressure", () => {
	expect([
		...partitionSync(
			["a", "b", "c"],
			{ backPressure: 3, key: (x) => x[0], all: false },
			// prettier-ignore
			["a1", "b1", "a2", "c1", "c2", "a3", "a4", "b2", "c3", "b3", "b4", "c4", "c5"]
		),
	]).toEqual([
		{ a: "a1", b: "b1", c: "c1" },
		{ a: "a2", c: "c2", b: "b2" },
		{ a: "a3", c: "c3", b: "b3" },
		{ a: "a4", b: "b4", c: "c4" },
	]);
	expect(() => [
		...partitionSync(["a", "b"], { backPressure: 1, key: (x) => x[0] }, [
			"a1",
			"a2",
		]),
	]).toThrow();
});
