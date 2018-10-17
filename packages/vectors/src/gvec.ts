import {
    ICopy,
    IEqualsDelta,
    IEquiv,
    ILength
} from "@thi.ng/api/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { sign as _sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import { clamp as _clamp } from "@thi.ng/math/interval";
import { fract as _fract } from "@thi.ng/math/prec";
import { smoothStep as _smoothStep, step as _step } from "@thi.ng/math/step";
import {
    IDotProduct,
    IMagnitude,
    IMath,
    IMinMax,
    IMix,
    INormalize,
    IVec,
    ReadonlyVec,
    Vec
} from "./api";
import { $iter, eqDelta, equiv } from "./common";


export const opg0 = (fn: () => number, a: Vec, num = a.length, i = 0, s = 1) => {
    i += num * s;
    while (i -= s, --num >= 0) {
        a[i] = fn();
    }
    return a;
};

export const opg1 = (fn: (x: number) => number, a: Vec, num = a.length, i = 0, s = 1) => {
    i += num * s;
    while (i -= s, --num >= 0) {
        a[i] = fn(a[i]);
    }
    return a;
};

export const opg2 = (fn: (x: number, y: number) => number, a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) => {
    ia += num * sa;
    ib += num * sb;
    while (ia -= sa, ib -= sb, --num >= 0) {
        a[ia] = fn(a[ia], b[ib]);
    }
    return a;
};

export const opg3 = (fn: (x: number, y: number, z: number) => number, a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) => {
    ia += num * sa;
    ib += num * sb;
    ic += num * sc;
    while (ia -= sa, ib -= sb, ic -= sc, --num >= 0) {
        a[ia] = fn(a[ia], b[ib], c[ic]);
    }
    return a;
};

export const get = (a: ReadonlyVec, num = a.length, i = 0, s = 1) =>
    set(new (<any>(a.constructor))(num), a, num, 0, i, 1, s);

export const set = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) => {
    ia += num * sa;
    ib += num * sb;
    while (ia -= sa, ib -= sb, --num >= 0) {
        a[ia] = b[ib];
    }
    return a;
};

export const setN = (a: Vec, n: number, num = a.length, ia = 0, sa = 1) => {
    ia += num * sa;
    while (ia -= sa, --num >= 0) {
        a[ia] = n;
    }
    return a;
};

export const randNorm = (a: Vec, n = 1, num = a.length, ia = 0, sa = 1) =>
    randMinMax(a, -n, n, num, ia, sa);

export const randMinMax = (a: Vec, min: number, max: number, num = a.length, ia = 0, sa = 1) => {
    const d = max - min;
    return opg0(() => min + d * Math.random(), a, num, ia, sa);
};

export const jitter = (a: Vec, n: number, num = a.length, ia = 0, sa = 1) =>
    opg1((x) => x + Math.random() * 2 * n - n, a, num, ia, sa);

export const add = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, y) => x + y, a, b, num, ia, ib, sa, sb);

export const sub = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, y) => x - y, a, b, num, ia, ib, sa, sb);

export const mul = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, y) => x * y, a, b, num, ia, ib, sa, sb);

export const div = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, y) => x / y, a, b, num, ia, ib, sa, sb);

export const addN = (a: Vec, n: number, num = a.length, i = 0, s = 1) =>
    opg1((x) => x + n, a, num, i, s);

export const subN = (a: Vec, n: number, num = a.length, i = 0, s = 1) =>
    opg1((x) => x - n, a, num, i, s);

export const mulN = (a: Vec, n: number, num = a.length, i = 0, s = 1) =>
    opg1((x) => x * n, a, num, i, s);

export const divN = (a: Vec, n: number, num = a.length, i = 0, s = 1) =>
    opg1((x) => x / n, a, num, i, s);

export const dot = (a: ReadonlyVec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) => {
    let res = 0;
    while (--num >= 0) {
        res += a[ia + num * sa] * b[ib + num * sb];
    }
    return res;
};

