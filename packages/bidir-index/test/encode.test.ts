// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import {
	decodeObject,
	decodeObjectIterator,
	defBidirIndex,
	encodeObject,
	encodeObjectIterator,
} from "../src/index.js";

test("encodeObject", () => {
	const index = defBidirIndex<string>();
	expect(encodeObject(index, { r: 1, g: 2, b: 3, a: 4 }, 0)).toEqual([
		1, 2, 3, 4,
	]);
	expect(encodeObject(index, { b: 3, r: 1, g: 2 }, 4, false)).toEqual([
		1, 2, 3, 4,
	]);
	expect(
		encodeObject(index, { b: 3, r: 1, g: 2, x: 5, y: 6, z: 7 }, 0, false)
	).toEqual([1, 2, 3, 0]);
});

test("encodeObjectBuffer", () => {
	const index = defBidirIndex<string>();
	expect([
		...encodeObjectIterator(
			index,
			[
				{ r: 1, g: 2, b: 3 },
				{ x: 4, y: 5, z: 6 },
			],
			0
		),
	]).toEqual([1, 2, 3, 0, 0, 0, 0, 0, 0, 4, 5, 6]);
});

test("decodeObject", () => {
	const index = defBidirIndex<string>();
	index.addAll(["r", "g", "b", "a", "foo"]);
	expect(decodeObject(index, [255, 128, 64], { a: 1 })).toEqual({
		r: 255,
		g: 128,
		b: 64,
		a: 1,
	});
	expect(decodeObject(index, [null, null, null, null, "bar"])).toEqual({
		foo: "bar",
	});
});

test("decodeObjectBuffer", () => {
	const index = defBidirIndex<string>();
	index.addAll("rgbxyz");
	expect([
		...decodeObjectIterator(
			index,
			[1, 2, 3, null, null, null, null, null, null, 4, 5, 6],
			index.size
		),
	]).toEqual([
		{ r: 1, g: 2, b: 3 },
		{ x: 4, y: 5, z: 6 },
	]);
});
