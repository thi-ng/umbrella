import { isSet } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { defSparseSet, SparseSet16, SparseSet32, SparseSet8 } from "../src";

describe("SparseSet", () => {
    let set: SparseSet8;

    beforeEach(() => {
        set = new SparseSet8(8);
    });

    it("factory / max value", () => {
        let a = defSparseSet(0x100);
        a.into([0xff, 0x100]);
        assert(a instanceof SparseSet8, "u8");
        assert.deepStrictEqual([...a], [0xff]);

        a = defSparseSet(0x10000);
        a.into([0xffff, 0x10000]);
        assert(a instanceof SparseSet16, "u16");
        assert.deepStrictEqual([...a], [0xffff]);

        a = defSparseSet(0x10001);
        a.into([0x10000, 0x10001]);
        assert(a instanceof SparseSet32, "u32");
        assert.deepStrictEqual([...a], [0x10000]);
    });

    it("ctor(n)", () => {
        assert(isSet(set));
        assert.strictEqual(set.size, 0);
        assert.strictEqual(set.capacity, 8);
    });

    it("ctor(arrays)", () => {
        const d = new Uint8Array(8);
        const s = new Uint8Array(8);
        set = new SparseSet8(d, s);
        assert.strictEqual(set.size, 0);
        assert.strictEqual(set.capacity, 8);
        assert.throws(() => new SparseSet8(new Uint8Array(4), s));
    });

    it("add", () => {
        assert(
            equiv(
                set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]),
                new Set([0, 1, 2, 3, 4, 7])
            )
        );
    });

    it("delete", () => {
        set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]);
        assert(set.delete(4));
        assert(equiv(set, new Set([0, 1, 2, 3, 7])));
        assert(set.delete(0));
        assert(equiv(set, new Set([1, 2, 3, 7])));
        assert(set.delete(7));
        assert(equiv(set, new Set([1, 2, 3])));
        assert(!set.delete(7));
        assert(!set.delete(4));
        set.add(4);
        assert(equiv(set, new Set([1, 2, 3, 4])));
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
