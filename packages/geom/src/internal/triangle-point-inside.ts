import { EPS, sign } from "@thi.ng/math";
import { ReadonlyVec, signedArea2 } from "@thi.ng/vectors";
import { clockwise2 } from "./clockwise";

export const classifyPointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, eps = EPS) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return sign(
            Math.min(
                s * signedArea2(a, c, p),
                s * signedArea2(b, a, p),
                s * signedArea2(c, b, p)
            ),
            eps
        );
    };

export const pointInTriangle2 =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
        const s = clockwise2(a, b, c) ? 1 : -1;
        return s * signedArea2(a, c, p) >= 0 &&
            s * signedArea2(b, a, p) >= 0 &&
            s * signedArea2(c, b, p) >= 0;
    };
