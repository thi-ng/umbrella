import { expect, test } from "bun:test";
import { juxt } from "../src/index.js";

test("2-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x * 10
	);
	expect(a(1)).toEqual([2, 10]);
});

test("3-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x * 10,
		(x: number) => "id-" + x
	);
	expect(a(1)).toEqual([2, 10, "id-1"]);
});

test("4-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x * 10,
		(x: number) => "id-" + x,
		(x: number) => [x, x]
	);
	expect(a(1)).toEqual([2, 10, "id-1", [1, 1]]);
});

test("5-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x * 10,
		(x: number) => "id-" + x,
		(x: number) => [x, x],
		(x: number) => ({ a: x })
	);
	expect(a(1)).toEqual([2, 10, "id-1", [1, 1], { a: 1 }]);
});

test("6-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x - 1,
		(x: number) => x * 10,
		(x: number) => "id-" + x,
		(x: number) => [x, x],
		(x: number) => ({ a: x })
	);
	expect(a(1)).toEqual([2, 0, 10, "id-1", [1, 1], { a: 1 }]);
});

test("7-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x - 1,
		(x: number) => x * 10,
		(x: number) => x * 100,
		(x: number) => "id-" + x,
		(x: number) => [x, x],
		(x: number) => ({ a: x })
	);
	expect(a(1)).toEqual([2, 0, 10, 100, "id-1", [1, 1], { a: 1 }]);
});

test("8-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x - 1,
		(x: number) => x * 10,
		(x: number) => x * 100,
		(x: number) => x * 1000,
		(x: number) => "id-" + x,
		(x: number) => [x, x],
		(x: number) => ({ a: x })
	);
	expect(a(1)).toEqual([2, 0, 10, 100, 1000, "id-1", [1, 1], { a: 1 }]);
});

test("9-args", () => {
	const a = juxt(
		(x: number) => x + 1,
		(x: number) => x - 1,
		(x: number) => x * 10,
		(x: number) => x * 100,
		(x: number) => x * 1000,
		(x: number) => x * 10000,
		(x: number) => "id-" + x,
		(x: number) => [x, x],
		(x: number) => ({ a: x })
	);
	expect(a(1)).toEqual([
		2,
		0,
		10,
		100,
		1000,
		10000,
		"id-1",
		[1, 1],
		{ a: 1 },
	]);
});
