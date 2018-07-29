import { ICopy, IEqualsDelta } from "@thi.ng/api/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { Mat, ReadonlyMat, Vec } from "./api";
import { eqDelta } from "./common";
import { Mat33 } from "./mat33";
import { EPS, rad } from "./math";
import {
    cross3,
    dot3,
    get3,
    normalize3,
    set3,
    setS3,
    sub3,
    Vec3
} from "./vec3";
import { dot4, setS4, Vec4 } from "./vec4";

export const get44 = (a: Mat, i = 0) =>
    set44(new (<any>(a.constructor))(16), a, 0, i);

export const set44 = (a: Mat, b: Mat, ia = 0, ib = 0) => {
    for (let i = 0; i < 16; i++) {
        a[ia + i] = b[ib + i];
    }
    return a;
};

/**
 * ```
 * m00 m10 m20 m30
 * m01 m11 m21 m31
 * m02 m12 m22 m32
 * m03 m13 m23 m33
 * ```
 */
export const setS44 = (m: Mat, m00: number, m01: number, m02: number, m03: number,
    m10: number, m11: number, m12: number, m13: number,
    m20: number, m21: number, m22: number, m23: number,
    m30: number, m31: number, m32: number, m33: number,
    i = 0) => (
        m[i] = m00,
        m[i + 1] = m01,
        m[i + 2] = m02,
        m[i + 3] = m03,
        m[i + 4] = m10,
        m[i + 5] = m11,
        m[i + 6] = m12,
        m[i + 7] = m13,
        m[i + 8] = m20,
        m[i + 9] = m21,
        m[i + 10] = m22,
        m[i + 11] = m23,
        m[i + 12] = m30,
        m[i + 13] = m31,
        m[i + 14] = m32,
        m[i + 15] = m33,
        m
    );

export const identity44 = (m?: Mat, i = 0) =>
    setS44(m || [],
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
        i
    );

export const rotationX44 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setS44(m || [],
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
        i
    );
};

export const rotationY44 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setS44(m || [],
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
        i
    );
};

export const rotationZ44 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setS44(m || [],
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
        i
    );
};

export const scaleV44 = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    scaleS44(m, v[iv], v[iv + sv], v[iv + 2 * sv], i);

export const scaleN44 = (m: Mat, n: number, i = 0) =>
    scaleS44(m, n, n, n, i);

export const scaleS44 = (m: Mat, sx: number, sy: number, sz: number, i = 0) =>
    setS44(m || [],
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, sz, 0,
        0, 0, 0, 1,
        i
    );

export const scaleWithCenter44 = (m: Mat, p: Vec, sx: number, sy: number, sz: number, im = 0, iv = 0, sv = 1) =>
    concat44(
        translationV44(m || [], p, im, iv, sv), im,
        scaleS44([], sx, sy, sz),
        translationS44([], -p[iv], -p[iv + sv], -p[iv + 2 * sv])
    );

export const translationV44 = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    translationS44(m, v[iv], v[iv + sv], v[iv + 2 * sv], i);

export const translationS44 = (m: Mat, x: number, y: number, z: number, i = 0) =>
    setS44(m || [],
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1,
        i
    );

export const frustum = (m: Mat, left: number, right: number, bottom: number, top: number, near: number, far: number, i = 0) => {
    const dx = 1 / (right - left);
    const dy = 1 / (top - bottom);
    const dz = 1 / (far - near);
    return setS44(m || [],
        near * 2 * dx, 0, 0, 0,
        0, near * 2 * dy, 0, 0,
        (right + left) * dx, (top + bottom) * dy, -(far + near) * dz, -1,
        0, 0, -(far * near * 2) * dz, 0,
        i
    );
};

export const frustumBounds = (fovy: number, aspect: number, near: number, far: number) => {
    const top = near * Math.tan(rad(fovy) / 2);
    const right = top * aspect;
    return {
        left: -right,
        right,
        bottom: -top,
        top,
        near,
        far
    };
};

export const perspective = (m: Mat, fov: number, aspect: number, near: number, far: number, i = 0) => {
    const f = frustumBounds(fov, aspect, near, far);
    return frustum(m || [], f.left, f.right, f.bottom, f.top, f.near, f.far, i);
};

