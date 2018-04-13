import * as assert from "assert";

import { ArraySet } from "../src/array-set";
import { intersection } from "../src/intersection";

describe("intersection", () => {

    it("native (numbers)", () => {
        const a = new Set([1, 2, 3, 4]);
        const b = new Set([3, 4, 5, 6]);
        assert.deepEqual(intersection(a, b), new Set([3, 4]));
    });

    it("array (numbers)", () => {
        const a = new ArraySet([1, 2, 3, 4]);
        const b = new ArraySet([3, 4, 5, 6]);
        assert.deepEqual(intersection(a, b), new ArraySet([3, 4]));
    });

    it("native (obj)", () => {
        const a = new Set([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new Set([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const i = intersection(a, b);
        assert.deepEqual(i, new Set()); // verifies that it doesn't work w/ native sets!
        assert.notStrictEqual(i, a);
        assert.notStrictEqual(i, b);
    });

    it("array (obj)", () => {
        const a = new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new ArraySet([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const i = intersection(a, b);
        assert.deepEqual(i, new ArraySet([{ a: 3 }, { a: 4 }]));
    });
});
