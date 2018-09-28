import {
    ICopy,
    IEqualsDelta,
    IEquiv,
    ILength
} from "@thi.ng/api/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import {
    IVec,
    MAX4,
    MIN4,
    ONE4,
    ReadonlyVec,
    Vec,
    ZERO4
} from "./api";
import {
    vbinop,
    vbinopN,
    vbinopO,
    vbinopON
} from "./codegen";
import { $iter, declareIndices } from "./common";
import {
    EPS,
    eqDelta1,
    fract1,
    max4id,
    min4id,
    mixBilinear1,
    smoothStep1,
    step1
} from "./math";

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

export const op42 = (fn: (a: number, b: number) => number, a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = fn(a[ia], b[ib]),
    a[ia + sa] = fn(a[ia + sa], b[ib + sb]),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa], b[ib + 2 * sb]),
    a[ia + 3 * sa] = fn(a[ia + 3 * sa], b[ib + 3 * sb]),
    a
);

export const get4 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    set4(new (<any>(a.constructor))(4), a, 0, ia, 1, sa);

export const set4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] = b[ib],
    a[ia + sa] = b[ib + sb],
    a[ia + 2 * sa] = b[ib + 2 * sb],
    a[ia + 3 * sa] = b[ib + 3 * sb],
    a
);

export const setN4 = (a: Vec, n: number, ia = 0, sa = 1) => (
    a[ia] = n,
    a[ia + sa] = n,
    a[ia + 2 * sa] = n,
    a[ia + 3 * sa] = n,
    a
);

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
    eqDelta1(a[ia], b[ib], eps) &&
    eqDelta1(a[ia + sa], b[ib + sb], eps) &&
    eqDelta1(a[ia + 2 * sa], b[ib + 2 * sb], eps) &&
    eqDelta1(a[ia + 3 * sa], b[ib + 3 * sb], eps);

export const add4 = vbinop(4, "+");
export const sub4 = vbinop(4, "-");
export const mul4 = vbinop(4, "*");
export const div4 = vbinop(4, "/");

export const add4o = vbinopO(4, "+");
export const sub4o = vbinopO(4, "-");
export const mul4o = vbinopO(4, "*");
export const div4o = vbinopO(4, "/");

export const addN4 = vbinopN(4, "+");
export const subN4 = vbinopN(4, "-");
export const mulN4 = vbinopN(4, "*");
export const divN4 = vbinopN(4, "/");

export const addN4o = vbinopON(4, "+");
export const subN4o = vbinopON(4, "-");
export const mulN4o = vbinopON(4, "*");
export const divN4o = vbinopON(4, "/");

export const neg4 = (a: Vec, ia = 0, sa = 1) =>
    mulN4(a, -1, ia, sa);

export const abs4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.abs, a, ia, sa);

export const sign4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.sign, a, ia, sa);

export const floor4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.floor, a, ia, sa);

export const ceil4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.ceil, a, ia, sa);

export const fract4 = (a: Vec, ia = 0, sa = 1) =>
    op4(fract1, a, ia, sa);

export const sin4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.sin, a, ia, sa);

export const cos4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.cos, a, ia, sa);

export const sqrt4 = (a: Vec, ia = 0, sa = 1) =>
    op4(Math.sqrt, a, ia, sa);

export const pow4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op42(Math.pow, a, b, ia, ib, sa, sb);

export const powN4 = (a: Vec, n: number, ia = 0, sa = 1) =>
    op4((x) => Math.pow(x, n), a, ia, sa);

export const madd4 = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) => (
    a[ia] += b[ib] * c[ic],
    a[ia + sa] += b[ib + sb] * c[ic + sc],
    a[ia + 2 * sa] += b[ib + 2 * sb] * c[ic + 2 * sc],
    a[ia + 3 * sa] += b[ib + 3 * sb] * c[ic + 3 * sc],
    a
);

export const maddN4 = (a: Vec, b: ReadonlyVec, n: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += b[ib] * n,
    a[ia + sa] += b[ib + sb] * n,
    a[ia + 2 * sa] += b[ib + 2 * sb] * n,
    a[ia + 3 * sa] += b[ib + 3 * sb] * n,
    a
);

