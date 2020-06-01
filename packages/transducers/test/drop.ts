import { drop, range } from "../src";

import * as assert from "assert";

describe("drop", () => {
    it("starts iterating after N items", () => {
        assert.deepEqual([...drop(0, [true, false])], [true, false]);
        assert.deepEqual([...drop(1, [true, false])], [false]);
        assert.deepEqual([...drop(2, [true, false])], []);
        assert.deepEqual([...drop(3, [true, false])], []);
        assert.deepEqual([...drop(2, range(0, 4))], [2, 3]);
        assert.deepEqual([...drop(0, ["", "ab", "c"])], ["", "ab", "c"]);
        assert.deepEqual([...drop(1, ["", "ab", "c"])], ["ab", "c"]);
        assert.deepEqual([...drop(2, ["", "ab", "c"])], ["c"]);
        assert.deepEqual([...drop(0, "")], []);
        assert.deepEqual([...drop(1, "")], []);
        assert.deepEqual([...drop(0, "abc")], ["a", "b", "c"]);
        assert.deepEqual([...drop(1, "abc")], ["b", "c"]);
        assert.deepEqual([...drop(2, "abc")], ["c"]);
    });
});
