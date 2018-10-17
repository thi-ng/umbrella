import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { atan2Abs } from "@thi.ng/math/angle";
import { EPS } from "@thi.ng/math/api";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { max3id, min3id } from "@thi.ng/math/interval";
import { mixBilinear } from "@thi.ng/math/mix";
import { fract } from "@thi.ng/math/prec";
import { smoothStep, step } from "@thi.ng/math/step";
import {
    IAngleBetween,
    ICrossProduct,
    IPolar,
    IVec,
    IVector,
    MAX4,
    MIN4,
    ONE4,
    ReadonlyVec,
    Vec,
    Vec3Coord,
    X4,
    Y4,
    Z4,
    ZERO4
} from "./api";
import { declareIndices, defcommon } from "./codegen";
import { $iter } from "./common";
import {
    heading2,
    rotate2,
    toCartesian2,
    toPolar2
} from "./vec2";

export const op3 = (fn: (x: number) => number, a: Vec, ia = 0, sa = 1) => (
    a[ia] = fn(a[ia]),
    a[ia + sa] = fn(a[ia + sa]),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa]),
    a
);

export const op30 = (fn: () => number, a: Vec, ia = 0, sa = 1) => (
    a[ia] = fn(),
    a[ia + sa] = fn(),
    a[ia + 2 * sa] = fn(),
    a
);

export const op31 = (fn: (a: number, n: number) => number, a: Vec, n: number, ia = 0, sa = 1) => (
    a[ia] = fn(a[ia], n),
    a[ia + sa] = fn(a[ia + sa], n),
    a[ia + 2 * sa] = fn(a[ia + 2 * sa], n),
    a
);

export const get3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    set3(new (<any>(a.constructor))(3), a, 0, ia, 1, sa);

export const setS3 = (a: Vec, x: number, y: number, z: number, ia = 0, sa = 1) =>
    (a[ia] = x, a[ia + sa] = y, a[ia + 2 * sa] = z, a);

export const randNorm3 = (a: Vec, n = 1, ia = 0, sa = 1) =>
    randMinMax3(a, -n, n, ia, sa);

export const randMinMax3 = (a: Vec, min: number, max: number, ia = 0, sa = 1) => {
    const d = max - min;
    return op30(() => min + d * Math.random(), a, ia, sa);
};

export const jitter3 = (a: Vec, n: number, ia = 0, sa = 1) =>
    op3((x) => x + Math.random() * 2 * n - n, a, ia, sa);

export const swizzle3 = (a: Vec, b: ReadonlyVec, x: number, y: number, z: number, ia = 0, ib = 0, sa = 1, sb = 1) =>
    setS3(a, b[ib + x * sb], b[ib + y * sb], b[ib + z * sb], ia, sa);

export const swap3 = (a: Vec, b: Vec, ia = 0, ib = 0, sa = 1, sb = 1) => {
    let t = a[ia]; a[ia] = b[ib]; b[ib] = t;
    ia += sa; ib += sb;
    t = a[ia]; a[ia] = b[ib]; b[ib] = t;
    ia += sa; ib += sb;
    t = a[ia]; a[ia] = b[ib]; b[ib] = t;
    return a;
};

export const equiv3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    a[ia] === b[ib] &&
    a[ia + sa] === b[ib + sb] &&
    a[ia + 2 * sa] === b[ib + 2 * sb];

export const eqDelta3 = (a: ReadonlyVec, b: ReadonlyVec, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) =>
    eqDelta(a[ia], b[ib], eps) &&
    eqDelta(a[ia + sa], b[ib + sb], eps) &&
    eqDelta(a[ia + 2 * sa], b[ib + 2 * sb], eps);

export const eqDelta3buf = (a: ReadonlyVec, b: ReadonlyVec, num: number, eps = EPS, ia = 0, ib = 0, sca = 1, scb = 1, sea = 3, seb = 3) => {
    while (--num >= 0) {
        if (!eqDelta3(a, b, eps, ia + num * sea, ib + num * seb, sca, scb)) {
            return false;
        }
    }
    return true;
};

