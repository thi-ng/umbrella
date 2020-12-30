import { compare, reverse } from "@thi.ng/compare";
import * as assert from "assert";
import { sortByCachedKey } from "../src";

describe("sortCached", () => {
    it("key fn", () => {
        assert.deepStrictEqual(
            sortByCachedKey(["a", "bbbb", "ccc", "dd"], (x) => x),
            ["a", "bbbb", "ccc", "dd"]
        );
        assert.deepStrictEqual(
            sortByCachedKey(
                ["a", "bbbb", "ccc", "dd"],
                (x) => x,
                reverse(compare)
            ),
            ["dd", "ccc", "bbbb", "a"]
        );
        assert.deepStrictEqual(
            sortByCachedKey(
                ["a", "bbbb", "ccc", "dd"],
                (x) => x.length,
                (a, b) => b - a
            ),
            ["bbbb", "ccc", "dd", "a"]
        );
    });

    it("key array", () => {
        assert.deepStrictEqual(
            sortByCachedKey(["a", "b", "c", "d"], [3, 2, 1, 0]),
            ["d", "c", "b", "a"]
        );
    });

    it("wrong key length", () =>
        assert.throws(() => sortByCachedKey(["a", "b", "c", "d"], [])));
});
