import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { EPS } from "@thi.ng/math/api";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { max4id, min4id } from "@thi.ng/math/interval";
import { mixBilinear } from "@thi.ng/math/mix";
import { fract } from "@thi.ng/math/prec";
import { smoothStep, step } from "@thi.ng/math/step";
import {
    IVec,
    IVector,
    MAX4,
    MIN4,
    ONE4,
    ReadonlyVec,
    Vec,
    Vec4Coord,
    W4,
    X4,
    Y4,
    Z4,
    ZERO4
} from "./api";
import { declareIndices, defcommon } from "./codegen";
import { $iter } from "./common";

export const op4 = (fn: (x: number) => number, a: Vec, ia = 0, sa = 1) => (
    a[ia] = fn(a[ia]),
    a[ia + sa] = fn(a[ia + sa]),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa]),
    a[ia + 3 * sa] = fn(a[ia + 3 * sa]),
    a
);

export const op40 = (fn: () => number, a: Vec, ia = 0, sa = 1) => (
    a[ia] = fn(),
    a[ia + sa] = fn(),
    a[ia + 2 * sa] = fn(),
    a[ia + 3 * sa] = fn(),
    a
);

export const op41 = (fn: (a: number, n: number) => number, a: Vec, n: number, ia = 0, sa = 1) => (
    a[ia] = fn(a[ia], n),
    a[ia + sa] = fn(a[ia + sa], n),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa], n),
    a[ia + 3 * sa] = fn(a[ia + 3 * sa], n),
    a
);

export const get4 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    set4(new (<any>(a.constructor))(4), a, 0, ia, 1, sa);

export const setS4 = (a: Vec, x: number, y: number, z: number, w: number, ia = 0, sa = 1) => (
    a[ia] = x,
    a[ia + sa] = y,
    a[ia + 2 * sa] = z,
    a[ia + 3 * sa] = w,
    a
);

export const randNorm4 = (a: Vec, n = 1, ia = 0, sa = 1) =>
    randMinMax4(a, -n, n, ia, sa);

export const randMinMax4 = (a: Vec, min: number, max: number, ia = 0, sa = 1) => {
    const d = max - min;
    return op40(() => min + d * Math.random(), a, ia, sa);
};

export const jitter4 = (a: Vec, n: number, ia = 0, sa = 1) =>
    op4((x) => x + Math.random() * 2 * n - n, a, ia, sa);

export const swizzle4 = (a: Vec, b: ReadonlyVec, x: number, y: number, z: number, w: number, ia = 0, ib = 0, sa = 1, sb = 1) =>
    setS4(a, b[ib + x * sb], b[ib + y * sb], b[ib + z * sb], b[ib + w * sb], ia, sa);

export const swap4 = (a: Vec, b: Vec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    let t = a[ia]; a[ia] = b[ib]; b[ib] = t;
    ia += sa; ib += sb;
    t = a[ia]; a[ia] = b[ib]; b[ib] = t;
    ia += sa; ib += sb;
    t = a[ia]; a[ia] = b[ib]; b[ib] = t;
    ia += sa; ib += sb;
    t = a[ia]; a[ia] = b[ib]; b[ib] = t;
    return a;
};

export const equiv4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] === b[ib] &&
    a[ia + sa] === b[ib + sb] &&
    a[ia + 2 * sa] === b[ib + 2 * sb] &&
    a[ia + 3 * sa] === b[ib + 3 * sb];

export const eqDelta4 = (a: ReadonlyVec, b: ReadonlyVec, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) =>
    eqDelta(a[ia], b[ib], eps) &&
    eqDelta(a[ia + sa], b[ib + sb], eps) &&
    eqDelta(a[ia + 2 * sa], b[ib + 2 * sb], eps) &&
    eqDelta(a[ia + 3 * sa], b[ib + 3 * sb], eps);

export const eqDelta4buf = (a: ReadonlyVec, b: ReadonlyVec, num: number, eps = EPS, ia = 0, ib = 0, sca = 1, scb = 1, sea = 4, seb = 4) => {
    while (--num >= 0) {
        if (!eqDelta4(a, b, eps, ia + num * sea, ib + num * seb, sca, scb)) {
            return false;
        }
    }
    return true;
};

export const eqDelta4array = (a: ReadonlyVec[], b: ReadonlyVec[], eps = EPS) => {
    const na = a.length;
    if (b.length !== na) {
        return false;
    }
    for (let i = 0; i < na; i++) {
        if (!eqDelta4(a[i], b[i], eps)) {
            return false;
        }
    }
    return true;
};

