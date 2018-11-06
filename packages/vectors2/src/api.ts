import {
    ICopy,
    IEmpty,
    IEqualsDelta,
    IEquiv,
    ILength,
    IRelease,
    TypedArray
} from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { Type } from "@thi.ng/malloc/api";
import { atan2Abs } from "@thi.ng/math/angle";
import { EPS } from "@thi.ng/math/api";
import { genCommonDefaults } from "./internal/codegen";
import { eqDelta as _eqDelta } from "./internal/equiv";
import { vop } from "./internal/ops";

// suffix convention:
// V = vector arg
// N = numeric / scalar arg
// O = optional arg
// New = immutable op (w/ output vector)
// Ro = readonly op

export type VecOpV<T> = (a: Vec, ...xs: any[]) => T;
export type VecOpVO<T, O> = (a: Vec, o?: O, ...xs: any[]) => T;
export type VecOpVV<T> = (a: Vec, b: ReadonlyVec) => T;
export type VecOpVN<T> = (a: Vec, n: number) => T;
export type VecOpVNN<T> = (a: Vec, n: number, m: number) => T;
export type VecOpVVN<T> = (a: Vec, b: ReadonlyVec, n: number) => T;
export type VecOpVVV<T> = (a: Vec, b: ReadonlyVec, c: ReadonlyVec) => T;

export type VecOpNewVN<T> = (a: ReadonlyVec, n: number, o?: T) => T;
export type VecOpNewVV<T> = (a: ReadonlyVec, b: ReadonlyVec, o?: T) => T;
export type VecOpNewVVN<T> = (a: ReadonlyVec, b: ReadonlyVec, n: number, o?: T) => T;
export type VecOpNewVVV<T> = (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, o?: T) => T;
export type VecOpNewVVVN<T> = (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, n: number, o?: T) => T;
export type VecOpNewVVVVN<T> = (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, n: number, o?: T) => T;

export type VecOpRoV<T> = (a: ReadonlyVec, ...xs: any[]) => T;
export type VecOpRoVV<T> = (a: ReadonlyVec, b: ReadonlyVec, ...xs: any[]) => T;
export type VecOpRoVVO<T, O> = (a: ReadonlyVec, b: ReadonlyVec, o?: O, ...xs: any[]) => T;
export type VecOpRoVVV<T> = (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, ...xs: any[]) => T;

export interface MultiVecOp<VOP> {
    add(dim: number, op: VOP): VOP;
    default(op: VOP): VOP;
}

export interface MultiVecOpV<T> extends VecOpV<T>, MultiVecOp<VecOpV<T>> { }
export interface MultiVecOpVO<T, O> extends VecOpVO<T, O>, MultiVecOp<VecOpVO<T, O>> { }
export interface MultiVecOpVV<T> extends VecOpVV<T>, MultiVecOp<VecOpVV<T>> { }
export interface MultiVecOpVN<T> extends VecOpVN<T>, MultiVecOp<VecOpVN<T>> { }
export interface MultiVecOpVNN<T> extends VecOpVNN<T>, MultiVecOp<VecOpVNN<T>> { }
export interface MultiVecOpVVN<T> extends VecOpVVN<T>, MultiVecOp<VecOpVVN<T>> { }
export interface MultiVecOpVVV<T> extends VecOpVVV<T>, MultiVecOp<VecOpVVV<T>> { }

export interface MultiVecOpNewVV<T> extends VecOpNewVV<T>, MultiVecOp<VecOpNewVV<T>> { }
export interface MultiVecOpNewVN<T> extends VecOpNewVN<T>, MultiVecOp<VecOpNewVN<T>> { }
export interface MultiVecOpNewVVN<T> extends VecOpNewVVN<T>, MultiVecOp<VecOpNewVVN<T>> { }
export interface MultiVecOpNewVVV<T> extends VecOpNewVVV<T>, MultiVecOp<VecOpNewVVV<T>> { }
export interface MultiVecOpNewVVVN<T> extends VecOpNewVVVN<T>, MultiVecOp<VecOpNewVVVN<T>> { }
export interface MultiVecOpNewVVVVN<T> extends VecOpNewVVVVN<T>, MultiVecOp<VecOpNewVVVVN<T>> { }

export interface MultiVecOpRoV<T> extends VecOpRoV<T>, MultiVecOp<VecOpRoV<T>> { }
export interface MultiVecOpRoVV<T> extends VecOpRoVV<T>, MultiVecOp<VecOpRoVV<T>> { }
export interface MultiVecOpRoVVO<T, O> extends VecOpRoVVO<T, O>, MultiVecOp<VecOpRoVVO<T, O>> { }
export interface MultiVecOpRoVVV<T> extends VecOpRoVVV<T>, MultiVecOp<VecOpRoVVV<T>> { }

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

export type Mat = Vec;
export type ReadonlyMat = ReadonlyVec;

export interface IVector<T> extends
    Vec,
    ICopy<T>,
    IEmpty<T>,
    IEqualsDelta<T> {

    buf: Vec;
    i: number;
    s: number;
}

