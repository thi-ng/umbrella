import { isSet } from "@thi.ng/checks";
import * as assert from "assert";
import { SparseSet8 } from "../src";

describe("SparseSet", () => {
    let set: SparseSet8;

    beforeEach(() => {
        set = new SparseSet8(8);
    });

    it("ctor(n)", () => {
        assert(isSet(set));
        assert.equal(set.size, 0);
        assert.equal(set.capacity, 8);
    });

    it("ctor(arrays)", () => {
        const d = new Uint8Array(8);
        const s = new Uint8Array(8);
        set = new SparseSet8(d, s);
        assert.equal(set.size, 0);
        assert.equal(set.capacity, 8);
        assert.throws(() => new SparseSet8(new Uint8Array(4), s));
    });

    it("add", () => {
        assert.deepEqual(
            set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]),
            new Set([0, 1, 2, 3, 4, 7])
        );
    });

    it("delete", () => {
        set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]);
        assert(set.delete(4));
        assert.deepEqual(set, new Set([0, 1, 2, 3, 7]));
        assert(set.delete(0));
        assert.deepEqual(set, new Set([1, 2, 3, 7]));
        assert(set.delete(7));
        assert.deepEqual(set, new Set([1, 2, 3]));
        assert(!set.delete(7));
        assert(!set.delete(4));
        set.add(4);
        assert.deepEqual(set, new Set([1, 2, 3, 4]));
    });

    it("has", () => {
        assert(!set.has(0));
        set.add(0);
        set.add(0);
        assert(set.has(0));
        set.delete(0);
        assert(!set.has(0));
        set.into([3, 1, 2]);
    });
});
