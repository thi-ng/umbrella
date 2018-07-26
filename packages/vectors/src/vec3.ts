import { ICopy, IEqualsDelta } from "@thi.ng/api/api";
import { ReadonlyVec, Vec } from "./api";
import {
    atan2Abs,
    EPS,
    eqDelta,
    max3id,
    min3id,
    smoothStep,
    step
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
    [a[ia], a[ia + sa], a[ia + 2 * sa]];

export const set3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = b[ib],
    a[ia + sa] = b[ib + sb],
    a[ia + 2 * sa] = b[ib + 2 * sb],
    a
);

export const set3n = (a: Vec, n: number, ia = 0, sa = 1) => (
    a[ia] = n,
    a[ia + sa] = n,
    a[ia + 2 * sa] = n,
    a
);

export const set3s = (a: Vec, x: number, y: number, z: number, ia = 0, sa = 1) =>
    (a[ia] = x, a[ia + sa] = y, a[ia + 2 * sa] = z, a);

export const eqDelta3 = (a: ReadonlyVec, b: ReadonlyVec, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) =>
    eqDelta(a[ia], b[ib], eps) &&
    eqDelta(a[ia + sa], b[ib + sb], eps) &&
    eqDelta(a[ia + 2 * sa], b[ib + 2 * sb], eps);

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

export const add3n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] += n, a[ia + sa] += n, a[ia + 2 * sa] += n, a);

export const sub3n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] -= n, a[ia + sa] -= n, a[ia + 2 * sa] -= n, a);

export const mul3n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] *= n, a[ia + sa] *= n, a[ia + 2 * sa] *= n, a);

export const div3n = (a: Vec, n: number, ia = 0, sa = 1) =>
    (a[ia] /= n, a[ia + sa] /= n, a[ia + 2 * sa] /= n, a);

export const neg3 = (a: Vec, ia = 0, sa = 1) =>
    mul3n(a, -1, ia, sa);

export const abs3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.abs, a, ia, sa);

export const sign3 = (a: Vec, ia = 0, sa = 1) =>
    op3(Math.sign, a, ia, sa);

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

export const pow3n = (a: Vec, n: number, ia = 0, sa = 1) =>
    op3((x) => Math.pow(x, n), a, ia, sa);

export const madd3 = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) => (
    a[ia] += b[ib] * c[ic],
    a[ia + sa] += b[ib + sb] * c[ic + sc],
    a[ia + 2 * sa] += b[ib + 2 * sb] * c[ic + 2 * sc],
    a
);

export const madd3n = (a: Vec, b: ReadonlyVec, c: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
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

export const mix3n = (a: Vec, b: ReadonlyVec, t: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
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
    a[ia] = step(e[ie], a[ia]),
    a[ia + sa] = step(e[ie + se], a[ia + sa]),
    a[ia + 2 * sa] = step(e[ie + 2 * se], a[ia + 2 * sa]),
    a
);

export const smoothStep3 = (a: Vec, e1: ReadonlyVec, e2: ReadonlyVec, ia = 0, ie1 = 0, ie2 = 0, sa = 1, se1 = 1, se2 = 1) => (
    a[ia] = smoothStep(e1[ie1], e2[ie2], a[ia]),
    a[ia + sa] = smoothStep(e1[ie1 + se1], e2[ie2 + se2], a[ia + sa]),
    a[ia + 2 * sa] = smoothStep(e1[ie1 + 2 * se1], e2[ie2 + 2 * se2], a[ia + 2 * sa]),
    a
);

export const mag3sq = (a: ReadonlyVec, ia = 0, sa = 1) => {
    const x = a[ia];
    const y = a[ia + sa];
    const z = a[ia + 2 * sa];
    return x * x + y * y + z * z;
};

export const mag3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    Math.sqrt(mag3sq(a, ia, sa));

export const dist3sq = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const x = a[ia] - b[ib];
    const y = a[ia + sa] - b[ib + sb];
    const z = a[ia + 2 * sa] - b[ib + 2 * sb];
    return x * x + y * y + z * z;
};

export const dist3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.sqrt(dist3sq(a, b, ia, ib, sa, sb));

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
    m >= EPS && mul3n(a, n / m, ia, sa);
    return a;
};

export const limit3 = (a: Vec, n: number, ia = 0, sa = 1) => {
    const m = mag3(a, ia, sa);
    m >= n && mul3n(a, n / m, ia, sa);
    return a;
};

export const reflect3 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    madd3n(a, b, -2 * dot3(a, b, ia, ib, sa, sb), ia, ib, sa, sb);

