import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    absSkew,
    compare,
    inc,
    merge,
    remove,
    signedSkew,
    VClock,
} from "../src/index.js"

group("vclock", {
    inc: () => {
        assert.deepStrictEqual(inc({ b: 2 }, "a"), { a: 1, b: 2 });
        assert.deepStrictEqual(inc({ a: 1, b: 3 }, "a"), { a: 2, b: 3 });
    },

    remove: () => {
        const x: VClock = { b: 2 };
        assert.strictEqual(remove(x, "a"), x);
        assert.deepStrictEqual(remove({ a: 1, b: 3 }, "a"), { b: 3 });
    },

    compare: () => {
        assert.strictEqual(compare({ a: 1, b: 2 }, { a: 3, b: 2 }), -1, "lt");
        assert.strictEqual(compare({ a: 3, b: 2 }, { a: 3, b: 2 }), 0, "equal");
        // prettier-ignore
        assert.strictEqual(compare({ a: 3, b: 2 }, { a: 2, b: 3 }), 0, "conflict");
        assert.strictEqual(compare({ a: 3, b: 3 }, { a: 3, b: 2 }), 1, "gt");
        assert.strictEqual(compare({}, { a: 1 }), -1);
        assert.strictEqual(compare({}, {}), 0);
        assert.strictEqual(compare({ a: 1 }, {}), 1);
    },

    merge: () => {
        assert.deepStrictEqual(merge({}, {}), {});
        assert.deepStrictEqual(merge({ a: 1 }, {}), { a: 1 });
        assert.deepStrictEqual(merge({}, { a: 1 }), { a: 1 });
        assert.deepStrictEqual(merge({ a: 1, b: 2, c: 4 }, { a: 3, b: 2 }), {
            a: 3,
            b: 2,
            c: 4,
        });
    },

    skew: () => {
        assert.strictEqual(signedSkew({}, {}), 0);
        assert.strictEqual(signedSkew({ a: 1 }, {}), 1);
        assert.strictEqual(signedSkew({}, { a: 1 }), -1);
        assert.strictEqual(
            signedSkew({ a: 1, b: 4, c: 2 }, { a: 2, c: 20 }),
            -18
        );
        assert.strictEqual(absSkew({ a: 1, b: 4, c: 2 }, { a: 2, c: 20 }), 18);
    },
});
