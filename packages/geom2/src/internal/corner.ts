import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import { ReadonlyVec } from "@thi.ng/vectors2/api";

export const corner =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const ax = a[0];
        const ay = a[1];
        return (b[0] - ax) * (c[1] - ay) - (c[0] - ax) * (b[1] - ay);
    };

export const classify =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, eps = EPS) =>
        sign(corner(a, b, c), eps);

export const clockwise2 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) =>
        corner(a, b, c) < 0;

export const classifyPointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return sign(
            Math.min(
                s * corner(a, c, p),
                s * corner(b, a, p),
                s * corner(c, b, p)
            )
        );
    };

export const pointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return s * corner(a, c, p) >= 0 &&
            s * corner(b, a, p) >= 0 &&
            s * corner(c, b, p) >= 0;
    };
