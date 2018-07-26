import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { Mat, ReadonlyMat, Vec } from "./api";
import { dot4, set4s } from "./vec4";

export const set44 = (a: Mat, b: Mat, ia = 0, ib = 0) => (
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
 * m00 m10 m20 m30
 * m01 m11 m21 m31
 * m02 m12 m22 m32
 * m03 m13 m23 m33
 * ```
 */
export const set44s = (m: Mat, m00: number, m01: number, m02: number, m03: number,
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
    set44s(m || [],
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
        i
    );

export const rotationX44 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return set44s(m || [],
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
    return set44s(m || [],
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
    return set44s(m || [],
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
        i
    );
};

export const scale44v = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    scale44s(m, v[iv], v[iv + sv], v[iv + 2 * sv], i);

export const scale44n = (m: Mat, n: number, i = 0) =>
    scale44s(m, n, n, n, i);

export const scale44s = (m: Mat, sx: number, sy: number, sz: number, i = 0) =>
    set44s(m || [],
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, sz, 0,
        0, 0, 0, 1,
        i
    );

export const scaleWithCenter44 = (m: Mat, sx: number, sy: number, sz: number, p: Vec, im = 0, iv = 0, sv = 1) =>
    concat44(
        translation44v(m || [], p, im, iv, sv), im,
        scale44s([], sx, sy, sz),
        translation44s([], -p[iv], -p[iv + sv], -p[iv + 2 * sv])
    );

export const translation44v = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    translation44s(m, v[iv], v[iv + sv], v[iv + 2 * sv], i);

export const translation44s = (m: Mat, x: number, y: number, z: number, i = 0) =>
    set44s(m || [],
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1,
        i
    );

export const mul44 = (a: Mat, b: ReadonlyMat, ia = 0, ib = 0) =>
    set44s(
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

export const mulV44 = (m: ReadonlyMat, v: Vec, im = 0, iv = 0, sv = 1) =>
    set4s(
        v,
        dot4(m, v, im, iv, 4, sv),
        dot4(m, v, im + 1, iv, 4, sv),
        dot4(m, v, im + 2, iv, 4, sv),
        dot4(m, v, im + 3, iv, 4, sv),
        iv, sv
    );

export const detCoeffs44 = (m: ReadonlyMat, i = 0) => {
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
        return null;
    }
    det = 1.0 / det;
    return set44s(
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
    set44s(
        m,
        m[i], m[i + 4], m[i + 8], m[i + 12],
        m[i + 1], m[i + 5], m[i + 9], m[i + 13],
        m[i + 2], m[i + 6], m[i + 10], m[i + 14],
        m[i + 3], m[i + 7], m[i + 11], m[i + 15],
        i
    );
