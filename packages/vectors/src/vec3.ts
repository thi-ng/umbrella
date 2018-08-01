import { ICopy, IEqualsDelta } from "@thi.ng/api/api";
import { IVec, ReadonlyVec, Vec } from "./api";
import {
    atan2Abs,
    EPS,
    eqDelta1,
    max3id,
    min3id,
    sign1,
    smoothStep1,
    step1
} from "./math";
import { heading2, rotate2 } from "./vec2";

export const ZERO3 = Object.freeze([0, 0, 0]);
export const ONE3 = Object.freeze([1, 1, 1]);

export const op3 = (fn: (x: number) => number, a: Vec, ia = 0, sa = 1) => (
    a[ia] = fn(a[ia]),
    a[ia + sa] = fn(a[ia + sa]),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa]),
    a
);

export const op32 = (fn: (a: number, b: number) => number, a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = fn(a[ia], b[ib]),
    a[ia + sa] = fn(a[ia + sa], b[ib + sb]),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa], b[ib + 2 * sb]),
    a
);

export const get3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    set3(new (<any>(a.constructor))(3), a, 0, ia, 1, sa);

export const set3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = b[ib],
    a[ia + sa] = b[ib + sb],
    a[ia + 2 * sa] = b[ib + 2 * sb],
    a
);

export const setN3 = (a: Vec, n: number, ia = 0, sa = 1) => (
    a[ia] = n,
    a[ia + sa] = n,
    a[ia + 2 * sa] = n,
    a
);

export const setS3 = (a: Vec, x: number, y: number, z: number, ia = 0, sa = 1) =>
    (a[ia] = x, a[ia + sa] = y, a[ia + 2 * sa] = z, a);

export const swizzle3 = (a: Vec, b: Vec, x: number, y: number, z: number, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const xx = b[ib + x * sb];
    const yy = b[ib + y * sb];
    const zz = b[ib + z * sb];
    a[ia] = xx;
    a[ia + sa] = yy;
    a[ia + 2 * sa] = zz;
    return a;
};

export const eqDelta3 = (a: ReadonlyVec, b: ReadonlyVec, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) =>
    eqDelta1(a[ia], b[ib], eps) &&
    eqDelta1(a[ia + sa], b[ib + sb], eps) &&
    eqDelta1(a[ia + 2 * sa], b[ib + 2 * sb], eps);

export const add3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += b[ib],
    a[ia + sa] += b[ib + sb],
    a[ia + 2 * sa] += b[ib + 2 * sb],
    a
);

export const mul3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] *= b[ib],
    a[ia + sa] *= b[ib + sb],
    a[ia + 2 * sa] *= b[ib + 2 * sb],
    a
);

export const sub3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] -= b[ib],
    a[ia + sa] -= b[ib + sb],
    a[ia + 2 * sa] -= b[ib + 2 * sb],
    a
);

export const div3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] /= b[ib],
    a[ia + sa] /= b[ib + sb],
    a[ia + 2 * sa] /= b[ib + 2 * sb],
    a
);

export const addN3 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] += n, a[ia + sa] += n, a[ia + 2 * sa] += n, a);

export const subN3 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] -= n, a[ia + sa] -= n, a[ia + 2 * sa] -= n, a);

export const mulN3 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] *= n, a[ia + sa] *= n, a[ia + 2 * sa] *= n, a);

export const divN3 = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] /= n, a[ia + sa] /= n, a[ia + 2 * sa] /= n, a);

export const neg3 = (a: Vec, ia = 0, sa = 1) =>
    mulN3(a, -1, ia, sa);

export const abs3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.abs, a, ia, sa);

export const sign3 = (a: Vec, eps = EPS, ia = 0, sa = 1) =>
    op3((x) => sign1(x, eps), a, ia, sa);

export const floor3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.floor, a, ia, sa);

export const ceil3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.ceil, a, ia, sa);

export const sin3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.sin, a, ia, sa);

export const cos3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.cos, a, ia, sa);

export const sqrt3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.sqrt, a, ia, sa);

export const pow3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op32(Math.pow, a, b, ia, ib, sa, sb);

export const powN3 = (a: Vec, n: number, ia = 0, sa = 1) =>
    op3((x) => Math.pow(x, n), a, ia, sa);

export const madd3 = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) => (
    a[ia] += b[ib] * c[ic],
    a[ia + sa] += b[ib + sb] * c[ic + sc],
    a[ia + 2 * sa] += b[ib + 2 * sb] * c[ic + 2 * sc],
    a
);

