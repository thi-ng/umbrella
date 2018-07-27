import { ICopy } from "@thi.ng/api/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { Mat, ReadonlyMat, Vec } from "./api";
import {
    cross2,
    dot2,
    set2,
    set2s,
    Vec2
} from "./vec2";
import { set3s } from "./vec3";

export const set23 = (a: Mat, b: Mat, ia = 0, ib = 0) => (
    a[ia] = b[ib],
    a[ia + 1] = b[ib + 1],
    a[ia + 2] = b[ib + 2],
    a[ia + 3] = b[ib + 3],
    a[ia + 4] = b[ib + 4],
    a[ia + 5] = b[ib + 5],
    a
);

/**
 * ```
 * m00 m10 m20
 * m01 m11 m21
 * ```
 *
 * @param m
 * @param m00
 * @param m01
 * @param m10
 * @param m11
 * @param m20
 * @param m21
 * @param i
 */
export const set23s = (m: Mat, m00: number, m01: number, m10: number, m11: number, m20: number, m21: number, i = 0) => (
    m[i] = m00,
    m[i + 1] = m01,
    m[i + 2] = m10,
    m[i + 3] = m11,
    m[i + 4] = m20,
    m[i + 5] = m21,
    m
);

export const identity23 = (m?: Mat, i = 0) =>
    set23s(m || [], 1, 0, 0, 1, 0, 0, i);

export const rotation23 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return set23s(m || [], c, s, -s, c, 0, 0, i);
};

export const rotationAroundPoint23 = (m: Mat, p: Vec, theta: number, im = 0, iv = 0, sv = 1) =>
    concat23(
        translation23v(m || [], p, im, iv, sv), im,
        rotation23([], theta),
        translation23s([], -p[iv], -p[iv + sv])
    );

export const scale23v = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    scale23s(m, v[iv], v[iv + sv], i);

export const scale23n = (m: Mat, n: number, i = 0) =>
    scale23s(m, n, n, i);

export const scale23s = (m: Mat, sx: number, sy: number, i = 0) =>
    set23s(m || [], sx, 0, 0, sy, 0, 0, i);

export const scaleWithCenter23 = (m: Mat, p: Vec, sx: number, sy: number, im = 0, iv = 0, sv = 1) =>
    concat23(
        translation23v(m || [], p, im, iv, sv), im,
        scale23s([], sx, sy),
        translation23s([], -p[iv], -p[iv + sv])
    );

export const translation23v = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    translation23s(m, v[iv], v[iv + sv], i);

export const translation23s = (m: Mat, x: number, y: number, i = 0) =>
    set23s(m || [], 1, 0, 0, 1, x, y, i);

export const shearX23 = (m: Mat, x: number, i = 0) =>
    set23s(m || [], 1, 0, x, 1, 0, 0, i);

export const shearY23 = (m: Mat, y: number, i = 0) =>
    set23s(m || [], 1, y, 0, 1, 0, 0, i);

export const skewX23 = (m: Mat, theta: number, i = 0) =>
    shearX23(m, Math.tan(theta), i);

export const skewY23 = (m: Mat, theta: number, i = 0) =>
    shearY23(m, Math.tan(theta), i);

export const mul23 = (a: Mat, b: ReadonlyMat, ia = 0, ib = 0) =>
    set23s(
        a,
        dot2(a, b, ia, ib, 2),
        dot2(a, b, ia + 1, ib, 2),
        dot2(a, b, ia, ib + 2, 2),
        dot2(a, b, ia + 1, ib + 2, 2),
        dot2(a, b, ia, ib + 4, 2) + a[ia + 4],
        dot2(a, b, ia + 1, ib + 4, 2) + a[ia + 5],
        ia
    );

export const concat23 = (a: Mat, ia: number, ...xs: (ReadonlyMat | [ReadonlyMat, number])[]) =>
    <Mat>xs.reduce(
        (acc: Mat, x) => isArrayLike(x[0]) ?
            mul23(acc, <ReadonlyMat>x[0], ia, <number>x[1]) :
            mul23(acc, <ReadonlyMat>x, ia),
        a
    );

