import * as assert from "assert";
import { ArrayDiff, diffArray, DiffMode } from "../src/index";

describe("array", function () {
    const state = <ArrayDiff<number>>{
        distance: 0,
        adds: {},
        dels: {},
        const: {},
        linear: [],
    };

    it("simple (null,null)", () => {
        assert.deepEqual(diffArray(null, null), state);
    });

    it("simple (null,arr)", () => {
        assert.deepEqual(diffArray(null, [1, 2, 3]), <ArrayDiff<number>>{
            ...state,
            distance: 3,
            adds: { 0: 1, 1: 2, 2: 3 },
            linear: [1, 0, 1, 1, 1, 2, 1, 2, 3],
        });
    });

    it("simple (arr, null)", () => {
        assert.deepEqual(diffArray([1, 2, 3], null), <ArrayDiff<number>>{
            ...state,
            distance: 3,
            dels: { 0: 1, 1: 2, 2: 3 },
            linear: [-1, 0, 1, -1, 1, 2, -1, 2, 3],
        });
    });

    it("diff last", () => {
        assert.deepEqual(diffArray([1, 2, 3], [1, 2, 4]), <ArrayDiff<number>>{
            distance: 2,
            adds: { 2: 4 },
            dels: { 2: 3 },
            const: { 0: 1, 1: 2 },
            linear: [0, 0, 1, 0, 1, 2, -1, 2, 3, 1, 2, 4],
        });
    });

    it("diff 2nd last", () => {
        assert.deepEqual(diffArray([1, 2, 3, 4], [1, 2, 5, 4]), <
            ArrayDiff<number>
        >{
            distance: 2,
            adds: { 2: 5 },
            dels: { 2: 3 },
            const: { 0: 1, 1: 2, 3: 4 },
            linear: [0, 0, 1, 0, 1, 2, -1, 2, 3, 1, 2, 5, 0, 3, 4],
        });
    });

    it("diff insert 2nd last", () => {
        assert.deepEqual(diffArray([1, 2, 3, 4], [1, 2, 3, 5, 4]), <
            ArrayDiff<number>
        >{
            distance: 1,
            adds: { 3: 5 },
            dels: {},
            const: { 0: 1, 1: 2, 2: 3, 3: 4 },
            linear: [0, 0, 1, 0, 1, 2, 0, 2, 3, 1, 3, 5, 0, 3, 4],
        });
    });

    it("diff insert 2nd last (changes only)", () => {
        assert.deepEqual(
            diffArray(
                [1, 2, 3, 4],
                [1, 2, 3, 5, 4],
                DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES
            ),
            <ArrayDiff<number>>{
                distance: 1,
                adds: {},
                dels: {},
                const: {},
                linear: [1, 3, 5],
            }
        );
    });
});
