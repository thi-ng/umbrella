import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import {
    dot,
    magSq,
    mulNewN,
    ReadonlyVec
} from "@thi.ng/vectors2/api";

export const signedArea =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const ax = a[0];
        const ay = a[1];
        return (b[0] - ax) * (c[1] - ay) - (c[0] - ax) * (b[1] - ay);
    };

export const classify =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, eps = EPS) =>
        sign(signedArea(a, b, c), eps);

export const clockwise2 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) =>
        signedArea(a, b, c) < 0;

export const classifyPointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return sign(
            Math.min(
                s * signedArea(a, c, p),
                s * signedArea(b, a, p),
                s * signedArea(c, b, p)
            )
        );
    };

export const pointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return s * signedArea(a, c, p) >= 0 &&
            s * signedArea(b, a, p) >= 0 &&
            s * signedArea(c, b, p) >= 0;
    };

/**
 * Returns vector projection of `v` onto `dir`.
 *
 * https://en.wikipedia.org/wiki/Vector_projection
 *
 * @param dir
 * @param v
 */
export const project =
    (dir: ReadonlyVec, v: ReadonlyVec) =>
        mulNewN(dir, dot(v, dir) / magSq(dir));
