import * as tx from "../src";

import * as assert from "assert";

const src = [1, 2, 3, 4];

const early = tx.reducer<number, number>(
    () => 0,
    (acc, x) => (acc + x < 6 ? acc + x : tx.reduced(acc))
);

describe("juxtR", () => {
    it("arity-1", () => {
        assert.deepStrictEqual(tx.reduce(tx.juxtR(tx.str("-")), src), [
            "1-2-3-4",
        ]);
        assert.deepStrictEqual(tx.reduce(tx.juxtR(early), src), [3]);
        assert.deepStrictEqual(
            tx.transduce(tx.take(2), tx.juxtR(tx.str("-")), src),
            ["1-2"]
        );
    });
    it("arity-2", () => {
        assert.deepStrictEqual(
            tx.reduce(tx.juxtR(tx.push(), tx.str("-")), src),
            [[1, 2, 3, 4], "1-2-3-4"]
        );
        assert.deepStrictEqual(tx.reduce(tx.juxtR(tx.push(), early), src), [
            [1, 2, 3],
            3,
        ]);
        assert.deepStrictEqual(
            tx.transduce(tx.take(2), tx.juxtR(early, tx.str("-")), src),
            [3, "1-2"]
        );
    });
    it("arity-3", () => {
        assert.deepStrictEqual(
            tx.reduce(
                tx.juxtR(tx.add(), tx.reductions(tx.add()), tx.str("-")),
                src
            ),
            [10, [0, 1, 3, 6, 10], "1-2-3-4"]
        );
        assert.deepStrictEqual(
            tx.reduce(tx.juxtR(tx.add(), tx.reductions(tx.add()), early), src),
            [6, [0, 1, 3, 6], 3]
        );
        assert.deepStrictEqual(
            tx.transduce(
                tx.take(2),
                tx.juxtR(early, tx.push(), tx.str("-")),
                src
            ),
            [3, [1, 2], "1-2"]
        );
    });
    it("arity-4", () => {
        assert.deepStrictEqual(
            tx.reduce(
                tx.juxtR(
                    tx.add(),
                    tx.reductions(tx.add()),
                    tx.push(),
                    tx.str("-")
                ),
                src
            ),
            [10, [0, 1, 3, 6, 10], [1, 2, 3, 4], "1-2-3-4"]
        );
        assert.deepStrictEqual(
            tx.reduce(
                tx.juxtR(tx.add(), tx.reductions(tx.add()), tx.str("-"), early),
                src
            ),
            [6, [0, 1, 3, 6], "1-2-3", 3]
        );
        assert.deepStrictEqual(
            tx.transduce(
                tx.take(2),
                tx.juxtR(early, tx.add(), tx.push(), tx.str("-")),
                src
            ),
            [3, 3, [1, 2], "1-2"]
        );
    });
});
