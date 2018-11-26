import { ILength, ICopy, IEmpty, IEqualsDelta } from "@thi.ng/api/api";

export interface Vec extends
    Iterable<number>,
    ILength {

    [id: number]: number;
}

export interface IVector<T> extends
    Vec,
    ICopy<T>,
    IEmpty<T>,
    IEqualsDelta<T> {

    buf: Vec;
    i: number;
    s: number;
}

export interface ReadonlyVec extends
    Iterable<number>,
    ILength {
    readonly [id: number]: number;
}

export interface MultiVecOp<VOP> {
    add(dim: number, op: VOP): VOP;
    default(op: VOP): VOP;
}

export type VecOpV = (out: Vec, a: ReadonlyVec) => Vec;
export type VecOpN = (out: Vec, n: number) => Vec;
export type VecOpVV = (out: Vec, a: ReadonlyVec, b: ReadonlyVec) => Vec;
export type VecOpVN = (out: Vec, a: ReadonlyVec, n: number) => Vec;
export type VecOpVVV = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => Vec;
export type VecOpVVN = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, n: number) => Vec;
export type VecOpVNN = (out: Vec, a: ReadonlyVec, u: number, v: number) => Vec;
export type VecOpVVVVNN = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, u: number, v: number) => Vec;

export type VecOpVO<T> = (out: Vec, a: ReadonlyVec, b?: T) => Vec;
export type VecOpOO<A, B> = (out: Vec, a?: A, b?: B) => Vec;
export type VecOpOOO<A, B, C> = (out: Vec, a?: A, b?: B, c?: C) => Vec;
export type VecOpNNO<T> = (out: Vec, a: number, b: number, c: T) => Vec;

export type VecOpRoV<T> = (a: ReadonlyVec) => T;
export type VecOpRoVV<T> = (a: ReadonlyVec, b: ReadonlyVec) => T;
export type VecOpRoVVO<T, O> = (a: ReadonlyVec, b: ReadonlyVec, c: O) => T;

export type VecOpSV = (out: Vec, a: ReadonlyVec, io?: number, ia?: number, so?: number, sa?: number) => Vec;
export type VecOpSVV = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, io?: number, ia?: number, ib?: number, so?: number, sa?: number, sb?: number) => Vec;
export type VecOpSRoVV<T> = (a: ReadonlyVec, b: ReadonlyVec, ia?: number, ib?: number, sa?: number, sb?: number) => T;

export interface MultiVecOpV extends VecOpV, MultiVecOp<VecOpV> { }
export interface MultiVecOpN extends VecOpN, MultiVecOp<VecOpN> { }
export interface MultiVecOpVV extends VecOpVV, MultiVecOp<VecOpVV> { }
export interface MultiVecOpVN extends VecOpVN, MultiVecOp<VecOpVN> { }
export interface MultiVecOpVVV extends VecOpVVV, MultiVecOp<VecOpVVV> { }
export interface MultiVecOpVVN extends VecOpVVN, MultiVecOp<VecOpVVN> { }
export interface MultiVecOpVNN extends VecOpVNN, MultiVecOp<VecOpVNN> { }
export interface MultiVecOpVVVVNN extends VecOpVVVVNN, MultiVecOp<VecOpVVVVNN> { }

export interface MultiVecOpVO<T> extends VecOpVO<T>, MultiVecOp<VecOpVO<T>> { }
export interface MultiVecOpOO<A, B> extends VecOpOO<A, B>, MultiVecOp<VecOpOO<A, B>> { }
export interface MultiVecOpOOO<A, B, C> extends VecOpOOO<A, B, C>, MultiVecOp<VecOpOOO<A, B, C>> { }
export interface MultiVecOpNNO<T> extends VecOpNNO<T>, MultiVecOp<VecOpNNO<T>> { }

export interface MultiVecOpRoV<T> extends VecOpRoV<T>, MultiVecOp<VecOpRoV<T>> { }
export interface MultiVecOpRoVV<T> extends VecOpRoVV<T>, MultiVecOp<VecOpRoVV<T>> { }
export interface MultiVecOpRoVVO<T, O> extends VecOpRoVVO<T, O>, MultiVecOp<VecOpRoVVO<T, O>> { }

const mi = -Infinity;
const mx = Infinity;
export const MIN4 = Object.freeze([mi, mi, mi, mi]);
export const MAX4 = Object.freeze([mx, mx, mx, mx]);
export const ONE4 = Object.freeze([1, 1, 1, 1]);
export const ZERO4 = Object.freeze([0, 0, 0, 0]);
export const X4 = Object.freeze([1, 0, 0, 0]);
export const Y4 = Object.freeze([0, 1, 0, 0]);
export const Z4 = Object.freeze([0, 0, 1, 0]);
export const W4 = Object.freeze([0, 0, 0, 1]);
