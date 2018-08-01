import { ICopy, IEqualsDelta } from "@thi.ng/api/api";
import { IVec, ReadonlyVec, Vec } from "./api";
import { eqDelta } from "./common";
import {
    clamp1,
    EPS,
    sign1,
    smoothStep1,
    step1
} from "./math";

export const opg1 = (fn: (x: number) => number, a: Vec, num = a.length, i = 0, s = 1) => {
    while (--num >= 0) {
        a[i + num * s] = fn(a[i + num * s]);
    }
    return a;
};

export const opg2 = (fn: (x: number, y: number) => number, a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) => {
    while (--num >= 0) {
        a[ia + num * sa] = fn(a[ia + num * sa], b[ib + num * sb]);
    }
    return a;
};

export const opg3 = (fn: (x: number, y: number, z: number) => number, a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) => {
    while (--num >= 0) {
        a[ia + num * sa] = fn(a[ia + num * sa], b[ib + num * sb], c[ic + num * sc]);
    }
    return a;
};

export const get = (a: ReadonlyVec, num = a.length, i = 0, s = 1) =>
    set(new (<any>(a.constructor))(num), a, 0, i, 1, s);

export const set = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) => {
    while (--num >= 0) {
        a[ia + num * sa] = b[ib + num * sb];
    }
    return a;
};

export const setN = (a: Vec, n: number, num = a.length, ia = 0, sa = 1) => {
    while (--num >= 0) {
        a[ia + num * sa] = n;
    }
    return a;
};

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
    opg1((x) => sign1(x, eps), a, num, i, s);

export const floor = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.floor, a, num, i, s);

export const ceil = (a: Vec, num = a.length, i = 0, s = 1) =>
    opg1(Math.ceil, a, num, i, s);

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
    opg3(clamp1, a, b, c, num, ia, ib, ic, sa, sb, sc);

export const step = (a: Vec, b: ReadonlyVec, num = a.length, ia = 0, ib = 0, sa = 1, sb = 1) =>
    opg2((x, e) => step1(e, x), a, b, num, ia, ib, sa, sb);

export const smoothStep = (a: Vec, b: ReadonlyVec, c: ReadonlyVec, num = a.length, ia = 0, ib = 0, ic = 0, sa = 1, sb = 1, sc = 1) =>
    opg3((x, e1, e2) => smoothStep1(e1, e2, x), a, b, c, num, ia, ib, ic, sa, sb, sc);

export class GVec implements
    ICopy<GVec>,
    IEqualsDelta<GVec>,
    IVec {

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

    copy() {
        return new GVec(get(this.buf, this.n, this.i, this.s), this.n);
    }

    eqDelta(v: GVec, eps = EPS) {
        return this.n === v.n && eqDelta(this.buf, v.buf, this.n, eps, this.i, v.i, this.s, v.s);
    }

    set(v: GVec) {
        set(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    setN(n: number) {
        setN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    add(v: GVec) {
        add(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    sub(v: GVec) {
        sub(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    mul(v: GVec) {
        mul(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    div(v: GVec) {
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
        madd(this.buf, b.buf, c.buf, this.n, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    maddN(b: Readonly<GVec>, n: number) {
        maddN(this.buf, b.buf, n, this.n, this.i, b.i, this.s, b.s);
        return this;
    }

    mix(b: Readonly<GVec>, c: Readonly<GVec>) {
        mix(this.buf, b.buf, c.buf, this.n, this.i, b.i, c.i, this.s, b.s, c.s);
        return this;
    }

    mixN(b: Readonly<GVec>, n: number) {
        mixN(this.buf, b.buf, n, this.n, this.i, b.i, this.s, b.s);
        return this;
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

    dot(v: GVec) {
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

    pow(v: GVec) {
        pow(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    powN(n: number) {
        powN(this.buf, n, this.n, this.i, this.s);
        return this;
    }

    min(v: Readonly<GVec>) {
        min(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    max(v: Readonly<GVec>) {
        max(this.buf, v.buf, this.n, this.i, v.i, this.s, v.s);
        return this;
    }

    clamp(min: Readonly<GVec>, max: Readonly<GVec>) {
        clamp(this.buf, min.buf, max.buf, this.n, this.i, min.i, max.i, this.s, min.s, max.s);
        return this;
    }

    step(e: Readonly<GVec>) {
        step(this.buf, e.buf, this.n, this.i, e.i, this.s, e.s);
        return this;
    }

    smoothStep(e1: Readonly<GVec>, e2: Readonly<GVec>) {
        smoothStep(this.buf, e1.buf, e2.buf, this.n, this.i, e1.i, e2.i, this.s, e1.s, e2.s);
        return this;
    }

    toString() {
        return `[${get(this.buf, this.n, this.i, this.s).join(", ")}]`;
    }
}
