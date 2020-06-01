import { filter, range } from "../src";

import * as assert from "assert";

describe("filter", () => {
    const identity = (x: any) => x;
    const always = () => true;
    const never = () => false;
    const vowel = (s: string) => /[aeiou]/.test(s);
    const even = (n: number) => n % 2 === 0;

    it("applies predicate over iterable and forwards values testing truthy", () => {
        assert.deepEqual(
            [...filter(identity, [true, false, "a", "", 0, 1, []])],
            [true, "a", 1, []]
        );
        assert.deepEqual(
            [...filter(always, [true, false, "a", "", 0, 1, []])],
            [true, false, "a", "", 0, 1, []]
        );
        assert.deepEqual(
            [...filter(never, [true, false, "a", "", 0, 1, []])],
            []
        );
        assert.deepEqual([...filter(vowel, ["", "a", "bc"])], ["a"]);
        assert.deepEqual([...filter(even, range(1, 5))], [2, 4]);
        assert.deepEqual([...filter(always, "")], []);
        assert.deepEqual([...filter(always, "abc")], ["a", "b", "c"]);
        assert.deepEqual([...filter(vowel, "abc")], ["a"]);
    });
});
