import { mapIndexed } from "@thi.ng/transducers";
import type { ReadonlyVec } from "@thi.ng/vectors";
import * as assert from "assert";
import { NdQuadtreeMap } from "../src";

const pts = new Set<ReadonlyVec>([
    [10, 20, 30],
    [60, 70, 80],
    [44, 55, 66],
]);

const pairs = new Set(mapIndexed((i, p) => <[ReadonlyVec, number]>[p, i], pts));

describe("NdTree", () => {
    let tree: NdQuadtreeMap<ReadonlyVec, any>;
    beforeEach(() => {
        tree = NdQuadtreeMap.fromMinMax([0, 0, 0], [100, 100, 100]);
    });

    it("ctor", () => {
        assert.deepStrictEqual(tree.root.pos, [50, 50, 50]);
        assert.deepStrictEqual(tree.root.ext, [50, 50, 50]);
    });

    it("into / get / has", () => {
        assert.ok(tree.into(pairs));
        for (let p of pairs) {
            assert(tree.has(p[0]), `has: ${p}`);
            assert.strictEqual(tree.get(p[0]), p[1], `get ${p}`);
        }
    });

    it("add duplicate", () => {
        tree.into(pairs);
        assert.ok(!tree.set([10, 20, 30], 10));
        assert.ok(!tree.set([10.01, 20, 30], 100, 0.1));
        // TODO check new value
    });

    it("iterators", () => {
        tree.into(pairs);
        assert.deepStrictEqual(new Set(tree), pairs);
        assert.deepStrictEqual(new Set(tree.keys()), pts);
    });

    it("selectKeys", () => {
        tree.into(pairs);
        assert.deepStrictEqual(
            new Set(tree.queryKeys([50, 50, 50], 100, Infinity)),
            pts,
            "r=100"
        );
        assert.deepStrictEqual(
            new Set(tree.queryKeys([50, 50, 50], 50, Infinity)),
            new Set([
                [44, 55, 66],
                [60, 70, 80],
            ]),
            "r=50"
        );
        assert.deepStrictEqual(
            new Set(tree.queryKeys([20, 20, 20], 15, Infinity)),
            new Set([[10, 20, 30]]),
            "r=25"
        );
    });
});