export const msub4 = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) => (
    a[ia] -= b[ib] * c[ic],
    a[ia + sa] -= b[ib + sb] * c[ic + sc],
    a[ia + 2 * sa] -= b[ib + 2 * sb] * c[ic + 2 * sc],
    a[ia + 3 * sa] -= b[ib + 3 * sb] * c[ic + 3 * sc],
    a
);

export const msubN4 = (a: Vec, b: ReadonlyVec, n: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] -= b[ib] * n,
    a[ia + sa] -= b[ib + sb] * n,
    a[ia + 2 * sa] -= b[ib + 2 * sb] * n,
    a[ia + 3 * sa] -= b[ib + 3 * sb] * n,
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

export const mixN4 = (a: Vec, b: ReadonlyVec, n: number, ia = 0, ib = 0, sa = 1, sb = 1) => (
    a[ia] += (b[ib] - a[ia]) * n,
    a[ia + sa] += (b[ib + sb] - a[ia + sa]) * n,
    a[ia + 2 * sa] += (b[ib + 2 * sb] - a[ia + 2 * sa]) * n,
    a[ia + 3 * sa] += (b[ib + 3 * sb] - a[ia + 3 * sa]) * n,
    a
);

export const mix4o = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, t: ReadonlyVec, io = 0, ia = 0, ib = 0, it = 0, so = 1, sa = 1, sb = 1, st = 1) => (
    out[io] = a[ia] + (b[ib] - a[ia]) * t[it],
    out[io + so] = a[ia + sa] + (b[ib + sb] - a[ia + sa]) * t[it + st],
    out[io + 2 * so] = a[ia + 2 * sa] + (b[ib + 2 * sb] - a[ia + 2 * sa]) * t[it + 2 * st],
    out[io + 3 * so] = a[ia + 3 * sa] + (b[ib + 3 * sb] - a[ia + 3 * sa]) * t[it + 3 * st],
    out
);

export const mixN4o = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, n: number, io = 0, ia = 0, ib = 0, so = 1, sa = 1, sb = 1) => (
    out[io] = a[ia] + (b[ib] - a[ia]) * n,
    out[io + so] = a[ia + sa] + (b[ib + sb] - a[ia + sa]) * n,
    out[io + 2 * so] = a[ia + 2 * sa] + (b[ib + 2 * sb] - a[ia + 2 * sa]) * n,
    out[io + 3 * so] = a[ia + 3 * sa] + (b[ib + 3 * sb] - a[ia + 3 * sa]) * n,
    out
);

export const mixBilinear4 = (
    a: Vec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, u: number, v: number,
    ia = 0, ib = 0, ic = 0, id = 0,
    sa = 1, sb = 1, sc = 1, sd = 1) => (
        a[ia] = mixBilinear1(a[ia], b[ib], c[ic], d[id], u, v),
        a[ia + sa] = mixBilinear1(a[ia + sa], b[ib + sb], c[ic + sc], d[id + sd], u, v),
        a[ia + 2 * sa] = mixBilinear1(a[ia + 2 * sa], b[ib + 2 * sb], c[ic + 2 * sc], d[id + 2 * sd], u, v),
        a[ia + 3 * sa] = mixBilinear1(a[ia + 3 * sa], b[ib + 3 * sb], c[ic + 3 * sc], d[id + 3 * sd], u, v),
        a
    );

export const min4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op42(Math.min, a, b, ia, ib, sa, sb);