export const ortho = (m: Mat, left: number, right: number, bottom: number, top: number, near: number, far: number, i = 0) => {
    const dx = 1 / (right - left);
    const dy = 1 / (top - bottom);
    const dz = 1 / (far - near);
    return setS44(m || [],
        2 * dx, 0, 0, 0,
        0, 2 * dy, 0, 0,
        0, 0, -2 * dz, 0,
        -(left + right) * dx, -(top + bottom) * dy, -(far + near) * dz, 1,
        i
    );
};

export const lookAt = (m: Mat, eye: Vec, target: Vec, up: Vec, im = 0, ie = 0, it = 0, iu = 0, se = 1, st = 1, su = 1) => {
    eye = get3(eye, ie, se);
    target = get3(target, it, st);
    up = get3(up, iu, su);
    const z = normalize3(sub3([...eye], target));
    const x = normalize3(cross3(up, z));
    const y = normalize3(cross3([...z], x));
    return setS44(m || [],
        x[0], y[0], z[0], 0,
        x[1], y[1], z[1], 0,
        x[2], y[2], z[2], 0,
        -dot3(eye, x), -dot3(eye, y), -dot3(eye, z), 1,
        im
    );
}

export const mul44 = (a: Mat, b: ReadonlyMat, ia = 0, ib = 0) =>
    setS44(
        a,
        dot4(a, b, ia, ib, 4),
        dot4(a, b, ia + 1, ib, 4),
        dot4(a, b, ia + 2, ib, 4),
        dot4(a, b, ia + 3, ib, 4),
        dot4(a, b, ia, ib + 4, 4),
        dot4(a, b, ia + 1, ib + 4, 4),
        dot4(a, b, ia + 2, ib + 4, 4),
        dot4(a, b, ia + 3, ib + 4, 4),
        dot4(a, b, ia, ib + 8, 4),
        dot4(a, b, ia + 1, ib + 8, 4),
        dot4(a, b, ia + 2, ib + 8, 4),
        dot4(a, b, ia + 3, ib + 8, 4),
        dot4(a, b, ia, ib + 12, 4),
        dot4(a, b, ia + 1, ib + 12, 4),
        dot4(a, b, ia + 2, ib + 12, 4),
        dot4(a, b, ia + 3, ib + 12, 4),
        ia
    );

export const concat44 = (a: Mat, ia: number, ...xs: (ReadonlyMat | [ReadonlyMat, number])[]) =>
    <Mat>xs.reduce(
        (acc: Mat, x) => isArrayLike(x[0]) ?
            mul44(acc, <ReadonlyMat>x[0], ia, <number>x[1]) :
            mul44(acc, <ReadonlyMat>x, ia),
        a
    );

export const mulV344 = (m: ReadonlyMat, v: Vec, im = 0, iv = 0, sv = 1) =>
    setS3(
        v,
        dot3(m, v, im, iv, 4, sv) + m[12],
        dot3(m, v, im + 1, iv, 4, sv) + m[13],
        dot3(m, v, im + 2, iv, 4, sv) + m[14],
        iv, sv
    );

export const mulV44 = (m: ReadonlyMat, v: Vec, im = 0, iv = 0, sv = 1) =>
    setS4(
        v,
        dot4(m, v, im, iv, 4, sv),
        dot4(m, v, im + 1, iv, 4, sv),
        dot4(m, v, im + 2, iv, 4, sv),
        dot4(m, v, im + 3, iv, 4, sv),
        iv, sv
    );

const detCoeffs44 = (m: ReadonlyMat, i = 0) => {
    const m00 = m[i];
    const m01 = m[i + 1];
    const m02 = m[i + 2];
    const m03 = m[i + 3];
    const m10 = m[i + 4];
    const m11 = m[i + 5];
    const m12 = m[i + 6];
    const m13 = m[i + 7];
    const m20 = m[i + 8];
    const m21 = m[i + 9];
    const m22 = m[i + 10];
    const m23 = m[i + 11];
    const m30 = m[i + 12];
    const m31 = m[i + 13];
    const m32 = m[i + 14];
    const m33 = m[i + 15];
    return [
        m00 * m11 - m01 * m10,
        m00 * m12 - m02 * m10,
        m00 * m13 - m03 * m10,
        m01 * m12 - m02 * m11,
        m01 * m13 - m03 * m11,
        m02 * m13 - m03 * m12,
        m20 * m31 - m21 * m30,
        m20 * m32 - m22 * m30,
        m20 * m33 - m23 * m30,
        m21 * m32 - m22 * m31,
        m21 * m33 - m23 * m31,
        m22 * m33 - m23 * m32,
    ];
};

