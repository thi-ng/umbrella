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

const min = Number.NEGATIVE_INFINITY;
const max = Number.POSITIVE_INFINITY;
export const MIN4 = Object.freeze([min, min, min, min]);
export const MAX4 = Object.freeze([max, max, max, max]);
export const ONE4 = Object.freeze([1, 1, 1, 1]);
export const ZERO4 = Object.freeze([0, 0, 0, 0]);
