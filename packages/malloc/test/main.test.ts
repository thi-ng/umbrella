import type { TypedArray } from "@thi.ng/api";
import { align } from "@thi.ng/binary";
import { beforeEach, expect, test } from "bun:test";
import { MemPool } from "../src/index.js";

const POOL_OVERHEAD = 7 * 4;
const BLOCK_OVERHEAD = 2 * 4;

let pool: MemPool;

beforeEach(() => {
	pool = new MemPool({ size: 0x100 });
});

test("ctor", () => {
	expect(pool instanceof MemPool).toBeTrue();
	let p: any = pool;
	expect(p.start).toBe(0);
	expect(p.top).toBe(align(POOL_OVERHEAD, 8));
	expect(p.doCompact).toBeTrue();
	expect(p.doSplit).toBeTrue();
	expect(p.end).toBe(
		p.buf.byteLength
		// "When end option not specified, end should be byteLength"
	);
	p = new MemPool({ size: 0x100, start: 0x0c, end: 0x80 });
	expect(p.start).toBe(0x0c);
	expect(p.top).toBe(align(0x0c + POOL_OVERHEAD, 8));
	expect(p.end).toBe(0x80);
	expect(() => new MemPool({ size: 0x100, start: 0x0, end: 0x0 })).toThrow();
	expect(
		() => new MemPool({ size: 0x100, start: 0x100, end: 0x200 })
	).toThrow();
	expect(() => new MemPool({ size: 0x100, start: 0x80, end: 0x0 })).toThrow();
});

