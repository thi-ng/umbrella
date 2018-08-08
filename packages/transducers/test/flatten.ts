import { flatten, range } from "../src";

import * as assert from "assert";

describe("flatten", () => {
    it("empty arrays", () => {
        assert.deepEqual([...flatten([])], []);
        assert.deepEqual([...flatten([[], []])], []);
    });
    it("arrays", () => {
        assert.deepEqual([...flatten([undefined])], [undefined]);
        assert.deepEqual([...flatten([[undefined], null])], [undefined, null]);
    });
    it("strings", () => {
        assert.deepEqual([...flatten(["", "a"])], ["", "a"]);
        assert.deepEqual([...flatten([[], ["a"], ""])], ["a", ""]);
    });
    it("iterators", () => {
        assert.deepEqual([...flatten(range(0))], []);
        assert.deepEqual([...flatten([range(0)])], []);
        assert.deepEqual([...flatten([range(2), range(0)])], [0, 1]);
    })
});