export const mulV23 = (m: ReadonlyMat, v: Vec, im = 0, iv = 0, sv = 1) =>
    set2s(
        v,
        dot2(m, v, im, iv, 2, sv) + m[im + 4],
        dot2(m, v, im + 1, iv, 2, sv) + m[im + 5],
        iv, sv
    );

export const det23 = (m: ReadonlyMat, i = 0) =>
    cross2(m, m, i, i + 1, 2, 2);

export const invert23 = (m: Mat, i = 0) => {
    const m00 = m[i];
    const m01 = m[i + 1];
    const m10 = m[i + 2];
    const m11 = m[i + 3];
    const m20 = m[i + 4];
    const m21 = m[i + 5];
    let det = m00 * m11 - m01 * m10;
    if (!det) {
        return;
    }
    det = 1.0 / det;
    return set23s(
        m,
        m11 * det,
        -m01 * det,
        -m10 * det,
        m00 * det,
        (m10 * m21 - m11 * m20) * det,
        (m01 * m20 - m00 * m21) * det,
        i
    );
}

export const mat23to33 = (m33: Mat, m23: Mat, ia = 0, ib = 0) => (
    set2(m33, m23, ia, ib),
    set2(m33, m23, ia + 3, ib + 2),
    set2(m33, m23, ia + 6, ib + 4),
    set3s(m33, 0, 0, 1, ia + 2, 3),
    m33
);

export class Mat23 implements
    ICopy<Mat23> {

    static rotation(theta: number) {
        return new Mat23(rotation23([], theta));
    }

    static rotationAroundPoint(p: Vec2, theta: number) {
        return new Mat23(rotationAroundPoint23([], p.buf, theta, 0, p.i, p.s));
    }

    static scale(v: Vec2): Mat23;
    static scale(n: number): Mat23;
    static scale(x: number, y: number): Mat23;
    static scale(x: any, y = x) {
        return new Mat23(
            x instanceof Vec2 ?
                scale23v([], x.buf, 0, x.i, x.s) :
                scale23s([], x, y)
        );
    }

    static scaleWithCenter(p: Vec2, sx: number, sy = sx) {
        return new Mat23(scaleWithCenter23([], p.buf, sx, sy, p.i, p.s));
    }

    static translation(v: Vec2): Mat23;
    static translation(x: number, y: number): Mat23;
    static translation(x: any, y?: any) {
        return new Mat23(
            x instanceof Vec2 ?
                translation23v([], x.buf, 0, x.i) :
                translation23s([], x, y)
        );
    }

    static skewX(x: number) {
        return new Mat23(skewX23([], x));
    }

    static skewY(y: number) {
        return new Mat23(skewY23([], y));
    }

    static shearX(theta: number) {
        return new Mat23(shearX23([], theta));
    }

    static shearY(theta: number) {
        return new Mat23(shearY23([], theta));
    }

    static concat(m: Mat23, ...xs: Readonly<Mat23>[]) {
        concat23.apply(null, [m.buf, m.i, ...<[ReadonlyMat, number][]>xs.map((x) => [x.buf, x.i])]);
        return m;
    }

    buf: Mat;
    i: number;

    constructor(buf: Mat, i = 0) {
        this.buf = buf;
        this.i = i;
    }

    copy() {
        return new Mat23(set23([], this.buf, 0, this.i));
    }

    identity() {
        identity23(this.buf, this.i);
        return this;
    }

    set(m: Readonly<Mat23>) {
        set23(this.buf, m.buf, this.i, m.i);
        return this;
    }

    setS(m00: number, m01: number, m10: number, m11: number, m20: number, m21: number) {
        set23s(this.buf, m00, m01, m10, m11, m20, m21, this.i);
        return this;
    }

    mul(m: Readonly<Mat23>) {
        mul23(this.buf, m.buf, this.i, m.i);
        return this;
    }

    mulV(v: Vec2) {
        mulV23(this.buf, v.buf, this.i, v.i);
        return v;
    }

    determinant() {
        return det23(this.buf, this.i);
    }

    invert() {
        invert23(this.buf, this.i);
        return this;
    }

    toString() {
        const b = this.buf;
        const i = this.i;
        return `${b[i]} ${b[i + 2]} ${b[i + 4]}\n${b[i + 1]} ${b[i + 3]} ${b[i + 5]}`;
    }
}
