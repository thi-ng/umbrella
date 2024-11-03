import { expect, test } from "bun:test";
import { donchian, movingMaximum, movingMinimum } from "../src/index.js";

test("movingMaxium", () => {
	expect([...movingMaximum(3, [1, 3, 1, 1, 4, 1, 1, 2, 5, 6])]).toEqual([
		3, 3, 4, 4, 4, 2, 5, 6,
	]);
});

test("movingMinium", () => {
	expect([...movingMinimum(3, [1, 3, 1, 1, 4, 1, 1, 2, 5, 6])]).toEqual([
		1, 1, 1, 1, 1, 1, 1, 2,
	]);
});

test("donchian", () => {
	expect([...donchian(3, [1, 3, 1, 1, 4, 1, 1, 2, 5, 6])]).toEqual([
		[1, 3],
		[1, 3],
		[1, 4],
		[1, 4],
		[1, 4],
		[1, 2],
		[1, 5],
		[2, 6],
	]);
});