export const eqDelta3array = (a: ReadonlyVec[], b: ReadonlyVec[], eps = EPS) => {
    const na = a.length;
    if (b.length !== na) {
        return false;
    }
    for (let i = 0; i < na; i++) {
        if (!eqDelta3(a[i], b[i], eps)) {
            return false;
        }
    }
    return true;
};

export const compare3 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    o1: Vec3Coord, o2: Vec3Coord, o3: Vec3Coord,
    ia = 0, ib = 0, sa = 1, sb = 1): number => {

    const ax = a[ia + o1 * sa];
    const ay = a[ia + o2 * sa];
    const az = a[ia + o3 * sa];
    const bx = b[ib + o1 * sb];
    const by = b[ib + o2 * sb];
    const bz = b[ib + o3 * sb];
    return ax === bx ?
        ay === by ?
            az === bz ?
                0 :
                az < bz ? -3 : 3 :
            ay < by ? -2 : 2 :
        ax < bx ? -1 : 1;
};

export const collate3 = (buf: Vec, src: Iterable<ReadonlyVec>, start = 0, cstride = 1, estride = 3) => {
    for (let v of src) {
        set3(buf, v, start, 0, cstride, 1);
        start += estride;
    }
    return buf;
};

export const [
    set3, setN3,
    add3, sub3, mul3, div3,
    add3o, sub3o, mul3o, div3o,
    addN3, subN3, mulN3, divN3,
    addN3o, subN3o, mulN3o, divN3o,
    madd3, maddN3, msub3, msubN3,
    abs3, sign3, floor3, ceil3, sin3, cos3, sqrt3,
    pow3, min3, max3,
    mix3, mixN3, mix3o, mixN3o
] = defcommon(3);

export const neg3 = (a: Vec, ia = 0, sa = 1) =>
    mulN3(a, -1, ia, sa);

export const fract3 = (a: Vec, ia = 0, sa = 1) =>
    op3(fract, a, ia, sa);

export const powN3 = (a: Vec, n: number, ia = 0, sa = 1) =>
    op31(Math.pow, a, n, ia, sa);

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

export const mixBilinear3 = (
    a: Vec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, u: number, v: number,
    ia = 0, ib = 0, ic = 0, id = 0,
    sa = 1, sb = 1, sc = 1, sd = 1) => (
        a[ia] = mixBilinear(a[ia], b[ib], c[ic], d[id], u, v),
        a[ia + sa] = mixBilinear(a[ia + sa], b[ib + sb], c[ic + sc], d[id + sd], u, v),
        a[ia + 2 * sa] = mixBilinear(a[ia + 2 * sa], b[ib + 2 * sb], c[ic + 2 * sc], d[id + 2 * sd], u, v),
        a
    );

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

export const refract3 = (a: Vec, b: ReadonlyVec, eta: number, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const d = dot3(a, b, ia, ib, sa, sb);
    const k = 1 - eta * eta * (1 - d * d);
    return k < 0 ?
        setN3(a, 0, ia, sa) :
        msubN3(mulN3(a, eta, ia, sa), b, eta * d + Math.sqrt(k), ia, ib, sa, sb);
};

export const rotateX3 = (a: Vec, theta: number, ia = 0, sa = 1) =>
    rotate2(a, theta, ia + sa, sa);

export const rotateY3 = (a: Vec, theta: number, ia = 0, sa = 1) =>
    rotate2(a, theta, ia + 2 * sa, -2 * sa);

export const rotateZ3 = rotate2;

export const rotateAroundAxis3 = (v: Vec, axis: Vec, theta: number, ia = 0, ib = 0, sa = 1, sb = 1) => {
    const x = v[ia];
    const y = v[ia + sa];
    const z = v[ia + 2 * sa];
    const ax = axis[ib];
    const ay = axis[ib + sb];
    const az = axis[ib + 2 * sb];
    const ux = ax * x;
    const uy = ax * y;
    const uz = ax * z;
    const vx = ay * x;
    const vy = ay * y;
    const vz = ay * z;
    const wx = az * x;
    const wy = az * y;
    const wz = az * z;
    const uvw = ux + vy + wz;
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setS3(v,
        (ax * uvw + (x * (ay * ay + az * az) - ax * (vy + wz)) * c + (-wy + vz) * s),
        (ay * uvw + (y * (ax * ax + az * az) - ay * (ux + wz)) * c + (wx - uz) * s),
        (az * uvw + (z * (ax * ax + ay * ay) - az * (ux + vy)) * c + (-vx + uy) * s),
        ia, sa
    );
}