export const max4 = (a: Vec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    op42(Math.max, a, b, ia, ib, sa, sb);

export const clamp4 = (a: Vec, min: ReadonlyVec, max: ReadonlyVec, ia = 0, imin = 0, imax = 0, sa = 1, smin = 1, smax = 1) =>
    max4(min4(a, max, ia, imax, sa, smax), min, ia, imin, sa, smin);

export const step4 = (a: Vec, e: ReadonlyVec, ia = 0, ie = 0, sa = 1, se = 1) => (
    a[ia] = step1(e[ie], a[ia]),
    a[ia + sa] = step1(e[ie + se], a[ia + sa]),
    a[ia + 2 * sa] = step1(e[ie + 2 * se], a[ia + 2 * sa]),
    a[ia + 3 * sa] = step1(e[ie + 3 * se], a[ia + 3 * sa]),
    a
);

export const smoothStep4 = (a: Vec, e1: ReadonlyVec, e2: ReadonlyVec, ia = 0, ie1 = 0, ie2 = 0, sa = 1, se1 = 1, se2 = 1) => (
    a[ia] = smoothStep1(e1[ie1], e2[ie2], a[ia]),
    a[ia + sa] = smoothStep1(e1[ie1 + se1], e2[ie2 + se2], a[ia + sa]),
    a[ia + 2 * sa] = smoothStep1(e1[ie1 + 2 * se1], e2[ie2 + 2 * se2], a[ia + 2 * sa]),
    a[ia + 3 * sa] = smoothStep1(e1[ie1 + 3 * se1], e2[ie2 + 2 * se2], a[ia + 3 * sa]),
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

export class Vec4 implements
    ICopy<Vec4>,
    IEqualsDelta<Vec4>,
    IEquiv,
    ILength,
    Iterable<number>,
    IVec {

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

    static intoBuffer(buf: Vec, src: Iterable<Readonly<Vec4>>, start = 0, cstride = 1, estride = 2) {
        for (let v of src) {
            set4(buf, v.buf, start, v.i, cstride, v.s);
            start += estride;
        }
        return buf;
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

    static add(a: Readonly<Vec4>, b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        add4o(out.buf, a.buf, b.buf, out.i, a.i, b.i, out.s, a.s, b.s);
        return out;
    }

    static sub(a: Readonly<Vec4>, b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        sub4o(out.buf, a.buf, b.buf, out.i, a.i, b.i, out.s, a.s, b.s);
        return out;
    }

    static mul(a: Readonly<Vec4>, b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        mul4o(out.buf, a.buf, b.buf, out.i, a.i, b.i, out.s, a.s, b.s);
        return out;
    }

    static div(a: Readonly<Vec4>, b: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        div4o(out.buf, a.buf, b.buf, out.i, a.i, b.i, out.s, a.s, b.s);
        return out;
    }

    static addN(a: Readonly<Vec4>, n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        addN4o(out.buf, a.buf, n, out.i, a.i, out.s, a.s);
        return out;
    }

    static subN(a: Readonly<Vec4>, n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        subN4o(out.buf, a.buf, n, out.i, a.i, out.s, a.s);
        return out;
    }

    static mulN(a: Readonly<Vec4>, n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        mulN4o(out.buf, a.buf, n, out.i, a.i, out.s, a.s);
        return out;
    }

    static divN(a: Readonly<Vec4>, n: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        divN4o(out.buf, a.buf, n, out.i, a.i, out.s, a.s);
        return out;
    }

    static mix(a: Readonly<Vec4>, b: Readonly<Vec4>, t: Readonly<Vec4>, out?: Vec4) {
        !out && (out = new Vec4([]));
        mix4o(out.buf, a.buf, b.buf, t.buf, out.i, a.i, b.i, t.i, out.s, a.s, b.s, t.s);
        return out;
    }

    static mixN(a: Readonly<Vec4>, b: Readonly<Vec4>, t: number, out?: Vec4) {
        !out && (out = new Vec4([]));
        mixN4o(out.buf, a.buf, b.buf, t, out.i, a.i, b.i, out.s, a.s, b.s);
        return out;
    }

    static readonly ZERO = Object.freeze(new Vec4(<number[]>ZERO4));
    static readonly ONE = Object.freeze(new Vec4(<number[]>ONE4));
    static readonly MIN = Object.freeze(new Vec4(<number[]>MIN4));
    static readonly MAX = Object.freeze(new Vec4(<number[]>MAX4));

    buf: Vec;
    i: number;
    s: number;
    x: number;
    y: number;
    z: number;
    w: number;
    [id: number]: number;

    constructor(buf: Vec, index = 0, stride = 1) {
        this.buf = buf;
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

    mix(b: Readonly<Vec4>, c: Readonly<Vec4>) {
        mix4(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(b: Readonly<Vec4>, n: number) {
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
