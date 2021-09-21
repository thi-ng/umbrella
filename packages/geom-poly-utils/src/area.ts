import type { ReadonlyVec } from "@thi.ng/vectors";
import { cross2 } from "@thi.ng/vectors/cross";
import { signedArea2 } from "@thi.ng/vectors/signed-area";

/**
 * Interprets given points as closed 2D polygon and computes its signed
 * area. If result is negative, the polygon is clockwise.
 *
 * @param pts - points
 */
export const polyArea2 = (pts: ReadonlyVec[]) => {
    const n = pts.length - 1;
    if (n < 2) return 0;
    let res = 0;
    let a = pts[n];
    let b = pts[0];
    for (let i = 0; i <= n; a = b, b = pts[++i]) {
        res += cross2(a, b);
    }
    return res / 2;
};

export const triArea2 = signedArea2;
