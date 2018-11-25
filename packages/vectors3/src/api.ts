import { ILength } from "@thi.ng/api/api";

export interface Vec extends
    Iterable<number>,
    ILength {

    [id: number]: number;
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
export type VecOpVVVVNN = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, u: number, v: number) => Vec;

export type VecOpVO<T> = (out: Vec, a: ReadonlyVec, b?: T) => Vec;
export type VecOpOO<A, B> = (out: Vec, a?: A, b?: B) => Vec;
export type VecOpOOO<A, B, C> = (out: Vec, a?: A, b?: B, c?: C) => Vec;
export type VecOpNNO<T> = (out: Vec, a: number, b: number, c: T) => Vec;

export type VecOpRoV<T> = (a: ReadonlyVec) => T;
export type VecOpRoVV<T> = (a: ReadonlyVec, b: ReadonlyVec) => T;
export type VecOpRoVVO<T, O> = (a: ReadonlyVec, b: ReadonlyVec, c: O) => T;

export interface MultiVecOpV extends VecOpV, MultiVecOp<VecOpV> { }
export interface MultiVecOpN extends VecOpN, MultiVecOp<VecOpN> { }
export interface MultiVecOpVV extends VecOpVV, MultiVecOp<VecOpVV> { }
export interface MultiVecOpVN extends VecOpVN, MultiVecOp<VecOpVN> { }
export interface MultiVecOpVVV extends VecOpVVV, MultiVecOp<VecOpVVV> { }
export interface MultiVecOpVVN extends VecOpVVN, MultiVecOp<VecOpVVN> { }
export interface MultiVecOpVVVVNN extends VecOpVVVVNN, MultiVecOp<VecOpVVVVNN> { }

export interface MultiVecOpVO<T> extends VecOpVO<T>, MultiVecOp<VecOpVO<T>> { }
export interface MultiVecOpOO<A, B> extends VecOpOO<A, B>, MultiVecOp<VecOpOO<A, B>> { }
export interface MultiVecOpOOO<A, B, C> extends VecOpOOO<A, B, C>, MultiVecOp<VecOpOOO<A, B, C>> { }
export interface MultiVecOpNNO<T> extends VecOpNNO<T>, MultiVecOp<VecOpNNO<T>> { }

export interface MultiVecOpRoV<T> extends VecOpRoV<T>, MultiVecOp<VecOpRoV<T>> { }
export interface MultiVecOpRoVV<T> extends VecOpRoVV<T>, MultiVecOp<VecOpRoVV<T>> { }
export interface MultiVecOpRoVVO<T, O> extends VecOpRoVVO<T, O>, MultiVecOp<VecOpRoVVO<T, O>> { }

export const ZERO4 = Object.freeze([0, 0, 0, 0]);
export const ONE4 = Object.freeze([1, 1, 1, 1]);
