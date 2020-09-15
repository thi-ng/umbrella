import { range2d } from "../src/iter/range2d";

import * as assert from "assert";
import { rangeNd } from "../src";

describe("range2d", () => {
    it("forward", () => {
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
    });
    it("forward w/ step", () => {
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
    });
    it("reverse", () => {
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
    });
    it("reverse w/ step", () => {
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
    });
    it("empty w/ wrong step sign (x)", () => {
        assert.deepStrictEqual([...range2d(0, 1, 0, 1, -1, 1)], []);
    });
    it("empty w/ wrong step sign (y)", () => {
        assert.deepStrictEqual([...range2d(0, 1, 0, 1, 1, -1)], []);
    });
    it("single output", () => {
        assert.deepStrictEqual([...range2d(0, 1, 0, 1)], [[0, 0]]);
    });
});

describe("rangeNd", () => {
    it("0d", () => {
        assert.deepStrictEqual([...rangeNd([])], []);
    });

    it("1d", () => {
        assert.deepStrictEqual([...rangeNd([2])], [[0], [1]]);
        assert.deepStrictEqual([...rangeNd([-2], [2])], [[-2], [-1], [0], [1]]);
    });

    it("2d", () => {
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
    });

    it("3d", () => {
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
    });
});
