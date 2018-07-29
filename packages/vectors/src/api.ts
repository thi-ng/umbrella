export type TypedArray =
    Float32Array |
    Float64Array |
    Int8Array |
    Int16Array |
    Int32Array |
    Uint8Array |
    Uint8ClampedArray |
    Uint16Array |
    Uint32Array;

export type Vec = number[] | TypedArray;
export type ReadonlyVec = ArrayLike<number>;

export type Mat = number[] | TypedArray;
export type ReadonlyMat = ArrayLike<number>;

export type VecOp = (a: Vec, b: ReadonlyVec, ia: number, ib: number, sa: number, sb: number) => Vec;

export interface IVec {
    buf: Vec;
    i: number;
    s: number;
}
