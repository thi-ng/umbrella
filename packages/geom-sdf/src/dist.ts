import { SQRT3 } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { abs2 } from "@thi.ng/vectors/abs";
import { add2 } from "@thi.ng/vectors/add";
import { ReadonlyVec, Vec, ZERO2 } from "@thi.ng/vectors/api";
import { cross2 } from "@thi.ng/vectors/cross";
import { distSq2 } from "@thi.ng/vectors/distsq";
import { dot2 } from "@thi.ng/vectors/dot";
import { every3 } from "@thi.ng/vectors/every";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { magSq2 } from "@thi.ng/vectors/magsq";
import { max2 } from "@thi.ng/vectors/max";
import { mul2 } from "@thi.ng/vectors/mul";
import { mulN2 } from "@thi.ng/vectors/muln";
import { powN2 } from "@thi.ng/vectors/pown";
import { sign2 } from "@thi.ng/vectors/sign";
import { some3 } from "@thi.ng/vectors/some";
import { sub2 } from "@thi.ng/vectors/sub";

const t1: Vec = [];
const t2: Vec = [];
const t3: Vec = [];
const t4: Vec = [];
const t5: Vec = [];

const { abs, cos, min, max, sign, sin, sqrt } = Math;

const mag2 = (v: ReadonlyVec) => sqrt(magSq2(v));

/**
 * Computes signed distance to centered 2D circle of given `radius`.
 *
 * @remarks
 * Ported from code by Inigo Quilez:
 * https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p
 * @param radius
 */
export const distCircle2 = (p: ReadonlyVec, radius: number) => mag2(p) - radius;

/**
 * Computes signed distance to centered 2D box of given `halfSize`.
 *
 * @remarks
 * Ported from code by Inigo Quilez:
 * https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p
 * @param halfSize
 */
export const distBox2 = (p: ReadonlyVec, halfSize: ReadonlyVec) => {
    const d = sub2(null, abs2(t1, p), halfSize);
    return min(max(d[0], d[1]), 0) + mag2(max2(null, d, ZERO2));
};

/**
 * Computes signed distance to the 2D polygon defined by given point array.
 *
 * @remarks
 * Ported from code by Inigo Quilez:
 * https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p
 * @param pts
 */
export const distPolygon2 = (p: ReadonlyVec, pts: ReadonlyVec[]) => {
    let d = distSq2(p, pts[0]);
    let s = 1;
    const py = p[1];
    for (let n = pts.length, i = 0, j = n - 1; i < n; j = i, i++) {
        const pi = pts[i];
        const pj = pts[j];
        const e = sub2(t1, pj, pi);
        const w = sub2(t2, p, pi);
        d = min(d, distSq2(w, mulN2(t3, e, clamp01(dot2(w, e) / magSq2(e)))));
        const c = [py >= pi[1], py < pj[1], e[0] * w[1] > e[1] * w[0]];
        if (every3(c) || !some3(c)) s *= -1;
    }
    return s * sqrt(d);
};

/**
 * Computes distance to 2D line segment defined by endpoints `a` and `b`.
 *
 * @remarks
 * Ported from code by Inigo Quilez:
 * https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p
 * @param a
 * @param b
 */
export const distSegment2 = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec
) => {
    const pa = sub2(t1, p, a);
    const ba = sub2(t2, b, a);
    return mag2(
        sub2(null, pa, mulN2(null, ba, clamp01(dot2(pa, ba) / magSq2(ba))))
    );
};

/**
 * Computes distance to 2D polyline defined by given point array (i.e. the union
 * of pairwise results of {@link distSegment2}).
 *
 * @param p
 * @param pts
 */
export const distPolyline2 = (p: ReadonlyVec, pts: ReadonlyVec[]) => {
    let d = Infinity;
    for (let i = 1, n = pts.length; i < n; i++) {
        d = min(d, distSegment2(p, pts[i - 1], pts[i]));
    }
    return d;
};

/**
 * Computes signed distance to circular arc with given aperture, radius and
 * radius offset (thickness). The aperture is symmetric along the Y-axis and has
 * its origin in +Y.
 *
 * @remarks
 * Ported from code by Inigo Quilez:
 * https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p
 * @param apert - pre-computed vec2 of [sin, cos] of aperture angle
 * @param ra - inner radius
 * @param rb - outer radius offset (thickness)
 */
export const distArc2 = (
    p: ReadonlyVec,
    apert: ReadonlyVec,
    ra: number,
    rb: number
) => {
    t1[0] = abs(p[0]);
    t1[1] = p[1];
    return (
        (apert[1] * t1[0] > apert[0] * t1[1]
            ? mag2(maddN2(t1, apert, -ra, t1))
            : abs(mag2(t1) - ra)) - rb
    );
};

