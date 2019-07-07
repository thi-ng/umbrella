import {
    ArrayLikeIterable,
    Fn,
    Fn2,
    Fn3,
    Fn4,
    Fn7,
    ICopy,
    IEmpty,
    IEqualsDelta,
    ILength,
    Tuple,
    TypedArray
} from "@thi.ng/api";

export interface Vec extends Iterable<number>, ILength {
    [id: number]: number;
}

export type ReadonlyVec = ArrayLikeIterable<number>;

export type Vec2Like = Tuple<number, 2> | TypedArray;
export type Vec3Like = Tuple<number, 3> | TypedArray;
export type Vec4Like = Tuple<number, 4> | TypedArray;

export interface StridedVec {
    buf: Vec;
    offset: number;
    stride: number;
}

export interface IVector<T>
    extends Vec,
        ICopy<T>,
        ICopyView<T>,
        IEmpty<T>,
        IEqualsDelta<T>,
        StridedVec {}

export interface ICopyView<T> {
    copyView(): T;
}

export interface VectorConstructor<T> {
    new (buf: Vec, offset?: number, stride?: number): T;
}

export interface MultiVecOp<VOP> {
    add(dim: number, op: VOP): VOP;
    default(op: VOP): VOP;
}

export type VecPair = [Vec, Vec];

export type VecOpV = Fn2<Vec | null, ReadonlyVec, Vec>;
export type VecOpN = Fn2<Vec | null, number, Vec>;
export type VecOpVV = Fn3<Vec | null, ReadonlyVec, ReadonlyVec, Vec>;
export type VecOpVN = Fn3<Vec | null, ReadonlyVec, number, Vec>;
export type VecOpVVV = Fn4<
    Vec | null,
    ReadonlyVec,
    ReadonlyVec,
    ReadonlyVec,
    Vec
>;
export type VecOpVVN = Fn4<Vec | null, ReadonlyVec, ReadonlyVec, number, Vec>;
export type VecOpVNV = Fn4<Vec | null, ReadonlyVec, number, ReadonlyVec, Vec>;
export type VecOpVNN = Fn4<Vec | null, ReadonlyVec, number, number, Vec>;
export type VecOpVVVVNN = Fn7<
    Vec | null,
    ReadonlyVec,
    ReadonlyVec,
    ReadonlyVec,
    ReadonlyVec,
    number,
    number,
    Vec
>;

export type VecOpVO<T> = (out: Vec | null, a: ReadonlyVec, b?: T) => Vec;
export type VecOpOO<A, B> = (out: Vec | null, a?: A, b?: B) => Vec;
export type VecOpOOO<A, B, C> = (out: Vec | null, a?: A, b?: B, c?: C) => Vec;
export type VecOpNNO<T> = (out: Vec | null, a: number, b: number, c?: T) => Vec;

export type VecOpRoV<T> = Fn<ReadonlyVec, T>;
export type VecOpRoVV<T> = Fn2<ReadonlyVec, ReadonlyVec, T>;
export type VecOpRoVVO<T, O> = (a: ReadonlyVec, b: ReadonlyVec, c?: O) => T;

export type VecOpSV = (
    out: Vec | null,
    a: ReadonlyVec,
    io?: number,
    ia?: number,
    so?: number,
    sa?: number
) => Vec;
export type VecOpSVV = (
    out: Vec | null,
    a: ReadonlyVec,
    b: ReadonlyVec,
    io?: number,
    ia?: number,
    ib?: number,
    so?: number,
    sa?: number,
    sb?: number
) => Vec;
export type VecOpSRoVV<T> = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    ia?: number,
    ib?: number,
    sa?: number,
    sb?: number
) => T;

export interface MultiVecOpV extends VecOpV, MultiVecOp<VecOpV> {}
export interface MultiVecOpN extends VecOpN, MultiVecOp<VecOpN> {}
export interface MultiVecOpVV extends VecOpVV, MultiVecOp<VecOpVV> {}
export interface MultiVecOpVN extends VecOpVN, MultiVecOp<VecOpVN> {}
export interface MultiVecOpVVV extends VecOpVVV, MultiVecOp<VecOpVVV> {}
export interface MultiVecOpVVN extends VecOpVVN, MultiVecOp<VecOpVVN> {}
export interface MultiVecOpVNV extends VecOpVNV, MultiVecOp<VecOpVNV> {}
export interface MultiVecOpVNN extends VecOpVNN, MultiVecOp<VecOpVNN> {}
export interface MultiVecOpVVVVNN
    extends VecOpVVVVNN,
        MultiVecOp<VecOpVVVVNN> {}

export interface MultiVecOpVO<T> extends VecOpVO<T>, MultiVecOp<VecOpVO<T>> {}
export interface MultiVecOpOO<A, B>
    extends VecOpOO<A, B>,
        MultiVecOp<VecOpOO<A, B>> {}
export interface MultiVecOpOOO<A, B, C>
    extends VecOpOOO<A, B, C>,
        MultiVecOp<VecOpOOO<A, B, C>> {}
export interface MultiVecOpNNO<T>
    extends VecOpNNO<T>,
        MultiVecOp<VecOpNNO<T>> {}

export interface MultiVecOpRoV<T>
    extends VecOpRoV<T>,
        MultiVecOp<VecOpRoV<T>> {}
export interface MultiVecOpRoVV<T>
    extends VecOpRoVV<T>,
        MultiVecOp<VecOpRoVV<T>> {}
export interface MultiVecOpRoVVO<T, O>
    extends VecOpRoVVO<T, O>,
        MultiVecOp<VecOpRoVVO<T, O>> {}

const mi = -Infinity;
const mx = Infinity;

export const MIN2: ReadonlyVec = Object.freeze([mi, mi]);
export const MAX2: ReadonlyVec = Object.freeze([mx, mx]);
export const ONE2: ReadonlyVec = Object.freeze([1, 1]);
export const ZERO2: ReadonlyVec = Object.freeze([0, 0]);
export const X2: ReadonlyVec = Object.freeze([1, 0]);
export const Y2: ReadonlyVec = Object.freeze([0, 1]);

export const MIN3: ReadonlyVec = Object.freeze([mi, mi, mi]);
export const MAX3: ReadonlyVec = Object.freeze([mx, mx, mx]);
export const ONE3: ReadonlyVec = Object.freeze([1, 1, 1]);
export const ZERO3: ReadonlyVec = Object.freeze([0, 0, 0]);
export const X3: ReadonlyVec = Object.freeze([1, 0, 0]);
export const Y3: ReadonlyVec = Object.freeze([0, 1, 0]);
export const Z3: ReadonlyVec = Object.freeze([0, 0, 1]);

export const MIN4: ReadonlyVec = Object.freeze([mi, mi, mi, mi]);
export const MAX4: ReadonlyVec = Object.freeze([mx, mx, mx, mx]);
export const ONE4: ReadonlyVec = Object.freeze([1, 1, 1, 1]);
export const ZERO4: ReadonlyVec = Object.freeze([0, 0, 0, 0]);
export const X4: ReadonlyVec = Object.freeze([1, 0, 0, 0]);
export const Y4: ReadonlyVec = Object.freeze([0, 1, 0, 0]);
export const Z4: ReadonlyVec = Object.freeze([0, 0, 1, 0]);
export const W4: ReadonlyVec = Object.freeze([0, 0, 0, 1]);

export type Template = (syms: string[], i?: number) => string;
