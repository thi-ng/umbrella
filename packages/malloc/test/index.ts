import { Type, TypedArray } from "@thi.ng/api";
import { align } from "@thi.ng/binary";
import * as assert from "assert";
import { MemPool } from "../src/index";

const POOL_OVERHEAD = 7 * 4;
const BLOCK_OVERHEAD = 2 * 4;

describe("malloc", () => {
    let pool: MemPool;

    beforeEach(() => {
        pool = new MemPool({ size: 0x100 });
    });

    it("ctor", () => {
        assert(pool instanceof MemPool);
        let p: any = pool;
        assert.equal(p.start, 0);
        assert.equal(p.top, align(POOL_OVERHEAD, 8));
        assert(p.doCompact);
        assert(p.doSplit);
        assert.equal(
            p.end,
            p.buf.byteLength,
            "When end option not specified, end should be byteLength"
        );
        p = new MemPool({ size: 0x100, start: 0x0c, end: 0x80 });
        assert.equal(p.start, 0x0c);
        assert.equal(p.top, align(0x0c + POOL_OVERHEAD, 8));
        assert.equal(p.end, 0x80);
        assert.throws(() => new MemPool({ size: 0x100, start: 0x0, end: 0x0 }));
        assert.throws(
            () => new MemPool({ size: 0x100, start: 0x100, end: 0x200 })
        );
        assert.throws(
            () => new MemPool({ size: 0x100, start: 0x80, end: 0x0 })
        );
    });

    it("malloc / free", () => {
        assert(!pool.malloc(256), "insufficient mem");
        assert(!pool.malloc(-1), "neg size");
        assert(!pool.malloc(0), "zero size");

        const base = pool.stats().top;
        let a = pool.malloc(12);
        let b = pool.malloc(31);
        let c = pool.malloc(24);
        assert.equal(a, base + BLOCK_OVERHEAD, "a");
        assert.equal(b, a + 16 + BLOCK_OVERHEAD, "b");
        assert.equal(c, b + 32 + BLOCK_OVERHEAD, "c");

        // state check
        let stats = pool.stats();
        assert.equal(stats.top, c + 24, "top");
        assert.deepEqual(stats.free, { count: 0, size: 0 });
        assert.deepEqual(stats.used, {
            count: 3,
            size: 16 + 32 + 24 + 3 * BLOCK_OVERHEAD,
        });

        // free all
        assert(pool.free(a), "free a");
        assert(pool.free(c), "free b");
        assert(pool.free(b), "free c");
        assert(!pool.free(b), "free b (repeat)");
        stats = pool.stats();
        assert.equal(stats.top, base, "top2");
        assert.deepEqual(stats.free, { count: 0, size: 0 });
        assert.deepEqual(stats.used, { count: 0, size: 0 });

        // alloc & split free block
        a = pool.malloc(32);
        assert.equal(a, base + BLOCK_OVERHEAD, "a2");
        stats = pool.stats();
        assert.deepEqual(stats.free, { count: 0, size: 0 });
        assert.deepEqual(stats.used, { count: 1, size: 32 + BLOCK_OVERHEAD });
        assert.equal(stats.top, base + 32 + BLOCK_OVERHEAD, "top3");
        // alloc next block & free prev
        b = pool.malloc(12);
        assert.equal(b, base + 32 + BLOCK_OVERHEAD * 2, "b2");
        assert(pool.free(a), "free a2");

        // re-alloc from free & split
        a = pool.malloc(8);
        assert.equal(a, base + BLOCK_OVERHEAD, "a3");
        stats = pool.stats();
        assert.deepEqual(stats.free, { count: 1, size: 24 });
        assert.deepEqual(stats.used, {
            count: 2,
            size: 24 + 2 * BLOCK_OVERHEAD,
        });
        assert.equal(stats.top, base + 32 + 16 + 2 * BLOCK_OVERHEAD, "top4");

        // join both free blocks
        assert(pool.free(b), "free b2");

        // extend free block + top
        b = pool.malloc(64);
        assert.equal(b, base + 8 + 2 * BLOCK_OVERHEAD, "b3");
        stats = pool.stats();
        assert.deepEqual(stats.free, { count: 0, size: 0 });
        assert.deepEqual(stats.used, {
            count: 2,
            size: 8 + 64 + 2 * BLOCK_OVERHEAD,
        });
        assert.equal(stats.top, base + 8 + 64 + 2 * BLOCK_OVERHEAD, "top5");

        // alloc at top, below min size
        c = pool.malloc(1);
        // non-continous free chain
        assert(pool.free(c), "free c2");
        // top reset to before
        assert.equal(stats.top, base + 8 + 64 + 2 * BLOCK_OVERHEAD, "top6");
        assert(pool.free(a), "free a3");
        stats = pool.stats();
        assert.deepEqual(stats.free, { count: 1, size: 8 + BLOCK_OVERHEAD });
        assert.deepEqual(stats.used, { count: 1, size: 64 + BLOCK_OVERHEAD });
        // top remains unchanged
        assert.equal(stats.top, base + 8 + 64 + 2 * BLOCK_OVERHEAD, "top7");

        // alloc larger size to force walking free chain
        // and then alloc @ top (reuse earlier block)
        a = pool.malloc(27);
        assert.equal(a, base + 8 + 64 + 3 * BLOCK_OVERHEAD, "a4");
        stats = pool.stats();
        assert.deepEqual(stats.free, { count: 1, size: 8 + BLOCK_OVERHEAD });
        assert.deepEqual(stats.used, {
            count: 2,
            size: 64 + 32 + 2 * BLOCK_OVERHEAD,
        });
        assert.equal(
            stats.top,
            base + 8 + 64 + 32 + 3 * BLOCK_OVERHEAD,
            "top8"
        );

        assert(pool.free(a), "free a4");
        assert(pool.free(b), "free b3");
        stats = pool.stats();
        assert.deepEqual(stats.free, { count: 0, size: 0 });
        assert.deepEqual(stats.used, { count: 0, size: 0 });
        assert.equal(stats.available, 256 - base);
        assert.equal(stats.top, base, "top9");

        pool.freeAll();
        assert.deepEqual(pool.stats(), {
            free: { count: 0, size: 0 },
            used: { count: 0, size: 0 },
            available: pool.buf.byteLength - base,
            total: pool.buf.byteLength,
            top: base,
        });
        pool.release();
    });

    it("mallocAs", () => {
        assert.deepEqual(pool.mallocAs(Type.U8, 257), null);
        assert.deepEqual(pool.mallocAs(Type.U16, 129), null);
        assert.deepEqual(pool.mallocAs(Type.U32, 65), null);
        assert.deepEqual(pool.mallocAs(Type.F64, 33), null);
        assert.deepEqual(pool.mallocAs(Type.U8, -1), null);

        const base = pool.stats().top;
        let a = pool.mallocAs(Type.F32, 3);
        let b = pool.mallocAs(Type.F64, 3);
        assert(a instanceof Float32Array, "a type");
        assert(b instanceof Float64Array, "b type");
        assert.equal(a!.byteOffset, base + BLOCK_OVERHEAD, "a addr");
        assert.equal(
            b!.byteOffset,
            a!.byteOffset + 16 + BLOCK_OVERHEAD,
            "b addr"
        );
        assert.equal(a!.length, 3, "a.length");
        assert.equal(b!.length, 3, "b.length");
        assert.equal(a!.byteLength, 12, "a bytes");
        assert.equal(b!.byteLength, 24, "b bytes");
        a!.set([1, 2, 3]);
        b!.set([10, 20, 30]);
        assert.deepEqual(
            [...new Uint32Array(pool.buf, a!.byteOffset, 4)],
            [
                // a
                0x3f800000,
                0x40000000,
                0x40400000,
                0,
            ]
        );
        assert.deepEqual(
            [...new Uint32Array(pool.buf, b!.byteOffset, 8)],
            [
                // b
                0,
                0x40240000,
                0,
                0x40340000,
                0,
                0x403e0000,
                0,
                0,
            ]
        );
        assert(pool.free(a!), "free a");
        assert(pool.free(b!), "free b");
        assert(!pool.free(a!), "free a (repeat)");
        assert(!pool.free(b!), "free b (repeat)");
        assert(!pool.free(new Uint16Array(1)), "free unmanaged");
    });

    it("calloc", () => {
        const u8: Uint8Array = (<any>pool).u8;
        u8.fill(0xff, pool.stats().top);
        let a = pool.calloc(6);
        assert.deepEqual(
            [...u8.subarray(a, a + 9)],
            [0, 0, 0, 0, 0, 0, 0xff, 0xff, 0xff]
        );
    });

    it("callocAs", () => {
        const u8: Uint8Array = (<any>pool).u8;
        u8.fill(0xff, pool.stats().top);
        let a: TypedArray | undefined = pool.callocAs(Type.F32, 3);
        let b: TypedArray | undefined = pool.callocAs(Type.F64, 3);
        let t = [0, 0, 0];
        assert(a instanceof Float32Array, "a type");
        assert(b instanceof Float64Array, "b type");
        assert.deepEqual([...a!], t);
        assert.deepEqual([...b!], t);
        a!.set([1, 2, 3]);
        b!.set([10, 20, 30]);
        assert(pool.free(a!), "free a");
        assert(pool.free(b!), "free b");
        // returned arrays are filled w/ given arg
        a = pool.callocAs(Type.U32, 3, 0xaa55aa55);
        b = pool.callocAs(Type.U32, 3, 0xaa55aa55);
        t = [0xaa55aa55, 0xaa55aa55, 0xaa55aa55];
        assert.deepEqual([...a!], t);
        assert.deepEqual([...b!], t);
    });

    it("malloc top", () => {
        let a = pool.malloc(8);
        let b = pool.malloc(8);
        let c = pool.malloc(8);
        let d = pool.malloc(8);
        // cause non continuous free chain
        pool.free(a);
        pool.free(b);
        pool.free(d);
        assert.equal(pool.malloc(pool.buf.byteLength - d + 1), 0, "malloc top");
        assert.equal(
            pool.mallocAs(Type.U8, pool.buf.byteLength - d + 1),
            null,
            "mallocAs top"
        );
        pool.free(c);
    });

    it("realloc", () => {
        let p: any = pool;

        const a = pool.malloc(8);
        p.u8.fill(0xff, a, a + 8);

        const block = p._used;
        const bsize = p.blockSize(block);
        assert.equal(bsize, align(8 + BLOCK_OVERHEAD, 8), "size a");
        assert.equal(pool.realloc(a, 0), 0, "too small");
        assert.equal(pool.realloc(a, 65), a, "enlarge a");

        const usedBlockAfterRealloc = p._used;
        assert.equal(usedBlockAfterRealloc, block);
        assert.equal(
            p.blockSize(usedBlockAfterRealloc),
            align(65 + BLOCK_OVERHEAD, 8)
        );

        // shrink & update top
        assert.equal(pool.realloc(a, 31), a, "shrink a");
        assert.equal(
            p.blockSize(usedBlockAfterRealloc),
            align(31 + BLOCK_OVERHEAD, 8)
        );
        assert.equal(p._free, 0);
        assert.equal(p.top, a + 32);

        // add new top block
        const b = pool.malloc(8);
        assert.equal(b, a + 40, "b");

        // enlage a again, but need to move after b
        const a2 = pool.realloc(a, 65);
        assert.equal(a2, b + 16);
        assert.deepEqual(
            [...p.u8.slice(a2, a2 + 9)],
            [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0]
        );
    });

    it("reallocArray", () => {
        const a = pool.callocAs(Type.F32, 4, 1);
        assert.deepEqual(
            [...pool.reallocArray(a!, 8)!],
            [1, 1, 1, 1, 0, 0, 0, 0]
        );
        assert.equal(pool.reallocArray(a!, 10000), undefined);
        assert.equal(pool.reallocArray(new Float32Array(4), 8), undefined);
    });

    it("no compact", () => {
        pool = new MemPool({ size: 0x100, compact: false });
        const p: any = pool;
        const a = pool.malloc(8);
        const a1 = pool.malloc(8);
        const a2 = pool.malloc(8);
        pool.free(a);
        pool.free(a1);
        pool.free(a2);
        assert.equal(p._free + BLOCK_OVERHEAD, a);
        assert.equal(p.blockNext(p._free) + BLOCK_OVERHEAD, a1);
        assert.equal(p.blockNext(p.blockNext(p._free)) + BLOCK_OVERHEAD, a2);
        assert.equal(p.blockNext(p.blockNext(p.blockNext(p._free))), 0);
    });

    it("no split", () => {
        pool = new MemPool({ size: 0x100, split: true });
        let p: any = pool;
        const base = pool.stats().top;

        let a = pool.malloc(32);
        pool.malloc(8);
        pool.free(a);
        pool.malloc(8);
        assert.equal(p._used, base);
        assert.equal(p.blockSize(p._used), 8 + BLOCK_OVERHEAD);
        assert.equal(p._free, base + 8 + BLOCK_OVERHEAD);
        assert.equal(p.blockSize(p._free), 24);

        pool = new MemPool({ size: 0x100, split: false });
        p = pool;
        a = pool.malloc(32);
        pool.malloc(8);
        pool.free(a);
        pool.malloc(8);
        assert.equal(p._used, base);
        assert.equal(p.blockSize(p._used), 32 + BLOCK_OVERHEAD);
        assert.equal(p._free, 0);
    });

    it("malloc (align 16)", () => {
        pool = new MemPool({ size: 0x100, align: 16 });
        let p: any = pool;
        const base = pool.stats().top;
        let a = pool.callocAs(Type.U8, 15);
        let b = pool.callocAs(Type.U8, 11);
        let c = pool.callocAs(Type.U8, 7);
        let d = pool.callocAs(Type.U8, 3);
        let e = pool.callocAs(Type.U8, 1);
        assert.equal(a!.byteOffset, base + BLOCK_OVERHEAD, "a");
        assert.equal(
            b!.byteOffset,
            align(a!.byteOffset + BLOCK_OVERHEAD + 15, 16),
            "b"
        );
        assert.equal(
            c!.byteOffset,
            align(b!.byteOffset + BLOCK_OVERHEAD + 11, 16),
            "c"
        );
        assert.equal(
            d!.byteOffset,
            align(c!.byteOffset + BLOCK_OVERHEAD + 7, 16),
            "d"
        );
        assert.equal(
            e!.byteOffset,
            align(d!.byteOffset + BLOCK_OVERHEAD + 3, 16),
            "e"
        );
        let stats = pool.stats();
        assert.equal(stats.top, align(e!.byteOffset + 1, 16) - BLOCK_OVERHEAD);

        pool.free(d!);
        assert.equal(p._free, d!.byteOffset - BLOCK_OVERHEAD);
        pool.free(b!);
        assert.equal(p._free, b!.byteOffset - BLOCK_OVERHEAD);
        assert.equal(p.blockNext(p._free), d!.byteOffset - BLOCK_OVERHEAD);
        pool.free(c!);
        assert.equal(p._free, b!.byteOffset - BLOCK_OVERHEAD);
        assert.equal(p.blockSize(p._free), e!.byteOffset - b!.byteOffset);
        pool.free(a!);
        assert.equal(p._free, a!.byteOffset - BLOCK_OVERHEAD);
        assert.equal(p.blockSize(p._free), e!.byteOffset - a!.byteOffset);
        pool.free(e!);
        assert.equal(p._free, 0);
        assert.equal(p._used, 0);
        assert.equal(p.top, base);
    });

    it("freeAll (align 16)", () => {
        pool = new MemPool({ size: 0x100, align: 16 });
        const base = pool.stats().top;
        pool.callocAs(Type.U8, 15);
        pool.callocAs(Type.U8, 11);
        pool.freeAll();
        assert.equal(pool.stats().top, base);
    });
});
