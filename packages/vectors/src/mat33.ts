import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { Mat, ReadonlyMat, Vec } from "./api";
import { dot3, set3s } from "./vec3";

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
export const set33s = (m: Mat, m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number, i = 0) => (
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
    set33s(m || [],
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        i
    );

export const rotationX33 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return set33s(m || [],
        1, 0, 0,
        0, c, s,
        0, -s, c,
        i
    );
};

export const rotationY33 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return set33s(m || [],
        c, 0, -s,
        0, 1, 0,
        s, 0, c,
        i
    );
};

export const rotationZ33 = (m: Mat, theta: number, i = 0) => {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return set33s(m || [],
        c, s, 0,
        -s, c, 0,
        0, 0, 1,
        i
    );
};

export const scale33v = (m: Mat, v: Vec, i = 0, iv = 0, sv = 1) =>
    scale33s(m, v[iv], v[iv + sv], v[iv + 2 * sv], i);

export const scale33n = (m: Mat, n: number, i = 0) =>
    scale33s(m, n, n, n, i);

export const scale33s = (m: Mat, sx: number, sy: number, sz: number, i = 0) =>
    set33s(m || [],
        sx, 0, 0,
        0, sy, 0,
        0, 0, sz,
        i
    );

export const mul33 = (a: Mat, b: ReadonlyMat, ia = 0, ib = 0) =>
    set33s(
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
    set3s(
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
    return set33s(
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
    set33s(
        m,
        m[i], m[i + 3], m[i + 6],
        m[i + 1], m[i + 4], m[i + 7],
        m[i + 2], m[i + 5], m[i + 8],
        i
    );