export const compare4 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    o1: Vec4Coord, o2: Vec4Coord, o3: Vec4Coord, o4: Vec4Coord,
    ia = 0, ib = 0, sa = 1, sb = 1): number => {

    const ax = a[ia + o1 * sa];
    const ay = a[ia + o2 * sa];
    const az = a[ia + o3 * sa];
    const aw = b[ia + o4 * sa];
    const bx = b[ib + o1 * sb];
    const by = b[ib + o2 * sb];
    const bz = b[ib + o3 * sb];
    const bw = b[ib + o4 * sb];
    return ax === bx ?
        ay === by ?
            az === bz ?
                aw === bw ?
                    0 :
                    aw < bw ? -4 : 4 :
                az < bz ? -3 : 3 :
            ay < by ? -2 : 2 :
        ax < bx ? -1 : 1;
};

export const collate4 = (buf: Vec, src: Iterable<ReadonlyVec>, start = 0, cstride = 1, estride = 4) => {
    for (let v of src) {
        set4(buf, v, start, 0, cstride, 1);
        start += estride;
    }
    return buf;
};

export const [
    set4, setN4,
    add4, sub4, mul4, div4,
    add4o, sub4o, mul4o, div4o,
    addN4, subN4, mulN4, divN4,
    addN4o, subN4o, mulN4o, divN4o,
    madd4, maddN4, msub4, msubN4,
    abs4, sign4, floor4, ceil4, sin4, cos4, sqrt4,
    pow4, min4, max4,
    mix4, mixN4, mix4o, mixN4o
] = defcommon(4);

export const neg4 = (a: Vec, ia = 0, sa = 1) =>
    mulN4(a, -1, ia, sa);

export const fract4 = (a: Vec, ia = 0, sa = 1) =>
    op4(fract, a, ia, sa);

export const powN4 = (a: Vec, n: number, ia = 0, sa = 1) =>
    op41(Math.pow, a, n, ia, sa);

export const dot4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] * b[ib] +
    a[ia + sa] * b[ib + sb] +
    a[ia + 2 * sa] * b[ib + 2 * sb] +
    a[ia + 3 * sa] * b[ib + 3 * sb];

export const mixBilinear4 = (
    a: Vec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, u: number, v: number,
    ia = 0, ib = 0, ic = 0, id = 0,
    sa = 1, sb = 1, sc = 1, sd = 1) => (
        a[ia] = mixBilinear(a[ia], b[ib], c[ic], d[id], u, v),
        a[ia + sa] = mixBilinear(a[ia + sa], b[ib + sb], c[ic + sc], d[id + sd], u, v),
        a[ia + 2 * sa] = mixBilinear(a[ia + 2 * sa], b[ib + 2 * sb], c[ic + 2 * sc], d[id + 2 * sd], u, v),
        a[ia + 3 * sa] = mixBilinear(a[ia + 3 * sa], b[ib + 3 * sb], c[ic + 3 * sc], d[id + 3 * sd], u, v),
        a
    );

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

export const magSq4 = (a: ReadonlyVec, ia = 0, sa = 1) => {
    const x = a[ia];
    const y = a[ia + sa];
    const z = a[ia + 2 * sa];
    const w = a[ia + 3 * sa];
    return x * x + y * y + z * z + w * w;
};

export const mag4 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    Math.sqrt(magSq4(a, ia, sa));

export const distSq4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const x = a[ia] - b[ib];
    const y = a[ia + sa] - b[ib + sb];
    const z = a[ia + 2 * sa] - b[ib + 2 * sb];
    const w = a[ia + 3 * sa] - b[ib + 3 * sb];
    return x * x + y * y + z * z + w * w;
};

export const dist4 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.sqrt(distSq4(a, b, ia, ib, sa, sb));

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
    m >= EPS && mulN4(a, n / m, ia, sa);
    return a;
};

export const limit4 = (a: Vec, n: number, ia = 0, sa = 1) => {
    const m = mag4(a, ia, sa);
    m >= n && mulN4(a, n / m, ia, sa);
    return a;
};

export const reflect4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    maddN4(a, b, -2 * dot4(a, b, ia, ib, sa, sb), ia, ib, sa, sb);

export const refract4 = (a: Vec, b: ReadonlyVec, eta: number, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const d = dot4(a, b, ia, ib, sa, sb);
    const k = 1 - eta * eta * (1 - d * d);
    return k < 0 ?
        setN4(a, 0, ia, sa) :
        msubN4(mulN4(a, eta, ia, sa), b, eta * d + Math.sqrt(k), ia, ib, sa, sb);
};

export const minorAxis4 = (a: Vec, ia = 0, sa = 1) =>
    min4id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]), Math.abs(a[ia + 3 * sa]));

export const majorAxis4 = (a: Vec, ia = 0, sa = 1) =>
    max4id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]), Math.abs(a[ia + 3 * sa]));

export const vec4 = (x = 0, y = 0, z = 0, w = 0) =>
    new Vec4([x, y, z, w]);