test("malloc / free", () => {
	expect(pool.malloc(256)).toBe(0);
	expect(pool.malloc(-1)).toBe(0);
	expect(pool.malloc(0)).toBe(0);

	const base = pool.stats().top;
	let a = pool.malloc(12);
	let b = pool.malloc(31);
	let c = pool.malloc(24);
	expect(a).toBe(base + BLOCK_OVERHEAD);
	expect(b).toBe(a + 16 + BLOCK_OVERHEAD);
	expect(c).toBe(b + 32 + BLOCK_OVERHEAD);

	// state check
	let stats = pool.stats();
	expect(stats.top).toBe(c + 24);
	expect(stats.free).toEqual({ count: 0, size: 0 });
	expect(stats.used).toEqual({
		count: 3,
		size: 16 + 32 + 24 + 3 * BLOCK_OVERHEAD,
	});

	// free all
	expect(pool.free(a)).toBeTrue();
	expect(pool.free(c)).toBeTrue();
	expect(pool.free(b)).toBeTrue();
	expect(pool.free(b)).toBeFalse();
	stats = pool.stats();
	expect(stats.top).toBe(base);
	expect(stats.free).toEqual({ count: 0, size: 0 });
	expect(stats.used).toEqual({ count: 0, size: 0 });

	// alloc & split free block
	a = pool.malloc(32);
	expect(a).toBe(base + BLOCK_OVERHEAD);
	stats = pool.stats();
	expect(stats.free).toEqual({ count: 0, size: 0 });
	expect(stats.used).toEqual({
		count: 1,
		size: 32 + BLOCK_OVERHEAD,
	});
	expect(stats.top).toBe(base + 32 + BLOCK_OVERHEAD);
	// alloc next block & free prev
	b = pool.malloc(12);
	expect(b).toBe(base + 32 + BLOCK_OVERHEAD * 2);
	expect(pool.free(a)).toBeTrue();

	// re-alloc from free & split
	a = pool.malloc(8);
	expect(a).toBe(base + BLOCK_OVERHEAD);
	stats = pool.stats();
	expect(stats.free).toEqual({ count: 1, size: 24 });
	expect(stats.used).toEqual({
		count: 2,
		size: 24 + 2 * BLOCK_OVERHEAD,
	});
	expect(stats.top).toBe(base + 32 + 16 + 2 * BLOCK_OVERHEAD);

	// join both free blocks
	expect(pool.free(b)).toBeTrue();

	// extend free block + top
	b = pool.malloc(64);
	expect(b).toBe(base + 8 + 2 * BLOCK_OVERHEAD);
	stats = pool.stats();
	expect(stats.free).toEqual({ count: 0, size: 0 });
	expect(stats.used).toEqual({
		count: 2,
		size: 8 + 64 + 2 * BLOCK_OVERHEAD,
	});
	expect(stats.top).toBe(base + 8 + 64 + 2 * BLOCK_OVERHEAD);

	// alloc at top, below min size
	c = pool.malloc(1);
	// non-continous free chain
	expect(pool.free(c)).toBeTrue();
	// top reset to before
	expect(stats.top).toBe(base + 8 + 64 + 2 * BLOCK_OVERHEAD);
	expect(pool.free(a)).toBeTrue();
	stats = pool.stats();
	expect(stats.free).toEqual({
		count: 1,
		size: 8 + BLOCK_OVERHEAD,
	});
	expect(stats.used).toEqual({
		count: 1,
		size: 64 + BLOCK_OVERHEAD,
	});
	// top remains unchanged
	expect(stats.top).toBe(base + 8 + 64 + 2 * BLOCK_OVERHEAD);

	// alloc larger size to force walking free chain
	// and then alloc @ top (reuse earlier block)
	a = pool.malloc(27);
	expect(a).toBe(base + 8 + 64 + 3 * BLOCK_OVERHEAD);
	stats = pool.stats();
	expect(stats.free).toEqual({
		count: 1,
		size: 8 + BLOCK_OVERHEAD,
	});
	expect(stats.used).toEqual({
		count: 2,
		size: 64 + 32 + 2 * BLOCK_OVERHEAD,
	});
	expect(stats.top).toBe(base + 8 + 64 + 32 + 3 * BLOCK_OVERHEAD);

	expect(pool.free(a)).toBeTrue();
	expect(pool.free(b)).toBeTrue();
	stats = pool.stats();
	expect(stats.free).toEqual({ count: 0, size: 0 });
	expect(stats.used).toEqual({ count: 0, size: 0 });
	expect(stats.available).toBe(256 - base);
	expect(stats.top).toBe(base);

	pool.freeAll();
	expect(pool.stats()).toEqual({
		free: { count: 0, size: 0 },
		used: { count: 0, size: 0 },
		available: pool.buf.byteLength - base,
		total: pool.buf.byteLength,
		top: base,
	});
	pool.release();
});

test("mallocAs", () => {
	expect(pool.mallocAs("u8", 257)).toBeUndefined();
	expect(pool.mallocAs("u16", 129)).toBeUndefined();
	expect(pool.mallocAs("u32", 65)).toBeUndefined();
	expect(pool.mallocAs("f64", 33)).toBeUndefined();
	expect(pool.mallocAs("u8", -1)).toBeUndefined();

	const base = pool.stats().top;
	let a = pool.mallocAs("f32", 3);
	let b = pool.mallocAs("f64", 3);
	expect(a instanceof Float32Array).toBeTrue();
	expect(b instanceof Float64Array).toBeTrue();
	expect(a!.byteOffset).toBe(base + BLOCK_OVERHEAD);
	expect(b!.byteOffset).toBe(a!.byteOffset + 16 + BLOCK_OVERHEAD);
	expect(a!.length).toBe(3);
	expect(b!.length).toBe(3);
	expect(a!.byteLength).toBe(12);
	expect(b!.byteLength).toBe(24);
	a!.set([1, 2, 3]);
	b!.set([10, 20, 30]);
	expect([...new Uint32Array(pool.buf, a!.byteOffset, 4)]).toEqual([
		// a
		0x3f800000, 0x40000000, 0x40400000, 0,
	]);
	expect([...new Uint32Array(pool.buf, b!.byteOffset, 8)]).toEqual([
		// b
		0, 0x40240000, 0, 0x40340000, 0, 0x403e0000, 0, 0,
	]);
	expect(pool.free(a!)).toBeTrue();
	expect(pool.free(b!)).toBeTrue();
	expect(pool.free(a!)).toBeFalse();
	expect(pool.free(b!)).toBeFalse();
	expect(pool.free(new Uint16Array(1))).toBeFalse();
});

