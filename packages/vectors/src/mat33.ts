import { ICopy, IEqualsDelta } from "@thi.ng/api/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { Mat, ReadonlyMat, Vec } from "./api";
import { eqDelta } from "./common";
import { EPS } from "./math";
import {
    dot3,
    set3,
    setS3,
    Vec3
} from "./vec3";
import { setS4 } from "./vec4";

export const get33 = (a: Mat, i = 0) =>
    set33(new (<any>(a.constructor))(9), a, 0, i);

export const set33 = (a: Mat, b: Mat, ia = 0, ib = 0) => (
    a[ia] = b[ib],
    a[ia + 1] = b[ib + 1],
    a[ia + 2] = b[ib + 2],
    a[ia + 3] = b[ib + 3],
    a[ia + 4] = b[ib + 4],
    a[ia + 5] = b[ib + 5],
    a[ia + 6] = b[ib + 6],
    a[ia + 7] = b[ib + 7],
    a[ia + 8] = b[ib + 8],
    a
);

/**
 * ```
 * m00 m10 m20
 * m01 m11 m21
 * m02 m12 m22
 * ```
 *
 * @param m
 * @param m00
 * @param m01
 * @param m02
 * @param m10
 * @param m11
 * @param m12
 * @param m20
 * @param m21
 * @param m22
 * @param i
 */
export const setS33 = (m: Mat, m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number, i = 0) => (
    m[i] = m00,
    m[i + 1] = m01,
    m[i + 2] = m02,
    m[i + 3] = m10,
    m[i + 4] = m11,
    m[i + 5] = m12,
    m[i + 6] = m20,
    m[i + 7] = m21,
    m[i + 8] = m22,
    m
);

export const identity33 = (m?: Mat, i = 0) =>
    setS33(m || [],
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        i
    );

export const rotationX33 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setS33(m || [],
        1, 0, 0,
        0, c, s,
        0, -s, c,
        i
    );
};

export const rotationY33 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setS33(m || [],
        c, 0, -s,
        0, 1, 0,
        s, 0, c,
        i
    );
};

export const rotationZ33 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setS33(m || [],
        c, s, 0,
        -s, c, 0,
        0, 0, 1,
        i
    );
};

export const scaleV33 = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    scaleS33(m, v[iv], v[iv + sv], v[iv + 2 * sv], i);

export const scaleN33 = (m: Mat, n: number, i = 0) =>
    scaleS33(m, n, n, n, i);

export const scaleS33 = (m: Mat, sx: number, sy: number, sz: number, i = 0) =>
    setS33(m || [],
        sx, 0, 0,
        0, sy, 0,
        0, 0, sz,
        i
    );

export const mul33 = (a: Mat, b: ReadonlyMat, ia = 0, ib = 0) =>
    setS33(
        a,
        dot3(a, b, ia, ib, 3),
        dot3(a, b, ia + 1, ib, 3),
        dot3(a, b, ia + 2, ib, 3),
        dot3(a, b, ia, ib + 3, 3),
        dot3(a, b, ia + 1, ib + 3, 3),
        dot3(a, b, ia + 2, ib + 3, 3),
        dot3(a, b, ia, ib + 6, 3),
        dot3(a, b, ia + 1, ib + 6, 3),
        dot3(a, b, ia + 2, ib + 6, 3),
        ia
    );

export const concat33 = (a: Mat, ia: number, ...xs: (ReadonlyMat | [ReadonlyMat, number])[]) =>
    <Mat>xs.reduce(
        (acc: Mat, x) => isArrayLike(x[0]) ?
            mul33(acc, <ReadonlyMat>x[0], ia, <number>x[1]) :
            mul33(acc, <ReadonlyMat>x, ia),
        a
    );

export const mulV33 = (m: ReadonlyMat, v: Vec, im = 0, iv = 0, sv = 1) =>
    setS3(
        v,
        dot3(m, v, im, iv, 3, sv),
        dot3(m, v, im + 1, iv, 3, sv),
        dot3(m, v, im + 2, iv, 3, sv),
        iv, sv
    );

export const det33 = (m: ReadonlyMat, i = 0) => {
    const m00 = m[i];
    const m01 = m[i + 1];
    const m02 = m[i + 2];
    const m10 = m[i + 3];
    const m11 = m[i + 4];
    const m12 = m[i + 5];
    const m20 = m[i + 6];
    const m21 = m[i + 7];
    const m22 = m[i + 8];
    const d01 = m22 * m11 - m12 * m21;
    const d11 = -m22 * m10 + m12 * m20;
    const d21 = m21 * m10 - m11 * m20;
    return m00 * d01 + m01 * d11 + m02 * d21;
};

