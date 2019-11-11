import * as assert from "assert";
import { VersionedIDGen } from "../src";

describe("VersionedIDGen", () => {
    it("reuse", () => {
        const g = new VersionedIDGen(8);
        assert.equal(g.next(), 0);
        assert.equal(g.next(), 1);
        assert.equal(g.next(), 2);
        assert(g.free(1));
        assert(g.free(2));
        assert.equal(g.next(), 0x102);
        assert.equal(g.next(), 0x101);
        assert.equal(g.next(), 3);
        assert(g.free(0));
        assert(!g.free(0));
        assert.equal(g.next(), 0x100);
        assert(g.free(0x100));
        assert(g.free(3));
        assert.equal((<any>g).freeID, 0x103);
        assert(g.free(0x101));
        assert(g.free(0x102));
        assert.equal((<any>g).freeID, 0x202);
        assert.deepEqual((<any>g).ids, [-1, 0x103, 0x201, 0x200]);
    });

    it("has (unversioned)", () => {
        const check = (expected: boolean[]) => {
            for (let i = 0; i < 4; i++) {
                i > 0 && assert(!g.has(-i), String(-i));
                assert.equal(g.has(i), expected[i], String(i));
                assert(!g.has(i + 4), String(i + 4));
            }
        };

        const g = new VersionedIDGen(2, 0);
        g.next();
        g.next();
        g.next();
        g.next();
        assert.throws(() => g.next(), "max cap");
        check([true, true, true, true]);
        g.free(2);
        check([true, true, false, true]);
        g.free(1);
        check([true, false, false, true]);
        g.free(0);
        check([false, false, false, true]);
        g.next();
        check([true, false, false, true]);
        g.next();
        check([true, true, false, true]);
        g.free(3);
        check([true, true, false, false]);
        g.next();
        check([true, true, false, true]);
        g.next();
        check([true, true, true, true]);
        assert.throws(() => g.next(), "max cap 2");
    });

    it("has (versioned)", () => {
        const check = (ids: number[], expected: boolean[]) => {
            for (let i = 0; i < 4; i++) {
                assert.equal(g.has(ids[i]), expected[i], String(i));
                assert.equal(g.has(ids[i]), expected[i], String(ids[i]));
            }
        };

        const g = new VersionedIDGen(2, 1);
        g.next();
        g.next();
        g.next();
        g.next();
        assert.throws(() => g.next(), "max cap");
        check([0, 1, 2, 3], [true, true, true, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3 + 4], [false, false, false, false]);
        g.free(2);
        check([0, 1, 2, 3], [true, true, false, true]);
        check([0, 1, 2 + 4, 3], [true, true, false, true]);
        g.free(1);
        check([0, 1, 2, 3], [true, false, false, true]);
        check([0, 1 + 4, 2 + 4, 3], [true, false, false, true]);
        g.free(0);
        check([0, 1, 2, 3], [false, false, false, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3], [true, false, false, true]);
        g.free(0 + 4);
        check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        // 0 version wraparound
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [true, false, false, true]);
        check([0 + 4, 1 + 4, 2 + 4, 3], [false, false, false, true]);
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [true, true, false, true]);
        g.next();
        check([0, 1 + 4, 2 + 4, 3], [true, true, true, true]);
        g.free(0);
        g.free(1 + 4);
        g.free(2 + 4);
        g.free(3);
        check([0, 1, 2, 3], [false, false, false, false]);
        check([0 + 4, 1 + 4, 2 + 4, 3 + 4], [false, false, false, false]);
        assert.equal((<any>g).freeID, 3 + 4);
    });
});
