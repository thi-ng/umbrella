import { expect, test } from "bun:test";
import { ArraySet, join, joinWith } from "../src/index.js";

test("simple", () => {
	const a = new ArraySet([{ a: 1 }, { a: 2 }]);
	const b = new ArraySet([{ b: 1 }, { b: 2 }]);
	expect(join(a, b)).toEqual(
		new ArraySet([
			{ a: 1, b: 1 },
			{ a: 2, b: 1 },
			{ a: 1, b: 2 },
			{ a: 2, b: 2 },
		])
	);
});

test("simple isec", () => {
	const a = new ArraySet([
		{ id: "a", type: 1 },
		{ id: "b", type: 1 },
		{ id: "c", type: 2 },
	]);
	const b = new ArraySet([
		{ type: 1, label: "foo" },
		{ type: 2, label: "bar" },
		{ type: 3, label: "baz" },
	]);
	expect(join(a, b)).toEqual(
		new ArraySet([
			{ id: "a", type: 1, label: "foo" },
			{ id: "b", type: 1, label: "foo" },
			{ id: "c", type: 2, label: "bar" },
		])
	);
});

test("joinWith", () => {
	const a = new ArraySet([
		{ id: "a", type: 1 },
		{ id: "b", type: 1 },
		{ id: "c", type: 2 },
	]);
	const b = new ArraySet([
		{ xyz: 1, label: "foo" },
		{ xyz: 2, label: "bar" },
		{ xyz: 3, label: "baz" },
	]);
	expect(joinWith(a, b, { type: "xyz" })).toEqual(
		new ArraySet([
			{ id: "a", type: 1, xyz: 1, label: "foo" },
			{ id: "b", type: 1, xyz: 1, label: "foo" },
			{ id: "c", type: 2, xyz: 2, label: "bar" },
		])
	);
});
