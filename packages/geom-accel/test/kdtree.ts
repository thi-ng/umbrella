import { group } from "@thi.ng/testament";
import { mapIndexed } from "@thi.ng/transducers";
import { distHaversineLatLon, ReadonlyVec } from "@thi.ng/vectors";
import * as assert from "assert";
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

group(
	"KdTreeMap - 3D",
	{
		ctor: () => {
			assert.deepEqual(treeMap.dim, 3);
			assert.deepEqual(treeMap.height, 2);
		},
	},
	{
		beforeEach: () => {
			treeMap = new KdTreeMap(3, pairs3D);
		},
	}
);

group(
	"KdTreeMap - 2D",
	{
		ctor: () => {
			assert.deepEqual(treeMap.dim, 2);
			assert.deepEqual(treeMap.height, 3);
			assert.deepEqual(treeMap.size, 4);
		},
		query: () => {
			assert.deepEqual(treeMap.query([85, 180], Infinity, 1), [
				[[70, 180], 2],
			]);
		},
		"haversine distance / query": () => {
			treeMap = new KdTreeMap(2, pairs2D, distHaversineLatLon);
			assert.deepEqual(treeMap.query([85, 180], Infinity, 1), [
				[[85, 0], 1],
			]);
		},
	},
	{
		beforeEach: () => {
			treeMap = new KdTreeMap(2, pairs2D);
		},
	}
);

group(
	"KdTreeSet - 2D",
	{
		ctor: () => {
			assert.deepEqual(treeSet.size, 4);
		},
		query: () => {
			assert.deepEqual(treeSet.query([85, 180], Infinity, 1), [
				[
					[70, 180],
					[70, 180],
				],
			]);
		},
		"haversine distance / query": () => {
			treeSet = new KdTreeSet(2, pts2D, distHaversineLatLon);
			assert.deepEqual(treeSet.query([85, 180], Infinity, 1), [
				[
					[85, 0],
					[85, 0],
				],
			]);
		},
	},
	{
		beforeEach: () => {
			treeSet = new KdTreeSet(2, pts2D);
		},
	}
);
