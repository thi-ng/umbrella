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
});
