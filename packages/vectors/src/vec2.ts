import { ICopy, IEqualsDelta } from "@thi.ng/api/api";
import { IVec, ReadonlyVec, Vec } from "./api";
import {
    atan2Abs,
    EPS,
    eqDelta1,
    max2id,
    min2id,
    smoothStep1,
    step1
} from "./math";

export const ZERO2 = Object.freeze([0, 0]);
export const ONE2 = Object.freeze([1, 1]);

export const op2 = (fn: (x: number) => number, a: Vec, ia = 0, sa = 1) =>
    (a[ia] = fn(a[ia]), a[ia + sa] = fn(a[ia + sa]), a);

export const op22 = (fn: (a: number, b: number) => number, a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = fn(a[ia], b[ib]),
    a[ia + sa] = fn(a[ia + sa], b[ib + sb]),
    a
);

export const get2 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    set2(new (<any>(a.constructor))(2), a, 0, ia, 1, sa);

export const set2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    (a[ia] = b[ib], a[ia + sa] = b[ib + sb], a);

export const setN2 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] = n, a[ia + sa] = n, a);

export const setS2 = (a: Vec, x: number, y: number, ia = 0, sa = 1) =>
    (a[ia] = x, a[ia + sa] = y, a);

export const swizzle2 = (a: Vec, b: Vec, x: number, y: number, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const xx = b[ib + x * sb];
    const yy = b[ib + y * sb];
    a[ia] = xx;
    a[ia + sa] = yy;
    return a;
};

export const eqDelta2 = (a: ReadonlyVec, b: ReadonlyVec, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) =>
    eqDelta1(a[ia], b[ib], eps) &&
    eqDelta1(a[ia + sa], b[ib + sb], eps);

export const add2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    (a[ia] += b[ib], a[ia + sa] += b[ib + sb], a);

export const mul2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    (a[ia] *= b[ib], a[ia + sa] *= b[ib + sb], a);

export const sub2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    (a[ia] -= b[ib], a[ia + sa] -= b[ib + sb], a);

export const div2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    (a[ia] /= b[ib], a[ia + sa] /= b[ib + sb], a);

export const addN2 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] += n, a[ia + sa] += n, a);

export const subN2 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] -= n, a[ia + sa] -= n, a);

export const mulN2 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] *= n, a[ia + sa] *= n, a);

export const divN2 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] /= n, a[ia + sa] /= n, a);

export const neg2 = (a: Vec, ia = 0, sa = 1) =>
    mulN2(a, -1, ia, sa);

export const abs2 = (a: Vec, ia = 0, sa = 1) =>
    op2(Math.abs, a, ia, sa);

export const sign2 = (a: Vec, ia = 0, sa = 1) =>
    op2(Math.sign, a, ia, sa);

export const floor2 = (a: Vec, ia = 0, sa = 1) =>
    op2(Math.floor, a, ia, sa);

export const ceil2 = (a: Vec, ia = 0, sa = 1) =>
    op2(Math.ceil, a, ia, sa);

export const sin2 = (a: Vec, ia = 0, sa = 1) =>
    op2(Math.sin, a, ia, sa);

export const cos2 = (a: Vec, ia = 0, sa = 1) =>
    op2(Math.cos, a, ia, sa);

export const sqrt2 = (a: Vec, ia = 0, sa = 1) =>
    op2(Math.sqrt, a, ia, sa);

export const pow2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = Math.pow(a[ia], b[ib]),
    a[ia + sa] = Math.pow(a[ia + sa], b[ib + sb]),
    a
);

export const powN2 = (a: Vec, n: number, ia = 0, sa = 1) => (
    a[ia] = Math.pow(a[ia], n),
    a[ia + sa] = Math.pow(a[ia + sa], n),
    a
);

export const madd2 = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    (a[ia] += b[ib] * c[ic], a[ia + sa] += b[ib + sb] * c[ic + sc], a);

export const maddN2 = (a: Vec, b: ReadonlyVec, c: number, ia = 0, ib = 0, sa = 1, sb = 1) =>
    (a[ia] += b[ib] * c, a[ia + sa] += b[ib + sb] * c, a);

export const dot2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib] + a[ia + sa] * b[ib + sb];

export const cross2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib + sb] - a[ia + sa] * b[ib];

export const mix2 = (a: Vec, b: ReadonlyVec, t: ReadonlyVec, ia = 0, ib = 0, it = 0, sa = 1, sb = 1, st = 1) => (
    a[ia] += (b[ib] - a[ia]) * t[it],
    a[ia + sa] += (b[ib + sb] - a[ia + sa]) * t[it + st],
    a
);

