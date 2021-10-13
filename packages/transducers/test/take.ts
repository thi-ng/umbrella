import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { range, take } from "../src/index.js"

group("take", {
    "iterates up to N items": () => {
        assert.deepStrictEqual([...take(0, [true, false])], []);
        assert.deepStrictEqual([...take(1, [true, false])], [true]);
        assert.deepStrictEqual([...take(2, [true, false])], [true, false]);
        assert.deepStrictEqual([...take(3, [true, false])], [true, false]);
        assert.deepStrictEqual([...take(2, range(0, 4))], [0, 1]);
        assert.deepStrictEqual([...take(0, ["", "ab", "c"])], []);
        assert.deepStrictEqual([...take(1, ["", "ab", "c"])], [""]);
        assert.deepStrictEqual([...take(2, ["", "ab", "c"])], ["", "ab"]);
        assert.deepStrictEqual([...take(0, "")], []);
        assert.deepStrictEqual([...take(1, "")], []);
        assert.deepStrictEqual([...take(0, "abc")], []);
        assert.deepStrictEqual([...take(1, "abc")], ["a"]);
        assert.deepStrictEqual([...take(2, "abc")], ["a", "b"]);
    },
});
