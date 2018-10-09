import { IVector } from "@thi.ng/vectors/api";

export const arcLength = <T extends IVector<T>>(pts: ReadonlyArray<T>, closed = false) => {
    const num = pts.length;
    if (num < 2) return 0;
    let res = 0;
    let p = pts[0];
    let q = pts[1];
    for (let i = 1; i < num; i++ , p = q, q = pts[i]) {
        res += p.dist(q);
    }
    closed && (res += p.dist(pts[0]));
    return res;
};
