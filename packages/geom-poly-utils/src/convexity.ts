import { Convexity } from "@thi.ng/geom-api";
import { EPS } from "@thi.ng/math";
import { corner2, ReadonlyVec } from "@thi.ng/vectors";

export const convexity = (pts: ReadonlyVec[], eps = EPS) => {
    let n = pts.length;
    if (n < 3) {
        return n < 2 ? Convexity.ILLEGAL : Convexity.COLINEAR;
    }
    let type = 0;
    let a = pts[n - 2];
    let b = pts[n - 1];
    let c = pts[0];
    for (let i = 0; i < n; a = b, b = c, c = pts[++i]) {
        const t = corner2(a, b, c, eps);
        if (t < 0) {
            type |= 1;
        } else if (t > 0) {
            type |= 2;
        }
        if (type === 3) {
            return Convexity.CONCAVE;
        }
    }
    return type > 0 ? Convexity.CONVEX : Convexity.COLINEAR;
};
