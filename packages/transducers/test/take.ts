import { take, range } from "../src";

import * as assert from "assert";

describe("take", () => {
    it("iterates up to N items", () => {
        assert.deepEqual([...take(0, [true, false])], []);
        assert.deepEqual([...take(1, [true, false])], [true]);
        assert.deepEqual([...take(2, [true, false])], [true, false]);
        assert.deepEqual([...take(3, [true, false])], [true, false]);
        assert.deepEqual([...take(2, range(0, 4))], [0, 1]);
        assert.deepEqual([...take(0, ["", "ab", "c"])], []);
        assert.deepEqual([...take(1, ["", "ab", "c"])], [""]);
        assert.deepEqual([...take(2, ["", "ab", "c"])], ["", "ab"]);
        assert.deepEqual([...take(0, "")], []);
        assert.deepEqual([...take(1, "")], []);
        assert.deepEqual([...take(0, "abc")], []);
        assert.deepEqual([...take(1, "abc")], ["a"]);
        assert.deepEqual([...take(2, "abc")], ["a", "b"]);
    });
});
