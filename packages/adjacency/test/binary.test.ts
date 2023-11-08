import { expect, test } from "bun:test";
import { defAdjBitMatrix, type Edge } from "../src/index.js";

const edges: Edge[] = [
	[2, 3],
	[0, 1],
	[5, 4],
	[2, 0],
];

test("adjacency bitmatrix directed", () => {
	const m = defAdjBitMatrix(6, edges, false);
	expect([...m.mat.data.slice(0, 6)]).toEqual([
		0b0100_0000, 0, 0b1001_0000, 0, 0, 0b0000_1000,
	]);
	expect(m.numEdges()).toBe(edges.length);
	expect(m.hasEdge(2, 3)).toBeTrue();
	expect(m.hasEdge(3, 2)).toBeFalse();
	expect(m.neighbors(0)).toEqual([1]);
	expect(m.neighbors(1)).toEqual([]);
	expect(m.neighbors(2)).toEqual([0, 3]);
	expect(m.degree(1)).toBe(0);
	expect(m.degree(2)).toBe(2);
	expect(m.degree(5)).toBe(1);
	expect([...m.edges()]).toEqual([
		[5, 4],
		[2, 0],
		[2, 3],
		[0, 1],
	]);
	expect(m.toString()).toBe(
		"01000000\n00000000\n10010000\n00000000\n00000000\n00001000"
	);
});

test("adjacency bitmatrix undirected", () => {
	const m = defAdjBitMatrix(6, edges, true);
	expect([...m.mat.data.slice(0, 6)]).toEqual([
		0b0110_0000, 0b1000_0000, 0b1001_0000, 0b0010_0000, 0b0000_0100,
		0b0000_1000,
	]);
	expect(m.numEdges()).toBe(edges.length);
	expect(m.hasEdge(2, 3)).toBeTrue();
	expect(m.hasEdge(3, 2)).toBeTrue();
	expect(m.neighbors(0)).toEqual([1, 2]);
	expect(m.neighbors(1)).toEqual([0]);
	expect(m.neighbors(2)).toEqual([0, 3]);
	expect(m.degree(1)).toBe(1);
	expect(m.degree(2)).toBe(2);
	expect(m.degree(5)).toBe(1);
	expect([...m.edges()]).toEqual([
		[4, 5],
		[2, 3],
		[0, 1],
		[0, 2],
	]);
});

test("adjacency bitmatrix hasVertex", () => {
	const m = defAdjBitMatrix(
		6,
		[
			[0, 1],
			[5, 4],
		] satisfies typeof edges,
		true
	);
	expect(m.hasVertex(0)).toBeTrue();
	expect(m.hasVertex(1)).toBeTrue();
	expect(m.hasVertex(2)).toBeFalse();
	expect(m.hasVertex(3)).toBeFalse();
	expect(m.hasVertex(4)).toBeTrue();
	expect(m.hasVertex(5)).toBeTrue();
});
