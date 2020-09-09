import * as assert from "assert";
import { SparseVec } from "../src";

describe("sparsevec", function () {
    it("fromDense", () => {
        const a = SparseVec.fromDense([0, 1, 1, 0, 1, 1, 0, 0]);
        assert.strictEqual(a.m, 8);
        assert.deepStrictEqual(a.data, [1, 1, 2, 1, 4, 1, 5, 1]);
        const b = SparseVec.fromDense([2, 0, 2, 0, 0, 0, 0, 2]);
        assert.strictEqual(b.m, 8);
        assert.deepStrictEqual(b.data, [0, 2, 2, 2, 7, 2]);
    });
});
