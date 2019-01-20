import { cross2, ReadonlyVec } from "@thi.ng/vectors";

/**
 * Interprets given points as closed 2D polygon and computes signed
 * area.
 *
 * @param pts
 */
export const polyArea =
    (pts: ReadonlyVec[]) => {
        let res = 0;
        for (let n = pts.length - 1, i = n, j = 0; n >= 0; i = j, j++ , n--) {
            res += cross2(pts[i], pts[j]);
        }
        return res / 2;
    };
