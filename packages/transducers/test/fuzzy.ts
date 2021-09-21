import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { filterFuzzy } from "../src";

group("fuzzy", {
    strings: () => {
        const opts = ["hello", "hallo", "hey", "heyoka"];
        assert.deepStrictEqual(
            [...filterFuzzy("hl", opts)],
            ["hello", "hallo"]
        );
        assert.deepStrictEqual(
            [...filterFuzzy("he", opts)],
            ["hello", "hey", "heyoka"]
        );
        assert.deepStrictEqual(
            [...filterFuzzy("ho", opts)],
            ["hello", "hallo", "heyoka"]
        );
        assert.deepStrictEqual(
            [...filterFuzzy("hey", opts)],
            ["hey", "heyoka"]
        );
        assert.deepStrictEqual([...filterFuzzy("hk", opts)], ["heyoka"]);
    },

    arrays: () => {
        const opts = [
            [1, 2, 3],
            [1, 3, 4],
            [4, 5, 6],
            [1, 3, 6],
        ];
        assert.deepStrictEqual(
            [...filterFuzzy([1, 3], opts)],
            [
                [1, 2, 3],
                [1, 3, 4],
                [1, 3, 6],
            ]
        );
        assert.deepStrictEqual(
            [...filterFuzzy([4], opts)],
            [
                [1, 3, 4],
                [4, 5, 6],
            ]
        );
        assert.deepStrictEqual([...filterFuzzy([3, 6], opts)], [[1, 3, 6]]);
        assert.deepStrictEqual([...filterFuzzy([], opts)], opts);
    },
});