export const rotate3x = (a: Vec, theta: number, ia = 0, sa = 1) =>
    rotate2(a, theta, ia + sa, sa);

export const rotate3y = (a: Vec, theta: number, ia = 0, sa = 1) =>
    rotate2(a, theta, ia + 2 * sa, -2 * sa);

export const rotate3z = rotate2;

export const heading3xy = heading2;

export const heading3xz = (a: ReadonlyVec, ia = 0, sa = 1) =>
    atan2Abs(a[ia + 2 * sa], a[ia]);

export const heading3yz = (a: ReadonlyVec, ia = 0, sa = 1) =>
    atan2Abs(a[ia + 2 * sa], a[ia + sa]);

export const toSpherical = (a: Vec, ia = 0, sa = 1) => {
    const x = a[ia];
    const y = a[ia + sa];
    const z = a[ia + 2 * sa];
    const r = Math.sqrt(x * x + y * y + z * z);
    return set3s(a, r, Math.asin(z / r), atan2Abs(y, x), ia, sa);
};

export const toCartesian3 = (a: Vec, b: ReadonlyVec = ZERO3, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const r = a[ia];
    const theta = a[ia + sa];
    const phi = a[ia + 2 * sa];
    const ct = Math.cos(theta);
    return set3s(a,
        r * ct * Math.cos(phi) + b[ib],
        r * ct * Math.sin(phi) + b[ib + sb],
        r * Math.sin(theta) + b[ib + 2 * sb],
        ia, sa
    );
};

export const minor3 = (a: Vec, ia = 0, sa = 1) =>
    min3id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]));

export const major3 = (a: Vec, ia = 0, sa = 1) =>
    max3id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]));

export const vec3 = (x = 0, y = 0, z = 0) =>
    new Vec3([x, y, z]);

