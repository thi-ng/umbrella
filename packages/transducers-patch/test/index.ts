import { reduce, reductions } from "@thi.ng/transducers";
import * as assert from "assert";
import { Patch, patchArray, patchObj } from "../src";

describe("transducers-patch", () => {
    it("patchArray", () => {
        assert.deepStrictEqual(
            reduce(
                reductions(patchArray<number>()),
                [[1, 2, 3]],
                [
                    [Patch.INSERT, 0, [10, 11]],
                    [Patch.UPDATE, 1, (x, n) => x * n, 10],
                    [Patch.DELETE, 3],
                    [Patch.SET, 2, 200],
                ]
            ),
            [
                [1, 2, 3],
                [10, 11, 1, 2, 3],
                [10, 110, 1, 2, 3],
                [10, 110, 1, 3],
                [10, 110, 200, 3],
            ]
        );
    });

    it("patchObj", () => {
        assert.deepStrictEqual(
            reduce(
                reductions(patchObj()),
                [{ x: 23 }],
                [
                    [Patch.SET, ["a", "b"], 1],
                    [Patch.UPDATE, "a.b", (x, n) => x + n, 10],
                    [Patch.DELETE, "x"],
                ]
            ),
            [
                { x: 23 },
                { x: 23, a: { b: 1 } },
                { x: 23, a: { b: 11 } },
                { a: { b: 11 } },
            ]
        );
    });
});
