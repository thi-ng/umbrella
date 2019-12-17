import { ReadonlyVec } from "@thi.ng/vectors";
import * as assert from "assert";
import { NdQuadtree, ndQuadtreeFromMinMax } from "../src";

const pts = new Set([
    [10, 20, 30],
    [60, 70, 80],
    [44, 55, 66]
]);

describe("NdTree", () => {
    let tree: NdQuadtree<ReadonlyVec, any>;
    beforeEach(() => {
        tree = ndQuadtreeFromMinMax([0, 0, 0], [100, 100, 100]);
    });

    it("ctor", () => {
        assert.deepEqual(tree.pos, [50, 50, 50]);
        assert.deepEqual(tree.size, [50, 50, 50]);
    });

    it("addKeys", () => {
        assert.ok(tree.addKeys(pts));
        for (let p of pts) {
            assert(tree.has(p), String(p));
        }
        assert.deepEqual(new Set(tree.keys()), pts);
    });

    it("add duplicate", () => {
        tree.addKeys(pts);
        assert.ok(!tree.add([10, 20, 30]));
        assert.ok(!tree.add([10.01, 20, 30], undefined, 0.1));
    });

    it("keys iterator", () => {
        tree.addKeys(pts);
        assert.deepEqual(new Set(tree.keys()), pts);
    });

    it("selectKeys", () => {
        tree.addKeys(pts);
        assert.deepEqual(
            new Set(tree.selectKeys([50, 50, 50], 100)),
            pts,
            "r=100"
        );
        assert.deepEqual(
            new Set(tree.selectKeys([50, 50, 50], 50)),
            new Set([
                [44, 55, 66],
                [60, 70, 80]
            ]),
            "r=50"
        );
        assert.deepEqual(
            new Set(tree.selectKeys([20, 20, 20], 15)),
            new Set([[10, 20, 30]]),
            "r=25"
        );
    });
});