export const invert33 = (m: Mat, i = 0) => {
    const m00 = m[i];
    const m01 = m[i + 1];
    const m02 = m[i + 2];
    const m10 = m[i + 3];
    const m11 = m[i + 4];
    const m12 = m[i + 5];
    const m20 = m[i + 6];
    const m21 = m[i + 7];
    const m22 = m[i + 8];
    const d01 = m22 * m11 - m12 * m21;
    const d11 = -m22 * m10 + m12 * m20;
    const d21 = m21 * m10 - m11 * m20;
    let det = m00 * d01 + m01 * d11 + m02 * d21;
    if (!det) {
        return;
    }
    det = 1.0 / det;
    return setS33(
        m,
        d01 * det,
        (-m22 * m01 + m02 * m21) * det,
        (m12 * m01 - m02 * m11) * det,
        d11 * det,
        (m22 * m00 - m02 * m20) * det,
        (-m12 * m00 + m02 * m10) * det,
        d21 * det,
        (-m21 * m00 + m01 * m20) * det,
        (m11 * m00 - m01 * m10) * det,
        i
    );
}

export const transpose33 = (m: Mat, i = 0) =>
    setS33(
        m,
        m[i], m[i + 3], m[i + 6],
        m[i + 1], m[i + 4], m[i + 7],
        m[i + 2], m[i + 5], m[i + 8],
        i
    );

export const mat33to44 = (m44: Mat, m33: Mat, ia = 0, ib = 0) => (
    set3(m44, m33, ia, ib),
    set3(m44, m33, ia + 4, ib + 3),
    set3(m44, m33, ia + 8, ib + 6),
    setS3(m44, 0, 0, 0, ia + 12),
    setS4(m44, 0, 0, 0, 1, ia + 3, 4),
    m44
);

export class Mat33 implements
    ICopy<Mat33>,
    IEqualsDelta<Mat33> {

    static rotationX(theta: number) {
        return new Mat33(rotationX33([], theta));
    }

    static rotationY(theta: number) {
        return new Mat33(rotationY33([], theta));
    }

    static rotationZ(theta: number) {
        return new Mat33(rotationZ33([], theta));
    }

    static scale(v: Vec3): Mat33;
    static scale(n: number): Mat33;
    static scale(x: number, y: number, z: number): Mat33;
    static scale(x: any, y = x, z = x) {
        return new Mat33(
            x instanceof Vec3 ?
                scaleV33([], x.buf, 0, x.i) :
                scaleS33([], x, y, z)
        );
    }

    static concat(m: Mat33, ...xs: Readonly<Mat33>[]) {
        concat33.apply(null, [m.buf, m.i, ...<[ReadonlyMat, number][]>xs.map((x) => [x.buf, x.i])]);
        return m;
    }

    buf: Mat;
    i: number;

    constructor(buf: Mat, i = 0) {
        this.buf = buf;
        this.i = i;
    }

    copy() {
        return new Mat33(get33(this.buf, this.i));
    }

    eqDelta(m: Mat33, eps = EPS) {
        return eqDelta(this.buf, m.buf, 9, eps, this.i, m.i);
    }

    identity() {
        identity33(this.buf, this.i);
        return this;
    }

    set(m: Readonly<Mat33>) {
        set33(this.buf, m.buf, this.i, m.i);
        return this;
    }

    setS(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number) {
        setS33(this.buf, m00, m01, m02, m10, m11, m12, m20, m21, m22, this.i);
        return this;
    }

    mul(m: Readonly<Mat33>) {
        mul33(this.buf, m.buf, this.i, m.i);
        return this;
    }

    mulV(v: Vec3) {
        mulV33(this.buf, v.buf, this.i, v.i, v.s);
        return v;
    }

    determinant() {
        return det33(this.buf, this.i);
    }

    invert() {
        invert33(this.buf, this.i);
        return this;
    }

    transpose() {
        transpose33(this.buf, this.i);
        return this;
    }

    toString() {
        const b = this.buf;
        const i = this.i;
        return `${b[i]} ${b[i + 3]} ${b[i + 6]}\n${b[i + 1]} ${b[i + 4]} ${b[i + 7]}\n${b[i + 2]} ${b[i + 5]} ${b[i + 8]}`;
    }
}
