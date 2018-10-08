import {
    ICopy,
    IEqualsDelta,
    IEquiv,
    NumericArray,
    IEmpty,
    ILength,
    ICompare
} from "@thi.ng/api/api";

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
 * A vector operation involving 2 vectors. The first vector might be
 * modified.
 */
export type VecOp2<T> = (a: Vec, b: ReadonlyVec, ia?: number, ib?: number, sa?: number, sb?: number) => T;

/**
 * A vector operation involving a vector and a scalar. The vector might
 * be modified.
 */
export type VecOpN2<T> = (a: Vec, n: number, ia?: number, sa?: number) => T;

/**
 * A vector operation involving 2 readonly vectors and storing result
 * in output vector `out`.
 */
export type VecOp2o<T> = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, io?: number, ia?: number, ib?: number, so?: number, sa?: number, sb?: number) => T;

/**
 * A vector operation involving a readonly vector and a scalar,
 * storing result in output vector `out`.
 */
export type VecOpN2o<T> = (out: Vec, a: ReadonlyVec, n: number, io?: number, ia?: number, so?: number, sa?: number) => T;

/**
 * A vector operation involving 3 vectors. The first vector might be
 * modified.
 */
export type VecOp3<T> = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, ia?: number, ib?: number, ic?: number, sa?: number, sb?: number, sc?: number) => T;

/**
 * A vector operation involving 2 vectors and a scalar. The first
 * vector might be modified.
 */
export type VecOpN3<T> = (a: Vec, b: ReadonlyVec, n: number, ia?: number, ib?: number, sa?: number, sb?: number) => T;

/**
 * A vector operation involving 3 readonly vectors and storing result in
 * output vector `out`.
 */
export type VecOp3o<T> = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, io?: number, ia?: number, ib?: number, ic?: number, so?: number, sa?: number, sb?: number, sc?: number) => T;

/**
 * A vector operation involving 3 operands: 2 readonly vectors and a
 * scalar, storing result in output vector `out`.
 */
export type VecOpN3o<T> = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, n: number, io?: number, ia?: number, ib?: number, so?: number, sa?: number, sb?: number) => T;

/**
 * A readonly vector operation involving only a single vector.
 */
export type ReadonlyVecOp1<T> = (v: ReadonlyVec, i?: number, s?: number) => T;

/**
 * A readonly vector operation involving two vectors.
 */
export type ReadonlyVecOp2<T> = (a: ReadonlyVec, b: ReadonlyVec, ia?: number, ib?: number, sa?: number, sb?: number) => T;

export type Vec2Coord = 0 | 1;
export type Vec3Coord = 0 | 1 | 2;
export type Vec4Coord = 0 | 1 | 2 | 3;

export interface IVec extends ILength {
    buf: Vec;
    i: number;
    s: number;
}

export interface IVector<T> extends
    Iterable<number>,
    IVec,
    ICopy<T>,
    ICompare<T>,
    IEmpty<T>,
    IEquiv,
    IEqualsDelta<T>,
    IDistance<T>,
    IDotProduct<T>,
    IMagnitude,
    IMath<T>,
    IMinMax<T>,
    IMix<T>,
    INormalize<T> {

    set(v: T): T;
    setN(n: number): T;
}

export interface IAngleBetween<T> {
    angleBetween(v: Readonly<T>, normalize?: boolean): number;
}

export interface IDistance<T> {
    dist(v: Readonly<T>): number;
    distSq(v: Readonly<T>): number;
}
export interface IDotProduct<T> {
    dot(v: Readonly<T>): number;
}

export interface ICrossProduct<T, R> {
    cross(v: Readonly<T>): R;
}

export interface IMagnitude<> {
    mag(): number;
    magSq(): number;
}

export interface IMath<T> {
    add(v: Readonly<T>): T;
    sub(v: Readonly<T>): T;
    mul(v: Readonly<T>): T;
    div(v: Readonly<T>): T;
    addN(n: number): T;
    subN(n: number): T;
    mulN(n: number): T;
    divN(n: number): T;
    madd(v: Readonly<T>, w: Readonly<T>): T;
    maddN(v: Readonly<T>, n: number): T;
    msub(v: Readonly<T>, w: Readonly<T>): T;
    msubN(v: Readonly<T>, n: number): T;
    addNew(v: Readonly<T>, out?: T): T;
    subNew(v: Readonly<T>, out?: T): T;
    mulNew(v: Readonly<T>, out?: T): T;
    divNew(v: Readonly<T>, out?: T): T;
    addNewN(n: number, out?: T): T;
    subNewN(n: number, out?: T): T;
    mulNewN(n: number, out?: T): T;
    divNewN(n: number, out?: T): T;
    maddNew(v: Readonly<T>, w: Readonly<T>, out?: T): T;
    maddNewN(v: Readonly<T>, n: number, out?: T): T;
    msubNew(v: Readonly<T>, w: Readonly<T>, out?: T): T;
    msubNewN(v: Readonly<T>, n: number, out?: T): T;
}

export interface IMinMax<T> {
    min(v: Readonly<T>): T;
    max(v: Readonly<T>): T;
    clamp(min: Readonly<T>, max: Readonly<T>): T;
}

export interface IMix<T> {
    mix(v: Readonly<T>, t: Readonly<T>): T;
    mixN(v: Readonly<T>, t: number): T;
    mixNew(v: Readonly<T>, t: Readonly<T>, out?: T): T;
    mixNewN(v: Readonly<T>, t: number, out?: T): T;
}

export interface INormalize<T> {
    /**
     * Normalizes vector to given `length`. If omitted, target length
     * will be 1.0.
     *
     * @param length
     */
    normalize(length?: number): T;
}

export interface IPolar<T> {
    /**
     * Converts vector into polar coordinates. For the 3D case, these
     * will be spherical coordinates.
     */
    toPolar(): T;
    /**
     * Converts vector with polar coordinates into cartesian form. The
     * optional `offset` will be added to the result.
     *
     * @param offset
     */
    toCartesian(offset?: Readonly<T>): T;
}

const min = -Infinity;
const max = Infinity;
export const MIN4 = Object.freeze([min, min, min, min]);
export const MAX4 = Object.freeze([max, max, max, max]);
export const ONE4 = Object.freeze([1, 1, 1, 1]);
export const ZERO4 = Object.freeze([0, 0, 0, 0]);
export const X4 = Object.freeze([1, 0, 0, 0]);
export const Y4 = Object.freeze([0, 1, 0, 0]);
export const Z4 = Object.freeze([0, 0, 1, 0]);
export const W4 = Object.freeze([0, 0, 0, 1]);

