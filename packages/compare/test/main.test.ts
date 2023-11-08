import { expect, test } from "bun:test";
import {
	compareByKey,
	compareByKeys2,
	compareByKeys3,
	compareByKeys4,
} from "../src/index.js";

test("compareByKey", () => {
	const src = [
		{ a: 2, b: 2 },
		{ a: 1, b: 1 },
		{ a: 2, b: 1 },
		{ a: 1, b: 2, c: 3 },
	];
	const res = [
		{ a: 1, b: 1 },
		{ a: 1, b: 2, c: 3 },
		{ a: 2, b: 2 },
		{ a: 2, b: 1 },
	];
	expect([...src].sort(compareByKey("a"))).toEqual(res);
	expect([...src].sort(compareByKey((x) => x.a))).toEqual(res);
});

test("compareByKeys2", () => {
	const src = [
		{ a: 2, b: 2 },
		{ a: 1, b: 1 },
		{ a: 2, b: 1 },
		{ a: 1, b: 2, c: 3 },
	];
	const res = [
		{ a: 1, b: 1 },
		{ a: 1, b: 2, c: 3 },
		{ a: 2, b: 1 },
		{ a: 2, b: 2 },
	];
	expect([...src].sort(compareByKeys2("a", "b"))).toEqual(res);
	expect(
		[...src].sort(
			compareByKeys2(
				(x) => x.a,
				(x) => x.b
			)
		)
	).toEqual(res);
});

test("compareByKeys3", () => {
	const src = [
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 2, c: 1 },
		{ a: 1, b: 1, c: 3 },
		{ a: 0, b: 1, c: 4 },
	];
	const res = [
		{ a: 0, b: 1, c: 4 },
		{ a: 1, b: 1, c: 3 },
		{ a: 1, b: 2, c: 1 },
		{ a: 1, b: 2, c: 3 },
	];
	expect([...src].sort(compareByKeys3("a", "b", "c"))).toEqual(res);
	expect(
		[...src].sort(
			compareByKeys3(
				(x) => x.a,
				(x) => x.b,
				(x) => x.c
			)
		)
	).toEqual(res);
});

test("compareByKeys4", () => {
	const src = [
		{ a: 1, b: 2, c: 3, d: 3 },
		{ a: 1, b: 2, c: 3, d: 2 },
		{ a: 1, b: 2, c: 3, d: 0 },
		{ a: 1, b: 2, c: 3, d: 1 },
	];
	const res = [
		{ a: 1, b: 2, c: 3, d: 0 },
		{ a: 1, b: 2, c: 3, d: 1 },
		{ a: 1, b: 2, c: 3, d: 2 },
		{ a: 1, b: 2, c: 3, d: 3 },
	];
	expect([...src].sort(compareByKeys4("a", "b", "c", "d"))).toEqual(res);
	expect(
		[...src].sort(
			compareByKeys4(
				(x) => x.a,
				(x) => x.b,
				(x) => x.c,
				(x) => x.d
			)
		)
	).toEqual(res);
});
