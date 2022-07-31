import type { TypedArray } from "@thi.ng/api";
import { align } from "@thi.ng/binary";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { MemPool } from "../src/index.js";

const POOL_OVERHEAD = 7 * 4;
const BLOCK_OVERHEAD = 2 * 4;

let pool: MemPool;

group(
	"malloc",
	{
		ctor: () => {
			assert.ok(pool instanceof MemPool);
			let p: any = pool;
			assert.strictEqual(p.start, 0);
			assert.strictEqual(p.top, align(POOL_OVERHEAD, 8));
			assert.ok(p.doCompact);
			assert.ok(p.doSplit);
			assert.strictEqual(
				p.end,
				p.buf.byteLength,
				"When end option not specified, end should be byteLength"
			);
			p = new MemPool({ size: 0x100, start: 0x0c, end: 0x80 });
			assert.strictEqual(p.start, 0x0c);
			assert.strictEqual(p.top, align(0x0c + POOL_OVERHEAD, 8));
			assert.strictEqual(p.end, 0x80);
			assert.throws(
				() => new MemPool({ size: 0x100, start: 0x0, end: 0x0 })
			);
			assert.throws(
				() => new MemPool({ size: 0x100, start: 0x100, end: 0x200 })
			);
			assert.throws(
				() => new MemPool({ size: 0x100, start: 0x80, end: 0x0 })
			);
		},

		"malloc / free": () => {
			assert.ok(!pool.malloc(256), "insufficient mem");
			assert.ok(!pool.malloc(-1), "neg size");
			assert.ok(!pool.malloc(0), "zero size");

			const base = pool.stats().top;
			let a = pool.malloc(12);
			let b = pool.malloc(31);
			let c = pool.malloc(24);
			assert.strictEqual(a, base + BLOCK_OVERHEAD, "a");
			assert.strictEqual(b, a + 16 + BLOCK_OVERHEAD, "b");
			assert.strictEqual(c, b + 32 + BLOCK_OVERHEAD, "c");

			// state check
			let stats = pool.stats();
			assert.strictEqual(stats.top, c + 24, "top");
			assert.deepStrictEqual(stats.free, { count: 0, size: 0 });
			assert.deepStrictEqual(stats.used, {
				count: 3,
				size: 16 + 32 + 24 + 3 * BLOCK_OVERHEAD,
			});

			// free all
			assert.ok(pool.free(a), "free a");
			assert.ok(pool.free(c), "free b");
			assert.ok(pool.free(b), "free c");
			assert.ok(!pool.free(b), "free b (repeat)");
			stats = pool.stats();
			assert.strictEqual(stats.top, base, "top2");
			assert.deepStrictEqual(stats.free, { count: 0, size: 0 });
			assert.deepStrictEqual(stats.used, { count: 0, size: 0 });

			// alloc & split free block
			a = pool.malloc(32);
			assert.strictEqual(a, base + BLOCK_OVERHEAD, "a2");
			stats = pool.stats();
			assert.deepStrictEqual(stats.free, { count: 0, size: 0 });
			assert.deepStrictEqual(stats.used, {
				count: 1,
				size: 32 + BLOCK_OVERHEAD,
			});
			assert.strictEqual(stats.top, base + 32 + BLOCK_OVERHEAD, "top3");
			// alloc next block & free prev
			b = pool.malloc(12);
			assert.strictEqual(b, base + 32 + BLOCK_OVERHEAD * 2, "b2");
			assert.ok(pool.free(a), "free a2");

			// re-alloc from free & split
			a = pool.malloc(8);
			assert.strictEqual(a, base + BLOCK_OVERHEAD, "a3");
			stats = pool.stats();
			assert.deepStrictEqual(stats.free, { count: 1, size: 24 });
			assert.deepStrictEqual(stats.used, {
				count: 2,
				size: 24 + 2 * BLOCK_OVERHEAD,
			});
			assert.strictEqual(
				stats.top,
				base + 32 + 16 + 2 * BLOCK_OVERHEAD,
				"top4"
			);

			// join both free blocks
			assert.ok(pool.free(b), "free b2");

			// extend free block + top
			b = pool.malloc(64);
			assert.strictEqual(b, base + 8 + 2 * BLOCK_OVERHEAD, "b3");
			stats = pool.stats();
			assert.deepStrictEqual(stats.free, { count: 0, size: 0 });
			assert.deepStrictEqual(stats.used, {
				count: 2,
				size: 8 + 64 + 2 * BLOCK_OVERHEAD,
			});
			assert.strictEqual(
				stats.top,
				base + 8 + 64 + 2 * BLOCK_OVERHEAD,
				"top5"
			);

			// alloc at top, below min size
			c = pool.malloc(1);
			// non-continous free chain
			assert.ok(pool.free(c), "free c2");
			// top reset to before
			assert.strictEqual(
				stats.top,
				base + 8 + 64 + 2 * BLOCK_OVERHEAD,
				"top6"
			);
			assert.ok(pool.free(a), "free a3");
			stats = pool.stats();
			assert.deepStrictEqual(stats.free, {
				count: 1,
				size: 8 + BLOCK_OVERHEAD,
			});
			assert.deepStrictEqual(stats.used, {
				count: 1,
				size: 64 + BLOCK_OVERHEAD,
			});
			// top remains unchanged
			assert.strictEqual(
				stats.top,
				base + 8 + 64 + 2 * BLOCK_OVERHEAD,
				"top7"
			);

			// alloc larger size to force walking free chain
			// and then alloc @ top (reuse earlier block)
			a = pool.malloc(27);
			assert.strictEqual(a, base + 8 + 64 + 3 * BLOCK_OVERHEAD, "a4");
			stats = pool.stats();
			assert.deepStrictEqual(stats.free, {
				count: 1,
				size: 8 + BLOCK_OVERHEAD,
			});
			assert.deepStrictEqual(stats.used, {
				count: 2,
				size: 64 + 32 + 2 * BLOCK_OVERHEAD,
			});
			assert.strictEqual(
				stats.top,
				base + 8 + 64 + 32 + 3 * BLOCK_OVERHEAD,
				"top8"
			);

			assert.ok(pool.free(a), "free a4");
			assert.ok(pool.free(b), "free b3");
			stats = pool.stats();
			assert.deepStrictEqual(stats.free, { count: 0, size: 0 });
			assert.deepStrictEqual(stats.used, { count: 0, size: 0 });
			assert.strictEqual(stats.available, 256 - base);
			assert.strictEqual(stats.top, base, "top9");

			pool.freeAll();
			assert.deepStrictEqual(pool.stats(), {
				free: { count: 0, size: 0 },
				used: { count: 0, size: 0 },
				available: pool.buf.byteLength - base,
				total: pool.buf.byteLength,
				top: base,
			});
			pool.release();
		},

		mallocAs: () => {
			assert.deepStrictEqual(pool.mallocAs("u8", 257), undefined);
			assert.deepStrictEqual(pool.mallocAs("u16", 129), undefined);
			assert.deepStrictEqual(pool.mallocAs("u32", 65), undefined);
			assert.deepStrictEqual(pool.mallocAs("f64", 33), undefined);
			assert.deepStrictEqual(pool.mallocAs("u8", -1), undefined);

			const base = pool.stats().top;
			let a = pool.mallocAs("f32", 3);
			let b = pool.mallocAs("f64", 3);
			assert.ok(a instanceof Float32Array, "a type");
			assert.ok(b instanceof Float64Array, "b type");
			assert.strictEqual(a!.byteOffset, base + BLOCK_OVERHEAD, "a addr");
			assert.strictEqual(
				b!.byteOffset,
				a!.byteOffset + 16 + BLOCK_OVERHEAD,
				"b addr"
			);
			assert.strictEqual(a!.length, 3, "a.length");
			assert.strictEqual(b!.length, 3, "b.length");
			assert.strictEqual(a!.byteLength, 12, "a bytes");
			assert.strictEqual(b!.byteLength, 24, "b bytes");
			a!.set([1, 2, 3]);
			b!.set([10, 20, 30]);
			assert.deepStrictEqual(
				[...new Uint32Array(pool.buf, a!.byteOffset, 4)],
				[
					// a
					0x3f800000, 0x40000000, 0x40400000, 0,
				]
			);
			assert.deepStrictEqual(
				[...new Uint32Array(pool.buf, b!.byteOffset, 8)],
				[
					// b
					0, 0x40240000, 0, 0x40340000, 0, 0x403e0000, 0, 0,
				]
			);
			assert.ok(pool.free(a!), "free a");
			assert.ok(pool.free(b!), "free b");
			assert.ok(!pool.free(a!), "free a (repeat)");
			assert.ok(!pool.free(b!), "free b (repeat)");
			assert.ok(!pool.free(new Uint16Array(1)), "free unmanaged");
		},

		calloc: () => {
			const u8: Uint8Array = (<any>pool).u8;
			u8.fill(0xff, pool.stats().top);
			let a = pool.calloc(6);
			assert.deepStrictEqual(
				[...u8.subarray(a, a + 9)],
				[0, 0, 0, 0, 0, 0, 0xff, 0xff, 0xff]
			);
		},

		callocAs: () => {
			const u8: Uint8Array = (<any>pool).u8;
			u8.fill(0xff, pool.stats().top);
			let a: TypedArray | undefined = pool.callocAs("f32", 3);
			let b: TypedArray | undefined = pool.callocAs("f64", 3);
			let t = [0, 0, 0];
			assert.ok(a instanceof Float32Array, "a type");
			assert.ok(b instanceof Float64Array, "b type");
			assert.deepStrictEqual([...a!], t);
			assert.deepStrictEqual([...b!], t);
			a!.set([1, 2, 3]);
			b!.set([10, 20, 30]);
			assert.ok(pool.free(a!), "free a");
			assert.ok(pool.free(b!), "free b");
			// returned arrays are filled w/ given arg
			a = pool.callocAs("u32", 3, 0xaa55aa55);
			b = pool.callocAs("u32", 3, 0xaa55aa55);
			t = [0xaa55aa55, 0xaa55aa55, 0xaa55aa55];
			assert.deepStrictEqual([...a!], t);
			assert.deepStrictEqual([...b!], t);
		},

		"malloc top": () => {
			let a = pool.malloc(8);
			let b = pool.malloc(8);
			let c = pool.malloc(8);
			let d = pool.malloc(8);
			// cause non continuous free chain
			pool.free(a);
			pool.free(b);
			pool.free(d);
			assert.strictEqual(
				pool.malloc(pool.buf.byteLength - d + 1),
				0,
				"malloc top"
			);
			assert.strictEqual(
				pool.mallocAs("u8", pool.buf.byteLength - d + 1),
				undefined,
				"mallocAs top"
			);
			pool.free(c);
		},

		realloc: () => {
			let p: any = pool;

			const a = pool.malloc(8);
			p.u8.fill(0xff, a, a + 8);

			const block = p._used;
			const bsize = p.blockSize(block);
			assert.strictEqual(bsize, align(8 + BLOCK_OVERHEAD, 8), "size a");
			assert.strictEqual(pool.realloc(a, 0), 0, "too small");
			assert.strictEqual(pool.realloc(a, 65), a, "enlarge a");

			const usedBlockAfterRealloc = p._used;
			assert.strictEqual(usedBlockAfterRealloc, block);
			assert.strictEqual(
				p.blockSize(usedBlockAfterRealloc),
				align(65 + BLOCK_OVERHEAD, 8)
			);

			// shrink & update top
			assert.strictEqual(pool.realloc(a, 31), a, "shrink a");
			assert.strictEqual(
				p.blockSize(usedBlockAfterRealloc),
				align(31 + BLOCK_OVERHEAD, 8)
			);
			assert.strictEqual(p._free, 0);
			assert.strictEqual(p.top, a + 32);

			// add new top block
			const b = pool.malloc(8);
			assert.strictEqual(b, a + 40, "b");

			// enlage a again, but need to move after b
			const a2 = pool.realloc(a, 65);
			assert.strictEqual(a2, b + 16);
			assert.deepStrictEqual(
				[...p.u8.slice(a2, a2 + 9)],
				[0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0]
			);
		},

		reallocArray: () => {
			const a = pool.callocAs("f32", 4, 1);
			assert.deepStrictEqual(
				[...pool.reallocArray(a!, 8)!],
				[1, 1, 1, 1, 0, 0, 0, 0]
			);
			assert.strictEqual(pool.reallocArray(a!, 10000), undefined);
			assert.strictEqual(
				pool.reallocArray(new Float32Array(4), 8),
				undefined
			);
		},

		"no compact": () => {
			pool = new MemPool({ size: 0x100, compact: false });
			const p: any = pool;
			const a = pool.malloc(8);
			const a1 = pool.malloc(8);
			const a2 = pool.malloc(8);
			pool.free(a);
			pool.free(a1);
			pool.free(a2);
			assert.strictEqual(p._free + BLOCK_OVERHEAD, a);
			assert.strictEqual(p.blockNext(p._free) + BLOCK_OVERHEAD, a1);
			assert.strictEqual(
				p.blockNext(p.blockNext(p._free)) + BLOCK_OVERHEAD,
				a2
			);
			assert.strictEqual(
				p.blockNext(p.blockNext(p.blockNext(p._free))),
				0
			);
		},

		"no split": () => {
			pool = new MemPool({ size: 0x100, split: true });
			let p: any = pool;
			const base = pool.stats().top;

			let a = pool.malloc(32);
			pool.malloc(8);
			pool.free(a);
			pool.malloc(8);
			assert.strictEqual(p._used, base);
			assert.strictEqual(p.blockSize(p._used), 8 + BLOCK_OVERHEAD);
			assert.strictEqual(p._free, base + 8 + BLOCK_OVERHEAD);
			assert.strictEqual(p.blockSize(p._free), 24);

			pool = new MemPool({ size: 0x100, split: false });
			p = pool;
			a = pool.malloc(32);
			pool.malloc(8);
			pool.free(a);
			pool.malloc(8);
			assert.strictEqual(p._used, base);
			assert.strictEqual(p.blockSize(p._used), 32 + BLOCK_OVERHEAD);
			assert.strictEqual(p._free, 0);
		},

		"malloc (align 16)": () => {
			pool = new MemPool({ size: 0x100, align: 16 });
			let p: any = pool;
			const base = pool.stats().top;
			let a = pool.callocAs("u8", 15);
			let b = pool.callocAs("u8", 11);
			let c = pool.callocAs("u8", 7);
			let d = pool.callocAs("u8", 3);
			let e = pool.callocAs("u8", 1);
			assert.strictEqual(a!.byteOffset, base + BLOCK_OVERHEAD, "a");
			assert.strictEqual(
				b!.byteOffset,
				align(a!.byteOffset + BLOCK_OVERHEAD + 15, 16),
				"b"
			);
			assert.strictEqual(
				c!.byteOffset,
				align(b!.byteOffset + BLOCK_OVERHEAD + 11, 16),
				"c"
			);
			assert.strictEqual(
				d!.byteOffset,
				align(c!.byteOffset + BLOCK_OVERHEAD + 7, 16),
				"d"
			);
			assert.strictEqual(
				e!.byteOffset,
				align(d!.byteOffset + BLOCK_OVERHEAD + 3, 16),
				"e"
			);
			let stats = pool.stats();
			assert.strictEqual(
				stats.top,
				align(e!.byteOffset + 1, 16) - BLOCK_OVERHEAD
			);

			pool.free(d!);
			assert.strictEqual(p._free, d!.byteOffset - BLOCK_OVERHEAD);
			pool.free(b!);
			assert.strictEqual(p._free, b!.byteOffset - BLOCK_OVERHEAD);
			assert.strictEqual(
				p.blockNext(p._free),
				d!.byteOffset - BLOCK_OVERHEAD
			);
			pool.free(c!);
			assert.strictEqual(p._free, b!.byteOffset - BLOCK_OVERHEAD);
			assert.strictEqual(
				p.blockSize(p._free),
				e!.byteOffset - b!.byteOffset
			);
			pool.free(a!);
			assert.strictEqual(p._free, a!.byteOffset - BLOCK_OVERHEAD);
			assert.strictEqual(
				p.blockSize(p._free),
				e!.byteOffset - a!.byteOffset
			);
			pool.free(e!);
			assert.strictEqual(p._free, 0);
			assert.strictEqual(p._used, 0);
			assert.strictEqual(p.top, base);
		},

		"freeAll (align 16)": () => {
			pool = new MemPool({ size: 0x100, align: 16 });
			const base = pool.stats().top;
			pool.callocAs("u8", 15);
			pool.callocAs("u8", 11);
			pool.freeAll();
			assert.strictEqual(pool.stats().top, base);
		},
	},
	{
		beforeEach: () => {
			pool = new MemPool({ size: 0x100 });
		},
	}
);
