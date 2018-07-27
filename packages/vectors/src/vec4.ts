import { ICopy, IEqualsDelta } from "@thi.ng/api/api";
import { ReadonlyVec, Vec } from "./api";
import {
    EPS,
    eqDelta,
    max4id,
    min4id,
    smoothStep,
    step
} from "./math";

export const ZERO4 = Object.freeze([0, 0, 0, 0]);
export const ONE4 = Object.freeze([1, 1, 1, 1]);

export const op4 = (fn: (x: number) => number, a: Vec, ia = 0, sa = 1) => (
    a[ia] = fn(a[ia]),
    a[ia + sa] = fn(a[ia + sa]),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa]),
    a[ia + 3 * sa] = fn(a[ia + 3 * sa]),
    a
);

export const op42 = (fn: (a: number, b: number) => number, a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = fn(a[ia], b[ib]),
    a[ia + sa] = fn(a[ia + sa], b[ib + sb]),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa], b[ib + 2 * sb]),
    a[ia + 3 * sa] = fn(a[ia + 3 * sa], b[ib + 3 * sb]),
    a
);

export const get4 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    [a[ia], a[ia + sa], a[ia + 2 * sa], a[ia + 3 * sa]];

export const set4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = b[ib],
    a[ia + sa] = b[ib + sb],
    a[ia + 2 * sa] = b[ib + 2 * sb],
    a[ia + 3 * sa] = b[ib + 3 * sb],
    a
);

export const set4n = (a: Vec, n: number, ia = 0, sa = 1) => (
    a[ia] = n,
    a[ia + sa] = n,
    a[ia + 2 * sa] = n,
    a[ia + 3 * sa] = n,
    a
);

export const set4s = (a: Vec, x: number, y: number, z: number, w: number, ia = 0, sa = 1) => (
    a[ia] = x,
    a[ia + sa] = y,
    a[ia + 2 * sa] = z,
    a[ia + 3 * sa] = w,
    a
);

export const eqDelta4 = (a: ReadonlyVec, b: ReadonlyVec, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) =>
    eqDelta(a[ia], b[ib], eps) &&
    eqDelta(a[ia + sa], b[ib + sb], eps) &&
    eqDelta(a[ia + 2 * sa], b[ib + 2 * sb], eps) &&
    eqDelta(a[ia + 3 * sa], b[ib + 3 * sb], eps);

export const add4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += b[ib],
    a[ia + sa] += b[ib + sb],
    a[ia + 2 * sa] += b[ib + 2 * sb],
    a[ia + 3 * sa] += b[ib + 3 * sb],
    a
);

export const mul4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] *= b[ib],
    a[ia + sa] *= b[ib + sb],
    a[ia + 2 * sa] *= b[ib + 2 * sb],
    a[ia + 3 * sa] *= b[ib + 3 * sb],
    a
);

export const sub4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] -= b[ib],
    a[ia + sa] -= b[ib + sb],
    a[ia + 2 * sa] -= b[ib + 2 * sb],
    a[ia + 3 * sa] -= b[ib + 3 * sb],
    a
);

export const div4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] /= b[ib],
    a[ia + sa] /= b[ib + sb],
    a[ia + 2 * sa] /= b[ib + 2 * sb],
    a[ia + 3 * sa] /= b[ib + 3 * sb],
    a
);

export const add4n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] += n, a[ia + sa] += n, a[ia + 2 * sa] += n, a[ia + 3 * sa] += n, a);

export const sub4n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] -= n, a[ia + sa] -= n, a[ia + 2 * sa] -= n, a[ia + 3 * sa] -= n, a);

export const mul4n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] *= n, a[ia + sa] *= n, a[ia + 2 * sa] *= n, a[ia + 3 * sa] *= n, a);

export const div4n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] /= n, a[ia + sa] /= n, a[ia + 2 * sa] /= n, a[ia + 3 * sa] /= n, a);

export const neg4 = (a: Vec, ia = 0, sa = 1) =>
    mul4n(a, -1, ia, sa);

export const abs4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.abs, a, ia, sa);

export const sign4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.sign, a, ia, sa);

