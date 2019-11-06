import { IRelease, Type, TypedArray } from "@thi.ng/api";
import { Pow2 } from "@thi.ng/binary";

export interface MemBlock {
    addr: number;
    size: number;
    next: MemBlock | null;
}

export interface MemPoolOpts {
    /**
     * Backing ArrayBuffer (or SharedArrayBuffer). If not given, a new
     * one will be created with given `size`.
     */
    buf: ArrayBufferLike;
    /**
     * Byte size for newly created ArrayBuffers (if `buf` is not given).
     * Default: 0x1000 (4KB)
     */
    size: number;
    /**
     * Anchor index (byte address) inside the array buffer. The MemPool
     * stores its internal state from the given address and heap space
     * starts at least 32 bytes later (depending on chosen `align`
     * value). Unlike allocator state variables, `start`` cannot be
     * saved inside the array buffer itself. If the ArrayBuffer is
     * passed to other consumers they must use the same start value.
     * MUST be multiple of 4. Default: 0
     */
    start: number;
    /**
     * Byte address (+1) of the end of the memory region managed by the
     * `MemPool`. If not given, defaults to the end of the backing
     * ArrayBuffer.
     */
    end: number;
    /**
     * Number of bytes to align memory blocks to. MUST be a power of 2
     * and >= 8. Default: 8. Use 16 if the pool is being used for
     * allocating memory used in SIMD operations.
     */
    align: Pow2;
    /**
     * Flag to configure memory block compaction. If true (default),
     * adjoining free blocks (in terms of address space) will be merged
     * to minimize fragementation.
     */
    compact: boolean;
    /**
     * Flag to configure memory block splitting. If true (default) and
     * when the allocator is re-using a previously freed block larger
     * than the requested size, the block will be split to minimize
     * wasted/unused memory. The splitting behavior can further
     * customized via the `minSplit` option.
     */
    split: boolean;
    /**
     * Only used if `split` behavior is enabled. Defines min number of
     * excess bytes available in a block for memory block splitting to
     * occur. Default: 16. MUST be > 8.
     */
    minSplit: number;
    /**
     * Only needed when sharing the underlying ArrayBuffer. If true
     * (default: false), the `MemPool` constructor will NOT initialize
     * its internal state and assume the underlying ArrayBuffer has
     * already been initialized by another `MemPool` instance. If this
     * option is used, `buf` MUST be given.
     */
    skipInitialization: boolean;
}

export interface MemPoolStats {
    /**
     * Free block stats.
     */
    free: { count: number; size: number };
    /**
     * Used block stats.
     */
    used: { count: number; size: number };
    /**
     * Current top address.
     */
    top: number;
    /**
     * Bytes available
     */
    available: number;
    /**
     * Total pool size.
     */
    total: number;
}

export interface IMemPool extends IRelease {
    malloc(size: number): number;

    calloc(size: number): number;

    mallocAs(type: Type, num: number): TypedArray | undefined;

    callocAs(type: Type, num: number): TypedArray | undefined;

    realloc(ptr: number, size: number): number;

    reallocArray(arr: TypedArray, num: number): TypedArray | undefined;

    free(ptr: number | TypedArray): boolean;

    freeAll(): void;

    stats(): MemPoolStats;
}

export type BlockCtor = (
    buf: ArrayBuffer,
    addr: number,
    num: number
) => TypedArray;
