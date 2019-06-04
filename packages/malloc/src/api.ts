import { IRelease, Type, TypedArray } from "@thi.ng/api";

export interface MemBlock {
    addr: number;
    size: number;
    next: MemBlock;
}

export interface MemPoolOpts {
    buf: ArrayBuffer;
    size: number;
    start: number;
    end: number;
    compact: boolean;
    split: boolean;
    minSplit: number;
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

    mallocAs(type: Type, num: number): TypedArray;

    callocAs(type: Type, num: number): TypedArray;

    realloc(ptr: number, size: number): number;

    reallocArray(arr: TypedArray, num: number): TypedArray;

    free(ptr: number | TypedArray): boolean;

    freeAll(): void;

    stats(): MemPoolStats;
}

export type BlockCtor = (
    buf: ArrayBuffer,
    addr: number,
    num: number
) => TypedArray;