export const floor4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.floor, a, ia, sa);

export const ceil4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.ceil, a, ia, sa);

export const sin4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.sin, a, ia, sa);

export const cos4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.cos, a, ia, sa);

export const sqrt4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.sqrt, a, ia, sa);

export const pow4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op42(Math.pow, a, b, ia, ib, sa, sb);

export const pow4n = (a: Vec, n: number, ia = 0, sa = 1) =>
    op4((x) => Math.pow(x, n), a, ia, sa);

export const madd4 = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) => (
    a[ia] += b[ib] * c[ic],
    a[ia + sa] += b[ib + sb] * c[ic + sc],
    a[ia + 2 * sa] += b[ib + 2 * sb] * c[ic + 2 * sc],
    a
);

export const madd4n = (a: Vec, b: ReadonlyVec, c: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += b[ib] * c,
    a[ia + sa] += b[ib + sb] * c,
    a[ia + 2 * sa] += b[ib + 2 * sb] * c,
    a
);

export const dot4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib] +
    a[ia + sa] * b[ib + sb] +
    a[ia + 2 * sa] * b[ib + 2 * sb] +
    a[ia + 3 * sa] * b[ib + 3 * sb];

export const mix4 = (a: Vec, b: ReadonlyVec, t: ReadonlyVec, ia = 0, ib = 0, it = 0, sa = 1, sb = 1, st = 1) => (
    a[ia] += (b[ib] - a[ia]) * t[it],
    a[ia + sa] += (b[ib + sb] - a[ia + sa]) * t[it + st],
    a[ia + 2 * sa] += (b[ib + 2 * sb] - a[ia + 2 * sa]) * t[it + 2 * st],
    a[ia + 3 * sa] += (b[ib + 3 * sb] - a[ia + 3 * sa]) * t[it + 3 * st],
    a
);

export const mix4n = (a: Vec, b: ReadonlyVec, t: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += (b[ib] - a[ia]) * t,
    a[ia + sa] += (b[ib + sb] - a[ia + sa]) * t,
    a[ia + 2 * sa] += (b[ib + 2 * sb] - a[ia + 2 * sa]) * t,
    a[ia + 3 * sa] += (b[ib + 3 * sb] - a[ia + 3 * sa]) * t,
    a
);

export const min4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op42(Math.min, a, b, ia, ib, sa, sb);

export const max4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op42(Math.max, a, b, ia, ib, sa, sb);

export const clamp4 = (a: Vec, min: ReadonlyVec, max: ReadonlyVec, ia = 0, imin = 0, imax = 0, sa = 1, smin = 1, smax = 1) =>
    max4(min4(a, max, ia, imax, sa, smax), min, ia, imin, sa, smin);

export const step4 = (a: Vec, e: ReadonlyVec, ia = 0, ie = 0, sa = 1, se = 1) => (
    a[ia] = step(e[ie], a[ia]),
    a[ia + sa] = step(e[ie + se], a[ia + sa]),
    a[ia + 2 * sa] = step(e[ie + 2 * se], a[ia + 2 * sa]),
    a[ia + 3 * sa] = step(e[ie + 3 * se], a[ia + 3 * sa]),
    a
);

export const smoothStep4 = (a: Vec, e1: ReadonlyVec, e2: ReadonlyVec, ia = 0, ie1 = 0, ie2 = 0, sa = 1, se1 = 1, se2 = 1) => (
    a[ia] = smoothStep(e1[ie1], e2[ie2], a[ia]),
    a[ia + sa] = smoothStep(e1[ie1 + se1], e2[ie2 + se2], a[ia + sa]),
    a[ia + 2 * sa] = smoothStep(e1[ie1 + 2 * se1], e2[ie2 + 2 * se2], a[ia + 2 * sa]),
    a[ia + 3 * sa] = smoothStep(e1[ie1 + 3 * se1], e2[ie2 + 2 * se2], a[ia + 3 * sa]),
    a
);

export const mag4sq = (a: ReadonlyVec, ia = 0, sa = 1) => {
    const x = a[ia];
    const y = a[ia + sa];
    const z = a[ia + 2 * sa];
    const w = a[ia + 3 * sa];
    return x * x + y * y + z * z + w * w;
};

