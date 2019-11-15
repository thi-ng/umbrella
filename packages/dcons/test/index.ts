import * as assert from "assert";
import { DCons } from "../src/index";

describe("DCons", () => {
    let a: DCons<any>, src: number[];
    beforeEach(() => {
        src = [1, 2, 3, 4, 5];
        a = new DCons(src);
    });

    it("is instanceof", () => {
        assert(a instanceof DCons);
    });

    it("has length", () => {
        assert.equal(a.length, 5);
        a = new DCons();
        assert.equal(a.length, 0);
    });

    it("is iterable", () => {
        assert.deepEqual([...a], src);
    });

    it("is seqable", () => {
        assert.equal(a.seq()!.first(), 1);
        // prettier-ignore
        assert.equal(a.seq()!.next()!.first(), 2);
        // prettier-ignore
        assert.equal(a.seq(3)!.first(), 4);
        // prettier-ignore
        assert.equal(a.seq(3)!.next()!.first(), 5);
        // prettier-ignore
        assert.equal(a.seq(3)!.next()!.next(), undefined);
        assert.equal(a.seq(2, 2), undefined);
        assert.equal(a.seq(2, 3)!.first(), 3);
        assert.equal(a.seq(2, 3)!.next(), undefined);
    });

    it("works as stack", () => {
        assert.equal(a.push(10).pop(), 10);
        assert.equal(a.pop(), 5);
        a = new DCons();
        assert.equal(a.pop(), undefined);
    });

    it("works as queue", () => {
        assert.equal(a.push(10).drop(), 1);
        assert.equal(a.drop(), 2);
        assert.equal(a.drop(), 3);
        assert.equal(a.drop(), 4);
        assert.equal(a.drop(), 5);
        assert.equal(a.drop(), 10);
        assert.equal(a.drop(), undefined);
    });
});
