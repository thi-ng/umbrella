import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { DGraph } from "../src/index.js"

let g: DGraph<any>;

group(
    "dgraph",
    {
        depends: () => {
            assert.ok(g.depends([1, 2], [10, 20]));
            assert.ok(!g.depends([10, 20], [1, 2]));
        },

        dependent: () => {
            assert.ok(g.dependent([10, 20], [1, 2]));
            assert.ok(!g.dependent([1, 2], [10, 20]));
        },

        isLeaf: () => {
            assert.ok(g.isLeaf([1, 2]));
            assert.ok(!g.isLeaf([10, 20]));
            assert.ok(!g.isLeaf([3, 4]));
        },

        isRoot: () => {
            assert.ok(g.isRoot([10, 20]));
            assert.ok(g.isRoot([30, 40]));
            assert.ok(!g.isRoot([3, 4]));
        },

        cyclic: () => {
            assert.throws(() => g.addDependency([10, 20], [1, 2]));
            assert.throws(() => g.addDependency([1, 2], [1, 2]));
        },

        sort: () => {
            assert.deepStrictEqual(g.sort(), [
                [30, 40],
                [3, 4],
                [10, 20],
                [1, 2],
            ]);
            g.addDependency([30, 40], [50, 60]);
            assert.deepStrictEqual(g.sort(), [
                [50, 60],
                [30, 40],
                [3, 4],
                [10, 20],
                [1, 2],
            ]);
        },

        iterator: () => {
            assert.deepStrictEqual(
                [...g],
                [
                    [30, 40],
                    [3, 4],
                    [10, 20],
                    [1, 2],
                ]
            );
            assert.deepStrictEqual(
                [...g],
                [
                    [30, 40],
                    [3, 4],
                    [10, 20],
                    [1, 2],
                ]
            );
        },

        "separate nodes": () => {
            g = new DGraph();
            g.addNode([1, 2]);
            g.addNode([3, 4]);
            g.addNode([3, 4]);
            assert.deepStrictEqual(g.sort(), [
                [3, 4],
                [1, 2],
            ]);
        },
    },
    {
        beforeEach: () => {
            g = new DGraph();
            g.addDependency([1, 2], [10, 20]);
            g.addDependency([3, 4], [30, 40]);
            g.addDependency([1, 2], [3, 4]);
        },
    }
);