export const det44 = (m: Mat, i = 0) => {
    const d = detCoeffs44(m, i);
    return d[0] * d[11] - d[1] * d[10] + d[2] * d[9] +
        d[3] * d[8] - d[4] * d[7] + d[5] * d[6];
};

export const invert44 = (m: Mat, i = 0) => {
    const m00 = m[i];
    const m01 = m[i + 1];
    const m02 = m[i + 2];
    const m03 = m[i + 3];
    const m10 = m[i + 4];
    const m11 = m[i + 5];
    const m12 = m[i + 6];
    const m13 = m[i + 7];
    const m20 = m[i + 8];
    const m21 = m[i + 9];
    const m22 = m[i + 10];
    const m23 = m[i + 11];
    const m30 = m[i + 12];
    const m31 = m[i + 13];
    const m32 = m[i + 14];
    const m33 = m[i + 15];
    const d = detCoeffs44(m, i);
    const d00 = d[0];
    const d01 = d[1];
    const d02 = d[2];
    const d03 = d[3];
    const d04 = d[4];
    const d05 = d[5];
    const d06 = d[6];
    const d07 = d[7];
    const d08 = d[8];
    const d09 = d[9];
    const d10 = d[10];
    const d11 = d[11];
    let det = (d00 * d11 - d01 * d10 + d02 * d09 + d03 * d08 - d04 * d07 + d05 * d06);
    if (!det) {
        return;
    }
    det = 1.0 / det;
    return setS44(
        m,
        (m11 * d11 - m12 * d10 + m13 * d09) * det,
        (-m01 * d11 + m02 * d10 - m03 * d09) * det,
        (m31 * d05 - m32 * d04 + m33 * d03) * det,
        (-m21 * d05 + m22 * d04 - m23 * d03) * det,
        (-m10 * d11 + m12 * d08 - m13 * d07) * det,
        (m00 * d11 - m02 * d08 + m03 * d07) * det,
        (-m30 * d05 + m32 * d02 - m33 * d01) * det,
        (m20 * d05 - m22 * d02 + m23 * d01) * det,
        (m10 * d10 - m11 * d08 + m13 * d06) * det,
        (-m00 * d10 + m01 * d08 - m03 * d06) * det,
        (m30 * d04 - m31 * d02 + m33 * d00) * det,
        (-m20 * d04 + m21 * d02 - m23 * d00) * det,
        (-m10 * d09 + m11 * d07 - m12 * d06) * det,
        (m00 * d09 - m01 * d07 + m02 * d06) * det,
        (-m30 * d03 + m31 * d01 - m32 * d00) * det,
        (m20 * d03 - m21 * d01 + m22 * d00) * det,
        i
    );
}

export const transpose44 = (m: Mat, i = 0) =>
    setS44(
        m,
        m[i], m[i + 4], m[i + 8], m[i + 12],
        m[i + 1], m[i + 5], m[i + 9], m[i + 13],
        m[i + 2], m[i + 6], m[i + 10], m[i + 14],
        m[i + 3], m[i + 7], m[i + 11], m[i + 15],
        i
    );

export const normal44 = (a: Mat, b: Mat, ia = 0, ib = 0) => {
    const m00 = b[ib];
    const m01 = b[ib + 1];
    const m02 = b[ib + 2];
    const m10 = b[ib + 4];
    const m11 = b[ib + 5];
    const m12 = b[ib + 6];
    const m20 = b[ib + 8];
    const m21 = b[ib + 9];
    const m22 = b[ib + 10];
    const d01 = m22 * m11 - m12 * m21;
    const d11 = -m22 * m10 + m12 * m20;
    const d21 = m21 * m10 - m11 * m20;
    let det = m00 * d01 + m01 * d11 + m02 * d21;
    if (!det) {
        return;
    }
    det = 1.0 / det;
    a[ia] = d01 * det;
    a[ia + 1] = d11 * det;
    a[ia + 2] = d21 * det;
    a[ia + 3] = (-m22 * m01 + m02 * m21) * det;
    a[ia + 4] = (m22 * m00 - m02 * m20) * det;
    a[ia + 5] = (-m21 * m00 + m01 * m20) * det;
    a[ia + 6] = (m12 * m01 - m02 * m11) * det;
    a[ia + 7] = (-m12 * m00 + m02 * m10) * det;
    a[ia + 8] = (m11 * m00 - m01 * m10) * det;
    return a;
};