export const maddN3 = (a: Vec, b: ReadonlyVec, c: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += b[ib] * c,
    a[ia + sa] += b[ib + sb] * c,
    a[ia + 2 * sa] += b[ib + 2 * sb] * c,
    a
);

export const dot3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib] +
    a[ia + sa] * b[ib + sb] +
    a[ia + 2 * sa] * b[ib + 2 * sb];

export const cross3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const iay = ia + sa;
    const iaz = ia + 2 * sa;
    const iby = ib + sb;
    const ibz = ib + 2 * sb;
    const x = a[iay] * b[ibz] - a[iaz] * b[iby];
    const y = a[iaz] * b[ib] - a[ia] * b[ibz];
    a[iaz] = a[ia] * b[iby] - a[iay] * b[ib];
    a[iay] = y;
    a[ia] = x;
    return a;
};

export const orthoNormal3 = (a: Vec, b: Vec, c: Vec, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    cross3(
        sub3(get3(c, ic, sc), a, 0, ia, 1, sa),
        sub3(get3(b, ib, sb), a, 0, ia, 1, sa)
    );

export const mix3 = (a: Vec, b: ReadonlyVec, t: ReadonlyVec, ia = 0, ib = 0, it = 0, sa = 1, sb = 1, st = 1) => (
    a[ia] += (b[ib] - a[ia]) * t[it],
    a[ia + sa] += (b[ib + sb] - a[ia + sa]) * t[it + st],
    a[ia + 2 * sa] += (b[ib + 2 * sb] - a[ia + 2 * sa]) * t[it + 2 * st],
    a
);

export const mixN3 = (a: Vec, b: ReadonlyVec, t: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += (b[ib] - a[ia]) * t,
    a[ia + sa] += (b[ib + sb] - a[ia + sa]) * t,
    a[ia + 2 * sa] += (b[ib + 2 * sb] - a[ia + 2 * sa]) * t,
    a
);

export const min3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op32(Math.min, a, b, ia, ib, sa, sb);

export const max3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op32(Math.max, a, b, ia, ib, sa, sb);

export const clamp3 = (a: Vec, min: ReadonlyVec, max: ReadonlyVec, ia = 0, imin = 0, imax = 0, sa = 1, smin = 1, smax = 1) =>
    max3(min3(a, max, ia, imax, sa, smax), min, ia, imin, sa, smin);

export const step3 = (a: Vec, e: ReadonlyVec, ia = 0, ie = 0, sa = 1, se = 1) => (
    a[ia] = step1(e[ie], a[ia]),
    a[ia + sa] = step1(e[ie + se], a[ia + sa]),
    a[ia + 2 * sa] = step1(e[ie + 2 * se], a[ia + 2 * sa]),
    a
);

export const smoothStep3 = (a: Vec, e1: ReadonlyVec, e2: ReadonlyVec, ia = 0, ie1 = 0, ie2 = 0, sa = 1, se1 = 1, se2 = 1) => (
    a[ia] = smoothStep1(e1[ie1], e2[ie2], a[ia]),
    a[ia + sa] = smoothStep1(e1[ie1 + se1], e2[ie2 + se2], a[ia + sa]),
    a[ia + 2 * sa] = smoothStep1(e1[ie1 + 2 * se1], e2[ie2 + 2 * se2], a[ia + 2 * sa]),
    a
);

export const magSq3 = (a: ReadonlyVec, ia = 0, sa = 1) => {
    const x = a[ia];
    const y = a[ia + sa];
    const z = a[ia + 2 * sa];
    return x * x + y * y + z * z;
};

export const mag3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    Math.sqrt(magSq3(a, ia, sa));

export const distSq3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const x = a[ia] - b[ib];
    const y = a[ia + sa] - b[ib + sb];
    const z = a[ia + 2 * sa] - b[ib + 2 * sb];
    return x * x + y * y + z * z;
};

export const dist3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.sqrt(distSq3(a, b, ia, ib, sa, sb));

export const distManhattan3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.abs(a[ia] - b[ib]) +
    Math.abs(a[ia + sa] - b[ib + sb]) +
    Math.abs(a[ia + 2 * sa] - b[ib + 2 * sb]);

