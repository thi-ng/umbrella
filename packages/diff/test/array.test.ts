import { expect, test } from "bun:test";
import { diffArray, type ArrayDiff } from "../src/index.js";

const state = <ArrayDiff<number>>{
	distance: 0,
	adds: {},
	dels: {},
	const: {},
	linear: [],
};

test("simple (null,null)", () => {
	expect(diffArray(null, null)).toEqual(state);
});

test("simple (null,arr)", () => {
	expect(diffArray(null, [1, 2, 3])).toEqual(<ArrayDiff<number>>{
		...state,
		distance: 3,
		adds: { 0: 1, 1: 2, 2: 3 },
		linear: [1, 0, 1, 1, 1, 2, 1, 2, 3],
	});
});

test("simple (arr, null)", () => {
	expect(diffArray([1, 2, 3], null)).toEqual(<ArrayDiff<number>>{
		...state,
		distance: 3,
		dels: { 0: 1, 1: 2, 2: 3 },
		linear: [-1, 0, 1, -1, 1, 2, -1, 2, 3],
	});
});

test("diff last", () => {
	expect(diffArray([1, 2, 3], [1, 2, 4])).toEqual(<ArrayDiff<number>>{
		distance: 2,
		adds: { 2: 4 },
		dels: { 2: 3 },
		const: { 0: 1, 1: 2 },
		linear: [0, 0, 1, 0, 1, 2, -1, 2, 3, 1, 2, 4],
	});
});

test("diff 2nd last", () => {
	expect(diffArray([1, 2, 3, 4], [1, 2, 5, 4])).toEqual(<ArrayDiff<number>>{
		distance: 2,
		adds: { 2: 5 },
		dels: { 2: 3 },
		const: { 0: 1, 1: 2, 3: 4 },
		linear: [0, 0, 1, 0, 1, 2, -1, 2, 3, 1, 2, 5, 0, 3, 4],
	});
});

test("diff insert 2nd last", () => {
	expect(diffArray([1, 2, 3, 4], [1, 2, 3, 5, 4])).toEqual(<
		ArrayDiff<number>
	>{
		distance: 1,
		adds: { 3: 5 },
		dels: {},
		const: { 0: 1, 1: 2, 2: 3, 3: 4 },
		linear: [0, 0, 1, 0, 1, 2, 0, 2, 3, 1, 3, 5, 0, 3, 4],
	});
});

test("diff insert 2nd last (changes only)", () => {
	expect(diffArray([1, 2, 3, 4], [1, 2, 3, 5, 4], "minimal")).toEqual(<
		ArrayDiff<number>
	>{
		distance: 1,
		adds: {},
		dels: {},
		const: {},
		linear: [1, 3, 5],
	});
});
