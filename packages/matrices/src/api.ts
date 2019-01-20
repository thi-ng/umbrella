import { Vec, ReadonlyVec, IVector, MultiVecOp } from "@thi.ng/vectors";

export type Mat = Vec;
export type ReadonlyMat = ReadonlyVec;
export type IMatrix<T> = IVector<T>;
export type MultiMatOp<T> = MultiVecOp<T>;

export type MatOp1 = (out: Mat) => Mat;
export type MatOpM = (out: Mat, a: ReadonlyMat) => Mat;
export type MatOpN = (out: Mat, n: number) => Mat;
export type MatOpMM = (out: Mat, a: ReadonlyMat, b: ReadonlyMat) => Mat;
export type MatOpMV = (out: Vec, a: ReadonlyMat, b: ReadonlyVec) => Vec;
export type MatOpMN = (out: Mat, a: ReadonlyMat, n: number) => Mat;

export type VecOpM = (out: Vec, a: ReadonlyMat) => Vec;
export type VecOpMN = (out: Vec, a: ReadonlyMat, n: number) => Vec;

export interface MultiMatOp1 extends MatOp1, MultiMatOp<MatOp1> { }
export interface MultiMatOpM extends MatOpM, MultiMatOp<MatOpM> { }
export interface MultiMatOpN extends MatOpN, MultiMatOp<MatOpN> { }
export interface MultiMatOpMM extends MatOpMM, MultiMatOp<MatOpMM> { }
export interface MultiMatOpMV extends MatOpMV, MultiMatOp<MatOpMV> { }
export interface MultiMatOpMN extends MatOpMN, MultiMatOp<MatOpMN> { }

export interface MultiVecOpM extends VecOpM, MultiMatOp<VecOpM> { }
export interface MultiVecOpMN extends VecOpMN, MultiMatOp<VecOpMN> { }

export const IDENT22 = [
    1, 0,
    0, 1
];

export const IDENT23 = [
    1, 0,
    0, 1,
    0, 0
];

export const IDENT33 = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
];

export const IDENT44 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];
