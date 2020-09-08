import { SQRT3, THIRD } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Based on: https://www.iquilezles.org/www/articles/ellipsedist/ellipsedist.htm
 *
 * @remarks
 * Updated to avoid `NaN` if `px == eo.x` or `py == eo.y`
 *
 * @param p - query point
 * @param eo - ellipse center/origin
 * @param er - ellipse radii
 */
export const closestPointEllipse = (
    [px, py]: ReadonlyVec,
    [ex, ey]: ReadonlyVec,
    [rx, ry]: ReadonlyVec
) => {
    px = Math.abs(px - ex);
    py = Math.abs(py - ey);
    const flip = rx > ry;
    if (flip) {
        let t = px;
        px = py;
        py = t;
        t = rx;
        rx = ry;
        ry = t;
    }
    const l = ry * ry - rx * rx;
    const m = (rx * px) / l;
    const m2 = m * m;
    const n = (ry * py) / l;
    const n2 = n * n;
    const c = (m2 + n2 - 1) / 3;
    const c3 = c * c * c;
    const q = c3 + m2 * n2 * 2;
    const d = c3 + m2 * n2;
    const g = m + m * n2;
    let co: number;
    if (d < 0) {
        const h = Math.acos(q / c3) / 3;
        const s = Math.cos(h);
        const t = Math.sin(h) * SQRT3;
        const a = Math.sqrt(-c * (s + t + 2) + m2);
        const b = Math.sqrt(-c * (s - t + 2) + m2);
        co = (b + Math.sign(l) * a + Math.abs(g) / (a * b) - m) / 2;
    } else {
        const h = 2 * m * n * Math.sqrt(d);
        const s = Math.sign(q + h) * Math.pow(Math.abs(q + h), THIRD);
        const u = Math.sign(q - h) * Math.pow(Math.abs(q - h), THIRD);
        const a = -s - u - 4 * c + 2 * m2;
        const b = (s - u) * SQRT3;
        const rm = Math.sqrt(a * a + b * b);
        const p = Math.max(rm - a, 0);
        co = p > 0 ? (b / p + (2 * g) / rm - m) / 2 : 1;
    }
    const si = Math.sqrt(Math.max(1 - co * co, 0));
    return flip ? [ry * si + ex, rx * co + ey] : [rx * co + ex, ry * si + ey];
};
