import { mapIndexed } from "@thi.ng/transducers";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { beforeEach, describe, expect, test } from "bun:test";
import { NdQuadtreeMap } from "../src/index.js";

const pts = new Set<ReadonlyVec>([
	[10, 20, 30],
	[60, 70, 80],
	[44, 55, 66],
]);

const pairs = new Set(mapIndexed((i, p) => <[ReadonlyVec, number]>[p, i], pts));

let tree: NdQuadtreeMap<ReadonlyVec, any>;

describe("NdTree", () => {
	beforeEach(() => {
		tree = NdQuadtreeMap.fromMinMax([0, 0, 0], [100, 100, 100]);
	});

	test("ctor", () => {
		expect(tree.root.pos).toEqual([50, 50, 50]);
		expect(tree.root.ext).toEqual([50, 50, 50]);
	});

	test("into / get / has", () => {
		expect(tree.into(pairs)).toBeTrue();
		for (let p of pairs) {
			expect(tree.has(p[0])).toBeTrue();
			expect(tree.get(p[0])).toBe(p[1]);
		}
	});

	test("add duplicate", () => {
		tree.into(pairs);
		expect(tree.set([10, 20, 30], 10)).toBeFalse();
		expect(tree.set([10.01, 20, 30], 100, 0.1)).toBeFalse();
		// TODO check new value
	});

	test("iterators", () => {
		tree.into(pairs);
		expect(new Set(tree)).toEqual(pairs);
		expect(new Set(tree.keys())).toEqual(pts);
	});

	test("selectKeys", () => {
		tree.into(pairs);
		expect(new Set(tree.queryKeys([50, 50, 50], 100, Infinity))).toEqual(
			pts
		);
		expect(new Set(tree.queryKeys([50, 50, 50], 50, Infinity))).toEqual(
			new Set([
				[44, 55, 66],
				[60, 70, 80],
			])
		);
		expect(new Set(tree.queryKeys([20, 20, 20], 15, Infinity))).toEqual(
			new Set([[10, 20, 30]])
		);
	});
});
