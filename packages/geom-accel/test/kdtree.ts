import { group } from "@thi.ng/testament";
import { mapIndexed } from "@thi.ng/transducers";
import { distHaversineLatLon, ReadonlyVec } from "@thi.ng/vectors";
import * as assert from "assert";
import { KdTreeMap } from "../src/index.js";

const pts3D = new Set<ReadonlyVec>([
    [10, 20, 30],
    [60, 70, 80],
    [44, 55, 66],
]);

const pairs3D = new Set(mapIndexed((i, p) => <[ReadonlyVec, number]>[p, i], pts3D));

const pts2D = new Set<ReadonlyVec>([
    [0, 0],
    [85, 0],
    [70, 180],
    [-90, 45],
]);

const pairs2D = new Set(mapIndexed((i, p) => <[ReadonlyVec, number]>[p, i], pts2D));

let tree: KdTreeMap<ReadonlyVec, any>;

group(
    "KdTree - 3D",
    {
        ctor: () => {
            assert.deepEqual(tree.dim, 3);
            assert.deepEqual(tree.height, 2);
        },
    },
    {
        beforeEach: () => {
            tree = new KdTreeMap(3, pairs3D);
        }
    }
);

group(
    "KdTree - 2D",
    {
        ctor: () => {
            assert.deepEqual(tree.dim, 2);
            assert.deepEqual(tree.height, 3);
        },
        query: () => {
            assert.deepEqual(tree.query([85, 180], Infinity, 1), [[[70, 180], 2]]);
        },
        "haversine tree / query": () => {
            tree = new KdTreeMap(2, pairs2D, distHaversineLatLon);
            assert.deepEqual(tree.query([85, 180], Infinity, 1), [[[85, 0], 1]]);
        }
    },
    {
        beforeEach: () => {
            tree = new KdTreeMap(2, pairs2D);
        }
    }
);
