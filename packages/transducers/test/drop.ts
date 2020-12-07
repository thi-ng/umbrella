import * as assert from "assert";
import { drop, range } from "../src";

describe("drop", () => {
    it("starts iterating after N items", () => {
        assert.deepStrictEqual([...drop(0, [true, false])], [true, false]);
        assert.deepStrictEqual([...drop(1, [true, false])], [false]);
        assert.deepStrictEqual([...drop(2, [true, false])], []);
        assert.deepStrictEqual([...drop(3, [true, false])], []);
        assert.deepStrictEqual([...drop(2, range(0, 4))], [2, 3]);
        assert.deepStrictEqual([...drop(0, ["", "ab", "c"])], ["", "ab", "c"]);
        assert.deepStrictEqual([...drop(1, ["", "ab", "c"])], ["ab", "c"]);
        assert.deepStrictEqual([...drop(2, ["", "ab", "c"])], ["c"]);
        assert.deepStrictEqual([...drop(0, "")], []);
        assert.deepStrictEqual([...drop(1, "")], []);
        assert.deepStrictEqual([...drop(0, "abc")], ["a", "b", "c"]);
        assert.deepStrictEqual([...drop(1, "abc")], ["b", "c"]);
        assert.deepStrictEqual([...drop(2, "abc")], ["c"]);
    });
});
