import { swizzle } from "@thi.ng/arrays";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { iterator, map, permutations, permutationsN, range } from "../src/index.js"

group("permutations", {
    empty: () => {
        assert.deepStrictEqual([...permutations([])], []);
        assert.deepStrictEqual([...permutations("")], []);
        assert.deepStrictEqual([...permutations(range(0))], []);
        assert.deepStrictEqual([...permutations([], [])], []);
        assert.deepStrictEqual([...permutations([], "")], []);
        assert.deepStrictEqual([...permutations(range(0), "")], []);
        assert.deepStrictEqual([...permutations([], "a")], []);
        assert.deepStrictEqual([...permutations("", "a")], []);
        assert.deepStrictEqual([...permutations("", "ab")], []);
        assert.deepStrictEqual([...permutations.apply(null, [])], []);
    },

    single: () => {
        assert.deepStrictEqual(
            [...permutations("a", "-", range(1))],
            [["a", "-", 0]]
        );
        assert.deepStrictEqual(
            [...permutations("a", "-", range(2))],
            [
                ["a", "-", 0],
                ["a", "-", 1],
            ]
        );
        assert.deepStrictEqual(
            [...permutations("a", "-+", range(2))],
            [
                ["a", "-", 0],
                ["a", "-", 1],
                ["a", "+", 0],
                ["a", "+", 1],
            ]
        );
    },

    transformed: () => {
        assert.deepStrictEqual(
            [
                ...iterator(
                    map((x: any[]) => x.join("")),
                    permutations("ab", "-", range(2))
                ),
            ],
            ["a-0", "a-1", "b-0", "b-1"]
        );
    },

    swizzle: () => {
        assert.deepStrictEqual(
            [
                ...iterator(
                    map((x: string[]) => swizzle(x)({ x: 0, y: 1, z: 2 })),
                    permutations("xyz", "xyz", "xyz")
                ),
            ],
            [...permutationsN(3)]
        );
    },
});

group("permutationsN", {
    empty: () => {
        assert.deepStrictEqual([...permutationsN(0)], []);
    },

    one: () => {
        assert.deepStrictEqual([...permutationsN(1)], [[0]]);
    },

    two: () => {
        assert.deepStrictEqual(
            [...permutationsN(2)],
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ]
        );
    },

    "two/three": () => {
        assert.deepStrictEqual(
            [...permutationsN(2, 3)],
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 0],
                [1, 1],
                [1, 2],
                [2, 0],
                [2, 1],
                [2, 2],
            ]
        );
    },

    "with offsets": () => {
        assert.deepStrictEqual(
            [...permutationsN(2, 2, [100, 1000])],
            [
                [100, 1000],
                [100, 1001],
                [101, 1000],
                [101, 1001],
            ]
        );
    },

    "insufficient offsets": () => {
        assert.throws(() => permutationsN(2, 2, [0]));
    },
});
