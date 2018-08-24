import { NumericArray } from "@thi.ng/api/api";

export type Vec = NumericArray;
export type ReadonlyVec = ArrayLike<number>;

export type Mat = NumericArray;
export type ReadonlyMat = ArrayLike<number>;

export type VecOp = (a: Vec, b: ReadonlyVec, ia: number, ib: number, sa: number, sb: number) => Vec;

export interface IVec {
    buf: Vec;
    i: number;
    s: number;
}
