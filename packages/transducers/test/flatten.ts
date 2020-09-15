import { flatten, range } from "../src";

import * as assert from "assert";

describe("flatten", () => {
    it("empty arrays", () => {
        assert.deepStrictEqual([...flatten([])], []);
        assert.deepStrictEqual([...flatten([[], []])], []);
    });
    it("arrays", () => {
        assert.deepStrictEqual([...flatten([undefined])], [undefined]);
        assert.deepStrictEqual(
            [...flatten([[undefined], null])],
            [undefined, null]
        );
    });
    it("strings", () => {
        assert.deepStrictEqual([...flatten(["", "a"])], ["", "a"]);
        assert.deepStrictEqual([...flatten([[], ["a"], ""])], ["a", ""]);
    });
    it("strings (atomic)", () => {
        assert.deepStrictEqual([...flatten([["abc"]])], ["abc"]);
        assert.deepStrictEqual([...flatten(["abc"])], ["abc"]);
        assert.deepStrictEqual([...flatten("abc")], ["abc"]);
        assert.deepStrictEqual([...flatten([""])], [""]);
        assert.deepStrictEqual([...flatten("")], [""]);
    });
    it("iterators", () => {
        assert.deepStrictEqual([...flatten(range(0))], []);
        assert.deepStrictEqual([...flatten([range(0)])], []);
        assert.deepStrictEqual([...flatten([range(2), range(0)])], [0, 1]);
    });
});
