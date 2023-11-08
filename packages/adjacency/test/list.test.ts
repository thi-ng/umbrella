import { expect, test } from "bun:test";
import { defAdjList } from "../src/index.js";

test("adjacency list directed", () => {
	const m = defAdjList([
		[1, 2],
		[2, 0],
	]);
	expect(m.hasEdge(1, 2)).toBeTrue();
	expect(m.hasEdge(2, 0)).toBeTrue();
	expect(m.hasEdge(2, 1)).toBeFalse();
	expect(m.hasEdge(0, 2)).toBeFalse();
	expect(m.neighbors(1)).toEqual([2]);
	expect(m.neighbors(2)).toEqual([0]);
	expect(m.degree(1)).toBe(1);
	expect([...m.edges()]).toEqual([
		[1, 2],
		[2, 0],
	]);
	// console.log(m.toString());
});

test("adjacency list hasVertex", () => {
	const m = defAdjList([
		[1, 2],
		[2, 0],
	]);
	expect(m.hasVertex(0)).toBeTrue();
	expect(m.hasVertex(1)).toBeTrue();
	expect(m.hasVertex(2)).toBeTrue();
	expect(m.hasVertex(3)).toBeFalse();
});
