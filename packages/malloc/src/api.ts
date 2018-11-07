import { IRelease, TypedArray } from "@thi.ng/api/api";

export const enum Type {
    U8,
    U8C,
    I8,
    U16,
    I16,
    U32,
    I32,
    F32,
    F64
};

export interface MemBlock {
    addr: number;
    size: number;
    next: MemBlock;
}

export interface MemPoolOpts {
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
    free: { count: number, size: number };
    /**
     * Used block stats.
     */
    used: { count: number, size: number };
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

    free(ptr: number | TypedArray): boolean;

    freeAll();

    stats(): MemPoolStats;
}
