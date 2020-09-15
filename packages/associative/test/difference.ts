import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { ArraySet } from "../src/array-set";
import { difference } from "../src/difference";

describe("difference", () => {
    it("native (numbers)", () => {
        const a = new Set([1, 2, 3, 4]);
        const b = new Set([3, 4, 5]);
        assert.deepStrictEqual(difference(a, b), new Set([1, 2]));
    });

    it("array (numbers)", () => {
        const a = new ArraySet([1, 2, 3, 4]);
        const b = new ArraySet([3, 4, 5]);
        assert.deepStrictEqual(difference(a, b), new ArraySet([1, 2]));
    });

    it("native (obj)", () => {
        const a = new Set([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new Set([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const d = difference(a, b);
        assert.strictEqual(d.size, 4); // verifies that it doesn't work w/ native sets!
        assert.deepStrictEqual(d, a);
        assert.notStrictEqual(d, a);
        assert.notStrictEqual(d, b);
    });

    it("array (obj)", () => {
        const a = new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new ArraySet([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const d = difference(a, b);
        assert.strictEqual(d.size, 2);
        assert(equiv(d, new ArraySet([{ a: 1 }, { a: 2 }])));
        assert.notStrictEqual(d, a);
        assert.notStrictEqual(d, b);
    });

    it("w/ out", () => {
        assert.deepStrictEqual(
            difference(new Set([1, 2, 3]), new Set([2, 4]), new Set([5])),
            new Set([1, 3, 5])
        );
    });

    it("same", () => {
        const a = new Set([1]);
        assert.deepStrictEqual(difference(a, a), new Set());
    });
});
