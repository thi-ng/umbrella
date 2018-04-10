import * as assert from "assert";

import { EquivSet } from "../src/equiv-set";
import { intersection } from "../src/intersection";

describe("intersection", () => {

    it("native (numbers)", () => {
        const a = new Set([1, 2, 3, 4]);
        const b = new Set([3, 4, 5, 6]);
        assert.deepEqual(intersection(a, b), new Set([3, 4]));
    });

    it("equiv (numbers)", () => {
        const a = new EquivSet([1, 2, 3, 4]);
        const b = new EquivSet([3, 4, 5, 6]);
        assert.deepEqual(intersection(a, b), new EquivSet([3, 4]));
    });

    it("native (obj)", () => {
        const a = new Set([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new Set([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const i = intersection(a, b);
        assert.deepEqual(i, new Set()); // verifies that it doesn't work w/ native sets!
        assert.notStrictEqual(i, a);
        assert.notStrictEqual(i, b);
    });

    it("equiv (obj)", () => {
        const a = new EquivSet([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
        const b = new EquivSet([{ a: 3 }, { a: 4 }, { a: 5 }]);
        const i = intersection(a, b);
        assert.deepEqual(i, new EquivSet([{ a: 3 }, { a: 4 }]));
    });
});