export const mag4 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    Math.sqrt(mag4sq(a, ia, sa));

export const dist4sq = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const x = a[ia] - b[ib];
    const y = a[ia + sa] - b[ib + sb];
    const z = a[ia + 2 * sa] - b[ib + 2 * sb];
    const w = a[ia + 3 * sa] - b[ib + 3 * sb];
    return x * x + y * y + z * z + w * w;
};

export const dist4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.sqrt(dist4sq(a, b, ia, ib, sa, sb));

export const distManhattan4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.abs(a[ia] - b[ib]) +
    Math.abs(a[ia + sa] - b[ib + sb]) +
    Math.abs(a[ia + 2 * sa] - b[ib + 2 * sb]) +
    Math.abs(a[ia + 3 * sa] - b[ib + 3 * sb]);

export const distChebyshev4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.max(
        Math.abs(a[ia] - b[ib]),
        Math.abs(a[ia + sa] - b[ib + sb]),
        Math.abs(a[ia + 2 * sa] - b[ib + 2 * sb]),
        Math.abs(a[ia + 3 * sa] - b[ib + 3 * sb])
    );

export const normalize4 = (a: Vec, n = 1, ia = 0, sa = 1) => {
    const m = mag4(a, ia, sa);
    m >= EPS && mul4n(a, n / m, ia, sa);
    return a;
};

export const limit4 = (a: Vec, n: number, ia = 0, sa = 1) => {
    const m = mag4(a, ia, sa);
    m >= n && mul4n(a, n / m, ia, sa);
    return a;
};

export const reflect4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    madd4n(a, b, -2 * dot4(a, b, ia, ib, sa, sb), ia, ib, sa, sb);

export const minor4 = (a: Vec, ia = 0, sa = 1) =>
    min4id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]), Math.abs(a[ia + 3 * sa]));

export const major4 = (a: Vec, ia = 0, sa = 1) =>
    max4id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]), Math.abs(a[ia + 3 * sa]));

export const vec4 = (x = 0, y = 0, z = 0, w = 0) =>
    new Vec4([x, y, z, w]);

