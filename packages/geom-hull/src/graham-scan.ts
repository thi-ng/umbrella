import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

const atan2 = Math.atan2;

/**
 * Returns array of points defining the 2D Convex Hull of `pts` using
 * the Graham Scan method.
 *
 * - {@link https://en.wikipedia.org/wiki/Graham_scan}
 * - {@link http://c.thi.ng/}
 *
 * @param pts - input points
 * @param eps - tolerance for colinear neighbor detection
 */
export const grahamScan2 = (pts: ReadonlyVec[], eps = EPS) => {
    const num = pts.length;
    if (num <= 3) return pts.slice();
    let h = 1;
    let i;
    let p;
    let q;
    let r;
    let rx;
    let ry;
    // find min YX index
    const min = findMin(pts);
    [rx, ry] = pts[min];
    const sorted: { p: ReadonlyVec; t: number }[] = [];
    // compute & sort by polar ordering relative to min
    for (i = 0; i < num; i++) {
        p = pts[i];
        sorted[i] = { p, t: atan2(p[1] - ry, p[0] - rx) };
    }
    sorted.sort((a, b) => (a.t !== b.t ? a.t - b.t : a.p[0] - b.p[0]));
    const hull: Vec[] = [sorted[0].p];
    for (i = 1; i < num; i++) {
        p = hull[h - 2];
        q = hull[h - 1];
        r = sorted[i].p;
        rx = r[0];
        ry = r[1];
        while (
            (h > 1 && notCCW(p[0], p[1], q[0], q[1], rx, ry, eps)) ||
            (h === 1 && q[0] === rx && q[1] === ry)
        ) {
            h--;
            q = p;
            p = hull[h - 2];
        }
        hull[h++] = r;
    }
    hull.length = h;
    return hull;
};

/**
 * Returns true, if triangle defined by ABC is NOT counter clockwise,
 * i.e. clockwise or colinear.
 *
 * {@link @thi.ng/vectors#signedArea2}
 *
 * @param ax -
 * @param ay -
 * @param bx -
 * @param by -
 * @param cx -
 * @param cy -
 */
const notCCW = (
    ax: number,
    ay: number,
    bx: number,
    by: number,
    cx: number,
    cy: number,
    eps: number
) => (by - ay) * (cx - ax) >= (bx - ax) * (cy - ay) - eps;

/**
 * Returns index of point with lowest YX coords.
 *
 * @param pts -
 */
const findMin = (pts: ReadonlyVec[]) => {
    let n = pts.length - 1;
    let minID = n;
    let [minX, minY] = pts[n];
    let p, y;
    for (; --n >= 0; ) {
        p = pts[n];
        y = p[1];
        if (y < minY || (y === minY && p[0] < minX)) {
            minX = p[0];
            minY = y;
            minID = n;
        }
    }
    return minID;
};
