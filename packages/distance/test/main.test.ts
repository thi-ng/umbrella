import { dist, distSq2, distSq3 } from "@thi.ng/vectors";
import { expect, test } from "bun:test";
import {
	DIST_SQ1,
	DIST_SQ2,
	DIST_SQ3,
	EUCLEDIAN1,
	EUCLEDIAN2,
	EUCLEDIAN3,
	knearestN,
	nearestN,
} from "../src/index.js";

test("eucledian1", () => {
	expect(EUCLEDIAN1.to(10)).toBe(10);
	expect(EUCLEDIAN1.from(10)).toBe(10);
	expect(EUCLEDIAN1.metric(5, 10)).toBe(5);
});

test("eucledian2", () => {
	expect(EUCLEDIAN2.metric([5, 10], [-5, -10])).toBe(
		dist([5, 10], [-5, -10])
	);
});

test("eucledian3", () => {
	expect(EUCLEDIAN3.metric([5, 10, -20], [-5, -10, 20])).toBe(
		dist([5, 10, -20], [-5, -10, 20])
	);
});

test("squared1", () => {
	expect(DIST_SQ1.to(10)).toBe(100);
	expect(DIST_SQ1.from(100)).toBe(10);
	expect(DIST_SQ1.metric(5, 10)).toBe(25);
});

test("squared2", () => {
	expect(DIST_SQ2.metric([5, 10], [-5, -10])).toBe(
		distSq2([5, 10], [-5, -10])
	);
});

test("squared3", () => {
	expect(DIST_SQ3.metric([5, 10, -20], [-5, -10, 20])).toBe(
		distSq3([5, 10, -20], [-5, -10, 20])
	);
});

test("nearestN (inf)", () => {
	const a = nearestN<number>(10, Infinity, DIST_SQ1);
	expect([5, 9, 12, 11].map((x) => a.consider(x, x))).toEqual([25, 1, 4, 1]);
	expect(a.deref()).toEqual([1, 11]);
});

test("nearestN (radius)", () => {
	const a = nearestN<number>(10, 2, DIST_SQ1);
	expect([5, 9, 12, 11].map((x) => a.consider(x, x))).toEqual([25, 1, 4, 1]);
	expect(a.deref()).toEqual([1, 11]);
});

test("knearestN (inf)", () => {
	const a = knearestN<number>(10, 2, Infinity, DIST_SQ1, true);
	expect([5, 8, 13, 11].map((x) => a.consider(x, x))).toEqual([25, 4, 9, 1]);
	expect(a.deref()).toEqual([
		[1, 11],
		[4, 8],
	]);
});

test("knearestN (radius)", () => {
	const a = knearestN<number>(10, 2, 2, DIST_SQ1, true);
	expect([5, 8, 13, 11].map((x) => a.consider(x, x))).toEqual([25, 4, 9, 1]);
	expect(a.deref()).toEqual([
		[1, 11],
		[4, 8],
	]);
});
