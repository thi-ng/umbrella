import * as assert from "assert";
import { ZCurve } from "../src";

describe("ZCurve", () => {
    it("range 2d (1)", () => {
        const z = new ZCurve(2, 8);
        assert.deepEqual(
            [...z.range([2, 2], [3, 6])],
            [12n, 13n, 14n, 15n, 36n, 37n, 38n, 39n, 44n, 45n]
        );
        assert.deepEqual(
            [...z.range([2, 2], [3, 6])].map((i) => z.decode(i)),
            [
                [2, 2],
                [3, 2],
                [2, 3],
                [3, 3],
                [2, 4],
                [3, 4],
                [2, 5],
                [3, 5],
                [2, 6],
                [3, 6]
            ]
        );
    });

    it("range 2d (2)", () => {
        const z = new ZCurve(2, 8);
        assert.deepEqual(
            [...z.range([3, 2], [4, 6])],
            [13n, 15n, 24n, 26n, 37n, 39n, 45n, 48n, 50n, 56n]
        );
        assert.deepEqual(
            [...z.range([3, 2], [4, 6])].map((i) => z.decode(i)),
            [
                [3, 2],
                [3, 3],
                [4, 2],
                [4, 3],
                [3, 4],
                [3, 5],
                [3, 6],
                [4, 4],
                [4, 5],
                [4, 6]
            ]
        );
    });
});
