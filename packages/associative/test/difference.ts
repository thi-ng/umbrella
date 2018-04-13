import * as assert from "assert";

import { ArraySet } from "../src/array-set";
import { difference } from "../src/difference";

describe("difference", () => {

    it("native (numbers)", () => {
        const a = new Set([1, 2, 3, 4]);
        const b = new Set([3, 4, 5]);
        assert.deepEqual(difference(a, b), new Set([1, 2]));
    });

    it("array (numbers)", () => {
        const a = new ArraySet([1, 2, 3, 4]);
        const b = new ArraySet([3, 4, 5]);
        assert.deepEqual(difference(a, b), new ArraySet([1, 2]));
    });

    it("native (obj)", () => {
        const a = new Set([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new Set([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const d = difference(a, b);
        assert.equal(d.size, 4); // verifies that it doesn't work w/ native sets!
        assert.deepEqual(d, a);
        assert.notStrictEqual(d, a);
        assert.notStrictEqual(d, b);
    });

    it("array (obj)", () => {
        const a = new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new ArraySet([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const d = difference(a, b);
        assert.equal(d.size, 2);
        assert.deepEqual(d, new Set([{ a: 1 }, { a: 2 }]));
        assert.notStrictEqual(d, a);
        assert.notStrictEqual(d, b);
    });
});
