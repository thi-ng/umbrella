import * as assert from "assert";

import { DCons } from "../src/index";

describe("DCons", () => {
    let a: DCons<any>, src;
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

    it("works as stack");

    it("works as queue");
});