test("calloc", () => {
	const u8: Uint8Array = (<any>pool).u8;
	u8.fill(0xff, pool.stats().top);
	let a = pool.calloc(6);
	expect([...u8.subarray(a, a + 9)]).toEqual([
		0, 0, 0, 0, 0, 0, 0xff, 0xff, 0xff,
	]);
});

test("callocAs", () => {
	const u8: Uint8Array = (<any>pool).u8;
	u8.fill(0xff, pool.stats().top);
	let a: TypedArray | undefined = pool.callocAs("f32", 3);
	let b: TypedArray | undefined = pool.callocAs("f64", 3);
	let t = [0, 0, 0];
	expect(a instanceof Float32Array).toBeTrue();
	expect(b instanceof Float64Array).toBeTrue();
	expect([...a!]).toEqual(t);
	expect([...b!]).toEqual(t);
	a!.set([1, 2, 3]);
	b!.set([10, 20, 30]);
	expect(pool.free(a!)).toBeTrue();
	expect(pool.free(b!)).toBeTrue();
	// returned arrays are filled w/ given arg
	a = pool.callocAs("u32", 3, 0xaa55aa55);
	b = pool.callocAs("u32", 3, 0xaa55aa55);
	t = [0xaa55aa55, 0xaa55aa55, 0xaa55aa55];
	expect([...a!]).toEqual(t);
	expect([...b!]).toEqual(t);
});

test("malloc top", () => {
	let a = pool.malloc(8);
	let b = pool.malloc(8);
	let c = pool.malloc(8);
	let d = pool.malloc(8);
	// cause non continuous free chain
	pool.free(a);
	pool.free(b);
	pool.free(d);
	expect(pool.malloc(pool.buf.byteLength - d + 1)).toBe(0);
	expect(pool.mallocAs("u8", pool.buf.byteLength - d + 1)).toBeUndefined();
	pool.free(c);
});

test("realloc", () => {
	let p: any = pool;

	const a = pool.malloc(8);
	p.u8.fill(0xff, a, a + 8);

	const block = p._used;
	const bsize = p.blockSize(block);
	expect(bsize).toBe(align(8 + BLOCK_OVERHEAD, 8));
	expect(pool.realloc(a, 0)).toBe(0);
	expect(pool.realloc(a, 65)).toBe(a);

	const usedBlockAfterRealloc = p._used;
	expect(usedBlockAfterRealloc).toBe(block);
	expect(p.blockSize(usedBlockAfterRealloc)).toBe(
		align(65 + BLOCK_OVERHEAD, 8)
	);

	// shrink & update top
	expect(pool.realloc(a, 31)).toBe(a);
	expect(p.blockSize(usedBlockAfterRealloc)).toBe(
		align(31 + BLOCK_OVERHEAD, 8)
	);
	expect(p._free).toBe(0);
	expect(p.top).toBe(a + 32);

	// add new top block
	const b = pool.malloc(8);
	expect(b).toBe(a + 40);

	// enlage a again, but need to move after b
	const a2 = pool.realloc(a, 65);
	expect(a2).toBe(b + 16);
	expect([...p.u8.slice(a2, a2 + 9)]).toEqual([
		0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0,
	]);
});

test("reallocArray", () => {
	const a = pool.callocAs("f32", 4, 1);
	expect([...pool.reallocArray(a!, 8)!]).toEqual([1, 1, 1, 1, 0, 0, 0, 0]);
	expect(pool.reallocArray(a!, 10000)).toBeUndefined();
	expect(pool.reallocArray(new Float32Array(4), 8)).toBeUndefined();
});