export const distChebyshev3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.max(
        Math.abs(a[ia] - b[ib]),
        Math.abs(a[ia + sa] - b[ib + sb]),
        Math.abs(a[ia + 2 * sa] - b[ib + 2 * sb])
    );

export const normalize3 = (a: Vec, n = 1, ia = 0, sa = 1) => {
    const m = mag3(a, ia, sa);
    m >= EPS && mulN3(a, n / m, ia, sa);
    return a;
};

export const limit3 = (a: Vec, n: number, ia = 0, sa = 1) => {
    const m = mag3(a, ia, sa);
    m >= n && mulN3(a, n / m, ia, sa);
    return a;
};

export const reflect3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    maddN3(a, b, -2 * dot3(a, b, ia, ib, sa, sb), ia, ib, sa, sb);

export const rotateX3 = (a: Vec, theta: number, ia = 0, sa = 1) =>
    rotate2(a, theta, ia + sa, sa);

export const rotateY3 = (a: Vec, theta: number, ia = 0, sa = 1) =>
    rotate2(a, theta, ia + 2 * sa, -2 * sa);

export const rotateZ3 = rotate2;

export const headingXY3 = heading2;

export const headingXZ3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    atan2Abs(a[ia + 2 * sa], a[ia]);

export const headingYZ3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    atan2Abs(a[ia + 2 * sa], a[ia + sa]);

export const toSpherical3 = (a: Vec, ia = 0, sa = 1) => {
    const x = a[ia];
    const y = a[ia + sa];
    const z = a[ia + 2 * sa];
    const r = Math.sqrt(x * x + y * y + z * z);
    return setS3(a, r, Math.asin(z / r), atan2Abs(y, x), ia, sa);
};

export const toCartesian3 = (a: Vec, b: ReadonlyVec = ZERO3, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const r = a[ia];
    const theta = a[ia + sa];
    const phi = a[ia + 2 * sa];
    const ct = Math.cos(theta);
    return setS3(a,
        r * ct * Math.cos(phi) + b[ib],
        r * ct * Math.sin(phi) + b[ib + sb],
        r * Math.sin(theta) + b[ib + 2 * sb],
        ia, sa
    );
};

export const minorAxis3 = (a: Vec, ia = 0, sa = 1) =>
    min3id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]));

export const majorAxis3 = (a: Vec, ia = 0, sa = 1) =>
    max3id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]));

export const vec3 = (x = 0, y = 0, z = 0) =>
    new Vec3([x, y, z]);

