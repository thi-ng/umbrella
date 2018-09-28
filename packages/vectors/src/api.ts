import { NumericArray } from "@thi.ng/api/api";

export type Vec = NumericArray;
export type ReadonlyVec = ArrayLike<number> & Iterable<number>;

export type Mat = NumericArray;
export type ReadonlyMat = ArrayLike<number> & Iterable<number>;

/**
 * A vector operation involving only a single vector. The vector might
 * be modified.
 */
export type VecOp1<T> = (v: Vec, i?: number, s?: number) => T;

/**
 * A vector operation involving two vectors. The first vector might be
 * modified.
 */
export type VecOp2<T> = (a: Vec, b: ReadonlyVec, ia?: number, ib?: number, sa?: number, sb?: number) => T;

/**
 * A vector operation involving a vector and a scalar. The vector might
 * be modified.
 */
export type VecOpN2<T> = (a: Vec, n: number, ia?: number, sa?: number) => T;

/**
 * A vector operation involving input readonly two vectors and writing
 * result to an output vector `out`.
 */
export type VecOp2o<T> = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, io?: number, ia?: number, ib?: number, so?: number, sa?: number, sb?: number) => T;

/**
 * A vector operation involving input readonly two vectors and writing
 * result to an output vector `out`.
 */
export type VecOpN2o<T> = (out: Vec, a: ReadonlyVec, n: number, io?: number, ia?: number, so?: number, sa?: number) => T;

/**
 * A readonly vector operation involving only a single vector.
 */
export type ReadonlyVecOp1<T> = (v: ReadonlyVec, i?: number, s?: number) => T;

/**
 * A readonly vector operation involving two vectors.
 */
export type ReadonlyVecOp2<T> = (a: ReadonlyVec, b: ReadonlyVec, ia?: number, ib?: number, sa?: number, sb?: number) => T;

export interface IVec {
    buf: Vec;
    length: number;
    i: number;
    s: number;
}

const min = Number.NEGATIVE_INFINITY;
const max = Number.POSITIVE_INFINITY;
export const MIN4 = Object.freeze([min, min, min, min]);
export const MAX4 = Object.freeze([max, max, max, max]);
export const ONE4 = Object.freeze([1, 1, 1, 1]);
export const ZERO4 = Object.freeze([0, 0, 0, 0]);
