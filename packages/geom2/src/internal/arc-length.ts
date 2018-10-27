import { dist, ReadonlyVec } from "@thi.ng/vectors2/api";

export const arcLength = (pts: ReadonlyVec[], closed = false) => {
    const num = pts.length;
    if (num < 2) return 0;
    let res = 0;
    let p = pts[0];
    let q = pts[1];
    for (let i = 1; i < num; i++ , p = q, q = pts[i]) {
        res += dist(p, q);
    }
    closed && (res += dist(p, pts[0]));
    return res;
};
