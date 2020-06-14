import { keyPermutations } from "../src";

import * as assert from "assert";

describe("keyPermutations", () => {
    it("basic", () => {
        assert.deepEqual(
            new Set([
                ...keyPermutations({
                    a: [1, 2],
                    b: [true, false],
                    c: ["X", "Y"],
                }),
            ]),
            new Set([
                { a: 1, b: true, c: "X" },
                { a: 1, b: true, c: "Y" },
                { a: 1, b: false, c: "X" },
                { a: 1, b: false, c: "Y" },
                { a: 2, b: true, c: "X" },
                { a: 2, b: true, c: "Y" },
                { a: 2, b: false, c: "X" },
                { a: 2, b: false, c: "Y" },
            ])
        );
    });
});