export const mixN2 = (a: Vec, b: ReadonlyVec, t: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += (b[ib] - a[ia]) * t,
    a[ia + sa] += (b[ib + sb] - a[ia + sa]) * t,
    a
);

export const min2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op22(Math.min, a, b, ia, ib, sa, sb);

export const max2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op22(Math.max, a, b, ia, ib, sa, sb);

export const clamp2 = (a: Vec, min: ReadonlyVec, max: ReadonlyVec, ia = 0, imin = 0, imax = 0, sa = 1, smin = 1, smax = 1) =>
    max2(min2(a, max, ia, imax, sa, smax), min, ia, imin, sa, smin);

export const step2 = (a: Vec, e: ReadonlyVec, ia = 0, ie = 0, sa = 1, stridee = 1) =>
    (a[ia] = step1(e[ie], a[ia]), a[ia + sa] = step1(e[ie + stridee], a[ia + sa]), a);

export const smoothStep2 = (a: Vec, e1: ReadonlyVec, e2: ReadonlyVec, ia = 0, ie1 = 0, ie2 = 0, sa = 1, se1 = 1, se2 = 1) => (
    a[ia] = smoothStep1(e1[ie1], e2[ie2], a[ia]),
    a[ia + sa] = smoothStep1(e1[ie1 + se1], e2[ie2 + se2], a[ia + sa]),
    a
);

export const magSq2 = (a: ReadonlyVec, ia = 0, sa = 1) => {
    const x = a[ia], y = a[ia + sa];
    return x * x + y * y;
};

export const mag2 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    Math.sqrt(magSq2(a, ia, sa));

export const distSq2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const x = a[ia] - b[ib];
    const y = a[ia + sa] - b[ib + sb];
    return x * x + y * y;
};

export const dist2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.sqrt(distSq2(a, b, ia, ib, sa, sb));

export const distManhattan2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    return Math.abs(a[ia] - b[ib]) + Math.abs(a[ia + sa] - b[ib + sb])
};

export const distChebyshev2 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    return Math.max(Math.abs(a[ia] - b[ib]), Math.abs(a[ia + sa] - b[ib + sb]))
};

export const normalize2 = (a: Vec, n = 1, ia = 0, sa = 1) => {
    const m = mag2(a, ia, sa);
    m >= EPS && mulN2(a, n / m, ia, sa);
    return a;
};

export const limit2 = (a: Vec, n: number, ia = 0, sa = 1) => {
    const m = mag2(a, ia, sa);
    m >= n && mulN2(a, n / m, ia, sa);
    return a;
};

export const reflect2 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    maddN2(a, b, -2 * dot2(a, b, ia, ib, sa, sb), ia, ib, sa, sb);

export const rotate2 = (a: Vec, theta: number, ia = 0, sa = 1) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    const x = a[ia];
    const y = a[ia + sa];
    return setS2(a, x * c - y * s, x * s + y * c, ia, sa);
};

export const heading2 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    atan2Abs(a[ia + sa], a[ia]);

export const toPolar2 = (a: Vec, ia = 0, sa = 1) => {
    const x = a[ia], y = a[ia + sa];
    return setS2(a, Math.sqrt(x * x + y * y), atan2Abs(y, x), ia, sa);
};

export const toCartesian2 = (a: Vec, b: ReadonlyVec = ZERO2, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const r = a[ia], theta = a[ia + sa];
    return setS2(
        a,
        r * Math.cos(theta) + b[ib],
        r * Math.sin(theta) + b[ib + sb],
        ia, sa
    );
};

export const minorAxis2 = (a: Vec, ia = 0, sa = 1) =>
    min2id(Math.abs(a[ia]), Math.abs(a[ia + sa]));

export const majorAxis2 = (a: Vec, ia = 0, sa = 1) =>
    max2id(Math.abs(a[ia]), Math.abs(a[ia + sa]));

export const vec2 = (x = 0, y = 0) =>
    new Vec2([x, y]);

