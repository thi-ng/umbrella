import { map, range } from "../src";

import * as assert from "assert";

describe("map", () => {
    const identity = <T>(t: T): T => t;
    const upper = (s: string) => s.toUpperCase();
    const square = (n: number) => n * n;

    it("applies function over iterable", () => {
        assert.deepEqual([...map(identity, [])], []);
        assert.deepEqual([...map(identity, ["", "ab", "c"])], ["", "ab", "c"]);
        assert.deepEqual([...map(upper, ["", "ab", "c"])], ["", "AB", "C"]);
        assert.deepEqual([...map(square, range(1, 4))], [1, 4, 9]);
        assert.deepEqual([...map(upper, "")], []);
        assert.deepEqual([...map(upper, "abc")], ["A", "B", "C"]);
    });
});