export const madd = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    opg3((x, y, z) => x + y * z, a, b, c, num, ia, ib, ic, sa, sb, sc);

export const maddN = (a: Vec, b: ReadonlyVec, n: number, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, y) => x + y * n, a, b, num, ia, ib, sa, sb);

export const msub = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    opg3((x, y, z) => x - y * z, a, b, c, num, ia, ib, ic, sa, sb, sc);

export const msubN = (a: Vec, b: ReadonlyVec, n: number, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, y) => x + y * n, a, b, num, ia, ib, sa, sb);

export const mix = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    opg3((x, y, z) => x + (y - x) * z, a, b, c, num, ia, ib, ic, sa, sb, sc);

export const mixN = (a: Vec, b: ReadonlyVec, n: number, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, y) => x + (y - x) * n, a, b, num, ia, ib, sa, sb);

export const magSq = (a: ReadonlyVec, num = a.length, i = 0, s = 1) =>
    dot(a, a, num, i, i, s, s);

export const mag = (a: ReadonlyVec, num = a.length, i = 0, s = 1) =>
    Math.sqrt(magSq(a, num, i, s));

export const distSq = (a: ReadonlyVec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) => {
    let res = 0;
    while (--num >= 0) {
        res += Math.pow(a[ia + num * sa] - b[ib + num * sb], 2);
    }
    return res;
};

export const dist = (a: ReadonlyVec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    Math.sqrt(distSq(a, b, num, ia, ib, sa, sb));

export const normalize = (a: Vec, num = a.length, len = 1, i = 0, s = 1) => {
    const m = mag(a, num, i, s);
    m >= EPS && mulN(a, len / m, num, i, s);
    return a;
};

export const neg = (a: Vec, num = a.length, i = 0, s = 1) =>
    mulN(a, -1, num, i, s);

export const abs = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.abs, a, num, i, s);

export const sign = (a: Vec, num = a.length, eps = EPS, i = 0, s = 1) =>
    opg1((x) => _sign(x, eps), a, num, i, s);

export const floor = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.floor, a, num, i, s);

export const ceil = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.ceil, a, num, i, s);

export const fract = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(_fract, a, num, i, s);

export const sin = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.sin, a, num, i, s);

export const cos = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.cos, a, num, i, s);

export const sqrt = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.sqrt, a, num, i, s);

export const pow = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2(Math.pow, a, b, num, ia, ib, sa, sb);

export const powN = (a: Vec, n: number, num = a.length, i = 0, s = 1) =>
    opg1((x) => Math.pow(x, n), a, num, i, s);

export const min = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2(Math.min, a, b, num, ia, ib, sa, sb);

export const max = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2(Math.max, a, b, num, ia, ib, sa, sb);

export const clamp = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    opg3(_clamp, a, b, c, num, ia, ib, ic, sa, sb, sc);

export const step = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, e) => _step(e, x), a, b, num, ia, ib, sa, sb);

export const smoothStep = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    opg3((x, e1, e2) => _smoothStep(e1, e2, x), a, b, c, num, ia, ib, ic, sa, sb, sc);

export const gvec = (...coords: number[]) =>
    new GVec(coords, coords.length);