export const asVec4 = (x: ReadonlyVec) =>
    x instanceof Vec4 ? x : new Vec4([x[0] || 0, x[1] || 0, x[2] || 0, x[3] || 0]);

export class Vec4 implements
    IVector<Vec4> {

    /**
     * Returns array of memory mapped `Vec4` instances using given
     * backing array and stride settings: The `cstride` is the step size
     * between individual XYZW vector components. `estride` is the step
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
    static mapBuffer(buf: Vec, n = buf.length >> 2, start = 0, cstride = 1, estride = 4) {
        const res: Vec4[] = [];
        while (--n >= 0) {
            res.push(new Vec4(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    /**
     * Merges given `src` iterable of `Vec4`s into single array `buf`.
     * Vectors will be arranged according to given component and element
     * strides, starting at `start` index. It's the user's
     * responsibility to ensure the target buffer has sufficient
     * capacity to hold the input vectors. See `Vec4.mapBuffer` for the
     * reverse operation. Returns buffer.
     *
     * @param buf
     * @param src
     * @param start
     * @param cstride
     * @param estride
     */
    static intoBuffer(buf: Vec, src: Iterable<Readonly<Vec4>>, start = 0, cstride = 1, estride = 4) {
        for (let v of src) {
            set4(buf, v.buf, start, v.i, cstride, v.s);
            start += estride;
        }
        return buf;
    }

    static swizzle(v: IVec, x: number, y: number, z: number, w: number) {
        return new Vec4([]).swizzle(v, x, y, z, w);
    }

    static mixBilinear(a: Readonly<Vec4>, b: Readonly<Vec4>, c: Readonly<Vec4>, d: Readonly<Vec4>, u: number, v: number) {
        return new Vec4(
            mixBilinear4(
                get4(a.buf, a.i, a.s), b.buf, c.buf, d.buf, u, v,
                0, b.i, c.i, d.i,
                1, b.s, c.s, d.s
            )
        );
    }

    static randNorm(n = 1) {
        return new Vec4(randNorm4([], n));
    }

    static random(min: number, max: number) {
        return new Vec4(randMinMax4([], min, max));
    }

    static comparator(o1: Vec4Coord, o2: Vec4Coord, o3: Vec4Coord, o4: Vec4Coord) {
        return (a: Readonly<Vec4>, b: Readonly<Vec4>) => a.compare(b, o1, o2, o3, o4);
    }

    static readonly ZERO = Object.freeze(new Vec4(<number[]>ZERO4));
    static readonly ONE = Object.freeze(new Vec4(<number[]>ONE4));
    static readonly MIN = Object.freeze(new Vec4(<number[]>MIN4));
    static readonly MAX = Object.freeze(new Vec4(<number[]>MAX4));
    static readonly X_AXIS = Object.freeze(new Vec4(<number[]>X4));
    static readonly Y_AXIS = Object.freeze(new Vec4(<number[]>Y4));
    static readonly Z_AXIS = Object.freeze(new Vec4(<number[]>Z4));
    static readonly W_AXIS = Object.freeze(new Vec4(<number[]>W4));
    buf: Vec;
    i: number;
    s: number;
    x: number;
    y: number;
    z: number;
    w: number;
    [id: number]: number;

    constructor(buf?: Vec, index = 0, stride = 1) {
        this.buf = buf || [0, 0, 0, 0];
        this.i = index;
        this.s = stride;
    }

    [Symbol.iterator]() {
        return $iter(this.buf, 4, this.i, this.s);
    }

    array() {
        return get4(this.buf, this.i, this.s);
    }

    get length() {
        return 4;
    }

    copy() {
        return new Vec4(get4(this.buf, this.i, this.s));
    }

    empty() {
        return new Vec4();
    }

    equiv(v: any) {
        return v instanceof Vec4 ?
            equiv4(this.buf, v.buf, this.i, v.i, this.s, v.s) :
            isArrayLike(v) && v.length === 4 ?
                equiv4(this.buf, <any>v, this.i, 0, this.s, 1) :
                false;
    }

    eqDelta(v: Readonly<Vec4>, eps = EPS) {
        return eqDelta4(this.buf, v.buf, eps, this.i, v.i, this.s, v.s);
    }

    compare(v: Readonly<Vec4>, o1: Vec4Coord = 0, o2: Vec4Coord = 1, o3: Vec4Coord = 2, o4: Vec4Coord = 3) {
        return compare4(this.buf, v.buf, o1, o2, o3, o4, this.i, v.i, this.s, v.s);
    }

    set(v: Readonly<Vec4>) {
        set4(this.buf, v.buf, this.i, v.i, this.s, v.s);
        return this;
    }

    setN(n: number) {
        setN4(this.buf, n, this.i, this.s);
        return this;
    }

    setS(x: number, y: number, z: number, w: number) {
        setS4(this.buf, x, y, z, w, this.i, this.s);
        return this;
    }

    jitter(n = 1) {
        jitter4(this.buf, n, this.i, this.s);
        return this;
    }

    swizzle(v: IVec, x: number, y: number, z: number, w: number) {
        swizzle4(this.buf, v.buf, x, y, z, w, this.i, v.i, this.s, v.s);
        return this;
    }

    swap(v: Vec4) {
        swap4(this.buf, v.buf, this.i, v.i, this.s, v.s);
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
        addN4(this.buf, n, this.i, this.s);
        return this;
    }

    subN(n: number) {
        subN4(this.buf, n, this.i, this.s);
        return this;
    }

    mulN(n: number) {
        mulN4(this.buf, n, this.i, this.s);
        return this;
    }

    divN(n: number) {
        divN4(this.buf, n, this.i, this.s);
        return this;
    }

    addNew(b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        add4o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    subNew(b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        sub4o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    mulNew(b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        mul4o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    divNew(b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        div4o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    addNewN(n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        addN4o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    subNewN(n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        subN4o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    mulNewN(n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        mulN4o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    divNewN(n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        divN4o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    maddNew(b: Readonly<Vec4>, c: Readonly<Vec4>, out?: Vec4) {
        out = out ? out.set(this) : this.copy();
        madd4(out.buf, b.buf, c.buf, out.i, b.i, c.i, out.s, b.s, c.s);
        return out;
    }

    maddNewN(b: Readonly<Vec4>, n: number, out?: Vec4) {
        out = out ? out.set(this) : this.copy();
        maddN4(out.buf, b.buf, n, out.i, b.i, out.s, b.s);
        return out;
    }

    msubNew(b: Readonly<Vec4>, c: Readonly<Vec4>, out?: Vec4) {
        out = out ? out.set(this) : this.copy();
        msub4(out.buf, b.buf, c.buf, out.i, b.i, c.i, out.s, b.s, c.s);
        return out;
    }

    msubNewN(b: Readonly<Vec4>, n: number, out?: Vec4) {
        out = out ? out.set(this) : this.copy();
        msubN4(out.buf, b.buf, n, out.i, b.i, out.s, b.s);
        return out;
    }

    mixNew(b: Readonly<Vec4>, t: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        mix4o(out.buf, this.buf, b.buf, t.buf, out.i, this.i, b.i, t.i, out.s, this.s, b.s, t.s);
        return out;
    }

    mixNewN(b: Readonly<Vec4>, n = 0.5, out?: Vec4) {
        !out && (out = new Vec4([]));
        mixN4o(out.buf, this.buf, b.buf, n, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    neg() {
        mulN4(this.buf, -1, this.i, this.s);
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

    fract() {
        fract4(this.buf, this.i, this.s);
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
        powN4(this.buf, n, this.i, this.s);
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
        maddN4(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    msub(b: Readonly<Vec4>, c: Readonly<Vec4>) {
        msub4(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    msubN(b: Readonly<Vec4>, n: number) {
        msubN4(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    mix(b: Readonly<Vec4>, c: Readonly<Vec4>) {
        mix4(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(b: Readonly<Vec4>, n = 0.5) {
        mixN4(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
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
        return minorAxis4(this.buf, this.i, this.s);
    }

    majorAxis() {
        return majorAxis4(this.buf, this.i, this.s);
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
        return magSq4(this.buf, this.i, this.s);
    }

    dist(v: Readonly<Vec4>) {
        return dist4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distSq(v: Readonly<Vec4>) {
        return distSq4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distManhattan(v: Readonly<Vec4>) {
        return distManhattan4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    distChebyshev(v: Readonly<Vec4>) {
        return distChebyshev4(this.buf, v.buf, this.i, v.i, this.s, v.s);
    }

    normalize(len = 1) {
        normalize4(this.buf, len, this.i, this.s);
        return this;
    }

    limit(len: number) {
        limit4(this.buf, len, this.i, this.s);
        return this;
    }

    reflect(n: Readonly<Vec4>) {
        reflect4(this.buf, n.buf, this.i, n.i, this.s, n.s);
        return this;
    }

    refract(n: Readonly<Vec4>, eta: number) {
        refract4(this.buf, n.buf, eta, this.i, n.i, this.s, n.s);
        return this;
    }

    toString() {
        const i = this.i;
        const s = this.s;
        return `[${this.buf[i]}, ${this.buf[i + s]}, ${this.buf[i + 2 * s]}, ${this.buf[i + 3 * s]}]`;
    }

    toJSON() {
        return this.array();
    }
}

declareIndices(Vec4.prototype, ["x", "y", "z", "w"]);