export interface NDVec<T> extends
    Iterable<T>,
    ILength {
    [id: number]: T;
}

export interface INDArray<T> extends
    ICopy<INDArray<T>>,
    IEquiv,
    IEqualsDelta<INDArray<T>>,
    Iterable<T> {

    buf: NDVec<T>;
    i: number;
    readonly shape: number[];
    readonly stride: number[];
    readonly length: number;

    get(...args: number[]): T;

    set(...args: [number, T] | [number, number, T] | [number, number, number, T]): void;

    lo(...args: number[]): INDArray<T>;

    hi(...args: number[]): INDArray<T>;

    step(...args: number[]): INDArray<T>;

    pick(...args: number[]): INDArray<T>;

    transpose(...args: number[]): INDArray<T>;
}

export interface IMatrix<T> extends
    Vec,
    ICopy<T>,
    IEqualsDelta<T> {

    mul(m: Readonly<T>): T;
    mulV(v: ReadonlyVec, out?: Vec): Vec;

    identity(): T;
    invert(): T;
}

export interface IVecPool extends IRelease {

    malloc(size: number, type?: Type): Vec;

    mallocWrapped(size: number, stride?: number, type?: Type): IVector<any>;

    free(vec: IVector<any> | TypedArray): boolean;

    freeAll();
}

export type CommonOps = [
    // set
    VecOpVV<Vec>,
    VecOpVN<Vec>,
    VecOpV<Vec>,
    // rand
    VecOpVNN<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    // math
    VecOpVV<Vec>,
    VecOpVV<Vec>,
    VecOpVV<Vec>,
    VecOpVV<Vec>,
    VecOpNewVV<Vec>,
    VecOpNewVV<Vec>,
    VecOpNewVV<Vec>,
    VecOpNewVV<Vec>,
    VecOpVN<Vec>,
    VecOpVN<Vec>,
    VecOpVN<Vec>,
    VecOpVN<Vec>,
    VecOpNewVN<Vec>,
    VecOpNewVN<Vec>,
    VecOpNewVN<Vec>,
    VecOpNewVN<Vec>,
    // madd
    VecOpVVV<Vec>,
    VecOpVVN<Vec>,
    VecOpNewVVV<Vec>,
    VecOpNewVVN<Vec>,
    // Math.
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpV<Vec>,
    VecOpVN<Vec>,
    // minmax
    VecOpVV<Vec>,
    VecOpVV<Vec>,
    VecOpVVV<Vec>,
    // step
    VecOpVV<Vec>,
    VecOpVVV<Vec>,
    // mix
    VecOpVVV<Vec>,
    VecOpVVN<Vec>,
    VecOpNewVVV<Vec>,
    VecOpNewVVN<Vec>
];

export type Vec2Coord = 0 | 1;
export type Vec3Coord = 0 | 1 | 2;
export type Vec4Coord = 0 | 1 | 2 | 3;

export const set: MultiVecOpVV<Vec> = vop();
export const setN: MultiVecOpVN<Vec> = vop();
export const setS: MultiVecOpV<Vec> = vop();

export const copy: MultiVecOpRoV<Vec> = vop();
copy.default((v) =>
    implementsFunction(v, "copy") ?
        (<any>v).copy() :
        [...v]
);

export const empty: MultiVecOpRoV<Vec> = vop();
empty.default((v) =>
    implementsFunction(v, "empty") ?
        (<any>v).empty() :
        zeroes(v.length)
);

export const zero = (a: Vec) => setN(a, 0);
export const one = (a: Vec) => setN(a, 1);

export const zeroes = (n: number) => new Array(n).fill(0);
export const ones = (n: number) => new Array(n).fill(1);

export const eqDelta: MultiVecOpRoVVO<boolean, number> = vop();
eqDelta.default((v1, v2, eps = EPS) => {
    if (implementsFunction(v1, "eqDelta")) {
        return (<any>v1).eqDelta(v2, eps);
    }
    if (implementsFunction(v2, "eqDelta")) {
        return (<any>v2).eqDelta(v1, eps);
    }
    return _eqDelta(v1, v2, v1.length, eps);
});

export const rand: MultiVecOpVNN<Vec> = vop();
export const rand01: MultiVecOpV<Vec> = vop();
export const rand11: MultiVecOpV<Vec> = vop();

export const add: MultiVecOpVV<Vec> = vop();
export const sub: MultiVecOpVV<Vec> = vop();
export const mul: MultiVecOpVV<Vec> = vop();
export const div: MultiVecOpVV<Vec> = vop();

export const addNew: MultiVecOpNewVV<Vec> = vop();
export const subNew: MultiVecOpNewVV<Vec> = vop();
export const mulNew: MultiVecOpNewVV<Vec> = vop();
export const divNew: MultiVecOpNewVV<Vec> = vop();

export const addN: MultiVecOpVN<Vec> = vop();
export const subN: MultiVecOpVN<Vec> = vop();
export const mulN: MultiVecOpVN<Vec> = vop();
export const divN: MultiVecOpVN<Vec> = vop();

