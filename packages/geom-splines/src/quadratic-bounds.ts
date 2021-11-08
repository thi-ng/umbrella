import type { FnN3, FnU3 } from "@thi.ng/api";
import { clamp01, inRange } from "@thi.ng/math/interval";
import type { ReadonlyVec, VecPair } from "@thi.ng/vectors";
import { max } from "@thi.ng/vectors/max";
import { min } from "@thi.ng/vectors/min";

const solveQuadratic: FnN3 = (a, b, c) => {
    const t = clamp01((a - b) / (a - 2.0 * b + c));
    const s = 1 - t;
    return s * s * a + 2.0 * s * t * b + t * t * c;
};

const inBounds: FnU3<ReadonlyVec, boolean> = (p, min, max) => {
    for (let i = p.length; i-- > 0; ) {
        if (!inRange(p[i], min[i], max[i])) return false;
    }
    return true;
};

export const quadraticBounds: FnU3<ReadonlyVec, VecPair> = (a, b, c) => {
    const mi = min([], a, c);
    const ma = max([], a, c);
    if (!inBounds(b, mi, ma)) {
        const q = [];
        for (let i = a.length; i-- > 0; ) {
            q[i] = solveQuadratic(a[i], b[i], c[i]);
        }
        min(null, mi, q);
        max(null, ma, q);
    }
    return [mi, ma];
};
