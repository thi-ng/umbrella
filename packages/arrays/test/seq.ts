import * as assert from "assert";
import { arraySeq } from "../src";

describe("arraySeq", () => {
    it("basics", () => {
        assert.notEqual(arraySeq(null), undefined);
        assert.equal(arraySeq(null).first(), undefined);
        assert.equal(arraySeq(null).next(), undefined);
        assert.equal(arraySeq([]).first(), undefined);
        assert.equal(arraySeq([]).next(), undefined);
        assert.equal(arraySeq([1]).first(), 1);
        assert.equal(arraySeq([1]).next(), undefined);
        assert.equal(arraySeq([1, 2]).first(), 1);
        // prettier-ignore
        assert.equal(arraySeq([1, 2]).next()!.first(), 2);
        // prettier-ignore
        assert.equal(arraySeq([1, 2]).next()!.next(), undefined);
        // prettier-ignore
        assert.equal(arraySeq([1, 2, 3]).next()!.next()!.first(), 3);
    });
});
