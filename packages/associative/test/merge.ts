import { Fn } from "@thi.ng/api";
import * as assert from "assert";
import {
    mergeApplyMap,
    mergeApplyObj,
    mergeDeepObj,
    meldDeepObj,
} from "../src";

describe("mergeApply", () => {
    it("map", () => {
        assert.deepEqual(
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
    });
    it("object", () => {
        const orig = { a: 1, b: 2, c: 3 };
        const src = { ...orig };
        assert.deepEqual(
            mergeApplyObj(src, { a: (x) => x + 10, b: 20, d: 40 }),
            { a: 11, b: 20, c: 3, d: 40 }
        );
        assert.deepEqual(src, orig);
    });
});

describe("mergeDeepObj", () => {
    it("basic", () => {
        const orig = { a: { b: { c: 1 } } };
        const src = { ...orig };
        assert.deepEqual(
            mergeDeepObj(src, { a: { b: { d: 2 }, e: { f: 3 } }, g: 4 }),
            { a: { b: { c: 1, d: 2 }, e: { f: 3 } }, g: 4 }
        );
        assert.deepEqual(src, orig);
    });
});

describe("meldDeepObj", () => {
    it("basic", () => {
        const orig = { a: { b: { c: 1 } } };
        const src = { ...orig };
        const dest = meldDeepObj(src, {
            a: { b: { d: 2 }, e: { f: 3 } },
            g: 4,
        });
        assert.deepEqual(dest, { a: { b: { c: 1, d: 2 }, e: { f: 3 } }, g: 4 });
        assert.strictEqual(src, dest);
        assert.notDeepEqual(src, orig);
    });
});
