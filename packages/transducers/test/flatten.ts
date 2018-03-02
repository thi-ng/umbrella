import * as tx from "../src";

import * as assert from "assert";

describe("flatten", () => {
    it("empty arrays", () => {
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), []), []);
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), [[], []]), []);
    });
    it("arrays", () => {
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), [undefined]), [undefined]);
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), [[undefined], null]), [undefined, null]);
    });
    it("strings", () => {
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), ["", "a"]), ["", "a"]);
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), [[], ["a"], ""]), ["a", ""]);
    });
    it("iterators", () => {
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), tx.range(0)), []);
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), [tx.range(0)]), []);
        assert.deepEqual(tx.transduce(tx.flatten(), tx.push(), [tx.range(2), tx.range(0)]), [0, 1]);
    })
});
