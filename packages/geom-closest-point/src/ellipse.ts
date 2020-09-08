import { clamp01, SQRT2_2 } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors";

/**
 * @remarks
 * Based on iterative solution by Luc Maisonobe:
 *
 * - https://www.spaceroots.org/documents/distance/distance-to-ellipse.pdf
 * - https://gist.github.com/JohannesMP/777bdc8e84df6ddfeaa4f0ddb1c7adb3
 *
 * Further optimizations: constant folding, avoiding duplicate calculations in
 * loop
 *
 * @param p - query point
 * @param eo - ellipse center/origin
 * @param er - ellipse radii
 * @param n - number of iterations
 */
export const closestPointEllipse = (
    [px, py]: ReadonlyVec,
    [ex, ey]: ReadonlyVec,
    [rx, ry]: ReadonlyVec,
    n = 3
) => {
    const apx = Math.abs(px - ex);
    const apy = Math.abs(py - ey);
    const ab = (rx * rx - ry * ry) / rx;
    const ba = (ry * ry - rx * rx) / ry;
    let tx = SQRT2_2;
    let ty = tx;
    for (; --n >= 0; ) {
        const _ex = ab * (tx * tx * tx);
        const _ey = ba * (ty * ty * ty);
        const qx = apx - _ex;
        const qy = apy - _ey;
        const q = Math.hypot(rx * tx - _ex, ry * ty - _ey) / Math.hypot(qx, qy);
        tx = clamp01((qx * q + _ex) / rx);
        ty = clamp01((qy * q + _ey) / ry);
        const t = Math.hypot(tx, ty);
        tx /= t;
        ty /= t;
    }
    return [rx * (px < ex ? -tx : tx) + ex, ry * (py < ey ? -ty : ty) + ey];
};
