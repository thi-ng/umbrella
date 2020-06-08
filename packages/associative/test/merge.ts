import { Fn } from "@thi.ng/api";
import * as assert from "assert";
import { mergeApplyMap, mergeApplyObj, mergeDeepObj } from "../src";

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
        assert.deepEqual(
            mergeApplyObj(
                { a: 1, b: 2, c: 3 },
                { a: (x) => x + 10, b: 20, d: 40 }
            ),
            { a: 11, b: 20, c: 3, d: 40 }
        );
    });
});

describe("mergeDeepObj", () => {
    it("basic", () => {
        assert.deepEqual(
            mergeDeepObj(
                { a: { b: { c: 1 } } },
                { a: { b: { d: 2 }, e: { f: 3 } }, g: 4 }
            ),
            { a: { b: { c: 1, d: 2 }, e: { f: 3 } }, g: 4 }
        );
    });
});