export class Vec4 implements
    ICopy<Vec4>,
    IEqualsDelta<Vec4> {

    /**
     * Returns array of memory mapped `Vec4` instances using given
     * backing array and stride settings: The `cstride` is the step size
     * between individual XYZ vector components. `estride` is the step
     * size between successive vectors. This arrangement allows for
     * different storage approaches, incl. SOA, AOS, striped /
     * interleaved etc.
     *
     * @param buf backing array
     * @param n num vectors
     * @param start  start index
     * @param cstride component stride
     * @param estride element stride
     */
    static mapBuffer(buf: Vec, n: number, start = 0, cstride = 1, estride = 4) {
        const res: Vec4[] = [];
        while (--n >= 0) {
            res.push(new Vec4(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    static ZERO = Object.freeze(new Vec4(<number[]>ZERO4));
    static ONE = Object.freeze(new Vec4(<number[]>ONE4));

    buf: Vec;
    i: number;
    s: number;

    constructor(buf: Vec, index = 0, stride = 1) {
        this.buf = buf;
        this.i = index;
        this.s = stride;
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }

    get x() {
        return this.buf[this.i];
    }

    set x(x: number) {
        this.buf[this.i] = x;
    }

    get y() {
        return this.buf[this.i + this.s];
    }

    set y(y: number) {
        this.buf[this.i + this.s] = y;
    }

    get z() {
        return this.buf[this.i + 2 * this.s];
    }

    set z(z: number) {
        this.buf[this.i + 2 * this.s] = z;
    }

    get w() {
        return this.buf[this.i + 3 * this.s];
    }

    set w(w: number) {
        this.buf[this.i + 3 * this.s] = w;
    }

    copy() {
        return new Vec4(get4(this.buf, this.i, this.s));
    }

    eqDelta(v: Readonly<Vec4>, eps = EPS) {
        return eqDelta4(this.buf, v.buf, eps, this.i, v.i, this.s, v.s);
    }

    set(v: Readonly<Vec4>) {
        set4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    setN(n: number) {
        set4n(this.buf, n, this.i, this.s);
        return this;
    }

    setS(x: number, y: number, z: number, w: number) {
        set4s(this.buf, x, y, z, w, this.i, this.s);
        return this;
    }

    add(v: Readonly<Vec4>) {
        add4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    sub(v: Readonly<Vec4>) {
        sub4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    mul(v: Readonly<Vec4>) {
        mul4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    div(v: Readonly<Vec4>) {
        div4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    addN(n: number) {
        add4n(this.buf, n, this.i, this.s);
        return this;
    }

    subN(n: number) {
        sub4n(this.buf, n, this.i, this.s);
        return this;
    }

    mulN(n: number) {
        mul4n(this.buf, n, this.i, this.s);
        return this;
    }

    divN(n: number) {
        div4n(this.buf, n, this.i, this.s);
        return this;
    }

    neg() {
        mul4n(this.buf, -1, this.i, this.s);
        return this;
    }

    abs() {
        abs4(this.buf, this.i, this.s);
        return this;
    }

    sign() {
        sign4(this.buf, this.i, this.s);
        return this;
    }

    floor() {
        floor4(this.buf, this.i, this.s);
        return this;
    }

    ceil() {
        ceil4(this.buf, this.i, this.s);
        return this;
    }

    sqrt() {
        sqrt4(this.buf, this.i, this.s);
        return this;
    }

    pow(v: Readonly<Vec4>) {
        pow4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    powN(n: number) {
        pow4n(this.buf, n, this.i, this.s);
        return this;
    }

    sin() {
        sin4(this.buf, this.i, this.s);
        return this;
    }

    cos() {
        cos4(this.buf, this.i, this.s);
        return this;
    }

    madd(b: Readonly<Vec4>, c: Readonly<Vec4>) {
        madd4(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    maddN(b: Readonly<Vec4>, n: number) {
        madd4n(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    mix(b: Readonly<Vec4>, c: Readonly<Vec4>) {
        mix4(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(b: Readonly<Vec4>, n: number) {
        mix4n(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    min(v: Readonly<Vec4>) {
        min4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    max(v: Readonly<Vec4>) {
        max4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    clamp(min: Readonly<Vec4>, max: Readonly<Vec4>) {
        clamp4(this.buf, min.buf, max.buf, this.i, min.i, max.i, this.s, min.s, max.s);
        return this;
    }

    minorAxis() {
        return minor4(this.buf, this.i, this.s);
    }

    majorAxis() {
        return major4(this.buf, this.i, this.s);
    }

    step(e: Readonly<Vec4>) {
        step4(this.buf, e.buf, this.i, e.i, this.s, e.s);
        return this;
    }

    smoothStep(e1: Readonly<Vec4>, e2: Readonly<Vec4>) {
        smoothStep4(this.buf, e1.buf, e2.buf, this.i, e1.i, e2.i, this.s, e1.s, e2.s);
        return this;
    }

    dot(v: Readonly<Vec4>) {
        return dot4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    mag() {
        return mag4(this.buf, this.i, this.s);
    }

    magSq() {
        return mag4sq(this.buf, this.i, this.s);
    }

    dist(v: Readonly<Vec4>) {
        return dist4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distSq(v: Readonly<Vec4>) {
        return dist4sq(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distManhattan(v: Readonly<Vec4>) {
        return distManhattan4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distChebyshev(v: Readonly<Vec4>) {
        return distChebyshev4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    normalize(n = 1) {
        normalize4(this.buf, n, this.i, this.s);
        return this;
    }

    limit(n: number) {
        limit4(this.buf, n, this.i, this.s);
        return this;
    }

    reflect(n: Readonly<Vec4>) {
        reflect4(this.buf, n.buf, this.i, n.i, this.s, n.s);
        return this;
    }

    toString() {
        return `[${this.buf[this.i]}, ${this.buf[this.i + this.s]}, ${this.buf[this.i + 2 * this.s]}, ${this.buf[this.i + 3 * this.s]}]`;
    }
}
