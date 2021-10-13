import { group } from "@thi.ng/testament";
import { dist, distSq2, distSq3 } from "@thi.ng/vectors";
import * as assert from "assert";
import {
    DIST_SQ1,
    DIST_SQ2,
    DIST_SQ3,
    EUCLEDIAN1,
    EUCLEDIAN2,
    EUCLEDIAN3,
    knearestN,
    nearestN,
} from "../src/index.js"

group("distance", {
    eucledian1: () => {
        assert.strictEqual(EUCLEDIAN1.to(10), 10);
        assert.strictEqual(EUCLEDIAN1.from(10), 10);
        assert.strictEqual(EUCLEDIAN1.metric(5, 10), 5);
    },

    eucledian2: () => {
        assert.strictEqual(
            EUCLEDIAN2.metric([5, 10], [-5, -10]),
            dist([5, 10], [-5, -10])
        );
    },

    eucledian3: () => {
        assert.strictEqual(
            EUCLEDIAN3.metric([5, 10, -20], [-5, -10, 20]),
            dist([5, 10, -20], [-5, -10, 20])
        );
    },

    squared1: () => {
        assert.strictEqual(DIST_SQ1.to(10), 100);
        assert.strictEqual(DIST_SQ1.from(100), 10);
        assert.strictEqual(DIST_SQ1.metric(5, 10), 25);
    },

    squared2: () => {
        assert.strictEqual(
            DIST_SQ2.metric([5, 10], [-5, -10]),
            distSq2([5, 10], [-5, -10])
        );
    },

    squared3: () => {
        assert.strictEqual(
            DIST_SQ3.metric([5, 10, -20], [-5, -10, 20]),
            distSq3([5, 10, -20], [-5, -10, 20])
        );
    },

    "nearestN (inf)": () => {
        const a = nearestN<number>(10, Infinity, DIST_SQ1);
        assert.deepStrictEqual(
            [5, 9, 12, 11].map((x) => a.consider(x, x)),
            [25, 1, 4, 1]
        );
        assert.deepStrictEqual(a.deref(), [1, 11]);
    },

    "nearestN (radius)": () => {
        const a = nearestN<number>(10, 2, DIST_SQ1);
        assert.deepStrictEqual(
            [5, 9, 12, 11].map((x) => a.consider(x, x)),
            [25, 1, 4, 1]
        );
        assert.deepStrictEqual(a.deref(), [1, 11]);
    },

    "knearestN (inf)": () => {
        const a = knearestN<number>(10, 2, Infinity, DIST_SQ1, true);
        assert.deepStrictEqual(
            [5, 8, 13, 11].map((x) => a.consider(x, x)),
            [25, 4, 9, 1]
        );
        assert.deepStrictEqual(a.deref(), [
            [1, 11],
            [4, 8],
        ]);
    },

    "knearestN (radius)": () => {
        const a = knearestN<number>(10, 2, 2, DIST_SQ1, true);
        assert.deepStrictEqual(
            [5, 8, 13, 11].map((x) => a.consider(x, x)),
            [25, 4, 9, 1]
        );
        assert.deepStrictEqual(a.deref(), [
            [1, 11],
            [4, 8],
        ]);
    },
});
