import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { cross2 } from "@thi.ng/vectors/cross";

export const centerOfWeight2 = (pts: ReadonlyVec[], out: Vec = []) => {
    const n = pts.length - 1;
    let area = 0;
    let x = 0;
    let y = 0;
    let a = pts[n];
    let b = pts[0];
    for (let i = 0; i <= n; a = b, b = pts[++i]) {
        const z = cross2(a, b);
        area += z;
        x += (a[0] + b[0]) * z;
        y += (a[1] + b[1]) * z;
    }
    area = 1 / (area * 3);
    out[0] = x * area;
    out[1] = y * area;
    return out;
};
