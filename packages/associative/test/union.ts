import * as assert from "assert";

import { EquivSet } from "../src/equiv-set";
import { union } from "../src/union";

describe("union", () => {

    it("native (numbers)", () => {
        const a = new Set([1, 2, 3, 4]);
        const b = new Set([3, 4, 5, 6]);
        assert.deepEqual(union(a, b), new Set([1, 2, 3, 4, 5, 6]));
    });

    it("equiv (numbers)", () => {
        const a = new EquivSet([1, 2, 3, 4]);
        const b = new EquivSet([3, 4, 5, 6]);
        assert.deepEqual(union(a, b), new EquivSet([1, 2, 3, 4, 5, 6]));
    });

    it("native (obj)", () => {
        const a = new Set([{ a: 1 }, { a: 2 }]);
        const b = new Set([{ a: 2 }, { a: 3 }]);
        const u = union(a, b);
        assert.equal(u.size, 4);
        assert.deepEqual(u, new Set([{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }]));
        assert.notStrictEqual(u, a);
        assert.notStrictEqual(u, b);
    });

    it("equiv (obj)", () => {
        const a = new EquivSet([{ a: 1 }, { a: 2 }]);
        const b = new EquivSet([{ a: 2 }, { a: 3 }]);
        const u = union(a, b);
        assert.equal(u.size, 3);
        assert.deepEqual(u, new EquivSet([{ a: 1 }, { a: 2 }, { a: 3 }]));
        assert.notStrictEqual(u, a);
        assert.notStrictEqual(u, b);
    });
});
