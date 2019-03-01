import { clamp01, inRange } from "@thi.ng/math";
import { max, min, ReadonlyVec, VecPair } from "@thi.ng/vectors";

const solveQuadratic = (a: number, b: number, c: number) => {
    const t = clamp01((a - b) / (a - 2.0 * b + c));
    const s = 1 - t;
    return s * s * a + 2.0 * s * t * b + t * t * c;
};

const inBounds = (p: ReadonlyVec, min: ReadonlyVec, max: ReadonlyVec) => {
    for (let i = p.length; --i >= 0; ) {
        if (!inRange(p[i], min[i], max[i])) return false;
    }
};

export const quadraticBounds = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec
): VecPair => {
    const mi = min([], a, c);
    const ma = max([], a, c);
    if (!inBounds(b, mi, ma)) {
        const q = [];
        for (let i = a.length; --i >= 0; ) {
            q[i] = solveQuadratic(a[i], b[i], c[i]);
        }
        min(null, mi, q);
        max(null, ma, q);
    }
    return [mi, ma];
};
