import * as assert from "assert";
import { DGraph } from "../src/index";

describe("dgraph", () => {
    let g: DGraph<any>;

    beforeEach(() => {
        g = new DGraph();
        g.addDependency([1, 2], [10, 20]);
        g.addDependency([3, 4], [30, 40]);
        g.addDependency([1, 2], [3, 4]);
    });

    it("depends", () => {
        assert(g.depends([1, 2], [10, 20]));
        assert(!g.depends([10, 20], [1, 2]));
    });

    it("dependent", () => {
        assert(g.dependent([10, 20], [1, 2]));
        assert(!g.dependent([1, 2], [10, 20]));
    });

    it("isLeaf", () => {
        assert(g.isLeaf([1, 2]));
        assert(!g.isLeaf([10, 20]));
        assert(!g.isLeaf([3, 4]));
    });

    it("isRoot", () => {
        assert(g.isRoot([10, 20]));
        assert(g.isRoot([30, 40]));
        assert(!g.isRoot([3, 4]));
    });

    it("cyclic", () => {
        assert.throws(() => g.addDependency([10, 20], [1, 2]));
        assert.throws(() => g.addDependency([1, 2], [1, 2]));
    });

    it("sort", () => {
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
    });

    it("iterator", () => {
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
    });

    it("separate nodes", () => {
        g = new DGraph();
        g.addNode([1, 2]);
        g.addNode([3, 4]);
        g.addNode([3, 4]);
        assert.deepStrictEqual(g.sort(), [
            [3, 4],
            [1, 2],
        ]);
    });
});
