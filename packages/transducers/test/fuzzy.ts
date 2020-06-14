import { filterFuzzy } from "../src";

import * as assert from "assert";

describe("fuzzy", () => {
    it("strings", () => {
        const opts = ["hello", "hallo", "hey", "heyoka"];
        assert.deepEqual([...filterFuzzy("hl", opts)], ["hello", "hallo"]);
        assert.deepEqual(
            [...filterFuzzy("he", opts)],
            ["hello", "hey", "heyoka"]
        );
        assert.deepEqual(
            [...filterFuzzy("ho", opts)],
            ["hello", "hallo", "heyoka"]
        );
        assert.deepEqual([...filterFuzzy("hey", opts)], ["hey", "heyoka"]);
        assert.deepEqual([...filterFuzzy("hk", opts)], ["heyoka"]);
    });
    it("arrays", () => {
        const opts = [
            [1, 2, 3],
            [1, 3, 4],
            [4, 5, 6],
            [1, 3, 6],
        ];
        assert.deepEqual(
            [...filterFuzzy([1, 3], opts)],
            [
                [1, 2, 3],
                [1, 3, 4],
                [1, 3, 6],
            ]
        );
        assert.deepEqual(
            [...filterFuzzy([4], opts)],
            [
                [1, 3, 4],
                [4, 5, 6],
            ]
        );
        assert.deepEqual([...filterFuzzy([3, 6], opts)], [[1, 3, 6]]);
        assert.deepEqual([...filterFuzzy([], opts)], opts);
    });
});
