import * as assert from "assert";
import { rseq } from "../src";

describe("rseq", () => {
    it("basics", () => {
        assert.strictEqual(rseq(null), undefined);
        assert.strictEqual(rseq([]), undefined);
        assert.strictEqual(rseq([1])!.first(), 1);
        assert.strictEqual(rseq([1])!.next(), undefined);
        assert.strictEqual(rseq([1, 2])!.first(), 2);
        // prettier-ignore
        assert.strictEqual(rseq([1, 2])!.next()!.first(), 1);
        // prettier-ignore
        assert.strictEqual(rseq([1, 2])!.next()!.next(), undefined);
        // prettier-ignore
        assert.strictEqual(rseq([1, 2, 3])!.next()!.next()!.first(), 1);
    });

    it("range", () => {
        assert.strictEqual(rseq([0, 1, 2, 3], 2, 2), undefined);
        assert.strictEqual(rseq([0, 1, 2, 3], 2, 3), undefined);
        assert.strictEqual(rseq([0, 1, 2, 3], 3, 1)!.first(), 3);
        // prettier-ignore
        assert.strictEqual(rseq([0, 1, 2, 3], 3, 1)!.next()!.first(), 2);
        // prettier-ignore
        assert.strictEqual(rseq([0, 1, 2, 3], 3, 1)!.next()!.next(), undefined);
    });
});