/**
 * Computes (unsigned, by default) distance to given 2D quadratic bezier
 * segment. If `signed` is set to true, points in the curve's interior region
 * will yield negative distances.
 *
 * @remarks
 * Based on code by Inigo Quilez:
 * https://iquilezles.org/articles/distfunctions2d/
 *
 * @param pos
 * @param a
 * @param b
 * @param c
 * @param signed
 */
export const distQuadratic2 = (
    pos: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    signed = false
) => {
    const aa = sub2(t1, b, a);
    const bb = add2(null, maddN2(t2, b, -2, a), c);
    const cc = mulN2(t3, aa, 2);
    const dd = sub2(t4, a, pos);
    const kk = 1 / magSq2(bb);
    const kx = kk * dot2(aa, bb);
    const ky = (kk * (2 * magSq2(aa) + dot2(dd, bb))) / 3;
    const kz = kk * dot2(dd, aa);
    const p = ky - kx * kx;
    const q = kx * (2 * kx * kx - 3 * ky) + kz;
    const p3 = p * p * p;
    const q2 = q * q;
    let h = q2 + 4 * p3;
    if (h >= 0) {
        h = sqrt(h);
        const x = [(h - q) / 2, (-h - q) / 2];
        const uv = mul2(null, sign2(t1, x), powN2(null, abs2(null, x), 1 / 3));
        const t = clamp01(uv[0] + uv[1] - kx);
        const qq = maddN2(null, maddN2(t1, bb, t, cc), t, dd);
        return (
            mag2(qq) *
            (signed ? sign(cross2(maddN2(bb, bb, 2 * t, cc), qq)) : 1)
        );
    } else {
        const z = sqrt(-p);
        const v = Math.acos(q / (p * z * 2)) / 3;
        const m = cos(v);
        const n = sin(v) * SQRT3;
        const tx = clamp01((m + m) * z - kx);
        const ty = clamp01((-n - m) * z - kx);
        const qx = maddN2(null, maddN2(t1, bb, tx, cc), tx, dd);
        const dx = magSq2(qx);
        const qy = maddN2(null, maddN2(t5, bb, ty, cc), ty, dd);
        const dy = magSq2(qy);
        return dx < dy
            ? sqrt(dx) *
                  (signed ? sign(cross2(maddN2(bb, bb, 2 * tx, cc), qx)) : 1)
            : sqrt(dy) *
                  (signed ? sign(cross2(maddN2(bb, bb, 2 * ty, cc), qy)) : 1);
    }
};

/**
 * Computes signed distance to centered 2D ellipse.
 *
 * @remarks
 * Based on code by Inigo Quilez:
 * https://iquilezles.org/articles/distfunctions2d/
 *
 * @param p
 * @param radii
 */
export const distEllipse2 = (
    [px, py]: ReadonlyVec,
    [abx, aby]: ReadonlyVec
) => {
    px = abs(px);
    py = abs(py);
    if (px > py) {
        let t = px;
        px = py;
        py = t;
        t = abx;
        abx = aby;
        aby = t;
    }
    const l = aby * aby - abx * abx;
    const m = (abx * px) / l;
    const m2 = m * m;
    const n = (aby * py) / l;
    const n2 = n * n;
    const c = (m2 + n2 - 1) / 3;
    const c3 = c * c * c;
    const mn2 = m2 * n2;
    const d = c3 + mn2;
    const q = c3 + mn2 * 2;
    const g = m + m * n2;
    let co: number;
    if (d < 0) {
        const h = Math.acos(q / c3) / 3;
        const s = cos(h);
        const t = sin(h) * SQRT3;
        const rx = sqrt(-c * (s + t + 2) + m2);
        const ry = sqrt(-c * (s - t + 2) + m2);
        co = (ry + sign(l) * rx + abs(g) / (rx * ry) - m) / 2;
    } else {
        const h = 2 * m * n * sqrt(d);
        const s = sign(q + h) * Math.cbrt(abs(q + h));
        const u = sign(q - h) * Math.cbrt(abs(q - h));
        const rx = -s - u - c * 4 + 2 * m2;
        const ry = (s - u) * SQRT3;
        const rm = Math.hypot(rx, ry);
        co = (ry / sqrt(rm - rx) + (2 * g) / rm - m) / 2;
    }
    const rx = abx * co;
    const ry = aby * sqrt(1 - co * co);
    return Math.hypot(rx - px, ry - py) * sign(py - ry);
};
