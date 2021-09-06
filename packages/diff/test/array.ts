import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { ArrayDiff, diffArray } from "../src";

const state = <ArrayDiff<number>>{
    distance: 0,
    adds: {},
    dels: {},
    const: {},
    linear: [],
};

group("array", {
    "simple (null,null)": () => {
        assert.deepStrictEqual(diffArray(null, null), state);
    },

    "simple (null,arr)": () => {
        assert.deepStrictEqual(diffArray(null, [1, 2, 3]), <ArrayDiff<number>>{
            ...state,
            distance: 3,
            adds: { 0: 1, 1: 2, 2: 3 },
            linear: [1, 0, 1, 1, 1, 2, 1, 2, 3],
        });
    },

    "simple (arr, null)": () => {
        assert.deepStrictEqual(diffArray([1, 2, 3], null), <ArrayDiff<number>>{
            ...state,
            distance: 3,
            dels: { 0: 1, 1: 2, 2: 3 },
            linear: [-1, 0, 1, -1, 1, 2, -1, 2, 3],
        });
    },

    "diff last": () => {
        assert.deepStrictEqual(diffArray([1, 2, 3], [1, 2, 4]), <
            ArrayDiff<number>
        >{
            distance: 2,
            adds: { 2: 4 },
            dels: { 2: 3 },
            const: { 0: 1, 1: 2 },
            linear: [0, 0, 1, 0, 1, 2, -1, 2, 3, 1, 2, 4],
        });
    },

    "diff 2nd last": () => {
        assert.deepStrictEqual(diffArray([1, 2, 3, 4], [1, 2, 5, 4]), <
            ArrayDiff<number>
        >{
            distance: 2,
            adds: { 2: 5 },
            dels: { 2: 3 },
            const: { 0: 1, 1: 2, 3: 4 },
            linear: [0, 0, 1, 0, 1, 2, -1, 2, 3, 1, 2, 5, 0, 3, 4],
        });
    },

    "diff insert 2nd last": () => {
        assert.deepStrictEqual(diffArray([1, 2, 3, 4], [1, 2, 3, 5, 4]), <
            ArrayDiff<number>
        >{
            distance: 1,
            adds: { 3: 5 },
            dels: {},
            const: { 0: 1, 1: 2, 2: 3, 3: 4 },
            linear: [0, 0, 1, 0, 1, 2, 0, 2, 3, 1, 3, 5, 0, 3, 4],
        });
    },

    "diff insert 2nd last (changes only)": () => {
        assert.deepStrictEqual(
            diffArray([1, 2, 3, 4], [1, 2, 3, 5, 4], "minimal"),
            <ArrayDiff<number>>{
                distance: 1,
                adds: {},
                dels: {},
                const: {},
                linear: [1, 3, 5],
            }
        );
    },
});