export const headingXY3 = heading2;

export const headingXZ3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    atan2Abs(a[ia + 2 * sa], a[ia]);

export const headingYZ3 = (a: ReadonlyVec, ia = 0, sa = 1) =>
    atan2Abs(a[ia + 2 * sa], a[ia + sa]);

export const angleRatio3 = (a: ReadonlyVec, b: ReadonlyVec, ia = 0, ib = 0, sa = 1, sb = 1) =>
    dot3(a, b, ia, ib, sa, sb) / (mag3(a, ia, sa) * mag3(b, ib, sb));

export const angleBetween3 = (a: ReadonlyVec, b: ReadonlyVec, normalize = false, ia = 0, ib = 0, sa = 1, sb = 1): number =>
    normalize ?
        (a[ia] * b[ib + sb] < a[ia + sa] * b[ib] ? -1 : 1) *
        Math.acos(angleRatio3(a, b, ia, ib, sa, sb)) :
        Math.acos(dot3(a, b, ia, ib, sa, sb));

export const toPolar3 = (a: Vec, ia = 0, sa = 1) => {
    const x = a[ia];
    const y = a[ia + sa];
    const z = a[ia + 2 * sa];
    const r = Math.sqrt(x * x + y * y + z * z);
    return setS3(a, r, Math.asin(z / r), Math.atan2(y, x), ia, sa);
};

export const toCartesian3 = (a: Vec, b: ReadonlyVec = ZERO4, ia = 0, ib = 0, sa = 1, sb = 1) => {
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

export const toCylindrical3 = toPolar2;

export const fromCylindrical3 = (a: Vec, b: ReadonlyVec = ZERO4, ia = 0, ib = 0, sa = 1, sb = 1) => {
    toCartesian2(a, b, ia, ib, sa, sb);
    a[ia + 2 * sa] += b[ib + 2 * sb];
    return a;
};

export const minorAxis3 = (a: Vec, ia = 0, sa = 1) =>
    min3id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]));

export const majorAxis3 = (a: Vec, ia = 0, sa = 1) =>
    max3id(Math.abs(a[ia]), Math.abs(a[ia + sa]), Math.abs(a[ia + 2 * sa]));

export const vec3 = (x = 0, y = 0, z = 0) =>
    new Vec3([x, y, z]);

export const asVec3 = (x: ReadonlyVec) =>
    x instanceof Vec3 ? x : new Vec3([x[0] || 0, x[1] || 0, x[2] || 0]);