export const mat44to33 = (m33: Mat, m44: Mat, ia = 0, ib = 0) => (
    set3(m33, m44, ia, ib),
    set3(m33, m44, ia + 3, ib + 4),
    set3(m33, m44, ia + 6, ib + 8),
    m33
);

export class Mat44 implements
    ICopy<Mat44>,
    IEqualsDelta<Mat44> {

    static rotationX(theta: number) {
        return new Mat44(rotationX44([], theta));
    }

    static rotationY(theta: number) {
        return new Mat44(rotationY44([], theta));
    }

    static rotationZ(theta: number) {
        return new Mat44(rotationZ44([], theta));
    }

    static scale(v: Vec3): Mat44;
    static scale(n: number): Mat44;
    static scale(x: number, y: number, z: number): Mat44;
    static scale(x: any, y = x, z = x) {
        return new Mat44(
            x instanceof Vec3 ?
                scaleV44([], x.buf, 0, x.i) :
                scaleS44([], x, y, z)
        );
    }

    static scaleWithCenter(p: Vec3, sx: number, sy = sx, sz = sy) {
        return new Mat44(scaleWithCenter44([], p.buf, sx, sy, sz, p.i, p.s));
    }

    static translation(v: Vec3): Mat44;
    static translation(x: number, y: number, z: number): Mat44;
    static translation(x: any, y?: any, z?: any) {
        return new Mat44(
            x instanceof Vec3 ?
                translationV44([], x.buf, 0, x.i) :
                translationS44([], x, y, z)
        );
    }

    static concat(m: Mat44, ...xs: Readonly<Mat44>[]) {
        concat44.apply(null, [m.buf, m.i, ...<[ReadonlyMat, number][]>xs.map((x) => [x.buf, x.i])]);
        return m;
    }

    buf: Mat;
    i: number;

    constructor(buf: Mat, i = 0) {
        this.buf = buf;
        this.i = i;
    }

    copy() {
        return new Mat44(get44(this.buf, this.i));
    }

    eqDelta(m: Mat44, eps = EPS) {
        return eqDelta(this.buf, m.buf, 16, eps, this.i, m.i);
    }

    identity() {
        identity44(this.buf, this.i);
        return this;
    }

    set(m: Readonly<Mat44>) {
        set44(this.buf, m.buf, this.i, m.i);
        return this;
    }

    setS(m00: number, m01: number, m02: number, m03: number,
        m10: number, m11: number, m12: number, m13: number,
        m20: number, m21: number, m22: number, m23: number,
        m30: number, m31: number, m32: number, m33: number) {
        setS44(this.buf, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33, this.i);
        return this;
    }

    mul(m: Readonly<Mat44>) {
        mul44(this.buf, m.buf, this.i, m.i);
        return this;
    }

    mulV3(v: Vec3) {
        mulV344(this.buf, v.buf, this.i, v.i, v.s);
        return v;
    }

    mulV(v: Vec4) {
        mulV44(this.buf, v.buf, this.i, v.i, v.s);
        return v;
    }

    determinant() {
        return det44(this.buf, this.i);
    }

    invert() {
        invert44(this.buf, this.i);
        return this;
    }

    transpose() {
        transpose44(this.buf, this.i);
        return this;
    }

    normalMat(m?: Mat33) {
        !m && (m = new Mat33([]));
        normal44(m.buf, this.buf, m.i, this.i);
        return m;
    }

    toMat33(m?: Mat33) {
        !m && (m = new Mat33([]));
        mat44to33(m.buf, this.buf, m.i, this.i);
        return m;
    }

    toString() {
        const b = this.buf;
        const i = this.i;
        return `${b[i]} ${b[i + 4]} ${b[i + 8]} ${b[i + 12]}\n${b[i + 1]} ${b[i + 5]} ${b[i + 9]} ${b[i + 13]}\n${b[i + 2]} ${b[i + 6]} ${b[i + 10]} ${b[i + 14]}\n${b[i + 3]} ${b[i + 7]} ${b[i + 11]} ${b[i + 15]}`;
    }
}
