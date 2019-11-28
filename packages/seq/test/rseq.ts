import * as assert from "assert";
import { rseq } from "../src";

describe("rseq", () => {
    it("basics", () => {
        assert.equal(rseq(null), undefined);
        assert.equal(rseq([]), undefined);
        assert.equal(rseq([1])!.first(), 1);
        assert.equal(rseq([1])!.next(), undefined);
        assert.equal(rseq([1, 2])!.first(), 2);
        // prettier-ignore
        assert.equal(rseq([1, 2])!.next()!.first(), 1);
        // prettier-ignore
        assert.equal(rseq([1, 2])!.next()!.next(), undefined);
        // prettier-ignore
        assert.equal(rseq([1, 2, 3])!.next()!.next()!.first(), 1);
    });

    it("range", () => {
        assert.equal(rseq([0, 1, 2, 3], 2, 2), undefined);
        assert.equal(rseq([0, 1, 2, 3], 2, 3), undefined);
        assert.equal(rseq([0, 1, 2, 3], 3, 1)!.first(), 3);
        // prettier-ignore
        assert.equal(rseq([0, 1, 2, 3], 3, 1)!.next()!.first(), 2);
        // prettier-ignore
        assert.equal(rseq([0, 1, 2, 3], 3, 1)!.next()!.next(), undefined);
    });
});
