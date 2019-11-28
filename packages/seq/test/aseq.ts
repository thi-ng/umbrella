import * as assert from "assert";
import { aseq } from "../src";

describe("aseq", () => {
    it("basics", () => {
        assert.equal(aseq(null), undefined);
        assert.equal(aseq([]), undefined);
        assert.equal(aseq([1])!.first(), 1);
        assert.equal(aseq([1])!.next(), undefined);
        assert.equal(aseq([1, 2])!.first(), 1);
        // prettier-ignore
        assert.equal(aseq([1, 2])!.next()!.first(), 2);
        // prettier-ignore
        assert.equal(aseq([1, 2])!.next()!.next(), undefined);
        // prettier-ignore
        assert.equal(aseq([1, 2, 3])!.next()!.next()!.first(), 3);
    });

    it("range", () => {
        assert.equal(aseq([0, 1, 2, 3], 2, 2), undefined);
        assert.equal(aseq([0, 1, 2, 3], 3, 2), undefined);
        assert.equal(aseq([0, 1, 2, 3], 2, 4)!.first(), 2);
        // prettier-ignore
        assert.equal(aseq([0, 1, 2, 3], 2, 4)!.next()!.first(), 3);
        // prettier-ignore
        assert.equal(aseq([0, 1, 2, 3], 2, 4)!.next()!.next(), undefined);
    });
});
