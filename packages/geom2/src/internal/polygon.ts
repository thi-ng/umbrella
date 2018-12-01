import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { cross2 } from "@thi.ng/vectors3/cross";

export const polygonArea =
    (pts: ReadonlyVec[]) => {
        let res = 0;
        for (let n = pts.length - 1, i = n, j = 0; n >= 0; i = j, j++ , n--) {
            res += cross2(pts[i], pts[j]);
        }
        return res / 2;
    };

export const pointInside =
    (a: ReadonlyVec, b: ReadonlyVec, x: number, y: number, inside: number) => {
        if (((a[1] < y && b[1] >= y) ||
            (b[1] < y && a[1] >= y)) &&
            (a[0] <= x || b[0] <= x)) {
            inside ^= (((a[0] + (y - a[1]) / (b[1] - a[1]) * (b[0] - a[0])) < x) ? 1 : 0);
        }
        return inside;
    };