export class Vec3 implements
    IVector<Vec3>,
    IAngleBetween<Vec3>,
    ICrossProduct<Vec3, Vec3>,
    IPolar<Vec3> {

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
    static mapBuffer(buf: Vec, n = (buf.length / 3) | 0, start = 0, cstride = 1, estride = 3) {
        const res: Vec3[] = [];
        while (--n >= 0) {
            res.push(new Vec3(buf, start, cstride));
            start += estride;
        }
        return res;
    }

    /**
     * Merges given `src` iterable of `Vec3`s into single array `buf`.
     * Vectors will be arranged according to given component and element
     * strides, starting at `start` index. It's the user's
     * responsibility to ensure the target buffer has sufficient
     * capacity to hold the input vectors. See `Vec3.mapBuffer` for the
     * reverse operation. Returns buffer.
     *
     * @param buf
     * @param src
     * @param start
     * @param cstride
     * @param estride
     */
    static intoBuffer(buf: Vec, src: Iterable<Readonly<Vec3>>, start = 0, cstride = 1, estride = 3) {
        for (let v of src) {
            set3(buf, v.buf, start, v.i, cstride, v.s);
            start += estride;
        }
        return buf;
    }

    static swizzle(v: IVec, x: number, y: number, z: number) {
        return new Vec3([]).swizzle(v, x, y, z);
    }

    static mixBilinear(a: Readonly<Vec3>, b: Readonly<Vec3>, c: Readonly<Vec3>, d: Readonly<Vec3>, u: number, v: number) {
        return new Vec3(
            mixBilinear3(
                get3(a.buf, a.i, a.s), b.buf, c.buf, d.buf, u, v,
                0, b.i, c.i, d.i,
                1, b.s, c.s, d.s
            )
        );
    }

    static orthoNormal3(a: Readonly<Vec3>, b: Readonly<Vec3>, c: Readonly<Vec3>) {
        return new Vec3(orthoNormal3(a.buf, b.buf, c.buf, a.i, b.i, c.i, a.s, b.s, c.s));
    }

    static randNorm(n = 1) {
        return new Vec3(randNorm3([], n));
    }

    static random(min: number, max: number) {
        return new Vec3(randMinMax3([], min, max));
    }

    static comparator(o1: Vec3Coord, o2: Vec3Coord, o3: Vec3Coord) {
        return (a: Readonly<Vec3>, b: Readonly<Vec3>) => a.compare(b, o1, o2, o3);
    }

    static readonly ZERO = Object.freeze(new Vec3(<number[]>ZERO4));
    static readonly ONE = Object.freeze(new Vec3(<number[]>ONE4));
    static readonly MIN = Object.freeze(new Vec3(<number[]>MIN4));
    static readonly MAX = Object.freeze(new Vec3(<number[]>MAX4));
    static readonly X_AXIS = Object.freeze(new Vec3(<number[]>X4));
    static readonly Y_AXIS = Object.freeze(new Vec3(<number[]>Y4));
    static readonly Z_AXIS = Object.freeze(new Vec3(<number[]>Z4));

    buf: Vec;
    i: number;
    s: number;
    x: number;
    y: number;
    z: number;
    [id: number]: number;

    constructor(buf?: Vec, index = 0, stride = 1) {
        this.buf = buf || [0, 0, 0];
        this.i = index;
        this.s = stride;
    }

    [Symbol.iterator]() {
        return $iter(this.buf, 3, this.i, this.s);
    }

    array() {
        return get3(this.buf, this.i, this.s);
    }

    get length() {
        return 3;
    }

    copy() {
        return new Vec3(get3(this.buf, this.i, this.s));
    }

    empty() {
        return new Vec3();
    }

    equiv(v: any) {
        return v instanceof Vec3 ?
            equiv3(this.buf, v.buf, this.i, v.i, this.s, v.s) :
            isArrayLike(v) && v.length === 3 ?
                equiv3(this.buf, <any>v, this.i, 0, this.s, 1) :
                false;
    }

    eqDelta(v: Readonly<Vec3>, eps = EPS) {
        return eqDelta3(this.buf, v.buf, eps, this.i, v.i, this.s, v.s);
    }

    compare(v: Readonly<Vec3>, o1: Vec3Coord = 0, o2: Vec3Coord = 1, o3: Vec3Coord = 2) {
        return compare3(this.buf, v.buf, o1, o2, o3, this.i, v.i, this.s, v.s);
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

    jitter(n = 1) {
        jitter3(this.buf, n, this.i, this.s);
        return this;
    }

    swizzle(v: IVec, x: number, y: number, z: number) {
        swizzle3(this.buf, v.buf, x, y, z, this.i, v.i, this.s, v.s);
        return this;
    }

    swap(v: Vec3) {
        swap3(this.buf, v.buf, this.i, v.i, this.s, v.s);
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

    addNew(b: Readonly<Vec3>, out?: Vec3) {
        !out && (out = new Vec3([]));
        add3o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    subNew(b: Readonly<Vec3>, out?: Vec3) {
        !out && (out = new Vec3([]));
        sub3o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    mulNew(b: Readonly<Vec3>, out?: Vec3) {
        !out && (out = new Vec3([]));
        mul3o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    divNew(b: Readonly<Vec3>, out?: Vec3) {
        !out && (out = new Vec3([]));
        div3o(out.buf, this.buf, b.buf, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
    }

    addNewN(n: number, out?: Vec3) {
        !out && (out = new Vec3([]));
        addN3o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    subNewN(n: number, out?: Vec3) {
        !out && (out = new Vec3([]));
        subN3o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    mulNewN(n: number, out?: Vec3) {
        !out && (out = new Vec3([]));
        mulN3o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    divNewN(n: number, out?: Vec3) {
        !out && (out = new Vec3([]));
        divN3o(out.buf, this.buf, n, out.i, this.i, out.s, this.s);
        return out;
    }

    maddNew(b: Readonly<Vec3>, c: Readonly<Vec3>, out?: Vec3) {
        out = out ? out.set(this) : this.copy();
        madd3(out.buf, b.buf, c.buf, out.i, b.i, c.i, out.s, b.s, c.s);
        return out;
    }

    maddNewN(b: Readonly<Vec3>, n: number, out?: Vec3) {
        out = out ? out.set(this) : this.copy();
        maddN3(out.buf, b.buf, n, out.i, b.i, out.s, b.s);
        return out;
    }

    msubNew(b: Readonly<Vec3>, c: Readonly<Vec3>, out?: Vec3) {
        out = out ? out.set(this) : this.copy();
        msub3(out.buf, b.buf, c.buf, out.i, b.i, c.i, out.s, b.s, c.s);
        return out;
    }

    msubNewN(b: Readonly<Vec3>, n: number, out?: Vec3) {
        out = out ? out.set(this) : this.copy();
        msubN3(out.buf, b.buf, n, out.i, b.i, out.s, b.s);
        return out;
    }

    mixNew(b: Readonly<Vec3>, t: Readonly<Vec3>, out?: Vec3) {
        !out && (out = new Vec3([]));
        mix3o(out.buf, this.buf, b.buf, t.buf, out.i, this.i, b.i, t.i, out.s, this.s, b.s, t.s);
        return out;
    }

    mixNewN(b: Readonly<Vec3>, n = 0.5, out?: Vec3) {
        !out && (out = new Vec3([]));
        mixN3o(out.buf, this.buf, b.buf, n, out.i, this.i, b.i, out.s, this.s, b.s);
        return out;
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

    fract() {
        fract3(this.buf, this.i, this.s);
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

    msub(b: Readonly<Vec3>, c: Readonly<Vec3>) {
        msub3(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    msubN(b: Readonly<Vec3>, n: number) {
        msubN3(this.buf, b.buf, n, this.i, b.i, this.s, b.s);
        return this;
    }

    mix(b: Readonly<Vec3>, c: Readonly<Vec3>) {
        mix3(this.buf, b.buf, c.buf, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(b: Readonly<Vec3>, n = 0.5) {
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

    refract(n: Readonly<Vec3>, eta: number) {
        refract3(this.buf, n.buf, eta, this.i, n.i, this.s, n.s);
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

    rotateAroundAxis(axis: Vec3, theta: number) {
        rotateAroundAxis3(this.buf, axis.buf, theta, this.i, axis.i, this.s, axis.s);
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

    angleBetween(v: Readonly<Vec3>, normalize = false) {
        return angleBetween3(this.buf, v.buf, normalize, this.i, v.i, this.s, v.s);
    }

    toPolar() {
        toPolar3(this.buf, this.i, this.s);
        return this;
    }

    toCartesian(o: Readonly<Vec3> = Vec3.ZERO) {
        toCartesian3(this.buf, o.buf, this.i, o.i, this.s, o.s);
        return this;
    }

    toCylindrical() {
        toCylindrical3(this.buf, this.i, this.s);
        return this;
    }

    fromCylindrical(o: Readonly<Vec3> = Vec3.ZERO) {
        fromCylindrical3(this.buf, o.buf, this.i, o.i, this.s, o.s);
        return this;
    }

    toString() {
        const i = this.i;
        const s = this.s;
        return `[${this.buf[i]}, ${this.buf[i + s]}, ${this.buf[i + 2 * s]}]`;
    }

    toJSON() {
        return this.array();
    }
}

declareIndices(Vec3.prototype, ["x", "y", "z"]);
