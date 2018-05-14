import * as tx from "../src";

import * as assert from "assert";

describe("fuzzy", () => {
    it("strings", () => {
        const opts = ["hello", "hallo", "hey", "heyoka"];
        assert.deepEqual(tx.transduce(tx.filterFuzzy("hl"), tx.push(), opts), ["hello", "hallo"]);
        assert.deepEqual(tx.transduce(tx.filterFuzzy("he"), tx.push(), opts), ["hello", "hey", "heyoka"]);
        assert.deepEqual(tx.transduce(tx.filterFuzzy("ho"), tx.push(), opts), ["hello", "hallo", "heyoka"]);
        assert.deepEqual(tx.transduce(tx.filterFuzzy("hey"), tx.push(), opts), ["hey", "heyoka"]);
        assert.deepEqual(tx.transduce(tx.filterFuzzy("hk"), tx.push(), opts), ["heyoka"]);
    });
    it("arrays", () => {
        const opts = [[1, 2, 3], [1, 3, 4], [4, 5, 6], [1, 3, 6]];
        assert.deepEqual(tx.transduce(tx.filterFuzzy([1, 3]), tx.push(), opts), [[1, 2, 3], [1, 3, 4], [1, 3, 6]]);
        assert.deepEqual(tx.transduce(tx.filterFuzzy([4]), tx.push(), opts), [[1, 3, 4], [4, 5, 6]]);
        assert.deepEqual(tx.transduce(tx.filterFuzzy([3, 6]), tx.push(), opts), [[1, 3, 6]]);
        assert.deepEqual(tx.transduce(tx.filterFuzzy([]), tx.push(), opts), opts);
    });
});
