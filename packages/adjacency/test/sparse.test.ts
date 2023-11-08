import { expect, test } from "bun:test";
import { defAdjMatrix, type Edge } from "../src/index.js";

const edges: Edge[] = [
	[2, 3],
	[0, 1],
	[5, 4],
	[2, 0],
];

test("adjacency sparse edges directed", () => {
	const m = defAdjMatrix(4, [], false);
	m.addEdge(1, 2);
	expect(m.hasEdge(1, 2)).toBeTrue();
	expect(m.hasEdge(2, 1)).toBeFalse();
	expect(m.neighbors(1)).toEqual([2]);
	expect(m.neighbors(2)).toEqual([]);
	expect(m.degree(1)).toBe(1);
	expect([...m.edges()]).toEqual([[1, 2]]);
});

test("adjacency sparse fromEdges, undirected", () => {
	const m = defAdjMatrix(6, edges, true);
	expect(m.rows).toEqual([0, 2, 3, 5, 6, 7, 8]);
	expect(m.cols).toEqual([1, 2, 0, 0, 3, 2, 5, 4]);
	expect(m.numEdges()).toBe(4);
	expect([...m.edges()]).toEqual([
		[0, 1],
		[0, 2],
		[2, 3],
		[4, 5],
	]);
});

test("adjacency (sparse) hasVertex", () => {
	const m = defAdjMatrix(
		6,
		[
			[0, 1],
			[5, 4],
		],
		true
	);
	expect(m.hasVertex(0)).toBeTrue();
	expect(m.hasVertex(5)).toBeTrue();
	expect(m.hasVertex(1)).toBeTrue();
	expect(m.hasVertex(4)).toBeTrue();
	expect(m.hasVertex(2)).toBeFalse();
	expect(m.hasVertex(3)).toBeFalse();
});
