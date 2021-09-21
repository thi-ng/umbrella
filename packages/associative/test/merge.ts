import type { Fn, FnN } from "@thi.ng/api";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    meldApplyObj,
    meldDeepObj,
    mergeApplyMap,
    mergeApplyObj,
    mergeDeepObj,
} from "../src";

group("mergeApply", {
    map: () => {
        assert.deepStrictEqual(
            mergeApplyMap(
                new Map([
                    ["a", 1],
                    ["b", 2],
                    ["c", 3],
                ]),
                new Map<string, number | Fn<number, number>>([
                    ["a", (x) => x + 10],
                    ["b", 20],
                    ["d", 40],
                ])
            ),
            new Map([
                ["a", 11],
                ["b", 20],
                ["c", 3],
                ["d", 40],
            ])
        );
    },

    object: () => {
        const orig = { a: 1, b: 2, c: 3 };
        const src = { ...orig };
        assert.deepStrictEqual(
            mergeApplyObj(src, { a: (x) => x + 10, b: 20, d: 40 }),
            { a: 11, b: 20, c: 3, d: 40 }
        );
        assert.deepStrictEqual(src, orig);
    },

    pollute: () => {
        const inc: FnN = (x) => x + 1;
        assert.deepStrictEqual(
            mergeApplyObj(
                { a: 1, ["__proto__"]: 1 },
                { a: inc, ["__proto__"]: inc }
            ),
            { a: 2 }
        );
        assert.deepStrictEqual(
            meldApplyObj(
                { a: 1, ["__proto__"]: 1 },
                { a: inc, ["__proto__"]: inc }
            ),
            {
                a: 2,
                ["__proto__"]: 1,
            }
        );
    },
});

group("mergeDeepObj", {
    basic: () => {
        const orig = { a: { b: { c: 1 } } };
        const src = { ...orig };
        assert.deepStrictEqual(
            mergeDeepObj(src, { a: { b: { d: 2 }, e: { f: 3 } }, g: 4 }),
            { a: { b: { c: 1, d: 2 }, e: { f: 3 } }, g: 4 }
        );
        assert.deepStrictEqual(src, orig);
    },
});

group("meldDeepObj", {
    basic: () => {
        const orig = { a: { b: { c: 1 } } };
        const src = { ...orig };
        const dest = meldDeepObj(src, {
            a: { b: { d: 2 }, e: { f: 3 } },
            g: 4,
        });
        assert.deepStrictEqual(dest, {
            a: { b: { c: 1, d: 2 }, e: { f: 3 } },
            g: 4,
        });
        assert.strictEqual(src, dest);
        assert.notDeepEqual(src, orig);
    },

    pollute: () => {
        const p1 = JSON.parse(`{ "a": 1, "__proto__": { "eek": 2 } }`);
        const p2 = JSON.parse(`{ "a": 1, "b": { "__proto__": { "eek": 2 } } }`);
        assert.deepStrictEqual(meldDeepObj({}, p1), { a: 1 }, "p1");
        assert.deepStrictEqual(meldDeepObj({}, p2), p2, "p2");
        assert.deepStrictEqual(
            meldDeepObj({ b: { c: 1 } }, p2),
            { a: 1, b: { c: 1 } },
            "p3"
        );
    },
});
