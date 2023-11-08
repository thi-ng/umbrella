import { mapIndexed } from "@thi.ng/transducers";
import { distHaversineLatLon, type ReadonlyVec } from "@thi.ng/vectors";
import { beforeEach, describe, expect, test } from "bun:test";
import { KdTreeMap, KdTreeSet } from "../src/index.js";

const pts3D = new Set<ReadonlyVec>([
	[10, 20, 30],
	[60, 70, 80],
	[44, 55, 66],
]);

const pairs3D = new Set(
	mapIndexed((i, p) => <[ReadonlyVec, number]>[p, i], pts3D)
);

const pts2D = new Set<ReadonlyVec>([
	[0, 0],
	[85, 0],
	[70, 180],
	[-90, 45],
]);

const pairs2D = new Set(
	mapIndexed((i, p) => <[ReadonlyVec, number]>[p, i], pts2D)
);

let treeMap: KdTreeMap<ReadonlyVec, any>;
let treeSet: KdTreeSet<ReadonlyVec>;

describe("KdTreeMap - 3D", () => {
	beforeEach(() => {
		treeMap = new KdTreeMap(3, pairs3D);
	});

	test("ctor", () => {
		expect(treeMap.dim).toBe(3);
		expect(treeMap.height).toBe(2);
	});
});

describe("KdTreeMap - 2D", () => {
	beforeEach(() => {
		treeMap = new KdTreeMap(2, pairs2D);
	});

	test("ctor", () => {
		expect(treeMap.dim).toBe(2);
		expect(treeMap.height).toBe(3);
		expect(treeMap.size).toBe(4);
	});

	test("query", () => {
		expect(treeMap.query([85, 180], Infinity, 1)).toEqual([[[70, 180], 2]]);
	});

	test("haversine distance / query", () => {
		treeMap = new KdTreeMap(2, pairs2D, distHaversineLatLon);
		expect(treeMap.query([85, 180], Infinity, 1)).toEqual([[[85, 0], 1]]);
	});
});

describe("KdTreeSet - 2D", () => {
	beforeEach(() => {
		treeSet = new KdTreeSet(2, pts2D);
	});

	test("ctor", () => {
		expect(treeSet.size).toBe(4);
	});

	test("query", () => {
		expect(treeSet.query([85, 180], Infinity, 1)).toEqual([
			[
				[70, 180],
				[70, 180],
			],
		]);
	});

	test("haversine distance / query", () => {
		treeSet = new KdTreeSet(2, pts2D, distHaversineLatLon);
		expect(treeSet.query([85, 180], Infinity, 1)).toEqual([
			[
				[85, 0],
				[85, 0],
			],
		]);
	});
});
