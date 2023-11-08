import { swizzle } from "@thi.ng/arrays";
import { describe, expect, test } from "bun:test";
import {
	iterator,
	map,
	permutations,
	permutationsN,
	range,
} from "../src/index.js";

describe("permutations", () => {
	test("empty", () => {
		expect([...permutations([])]).toEqual([]);
		expect([...permutations("")]).toEqual([]);
		expect([...permutations(range(0))]).toEqual([]);
		expect([...permutations([], [])]).toEqual([]);
		expect([...permutations([], "")]).toEqual([]);
		expect([...permutations(range(0), "")]).toEqual([]);
		expect([...permutations([], "a")]).toEqual([]);
		expect([...permutations("", "a")]).toEqual([]);
		expect([...permutations("", "ab")]).toEqual([]);
		expect([...permutations.apply(null, [])]).toEqual([]);
	});

	test("single", () => {
		expect([...permutations("a", "-", range(1))]).toEqual([["a", "-", 0]]);
		expect([...permutations("a", "-", range(2))]).toEqual([
			["a", "-", 0],
			["a", "-", 1],
		]);
		expect([...permutations("a", "-+", range(2))]).toEqual([
			["a", "-", 0],
			["a", "-", 1],
			["a", "+", 0],
			["a", "+", 1],
		]);
	});

	test("transformed", () => {
		expect([
			...iterator(
				map((x: any[]) => x.join("")),
				permutations("ab", "-", range(2))
			),
		]).toEqual(["a-0", "a-1", "b-0", "b-1"]);
	});

	test("swizzle", () => {
		expect([
			...iterator(
				map((x: string[]) => swizzle(x)({ x: 0, y: 1, z: 2 })),
				permutations("xyz", "xyz", "xyz")
			),
		]).toEqual([...permutationsN(3)]);
	});
});

describe("permutationsN", () => {
	test("empty", () => {
		expect([...permutationsN(0)]).toEqual([]);
	});

	test("one", () => {
		expect([...permutationsN(1)]).toEqual([[0]]);
	});

	test("two", () => {
		expect([...permutationsN(2)]).toEqual([
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
		]);
	});

	test("two/three", () => {
		expect([...permutationsN(2, 3)]).toEqual([
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 0],
			[2, 1],
			[2, 2],
		]);
	});

	test("with offsets", () => {
		expect([...permutationsN(2, 2, [100, 1000])]).toEqual([
			[100, 1000],
			[100, 1001],
			[101, 1000],
			[101, 1001],
		]);
	});

	test("insufficient offsets", () => {
		expect(() => permutationsN(2, 2, [0])).toThrow();
	});
});
