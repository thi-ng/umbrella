import { ReadonlyVec } from "@thi.ng/vectors2/api";
import { cross2 } from "@thi.ng/vectors2/vec2";

export const polygonArea = (pts: ReadonlyVec[]) => {
    let res = 0;
    for (let n = pts.length - 1, i = n, j = 0; n >= 0; i = j, j++ , n--) {
        res += cross2(pts[i], pts[j]);
    }
    return res / 2;
};
