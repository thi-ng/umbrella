import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { defAdjBitMatrix, type Edge } from "../src/index.js";

const edges: Edge[] = [
	[2, 3],
	[0, 1],
	[5, 4],
	[2, 0],
];

group("adjacency (bitmatrix)", {
	directed: () => {
		const m = defAdjBitMatrix(6, edges, false);
		assert.deepStrictEqual(
			[...m.mat.data.slice(0, 6)],
			[0b0100_0000, 0, 0b1001_0000, 0, 0, 0b0000_1000],
			"data"
		);
		assert.strictEqual(m.numEdges(), edges.length);
		assert.ok(m.hasEdge(2, 3));
		assert.ok(!m.hasEdge(3, 2));
		assert.deepStrictEqual(m.neighbors(0), [1]);
		assert.deepStrictEqual(m.neighbors(1), []);
		assert.deepStrictEqual(m.neighbors(2), [0, 3]);
		assert.strictEqual(m.degree(1), 0);
		assert.strictEqual(m.degree(2), 2);
		assert.strictEqual(m.degree(5), 1);
		assert.deepStrictEqual(
			[...m.edges()],
			[
				[5, 4],
				[2, 0],
				[2, 3],
				[0, 1],
			]
		);
		// console.log(m.toString());
	},

	undirected: () => {
		const m = defAdjBitMatrix(6, edges, true);
		assert.deepStrictEqual(
			[...m.mat.data.slice(0, 6)],
			[
				0b0110_0000, 0b1000_0000, 0b1001_0000, 0b0010_0000, 0b0000_0100,
				0b0000_1000,
			],
			"data"
		);
		assert.strictEqual(m.numEdges(), edges.length);
		assert.ok(m.hasEdge(2, 3));
		assert.ok(m.hasEdge(3, 2));
		assert.deepStrictEqual(m.neighbors(0), [1, 2]);
		assert.deepStrictEqual(m.neighbors(1), [0]);
		assert.deepStrictEqual(m.neighbors(2), [0, 3]);
		assert.strictEqual(m.degree(1), 1);
		assert.strictEqual(m.degree(2), 2);
		assert.strictEqual(m.degree(5), 1);
		assert.deepStrictEqual(
			[...m.edges()],
			[
				[4, 5],
				[2, 3],
				[0, 1],
				[0, 2],
			],
			"edges"
		);
	},
});
