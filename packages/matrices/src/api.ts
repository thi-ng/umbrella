import type { Tuple, TypedArray } from "@thi.ng/api";
import type { IVector, MultiVecOp, ReadonlyVec, Vec } from "@thi.ng/vectors";

export type Mat = Vec;
export type ReadonlyMat = ReadonlyVec;

export type Mat22Like = Tuple<number, 4> | TypedArray;
export type Mat23Like = Tuple<number, 6> | TypedArray;
export type Mat33Like = Tuple<number, 9> | TypedArray;
export type Mat44Like = Tuple<number, 16> | TypedArray;

export type IMatrix<T> = IVector<T>;
export type MultiMatOp<T> = MultiVecOp<T>;

export type MatOp1 = (out: Mat | null) => Mat;
export type MatOpM = (out: Mat | null, a: ReadonlyMat) => Mat;
export type MatOpV = (out: Mat | null, a: ReadonlyVec) => Mat;
export type MatOpMU = (out: Mat | null, a: ReadonlyMat) => Mat | undefined;
export type MatOpN = (out: Mat | null, n: number) => Mat;
export type MatOpNV = (out: Mat | null, n: number | ReadonlyVec) => Mat;
export type MatOpMM = (out: Mat | null, a: ReadonlyMat, b: ReadonlyMat) => Mat;
export type MatOpMV = (out: Vec | null, a: ReadonlyMat, b: ReadonlyVec) => Vec;
export type MatOpMN = (out: Mat | null, a: ReadonlyMat, n: number) => Mat;

export type VecOpM = (out: Vec | null, a: ReadonlyMat) => Vec;
export type VecOpMN = (out: Vec | null, a: ReadonlyMat, n: number) => Vec;

export interface MultiMatOp1 extends MatOp1, MultiMatOp<MatOp1> {}
export interface MultiMatOpM extends MatOpM, MultiMatOp<MatOpM> {}
export interface MultiMatOpMU extends MatOpMU, MultiMatOp<MatOpMU> {}
export interface MultiMatOpN extends MatOpN, MultiMatOp<MatOpN> {}
export interface MultiMatOpMM extends MatOpMM, MultiMatOp<MatOpMM> {}
export interface MultiMatOpMV extends MatOpMV, MultiMatOp<MatOpMV> {}
export interface MultiMatOpMN extends MatOpMN, MultiMatOp<MatOpMN> {}

export interface MultiVecOpM extends VecOpM, MultiMatOp<VecOpM> {}
export interface MultiVecOpMN extends VecOpMN, MultiMatOp<VecOpMN> {}
