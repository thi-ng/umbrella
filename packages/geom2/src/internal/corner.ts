import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { signedArea2 } from "@thi.ng/vectors3/signed-area";

export const classify =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, eps = EPS) =>
        sign(signedArea2(a, b, c), eps);

export const clockwise2 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) =>
        signedArea2(a, b, c) < 0;

export const classifyPointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return sign(
            Math.min(
                s * signedArea2(a, c, p),
                s * signedArea2(b, a, p),
                s * signedArea2(c, b, p)
            )
        );
    };

export const pointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return s * signedArea2(a, c, p) >= 0 &&
            s * signedArea2(b, a, p) >= 0 &&
            s * signedArea2(c, b, p) >= 0;
    };
