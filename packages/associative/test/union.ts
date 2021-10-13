import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { ArraySet, union } from "../src/index.js"

group("union", {
    "native (numbers)": () => {
        const a = new Set([1, 2, 3, 4]);
        const b = new Set([3, 4, 5, 6]);
        assert.deepStrictEqual(union(a, b), new Set([1, 2, 3, 4, 5, 6]));
    },

    "equiv (numbers)": () => {
        const a = new ArraySet([1, 2, 3, 4]);
        const b = new ArraySet([3, 4, 5, 6]);
        assert.deepStrictEqual(union(a, b), new ArraySet([1, 2, 3, 4, 5, 6]));
    },

    "native (obj)": () => {
        const a = new Set([{ a: 1 }, { a: 2 }]);
        const b = new Set([{ a: 2 }, { a: 3 }]);
        const u = union(a, b);
        assert.strictEqual(u.size, 4);
        assert.deepStrictEqual(
            u,
            new Set([{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }])
        );
        assert.notStrictEqual(u, a);
        assert.notStrictEqual(u, b);
    },

    "equiv (obj)": () => {
        const a = new ArraySet([{ a: 1 }, { a: 2 }]);
        const b = new ArraySet([{ a: 2 }, { a: 3 }]);
        const u = union(a, b);
        assert.strictEqual(u.size, 3);
        assert.deepStrictEqual(u, new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }]));
        assert.notStrictEqual(u, a);
        assert.notStrictEqual(u, b);
    },

    "w/ out": () => {
        assert.deepStrictEqual(
            union(new Set([1, 2, 3]), new Set([2, 4]), new Set([5])),
            new Set([1, 2, 3, 4, 5])
        );
    },
});
