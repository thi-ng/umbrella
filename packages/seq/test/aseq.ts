import * as assert from "assert";
import { aseq } from "../src";

describe("aseq", () => {
    it("basics", () => {
        assert.notEqual(aseq(null), undefined);
        assert.equal(aseq(null).first(), undefined);
        assert.equal(aseq(null).next(), undefined);
        assert.equal(aseq([]).first(), undefined);
        assert.equal(aseq([]).next(), undefined);
        assert.equal(aseq([1]).first(), 1);
        assert.equal(aseq([1]).next(), undefined);
        assert.equal(aseq([1, 2]).first(), 1);
        // prettier-ignore
        assert.equal(aseq([1, 2]).next()!.first(), 2);
        // prettier-ignore
        assert.equal(aseq([1, 2]).next()!.next(), undefined);
        // prettier-ignore
        assert.equal(aseq([1, 2, 3]).next()!.next()!.first(), 3);
    });
});