export class Vec3 implements
    ICopy<Vec3>,
    IEqualsDelta<Vec3> {

    /**
     * Returns array of memory mapped `Vec3` instances using given
     * backing array and stride settings: The `cstride` is the step size
     * between individual XYZ vector components. `estride` is the step
     * size between successive vectors. This arrangement allows for
     * different storage approaches, including SOA, AOS, etc.
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
        return new Vec3(orthoNormal3(a.buf, b.buf, c.buf, a.index, b.index, c.index, a.stride, b.stride, c.stride));
    }

    static ZERO = Object.freeze(new Vec3(<number[]>ZERO3));
    static ONE = Object.freeze(new Vec3(<number[]>ONE3));

    buf: Vec;
    index: number;
    stride: number;

    constructor(buf: Vec, index = 0, stride = 1) {
        this.buf = buf;
        this.index = index;
        this.stride = stride;
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }

    get x() {
        return this.buf[this.index];
    }

    set x(x: number) {
        this.buf[this.index] = x;
    }

    get y() {
        return this.buf[this.index + this.stride];
    }

    set y(y: number) {
        this.buf[this.index + this.stride] = y;
    }

    get z() {
        return this.buf[this.index + 2 * this.stride];
    }

    set z(z: number) {
        this.buf[this.index + 2 * this.stride] = z;
    }

    copy() {
        return new Vec3(get3(this.buf, this.index, this.stride));
    }

    eqDelta(v: Readonly<Vec3>, eps = EPS) {
        return eqDelta3(this.buf, v.buf, eps, this.index, v.index, this.stride, v.stride);
    }

    set(v: Readonly<Vec3>) {
        set3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    setN(n: number) {
        set3n(this.buf, n, this.index, this.stride);
        return this;
    }

    setS(x: number, y: number, z: number) {
        set3s(this.buf, x, y, z, this.index, this.stride);
        return this;
    }

    add(v: Readonly<Vec3>) {
        add3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    sub(v: Readonly<Vec3>) {
        sub3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    mul(v: Readonly<Vec3>) {
        mul3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    div(v: Readonly<Vec3>) {
        div3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    addN(n: number) {
        add3n(this.buf, n, this.index, this.stride);
        return this;
    }

    subN(n: number) {
        sub3n(this.buf, n, this.index, this.stride);
        return this;
    }

    mulN(n: number) {
        mul3n(this.buf, n, this.index, this.stride);
        return this;
    }

    divN(n: number) {
        div3n(this.buf, n, this.index, this.stride);
        return this;
    }

    neg() {
        mul3n(this.buf, -1, this.index, this.stride);
        return this;
    }

    abs() {
        abs3(this.buf, this.index, this.stride);
        return this;
    }

    sign() {
        sign3(this.buf, this.index, this.stride);
        return this;
    }

    floor() {
        floor3(this.buf, this.index, this.stride);
        return this;
    }

    ceil() {
        ceil3(this.buf, this.index, this.stride);
        return this;
    }

    sqrt() {
        sqrt3(this.buf, this.index, this.stride);
        return this;
    }

    pow(v: Readonly<Vec3>) {
        pow3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    powN(n: number) {
        pow3n(this.buf, n, this.index, this.stride);
        return this;
    }

    sin() {
        sin3(this.buf, this.index, this.stride);
        return this;
    }

    cos() {
        cos3(this.buf, this.index, this.stride);
        return this;
    }

    madd(b: Readonly<Vec3>, c: Readonly<Vec3>) {
        madd3(this.buf, b.buf, c.buf, this.index, b.index, c.index, this.stride, b.stride, c.stride);
        return this;
    }

    maddN(b: Readonly<Vec3>, n: number) {
        madd3n(this.buf, b.buf, n, this.index, b.index, this.stride, b.stride);
        return this;
    }

    mix(b: Readonly<Vec3>, c: Readonly<Vec3>) {
        mix3(this.buf, b.buf, c.buf, this.index, b.index, c.index, this.stride, b.stride, c.stride);
        return this;
    }

    mixN(b: Readonly<Vec3>, n: number) {
        mix3n(this.buf, b.buf, n, this.index, b.index, this.stride, b.stride);
        return this;
    }

    min(v: Readonly<Vec3>) {
        min3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    max(v: Readonly<Vec3>) {
        max3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    clamp(min: Readonly<Vec3>, max: Readonly<Vec3>) {
        clamp3(this.buf, min.buf, max.buf, this.index, min.index, max.index, this.stride, min.stride, max.stride);
        return this;
    }

    minorAxis() {
        return minor3(this.buf, this.index, this.stride);
    }

    majorAxis() {
        return major3(this.buf, this.index, this.stride);
    }

    step(e: Readonly<Vec3>) {
        step3(this.buf, e.buf, this.index, e.index, this.stride, e.stride);
        return this;
    }

    smoothStep(e1: Readonly<Vec3>, e2: Readonly<Vec3>) {
        smoothStep3(this.buf, e1.buf, e2.buf, this.index, e1.index, e2.index, this.stride, e1.stride, e2.stride);
        return this;
    }

    dot(v: Readonly<Vec3>) {
        return dot3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
    }

    cross(v: Readonly<Vec3>) {
        cross3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
        return this;
    }

    orthoNormal(v: Readonly<Vec3>) {
        return this.cross(v).normalize();
    }

    mag() {
        return mag3(this.buf, this.index, this.stride);
    }

    magSq() {
        return mag3sq(this.buf, this.index, this.stride);
    }

    dist(v: Readonly<Vec3>) {
        return dist3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
    }

    distSq(v: Readonly<Vec3>) {
        return dist3sq(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
    }

    distManhattan(v: Readonly<Vec3>) {
        return distManhattan3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
    }

    distChebyshev(v: Readonly<Vec3>) {
        return distChebyshev3(this.buf, v.buf, this.index, v.index, this.stride, v.stride);
    }

    normalize(n = 1) {
        normalize3(this.buf, n, this.index, this.stride);
        return this;
    }

    limit(n: number) {
        limit3(this.buf, n, this.index, this.stride);
        return this;
    }

    reflect(n: Readonly<Vec3>) {
        reflect3(this.buf, n.buf, this.index, n.index, this.stride, n.stride);
        return this;
    }

    rotateX(theta: number) {
        rotate3x(this.buf, theta, this.index, this.stride);
        return this;
    }

    rotateY(theta: number) {
        rotate3y(this.buf, theta, this.index, this.stride);
        return this;
    }

    rotateZ(theta: number) {
        rotate3z(this.buf, theta, this.index, this.stride);
        return this;
    }

    headingXY() {
        return heading3xy(this.buf, this.index, this.stride);
    }

    headingXZ() {
        return heading3xz(this.buf, this.index, this.stride);
    }

    headingYZ() {
        return heading3yz(this.buf, this.index, this.stride);
    }

    toSpherical() {
        toSpherical(this.buf, this.index, this.stride);
        return this;
    }

    toCartesian(o: Readonly<Vec3> = Vec3.ZERO) {
        toCartesian3(this.buf, o.buf, this.index, o.index, this.stride, o.stride);
        return this;
    }

    toString() {
        return `[${this.buf[this.index]}, ${this.buf[this.index + this.stride]}, ${this.buf[this.index + 2 * this.stride]}]`;
    }
}
