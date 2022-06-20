import { SQRT3 } from "@thi.ng/math";
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

const mag2 = (v: ReadonlyVec) => Math.sqrt(magSq2(v));

export const distCircle2 = (p: ReadonlyVec, radius: number) => mag2(p) - radius;

export const distBox2 = (p: ReadonlyVec, size: ReadonlyVec) => {
    const d = sub2(null, abs2([], p), size);
    return Math.min(Math.max(d[0], d[1]), 0) + mag2(max2(null, d, ZERO2));
};

export const distPolygon2 = (pts: ReadonlyVec[], p: ReadonlyVec) => {
    let d = distSq2(p, pts[0]);
    let s = 1;
    const py = p[1];
    const t1: Vec = [];
    const t2: Vec = [];
    const t3: Vec = [];
    for (let n = pts.length, i = 0, j = n - 1; i < n; j = i, i++) {
        const pi = pts[i];
        const pj = pts[j];
        const e = sub2(t1, pj, pi);
        const w = sub2(t2, p, pi);
        d = Math.min(
            d,
            distSq2(w, mulN2(t3, e, clamp01(dot2(w, e) / magSq2(e))))
        );
        const c = [py >= pi[1], py < pj[1], e[0] * w[1] > e[1] * w[0]];
        if (every3(c) || !some3(c)) s *= -1;
    }
    return s * Math.sqrt(d);
};

export const distSegment2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    p: ReadonlyVec
) => {
    const pa = sub2([], p, a);
    const ba = sub2([], b, a);
    const h = clamp01(dot2(pa, ba) / magSq2(ba));
    return mag2(sub2(null, pa, mulN2(null, ba, h)));
};

export const distPolyline2 = (pts: ReadonlyVec[], p: ReadonlyVec) => {
    let d = Infinity;
    for (let i = 1, n = pts.length; i < n; i++) {
        d = Math.min(d, distSegment2(pts[i - 1], pts[i], p));
    }
    return d;
};

export const distArc2 = (
    p: ReadonlyVec,
    apert: ReadonlyVec,
    ra: number,
    rb: number
) => {
    const q = [Math.abs(p[0]), p[1]];
    return (
        (apert[1] * q[0] > apert[0] * q[1]
            ? mag2(maddN2(q, apert, -ra, q))
            : Math.abs(mag2(q) - ra)) - rb
    );
};

export const distQuadratic2 = (
    pos: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    signed = true
) => {
    const aa = sub2([], b, a);
    const bb = add2(null, maddN2([], b, -2, a), c);
    const cc = mulN2([], aa, 2);
    const dd = sub2([], a, pos);
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
        h = Math.sqrt(h);
        const x = [(h - q) / 2, (-h - q) / 2];
        const uv = mul2(null, sign2([], x), powN2([], abs2([], x), 1 / 3));
        const t = clamp01(uv[0] + uv[1] - kx);
        const qq = maddN2(null, maddN2([], bb, t, cc), t, dd);
        return (
            mag2(qq) *
            (signed ? Math.sign(cross2(maddN2([], bb, 2 * t, cc), qq)) : 1)
        );
    } else {
        const z = Math.sqrt(-p);
        const v = Math.acos(q / (p * z * 2)) / 3;
        const m = Math.cos(v);
        const n = Math.sin(v) * 1.732050808;
        const tx = clamp01((m + m) * z - kx);
        const ty = clamp01((-n - m) * z - kx);
        const qx = maddN2(null, maddN2([], bb, tx, cc), tx, dd);
        const dx = magSq2(qx);
        const qy = maddN2(null, maddN2([], bb, ty, cc), ty, dd);
        const dy = magSq2(qy);
        if (dx < dy) {
            return (
                Math.sqrt(dx) *
                (signed ? Math.sign(cross2(maddN2([], bb, 2 * tx, cc), qx)) : 1)
            );
        } else {
            return (
                Math.sqrt(dy) *
                (signed ? Math.sign(cross2(maddN2([], bb, 2 * ty, cc), qy)) : 1)
            );
        }
    }
};

export const distEllipse2 = (
    [px, py]: ReadonlyVec,
    [abx, aby]: ReadonlyVec
) => {
    px = Math.abs(px);
    py = Math.abs(py);
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
        const s = Math.cos(h);
        const t = Math.sin(h) * SQRT3;
        const rx = Math.sqrt(-c * (s + t + 2) + m2);
        const ry = Math.sqrt(-c * (s - t + 2) + m2);
        co = (ry + Math.sign(l) * rx + Math.abs(g) / (rx * ry) - m) / 2;
    } else {
        const h = 2 * m * n * Math.sqrt(d);
        const s = Math.sign(q + h) * Math.cbrt(Math.abs(q + h));
        const u = Math.sign(q - h) * Math.cbrt(Math.abs(q - h));
        const rx = -s - u - c * 4 + 2 * m2;
        const ry = (s - u) * SQRT3;
        const rm = Math.hypot(rx, ry);
        co = (ry / Math.sqrt(rm - rx) + (2 * g) / rm - m) / 2;
    }
    const rx = abx * co;
    const ry = aby * Math.sqrt(1 - co * co);
    return Math.hypot(rx - px, ry - py) * Math.sign(py - ry);
};