export class GVec implements
    ICopy<GVec>,
    IDotProduct<GVec>,
    IEqualsDelta<GVec>,
    IEquiv,
    ILength,
    IMagnitude,
    IMath<GVec>,
    IMinMax<GVec>,
    IMix<GVec>,
    INormalize<GVec>,
    Iterable<number>,
    IVec {

    static mapBuffer(buf: Vec, numV: number, length: number, start = 0, cstride = 1, estride = length) {
        const res: GVec[] = [];
        while (--numV >= 0) {
            res.push(new GVec(buf, length, start, cstride));
            start += estride;
        }
        return res;
    }

    static intoBuffer(buf: Vec, src: Iterable<Readonly<GVec>>, start = 0, cstride: number, estride: number) {
        for (let v of src) {
            set(buf, v.buf, v.n, start, v.i, cstride, v.s);
            start += estride;
        }
        return buf;
    }

    static of(size: number, n = 0) {
        return new GVec(setN([], n, size));
    }

    static randNorm(size: number, n = 1) {
        return new GVec(randNorm([], n, size));
    }

    static random(size: number, min: number, max: number) {
        return new GVec(randMinMax([], min, max, size));
    }

    buf: Vec;
    n: number;
    i: number;
    s: number;

    constructor(buf: Vec, n = buf.length, i = 0, s = 1) {
        this.buf = buf;
        this.n = n;
        this.i = i;
        this.s = s;
    }

    [Symbol.iterator]() {
        return $iter(this.buf, this.n, this.i, this.s);
    }

    get length() {
        return this.n;
    }

    getAt(i: number, safe = true) {
        safe && this.ensureIndex(i);
        return this.buf[this.i + i * this.s];
    }

    setAt(i: number, x: number, safe = true) {
        safe && this.ensureIndex(i);
        this.buf[this.i + i * this.s] = x;
    }

    copy() {
        return new GVec(get(this.buf, this.n, this.i, this.s));
    }

    equiv(v: any) {
        return v instanceof GVec && v.n === this.n ?
            equiv(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s) :
            isArrayLike(v) && v.length === this.n ?
                equiv(this.buf, <any>v, this.n, this.i, 0, this.s, 1) :
                false;
    }

    eqDelta(v: Readonly<GVec>, eps = EPS) {
        return this.n === v.n && eqDelta(this.buf, v.buf, this.n, eps, this.i, v.i, this.s, v.s);
    }

    set(v: Readonly<GVec>) {
        this.ensureSize(v);
        set(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    setN(n: number) {
        setN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    jitter(n = 1) {
        jitter(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    add(v: Readonly<GVec>) {
        this.ensureSize(v);
        add(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    sub(v: Readonly<GVec>) {
        this.ensureSize(v);
        sub(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    mul(v: Readonly<GVec>) {
        this.ensureSize(v);
        mul(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    div(v: Readonly<GVec>) {
        this.ensureSize(v);
        div(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    addN(n: number) {
        addN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    subN(n: number) {
        subN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    mulN(n: number) {
        mulN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    divN(n: number) {
        divN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    madd(b: Readonly<GVec>, c: Readonly<GVec>) {
        this.ensureSize(b);
        this.ensureSize(c);
        madd(this.buf, b.buf, c.buf, this.n, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    maddN(v: Readonly<GVec>, n: number) {
        this.ensureSize(v);
        maddN(this.buf, v.buf, n, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    msub(b: Readonly<GVec>, c: Readonly<GVec>) {
        this.ensureSize(b);
        this.ensureSize(c);
        msub(this.buf, b.buf, c.buf, this.n, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    msubN(v: Readonly<GVec>, n: number) {
        this.ensureSize(v);
        msubN(this.buf, v.buf, n, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    mix(b: Readonly<GVec>, c: Readonly<GVec>) {
        this.ensureSize(b);
        this.ensureSize(c);
        mix(this.buf, b.buf, c.buf, this.n, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(v: Readonly<GVec>, n = 0.5) {
        this.ensureSize(v);
        mixN(this.buf, v.buf, n, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    mixNew(b: Readonly<GVec>, c: Readonly<GVec>, out?: GVec) {
        return (out || this.copy()).mix(b, c);
    }

    mixNewN(v: Readonly<GVec>, n = 0.5, out?: GVec) {
        return (out || this.copy()).mixN(v, n);
    }

    addNew(v: Readonly<GVec>, out?: GVec) {
        return (out || this.copy()).add(v);
    }

    subNew(v: Readonly<GVec>, out?: GVec) {
        return (out || this.copy()).sub(v);
    }

    mulNew(v: Readonly<GVec>, out?: GVec) {
        return (out || this.copy()).mul(v);
    }

    divNew(v: Readonly<GVec>, out?: GVec) {
        return (out || this.copy()).div(v);
    }

    addNewN(n: number, out?: GVec) {
        return (out || this.copy()).addN(n);
    }

    subNewN(n: number, out?: GVec) {
        return (out || this.copy()).subN(n);
    }

    mulNewN(n: number, out?: GVec) {
        return (out || this.copy()).mulN(n);
    }

    divNewN(n: number, out?: GVec) {
        return (out || this.copy()).divN(n);
    }

    maddNew(v: Readonly<GVec>, w: Readonly<GVec>, out?: GVec) {
        return (out || this.copy()).madd(v, w);
    }

    maddNewN(v: Readonly<GVec>, n: number, out?: GVec) {
        return (out || this.copy()).maddN(v, n);
    }

    msubNew(v: Readonly<GVec>, w: Readonly<GVec>, out?: GVec) {
        return (out || this.copy()).msub(v, w);
    }

    msubNewN(v: Readonly<GVec>, n: number, out?: GVec) {
        return (out || this.copy()).msubN(v, n);
    }

    magSq() {
        return magSq(this.buf, this.n, this.i, this.s);
    }

    mag() {
        return mag(this.buf, this.n, this.i, this.s);
    }

    normalize(len = 1) {
        normalize(this.buf, this.n, len, this.i, this.s);
        return this;
    }

    dot(v: Readonly<GVec>) {
        this.ensureSize(v);
        return dot(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
    }

    abs() {
        abs(this.buf, this.n, this.i, this.s);
        return this;
    }

    sign() {
        sign(this.buf, this.n, this.i, this.s);
        return this;
    }

    ceil() {
        ceil(this.buf, this.n, this.i, this.s);
        return this;
    }

    fract() {
        fract(this.buf, this.n, this.i, this.s);
        return this;
    }

    floor() {
        floor(this.buf, this.n, this.i, this.s);
        return this;
    }

    sin() {
        sin(this.buf, this.n, this.i, this.s);
        return this;
    }

    cos() {
        cos(this.buf, this.n, this.i, this.s);
        return this;
    }

    sqrt() {
        sqrt(this.buf, this.n, this.i, this.s);
        return this;
    }

    pow(v: Readonly<GVec>) {
        this.ensureSize(v);
        pow(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    powN(n: number) {
        powN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    min(v: Readonly<GVec>) {
        this.ensureSize(v);
        min(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    max(v: Readonly<GVec>) {
        this.ensureSize(v);
        max(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    clamp(min: Readonly<GVec>, max: Readonly<GVec>) {
        this.ensureSize(min);
        this.ensureSize(max);
        clamp(this.buf, min.buf, max.buf, this.n, this.i, min.i, max.i, this.s, min.s, max.s);
        return this;
    }

    step(e: Readonly<GVec>) {
        this.ensureSize(e);
        step(this.buf, e.buf, this.n, this.i, e.i, this.s, e.s);
        return this;
    }

    smoothStep(e1: Readonly<GVec>, e2: Readonly<GVec>) {
        this.ensureSize(e1);
        this.ensureSize(e2);
        smoothStep(this.buf, e1.buf, e2.buf, this.n, this.i, e1.i, e2.i, this.s, e1.s, e2.s);
        return this;
    }

    toString() {
        return `[${get(this.buf, this.n, this.i, this.s).join(", ")}]`;
    }

    toJSON() {
        return get(this.buf, this.n, this.i, this.s);
    }

    protected ensureSize(v: Readonly<GVec>) {
        this.n !== v.n && illegalArgs(`vector size: ${v.n} (needed ${this.n})`);
    }

    protected ensureIndex(i: number) {
        (i < 0 && i >= this.n) && illegalArgs(`index out of bounds: ${i}`);
    }
}
