import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { range2d, rangeNd } from "../src";

group("range2d", {
    forward: () => {
        assert.deepStrictEqual(
            [...range2d(0, 3, 1, 3)],
            [
                [0, 1],
                [1, 1],
                [2, 1],
                [0, 2],
                [1, 2],
                [2, 2],
            ]
        );
    },

    "forward w/ step": () => {
        assert.deepStrictEqual(
            [...range2d(0, 5, 1, 6, 2, 3)],
            [
                [0, 1],
                [2, 1],
                [4, 1],
                [0, 4],
                [2, 4],
                [4, 4],
            ]
        );
    },

    reverse: () => {
        assert.deepStrictEqual(
            [...range2d(3, 0, 3, 1)],
            [
                [3, 3],
                [2, 3],
                [1, 3],
                [3, 2],
                [2, 2],
                [1, 2],
            ]
        );
    },

    "reverse w/ step": () => {
        assert.deepStrictEqual(
            [...range2d(5, 0, 6, 1, -2, -3)],
            [
                [5, 6],
                [3, 6],
                [1, 6],
                [5, 3],
                [3, 3],
                [1, 3],
            ]
        );
    },

    "empty w/ wrong step sign (x)": () => {
        assert.deepStrictEqual([...range2d(0, 1, 0, 1, -1, 1)], []);
    },

    "empty w/ wrong step sign (y)": () => {
        assert.deepStrictEqual([...range2d(0, 1, 0, 1, 1, -1)], []);
    },

    "single output": () => {
        assert.deepStrictEqual([...range2d(0, 1, 0, 1)], [[0, 0]]);
    },
});

group("rangeNd", {
    "0d": () => {
        assert.deepStrictEqual([...rangeNd([])], []);
    },

    "1d": () => {
        assert.deepStrictEqual([...rangeNd([2])], [[0], [1]]);
        assert.deepStrictEqual([...rangeNd([-2], [2])], [[-2], [-1], [0], [1]]);
    },

    "2d": () => {
        assert.deepStrictEqual(
            [...rangeNd([2, -2])],
            [
                [0, 0],
                [0, -1],
                [1, 0],
                [1, -1],
            ]
        );
        assert.deepStrictEqual(
            [...rangeNd([-2, -2], [2, 2])],
            [
                [-2, -2],
                [-2, -1],
                [-2, 0],
                [-2, 1],
                [-1, -2],
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -2],
                [0, -1],
                [0, 0],
                [0, 1],
                [1, -2],
                [1, -1],
                [1, 0],
                [1, 1],
            ]
        );
    },

    "3d": () => {
        assert.deepStrictEqual(
            [...rangeNd([2, 2, 2])],
            [
                [0, 0, 0],
                [0, 0, 1],
                [0, 1, 0],
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 1],
                [1, 1, 0],
                [1, 1, 1],
            ]
        );
    },
});
