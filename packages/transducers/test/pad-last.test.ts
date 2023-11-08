import { expect, test } from "bun:test";
import { padLast } from "../src/index.js";

test("all", () => {
	expect([...padLast(8, 0, [])]).toEqual([]);
	expect([...padLast(8, 0, [1])]).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
	expect([...padLast(8, 0, [1, 2, 3, 4, 5])]).toEqual([
		1, 2, 3, 4, 5, 0, 0, 0,
	]);
	expect([...padLast(2, 0, [1, 2, 3])]).toEqual([1, 2, 3, 0]);
	expect([...padLast(2, 0, [1, 2, 3, 4])]).toEqual([1, 2, 3, 4]);
});
