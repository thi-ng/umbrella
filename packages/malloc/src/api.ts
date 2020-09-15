import { IRelease, Type, TypedArray, TypedArrayTypeMap } from "@thi.ng/api";
import type { Pow2 } from "@thi.ng/binary";

export interface MemPoolOpts {
    /**
     * Backing ArrayBuffer (or SharedArrayBuffer). If not given, a new
     * one will be created with given `size`.
     */
    buf: ArrayBufferLike;
    /**
     * Byte size for newly created ArrayBuffers (if `buf` is not given).
     *
     * @defaultValue 0x1000 (4KB)
     */
    size: number;
    /**
     * Anchor index (byte address) inside the array buffer. The MemPool
     * stores its internal state from the given address and heap space
     * starts at least 32 bytes later (depending on chosen `align`
     * value). Unlike allocator state variables, `start`` cannot be
     * saved inside the array buffer itself. If the ArrayBuffer is
     * passed to other consumers they must use the same start value.
     * MUST be multiple of 4.
     *
     * @defaultValue 0
     */
    start: number;
    /**
     * Byte address (+1) of the end of the memory region managed by the
     * {@link MemPool}.
     *
     * @defaultValue end of the backing ArrayBuffer
     */
    end: number;
    /**
     * Number of bytes to align memory blocks to. MUST be a power of 2
     * and >= 8. Use 16 if the pool is being used for allocating memory
     * used in SIMD operations.
     *
     * @defaultValue 8
     */
    align: Pow2;
    /**
     * Flag to configure memory block compaction. If true,
     * adjoining free blocks (in terms of address space) will be merged
     * to minimize fragementation.
     *
     * @defaultValue true
     */
    compact: boolean;
    /**
     * Flag to configure memory block splitting. If true, and when the
     * allocator is re-using a previously freed block larger than the
     * requested size, the block will be split to minimize wasted/unused
     * memory. The splitting behavior can further customized via the
     * `minSplit` option.
     *
     * @defaultValue true
     */
    split: boolean;
    /**
     * Only used if `split` behavior is enabled. Defines min number of
     * excess bytes available in a block for memory block splitting to
     * occur.
     *
     * @defaultValue 16, MUST be > 8
     */
    minSplit: number;
    /**
     * Only needed when sharing the underlying ArrayBuffer. If true, the
     * {@link MemPool} constructor will NOT initialize its internal state and
     * assume the underlying ArrayBuffer has already been initialized by
     * another {@link MemPool} instance. If this option is used, `buf` MUST be
     * given.
     *
     * @defaultValue false
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
    /**
     * Attempts to allocate a new memory block of given `size` (in
     * bytes). Returns block address or zero if unsuccessful
     * (insufficient memory).
     *
     * @param size -
     */
    malloc(size: number): number;

    /**
     * Similar to {@link IMemPool.malloc}, but if allocation was successful also
     * clears the allocated block w/ `fill` value (default: 0).
     *
     * @param size -
     * @param fill -
     */
    calloc(size: number, fill?: number): number;

    /**
     * Takes a {@link @thi.ng/api#Type} enum and element count `num` (in
     * units of given type), calls {@link IMemPool.malloc} and if
     * successful wraps allocated block as typed array of given `type`.
     * Returns undefined if allocation failed.
     *
     * @param type -
     * @param num -
     */
    mallocAs<T extends Type>(
        type: T,
        num: number
    ): TypedArrayTypeMap[T] | undefined;

    /**
     * Similar to {@link IMemPool.mallocAs}, but if allocation was
     * successful also clears the allocated block w/ `fill` value
     * (default: 0).
     *
     * @param type -
     * @param num -
     * @param fill -
     */
    callocAs<T extends Type>(
        type: T,
        num: number,
        fill?: number
    ): TypedArrayTypeMap[T] | undefined;

    /**
     * Attempts to reallocate given memory block to new `size` (in
     * bytes). If new `size` is larger than the original, attempts to
     * grow block or else allocates new one and moves contents to new
     * address. If new size is smaller than original, the existing block
     * might be split (depending on `split` & `minSplit` config options)
     * and the unused part freed. Returns new address if successful or
     * zero if re-allocation failed (insufficient menory).
     *
     * @param ptr -
     * @param size -
     */
    realloc(ptr: number, size: number): number;

    /**
     * Similar to {@link IMemPool.realloc}, but takes a typed array (one
     * previously allocated with {@link IMemPool.mallocAs} or
     * {@link IMemPool.callocAs}) and if successul returns new typed
     * array of same type. Returns undefined on failure.
     *
     * @param arr -
     * @param num -
     */
    reallocArray<T extends TypedArray>(arr: T, num: number): T | undefined;

    /**
     * Takes a memory block address and attempts to return the block to
     * the pool. Depending on `compact` config option, this operation
     * might cause compaction of consecutive free memory blocks to help
     * counter fragmentation. Returns true if block has been freed.
     *
     * It's the user's responsibility to ensure that freed blocks are
     * not used any further after calling {@link IMemPool.free}.
     * Undefined behavior, or worse, pool corruption might ensue!
     *
     * @param ptr -
     */
    free(ptr: number | TypedArray): boolean;

    /**
     * Frees all previously allocated blocks and resests allocator state.
     */
    freeAll(): void;

    /**
     * Returns an information object of the pool's state.
     */
    stats(): Readonly<MemPoolStats>;
}
