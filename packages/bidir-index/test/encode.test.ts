// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { decodeObject, defBidirIndex, encodeObject } from "../src/index.js";

test("encodeObject", () => {
	const index = defBidirIndex<string>();
	expect(encodeObject(index, { r: 255, g: 128, b: 64, a: 1 }, 0)).toEqual([
		255, 128, 64, 1,
	]);
	expect(encodeObject(index, { b: 3, r: 1, g: 2 }, 4, false)).toEqual([
		1, 2, 3, 4,
	]);
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
