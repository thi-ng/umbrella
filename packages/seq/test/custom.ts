import type { ISeqable } from "@thi.ng/api";
import * as assert from "assert";
import { concat, ensureSeq, iterator } from "../src";

export class Range implements ISeqable<number> {
    n: number;

    constructor(n: number) {
        this.n = n;
    }

    seq() {
        const $seq = (i: number) =>
            i < this.n
                ? {
                      first() {
                          return i;
                      },
                      next() {
                          return $seq(i + 1);
                      },
                  }
                : undefined;
        return $seq(0);
    }
}

describe("custom", () => {
    it("basics", () => {
        assert.equal(ensureSeq(new Range(0)), undefined);
        assert.equal(new Range(0).seq(), undefined);
        assert.equal(new Range(1).seq()!.first(), 0);
        assert.equal(new Range(1).seq()!.next(), undefined);
        assert.deepEqual([...iterator(new Range(3))], [0, 1, 2]);
        assert.deepEqual([...iterator(new Range(0))], []);
        assert.deepEqual(
            [...iterator(concat(new Range(3), new Range(0), new Range(4)))],
            [0, 1, 2, 0, 1, 2, 3]
        );
    });
});