test("no compact", () => {
	pool = new MemPool({ size: 0x100, compact: false });
	const p: any = pool;
	const a = pool.malloc(8);
	const a1 = pool.malloc(8);
	const a2 = pool.malloc(8);
	pool.free(a);
	pool.free(a1);
	pool.free(a2);
	expect(p._free + BLOCK_OVERHEAD).toBe(a);
	expect(p.blockNext(p._free) + BLOCK_OVERHEAD).toBe(a1);
	expect(p.blockNext(p.blockNext(p._free)) + BLOCK_OVERHEAD).toBe(a2);
	expect(p.blockNext(p.blockNext(p.blockNext(p._free)))).toBe(0);
});

test("no split", () => {
	pool = new MemPool({ size: 0x100, split: true });
	let p: any = pool;
	const base = pool.stats().top;

	let a = pool.malloc(32);
	pool.malloc(8);
	pool.free(a);
	pool.malloc(8);
	expect(p._used).toBe(base);
	expect(p.blockSize(p._used)).toBe(8 + BLOCK_OVERHEAD);
	expect(p._free).toBe(base + 8 + BLOCK_OVERHEAD);
	expect(p.blockSize(p._free)).toBe(24);

	pool = new MemPool({ size: 0x100, split: false });
	p = pool;
	a = pool.malloc(32);
	pool.malloc(8);
	pool.free(a);
	pool.malloc(8);
	expect(p._used).toBe(base);
	expect(p.blockSize(p._used)).toBe(32 + BLOCK_OVERHEAD);
	expect(p._free).toBe(0);
});

test("malloc (align 16)", () => {
	pool = new MemPool({ size: 0x100, align: 16 });
	let p: any = pool;
	const base = pool.stats().top;
	let a = pool.callocAs("u8", 15);
	let b = pool.callocAs("u8", 11);
	let c = pool.callocAs("u8", 7);
	let d = pool.callocAs("u8", 3);
	let e = pool.callocAs("u8", 1);
	expect(a!.byteOffset).toBe(base + BLOCK_OVERHEAD);
	expect(b!.byteOffset).toBe(align(a!.byteOffset + BLOCK_OVERHEAD + 15, 16));
	expect(c!.byteOffset).toBe(align(b!.byteOffset + BLOCK_OVERHEAD + 11, 16));
	expect(d!.byteOffset).toBe(align(c!.byteOffset + BLOCK_OVERHEAD + 7, 16));
	expect(e!.byteOffset).toBe(align(d!.byteOffset + BLOCK_OVERHEAD + 3, 16));
	let stats = pool.stats();
	expect(stats.top).toBe(align(e!.byteOffset + 1, 16) - BLOCK_OVERHEAD);

	pool.free(d!);
	expect(p._free).toBe(d!.byteOffset - BLOCK_OVERHEAD);
	pool.free(b!);
	expect(p._free).toBe(b!.byteOffset - BLOCK_OVERHEAD);
	expect(p.blockNext(p._free)).toBe(d!.byteOffset - BLOCK_OVERHEAD);
	pool.free(c!);
	expect(p._free).toBe(b!.byteOffset - BLOCK_OVERHEAD);
	expect(p.blockSize(p._free)).toBe(e!.byteOffset - b!.byteOffset);
	pool.free(a!);
	expect(p._free).toBe(a!.byteOffset - BLOCK_OVERHEAD);
	expect(p.blockSize(p._free)).toBe(e!.byteOffset - a!.byteOffset);
	pool.free(e!);
	expect(p._free).toBe(0);
	expect(p._used).toBe(0);
	expect(p.top).toBe(base);
});

test("freeAll (align 16)", () => {
	pool = new MemPool({ size: 0x100, align: 16 });
	const base = pool.stats().top;
	pool.callocAs("u8", 15);
	pool.callocAs("u8", 11);
	pool.freeAll();
	expect(pool.stats().top).toBe(base);
});