export const addNewN: MultiVecOpNewVN<Vec> = vop();
export const subNewN: MultiVecOpNewVN<Vec> = vop();
export const mulNewN: MultiVecOpNewVN<Vec> = vop();
export const divNewN: MultiVecOpNewVN<Vec> = vop();

export const neg: MultiVecOpV<Vec> = vop();
neg.default((v) => mulN(v, -1));

export const madd: MultiVecOpVVV<Vec> = vop();
export const maddN: MultiVecOpVVN<Vec> = vop();
export const maddNew: MultiVecOpNewVVV<Vec> = vop();
export const maddNewN: MultiVecOpNewVVN<Vec> = vop();

export const dot: MultiVecOpRoVV<number> = vop();
dot.default((a, b) => {
    let res = 0;
    for (let i = a.length; --i >= 0;) {
        res += a[i] * b[i];
    }
    return res;
});

export const magSq: MultiVecOpRoV<number> = vop();
magSq.default((v) => dot(v, v));

export const mag: MultiVecOpRoV<number> = vop();
mag.default((a) => Math.sqrt(magSq(a, a)));

export const normalize: MultiVecOpVO<Vec, number> = vop();
normalize.default((v, n: number) => {
    let m = mag(v);
    return m >= EPS ? mulN(v, n / m) : v;
});

export const limit: MultiVecOpV<Vec> = vop();
limit.default((v, n: number) => {
    let m = mag(v);
    return m > n ? mulN(v, n / m) : v;
});

export const distSq: MultiVecOpRoVV<number> = vop();
export const dist: MultiVecOpRoVV<number> = vop();
dist.default((a, b) => Math.sqrt(distSq(a, b)));

export const distManhattan: MultiVecOpRoVV<number> = vop();
export const distChebyshev: MultiVecOpRoVV<number> = vop();

export const abs: MultiVecOpV<Vec> = vop();
export const sign: MultiVecOpV<Vec> = vop();
export const sin: MultiVecOpV<Vec> = vop();
export const cos: MultiVecOpV<Vec> = vop();
export const tan: MultiVecOpV<Vec> = vop();
export const asin: MultiVecOpV<Vec> = vop();
export const acos: MultiVecOpV<Vec> = vop();
export const atan: MultiVecOpV<Vec> = vop();
export const sqrt: MultiVecOpV<Vec> = vop();
export const floor: MultiVecOpV<Vec> = vop();
export const ceil: MultiVecOpV<Vec> = vop();
export const fract: MultiVecOpV<Vec> = vop();
export const trunc: MultiVecOpV<Vec> = vop();
export const log: MultiVecOpV<Vec> = vop();
export const exp: MultiVecOpV<Vec> = vop();
export const pow: MultiVecOpVV<Vec> = vop();
export const powN: MultiVecOpVN<Vec> = vop();

export const min: MultiVecOpVV<Vec> = vop();
export const max: MultiVecOpVV<Vec> = vop();
export const clamp: MultiVecOpVVV<Vec> = vop();
clamp.default((a, b, c) => min(max(a, b), c));

export const minor: MultiVecOpV<number> = vop();
export const major: MultiVecOpV<number> = vop();

export const mix: MultiVecOpVVV<Vec> = vop();
export const mixN: MultiVecOpVVN<Vec> = vop();
export const mixNew: MultiVecOpNewVVV<Vec> = vop();
export const mixNewN: MultiVecOpNewVVN<Vec> = vop();

export const step: MultiVecOpVV<Vec> = vop();
export const smoothStep: MultiVecOpVVV<Vec> = vop();

const _rotate = (u: number, v: number): VecOpVN<Vec> =>
    (a: Vec, theta: number) => {
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        const x = a[u];
        const y = a[v];
        a[u] = x * c - y * s;
        a[v] = x * s + y * c;
        return a;
    };

export const rotateX = _rotate(1, 2);
export const rotateY = _rotate(2, 0);
export const rotateZ = _rotate(0, 1);

export const polar: MultiVecOpV<Vec> = vop();
export const cartesian: MultiVecOpVO<Vec, Vec> = vop();

export const reflect: VecOpVV<Vec> =
    (a, b) => maddN(a, b, -2 * dot(a, b));

export const refract: VecOpVVN<Vec> =
    (a, n, eta) => {
        const d = dot(a, n);
        const k = 1 - eta * eta * (1 - d * d);
        return k < 0 ?
            zero(a) :
            maddN(mulN(a, eta), n, -(eta * d + Math.sqrt(k)));
    };

export const headingXY = (a: ReadonlyVec) => atan2Abs(a[1], a[0]);
export const headingXZ = (a: ReadonlyVec) => atan2Abs(a[2], a[0]);
export const headingYZ = (a: ReadonlyVec) => atan2Abs(a[2], a[1]);

export const angleRatio =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        dot(a, b) / (mag(a) * mag(b));

export const angleBetween: MultiVecOpRoVVO<number, boolean> = vop();

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

genCommonDefaults();
