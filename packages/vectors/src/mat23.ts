import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { Mat, ReadonlyMat, Vec } from "./api";
import { cross2, dot2, set2s } from "./vec2";

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

export const rotationAroundPoint23 = (m: Mat, theta: number, p: Vec, im = 0, iv = 0, sv = 1) =>
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

export const scaleWithCenter23 = (m: Mat, sx: number, sy: number, p: Vec, im = 0, iv = 0, sv = 1) =>
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
