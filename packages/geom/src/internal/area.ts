import { Vec2 } from "@thi.ng/vectors/vec2";

export const polygonArea = (pts: ReadonlyArray<Vec2>) => {
    let res = 0;
    for (let n = pts.length - 1, i = n, j = 0; n >= 0; i = j, j++ , n--) {
        res += pts[i].cross(pts[j]);
    }
    return res / 2;
};
