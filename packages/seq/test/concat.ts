import * as assert from "assert";
import { aseq, concat, concatA, iterator, rseq } from "../src";

describe("concat / iterator", () => {
    it("concat", () => {
        assert.equal(concat(null), undefined);
        assert.equal(concat(aseq([])), undefined);
        assert.deepEqual([...iterator(concat(aseq([]), null, undefined))], []);
        assert.deepEqual([...iterator(concat(aseq([null])))], [null]);
        assert.deepEqual([...iterator(concat(aseq([undefined])))], [undefined]);
        assert.deepEqual(
            [
                ...iterator(
                    concat(
                        aseq([]),
                        aseq([1, 2, 3]),
                        null,
                        rseq([1, 2, 3]),
                        undefined
                    )
                ),
            ],
            [1, 2, 3, 3, 2, 1]
        );
    });

    it("concatA", () => {
        assert.equal(concatA(null, undefined, []), undefined);
        assert.deepEqual([...iterator(concatA([null]))], [null]);
        assert.deepEqual([...iterator(concatA([undefined]))], [undefined]);
        assert.deepEqual([...iterator(concatA("abc"))], ["a", "b", "c"]);
        assert.deepEqual(
            [...iterator(concatA([], [1, 2, 3], null, [3, 2, 1], undefined))],
            [1, 2, 3, 3, 2, 1]
        );
    });
});