export class Vec2 implements
    ICopy<Vec2>,
    IEqualsDelta<Vec2>,
    IVec {

    /**
     * Returns array of memory mapped `Vec2` instances using given
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
    static mapBuffer(buf: Vec, n: number, start = 0, cstride = 1, estride = 2) {
        const res: Vec2[] = [];
        while (--n >= 0) {
            res.push(new Vec2(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    static ZERO = Object.freeze(new Vec2(<number[]>ZERO2));
    static ONE = Object.freeze(new Vec2(<number[]>ONE2));

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

    copy() {
        return new Vec2(get2(this.buf, this.i, this.s));
    }

    eqDelta(v: Readonly<Vec2>, eps = EPS) {
        return eqDelta2(this.buf, v.buf, eps, this.i, v.i, this.s, v.s);
    }

    set(v: Readonly<Vec2>) {
        set2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    setN(n: number) {
        setN2(this.buf, n, this.i, this.s);
        return this;
    }

    setS(x: number, y: number) {
        setS2(this.buf, x, y, this.i, this.s);
        return this;
    }

    swizzle(v: IVec, x: number, y: number) {
        swizzle2(this.buf, v.buf, x, y, this.i, v.i, this.s, v.s);
        return this;
    }

    add(v: Readonly<Vec2>) {
        add2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    sub(v: Readonly<Vec2>) {
        sub2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    mul(v: Readonly<Vec2>) {
        mul2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    div(v: Readonly<Vec2>) {
        div2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    addN(n: number) {
        addN2(this.buf, n, this.i, this.s);
        return this;
    }

    subN(n: number) {
        subN2(this.buf, n, this.i, this.s);
        return this;
    }

    mulN(n: number) {
        mulN2(this.buf, n, this.i, this.s);
        return this;
    }

    divN(n: number) {
        divN2(this.buf, n, this.i, this.s);
        return this;
    }

    neg() {
        mulN2(this.buf, -1, this.i, this.s);
        return this;
    }

    abs() {
        abs2(this.buf, this.i, this.s);
        return this;
    }

    sign() {
        sign2(this.buf, this.i, this.s);
        return this;
    }

    floor() {
        floor2(this.buf, this.i, this.s);
        return this;
    }

    ceil() {
        ceil2(this.buf, this.i, this.s);
        return this;
    }

    sqrt() {
        sqrt2(this.buf, this.i, this.s);
        return this;
    }

    pow(v: Readonly<Vec2>) {
        pow2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    powN(n: number) {
        powN2(this.buf, n, this.i, this.s);
        return this;
    }

    sin() {
        sin2(this.buf, this.i, this.s);
        return this;
    }

    cos() {
        cos2(this.buf, this.i, this.s);
        return this;
    }

    madd(b: Readonly<Vec2>, c: Readonly<Vec2>) {
        madd2(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    maddN(b: Readonly<Vec2>, n: number) {
        maddN2(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    mix(b: Readonly<Vec2>, c: Readonly<Vec2>) {
        mix2(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(b: Readonly<Vec2>, n: number) {
        mixN2(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    min(v: Readonly<Vec2>) {
        min2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    max(v: Readonly<Vec2>) {
        max2(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    clamp(min: Readonly<Vec2>, max: Readonly<Vec2>) {
        clamp2(this.buf, min.buf, max.buf, this.i, min.i, max.i, this.s, min.s, max.s);
        return this;
    }

    minorAxis() {
        return minorAxis2(this.buf, this.i, this.s);
    }

    majorAxis() {
        return majorAxis2(this.buf, this.i, this.s);
    }

    step(e: Readonly<Vec2>) {
        step2(this.buf, e.buf, this.i, e.i, this.s, e.s);
        return this;
    }

    smoothStep(e1: Readonly<Vec2>, e2: Readonly<Vec2>) {
        smoothStep2(this.buf, e1.buf, e2.buf, this.i, e1.i, e2.i, this.s, e1.s, e2.s);
        return this;
    }

    dot(v: Readonly<Vec2>) {
        return dot2(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    cross(v: Readonly<Vec2>) {
        return cross2(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    mag() {
        return mag2(this.buf, this.i, this.s);
    }

    magSq() {
        return magSq2(this.buf, this.i, this.s);
    }

    dist(v: Readonly<Vec2>) {
        return dist2(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distSq(v: Readonly<Vec2>) {
        return distSq2(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distManhattan(v: Readonly<Vec2>) {
        return distManhattan2(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distChebyshev(v: Readonly<Vec2>) {
        return distChebyshev2(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    normalize(len = 1) {
        normalize2(this.buf, len, this.i, this.s);
        return this;
    }

    limit(len: number) {
        limit2(this.buf, len, this.i, this.s);
        return this;
    }

    reflect(n: Readonly<Vec2>) {
        reflect2(this.buf, n.buf, this.i, n.i, this.s, n.s);
        return this;
    }

    rotate(theta: number) {
        rotate2(this.buf, theta, this.i, this.s);
        return this;
    }

    heading() {
        return heading2(this.buf, this.i, this.s);
    }

    toPolar() {
        toPolar2(this.buf, this.i, this.s);
        return this;
    }

    toCartesian(o: Readonly<Vec2> = Vec2.ZERO) {
        toCartesian2(this.buf, o.buf, this.i, o.i, this.s, o.s);
        return this;
    }

    toString() {
        return `[${this.buf[this.i]}, ${this.buf[this.i + this.s]}]`;
    }
}
