// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import {
	push,
	range,
	range2d,
	rangeNd,
	reduce,
	reduced,
} from "../src/index.js";

describe("range", () => {
	test("$reduce", () => {
		expect(reduce(push(), range(4))).toEqual([0, 1, 2, 3]);
		expect(reduce(push(), range(2, 4, 0.5))).toEqual([2, 2.5, 3, 3.5]);
		expect(reduce(push(), range(4, 0))).toEqual([4, 3, 2, 1]);
		expect(reduce(push(), range(4, 2, -0.5))).toEqual([4, 3.5, 3, 2.5]);
	});

	test("$reduce (reduced)", () => {
		expect(
			reduce([() => 0, (x) => x, (_, x) => reduced(x)], range(100, 200))
		).toEqual(100);
	});
});

describe("range2d", () => {
	test("forward", () => {
		expect([...range2d(0, 3, 1, 3)]).toEqual([
			[0, 1],
			[1, 1],
			[2, 1],
			[0, 2],
			[1, 2],
			[2, 2],
		]);
	});

	test("forward w/ step", () => {
		expect([...range2d(0, 5, 1, 6, 2, 3)]).toEqual([
			[0, 1],
			[2, 1],
			[4, 1],
			[0, 4],
			[2, 4],
			[4, 4],
		]);
	});

	test("reverse", () => {
		expect([...range2d(3, 0, 3, 1)]).toEqual([
			[3, 3],
			[2, 3],
			[1, 3],
			[3, 2],
			[2, 2],
			[1, 2],
		]);
	});

	test("reverse w/ step", () => {
		expect([...range2d(5, 0, 6, 1, -2, -3)]).toEqual([
			[5, 6],
			[3, 6],
			[1, 6],
			[5, 3],
			[3, 3],
			[1, 3],
		]);
	});

	test("empty w/ wrong step sign (x)", () => {
		expect([...range2d(0, 1, 0, 1, -1, 1)]).toEqual([]);
	});

	test("empty w/ wrong step sign (y)", () => {
		expect([...range2d(0, 1, 0, 1, 1, -1)]).toEqual([]);
	});

	test("single output", () => {
		expect([...range2d(0, 1, 0, 1)]).toEqual([[0, 0]]);
	});
});

describe("rangeNd", () => {
	test("0d", () => {
		expect([...rangeNd([])]).toEqual([]);
	});

	test("1d", () => {
		expect([...rangeNd([2])]).toEqual([[0], [1]]);
		expect([...rangeNd([-2], [2])]).toEqual([[-2], [-1], [0], [1]]);
	});

	test("2d", () => {
		expect([...rangeNd([2, -2])]).toEqual([
			[0, 0],
			[0, -1],
			[1, 0],
			[1, -1],
		]);
		expect([...rangeNd([-2, -2], [2, 2])]).toEqual([
			[-2, -2],
			[-2, -1],
			[-2, 0],
			[-2, 1],
			[-1, -2],
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -2],
			[0, -1],
			[0, 0],
			[0, 1],
			[1, -2],
			[1, -1],
			[1, 0],
			[1, 1],
		]);
	});

	test("3d", () => {
		expect([...rangeNd([2, 2, 2])]).toEqual([
			[0, 0, 0],
			[0, 0, 1],
			[0, 1, 0],
			[0, 1, 1],
			[1, 0, 0],
			[1, 0, 1],
			[1, 1, 0],
			[1, 1, 1],
		]);
	});
});
