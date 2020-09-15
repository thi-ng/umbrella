import { map, range } from "../src";

import * as assert from "assert";

describe("map", () => {
    const identity = <T>(t: T): T => t;
    const upper = (s: string) => s.toUpperCase();
    const square = (n: number) => n * n;

    it("applies function over iterable", () => {
        assert.deepStrictEqual([...map(identity, [])], []);
        assert.deepStrictEqual(
            [...map(identity, ["", "ab", "c"])],
            ["", "ab", "c"]
        );
        assert.deepStrictEqual(
            [...map(upper, ["", "ab", "c"])],
            ["", "AB", "C"]
        );
        assert.deepStrictEqual([...map(square, range(1, 4))], [1, 4, 9]);
        assert.deepStrictEqual([...map(upper, "")], []);
        assert.deepStrictEqual([...map(upper, "abc")], ["A", "B", "C"]);
    });
});
