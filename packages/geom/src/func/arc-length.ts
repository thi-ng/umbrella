import { IDistance } from "@thi.ng/vectors/api";

export const arcLength = <T extends IDistance<T>>(pts: Readonly<T>[], closed = false) => {
    const num = pts.length;
    if (num < 2) return 0;
    let i = pts[0];
    let j = pts[1];
    let res = 0;
    for (let k = 1; k < num; k++ , i = j, j = pts[k]) {
        res += i.dist(j);
    }
    closed && (res += i.dist(pts[0]));
    return res;
};