export class Vec3 implements
    ICopy<Vec3>,
    IEqualsDelta<Vec3>,
    IVec {

    /**
     * Returns array of memory mapped `Vec3` instances using given
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
    static mapBuffer(buf: Vec, n: number, start = 0, cstride = 1, estride = 3) {
        const res: Vec3[] = [];
        while (--n >= 0) {
            res.push(new Vec3(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    static orthoNormal3(a: Readonly<Vec3>, b: Readonly<Vec3>, c: Readonly<Vec3>) {
        return new Vec3(orthoNormal3(a.buf, b.buf, c.buf, a.i, b.i, c.i, a.s, b.s, c.s));
    }

    static ZERO = Object.freeze(new Vec3(<number[]>ZERO3));
    static ONE = Object.freeze(new Vec3(<number[]>ONE3));

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

    copy() {
        return new Vec3(get3(this.buf, this.i, this.s));
    }

    eqDelta(v: Readonly<Vec3>, eps = EPS) {
        return eqDelta3(this.buf, v.buf, eps, this.i, v.i, this.s, v.s);
    }

    set(v: Readonly<Vec3>) {
        set3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    setN(n: number) {
        setN3(this.buf, n, this.i, this.s);
        return this;
    }

    setS(x: number, y: number, z: number) {
        setS3(this.buf, x, y, z, this.i, this.s);
        return this;
    }

    swizzle(v: IVec, x: number, y: number, z: number) {
        swizzle3(this.buf, v.buf, x, y, z, this.i, v.i, this.s, v.s);
        return this;
    }

    add(v: Readonly<Vec3>) {
        add3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    sub(v: Readonly<Vec3>) {
        sub3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    mul(v: Readonly<Vec3>) {
        mul3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    div(v: Readonly<Vec3>) {
        div3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    addN(n: number) {
        addN3(this.buf, n, this.i, this.s);
        return this;
    }

    subN(n: number) {
        subN3(this.buf, n, this.i, this.s);
        return this;
    }

    mulN(n: number) {
        mulN3(this.buf, n, this.i, this.s);
        return this;
    }

    divN(n: number) {
        divN3(this.buf, n, this.i, this.s);
        return this;
    }

    neg() {
        mulN3(this.buf, -1, this.i, this.s);
        return this;
    }

    abs() {
        abs3(this.buf, this.i, this.s);
        return this;
    }

    sign() {
        sign3(this.buf, this.i, this.s);
        return this;
    }

    floor() {
        floor3(this.buf, this.i, this.s);
        return this;
    }

    ceil() {
        ceil3(this.buf, this.i, this.s);
        return this;
    }

    sqrt() {
        sqrt3(this.buf, this.i, this.s);
        return this;
    }

    pow(v: Readonly<Vec3>) {
        pow3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    powN(n: number) {
        powN3(this.buf, n, this.i, this.s);
        return this;
    }

    sin() {
        sin3(this.buf, this.i, this.s);
        return this;
    }

    cos() {
        cos3(this.buf, this.i, this.s);
        return this;
    }

    madd(b: Readonly<Vec3>, c: Readonly<Vec3>) {
        madd3(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    maddN(b: Readonly<Vec3>, n: number) {
        maddN3(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    mix(b: Readonly<Vec3>, c: Readonly<Vec3>) {
        mix3(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(b: Readonly<Vec3>, n: number) {
        mixN3(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    min(v: Readonly<Vec3>) {
        min3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    max(v: Readonly<Vec3>) {
        max3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    clamp(min: Readonly<Vec3>, max: Readonly<Vec3>) {
        clamp3(this.buf, min.buf, max.buf, this.i, min.i, max.i, this.s, min.s, max.s);
        return this;
    }

    minorAxis() {
        return minorAxis3(this.buf, this.i, this.s);
    }

    majorAxis() {
        return majorAxis3(this.buf, this.i, this.s);
    }

    step(e: Readonly<Vec3>) {
        step3(this.buf, e.buf, this.i, e.i, this.s, e.s);
        return this;
    }

    smoothStep(e1: Readonly<Vec3>, e2: Readonly<Vec3>) {
        smoothStep3(this.buf, e1.buf, e2.buf, this.i, e1.i, e2.i, this.s, e1.s, e2.s);
        return this;
    }

    dot(v: Readonly<Vec3>) {
        return dot3(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    cross(v: Readonly<Vec3>) {
        cross3(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    orthoNormal(v: Readonly<Vec3>) {
        return this.cross(v).normalize();
    }

    mag() {
        return mag3(this.buf, this.i, this.s);
    }

    magSq() {
        return magSq3(this.buf, this.i, this.s);
    }

    dist(v: Readonly<Vec3>) {
        return dist3(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distSq(v: Readonly<Vec3>) {
        return distSq3(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distManhattan(v: Readonly<Vec3>) {
        return distManhattan3(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distChebyshev(v: Readonly<Vec3>) {
        return distChebyshev3(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    normalize(len = 1) {
        normalize3(this.buf, len, this.i, this.s);
        return this;
    }

    limit(len: number) {
        limit3(this.buf, len, this.i, this.s);
        return this;
    }

    reflect(n: Readonly<Vec3>) {
        reflect3(this.buf, n.buf, this.i, n.i, this.s, n.s);
        return this;
    }

    rotateX(theta: number) {
        rotateX3(this.buf, theta, this.i, this.s);
        return this;
    }

    rotateY(theta: number) {
        rotateY3(this.buf, theta, this.i, this.s);
        return this;
    }

    rotateZ(theta: number) {
        rotateZ3(this.buf, theta, this.i, this.s);
        return this;
    }

    headingXY() {
        return headingXY3(this.buf, this.i, this.s);
    }

    headingXZ() {
        return headingXZ3(this.buf, this.i, this.s);
    }

    headingYZ() {
        return headingYZ3(this.buf, this.i, this.s);
    }

    toSpherical() {
        toSpherical3(this.buf, this.i, this.s);
        return this;
    }

    toCartesian(o: Readonly<Vec3> = Vec3.ZERO) {
        toCartesian3(this.buf, o.buf, this.i, o.i, this.s, o.s);
        return this;
    }

    toString() {
        return `[${this.buf[this.i]}, ${this.buf[this.i + this.s]}, ${this.buf[this.i + 2 * this.s]}]`;
    }
}
