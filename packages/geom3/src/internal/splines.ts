import { clamp01, mixCubic } from "@thi.ng/math";
import {
    max2,
    max3,
    min2,
    min3,
    mixN,
    ReadonlyVec,
    set
} from "@thi.ng/vectors3";
import { VecPair } from "../api";

const cubicAxisBounds =
    (pa: number, pb: number, pc: number, pd: number) => {
        let a = 3 * pd - 9 * pc + 9 * pb - 3 * pa;
        let b = 6 * pa - 12 * pb + 6 * pc;
        let c = 3 * pb - 3 * pa;
        let disc = b * b - 4 * a * c;
        let l = pa;
        let h = pa;

        const bounds = (t: number) => {
            if (t > 0 && t < 1) {
                const x = mixCubic(pa, pb, pc, pd, t);
                x < l && (l = x);
                x > h && (h = x);
            }
        };

        pd < l && (l = pd);
        pd > h && (h = pd);
        if (disc >= 0) {
            disc = Math.sqrt(disc);
            a *= 2;
            bounds((-b + disc) / a);
            bounds((-b - disc) / a);
        }
        return [l, h];
    };

export const cubicBounds2 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec): VecPair => {
        const x = cubicAxisBounds(a[0], b[0], c[0], d[0]);
        const y = cubicAxisBounds(a[1], b[1], c[1], d[1]);
        return [[x[0], y[0]], [x[1], y[1]]];
    };

export const cubicBounds3 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec): VecPair => {
        const x = cubicAxisBounds(a[0], b[0], c[0], d[0]);
        const y = cubicAxisBounds(a[1], b[1], c[1], d[1]);
        const z = cubicAxisBounds(a[2], b[2], c[2], d[2]);
        return [[x[0], y[0], z[0]], [x[1], y[1], z[1]]];
    };

const solveQuadratic =
    (a: number, b: number, c: number) => {
        const t = clamp01((a - b) / (a - 2.0 * b + c));
        const s = 1 - t;
        return s * s * a + 2.0 * s * t * b + t * t * c;
    };

export const quadraticBounds2 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec): VecPair => {
        const mi = min2([], a, c);
        const ma = max2([], a, c);
        if (b[0] < mi[0] || b[0] > ma[0] || b[1] < mi[1] || b[1] > ma[1]) {
            const q = [
                solveQuadratic(a[0], b[0], c[0]),
                solveQuadratic(a[1], b[1], c[1]),
            ];
            min2(null, mi, q);
            max2(null, ma, q);
        }
        return [mi, ma];
    };

export const quadraticBounds3 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec): VecPair => {
        const mi = min3([], a, c);
        const ma = max3([], a, c);
        if (b[0] < mi[0] || b[0] > ma[0] ||
            b[1] < mi[1] || b[1] > ma[1] ||
            b[2] < mi[2] || b[2] > ma[2]) {
            const q = [
                solveQuadratic(a[0], b[0], c[0]),
                solveQuadratic(a[1], b[1], c[1]),
                solveQuadratic(a[2], b[2], c[2]),
            ];
            min3(null, mi, q);
            max3(null, ma, q);
        }
        return [mi, ma];
    };

export const splitCubic =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, t: number) => {
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : d;
            const c1 = [set([], p), set([], p), set([], p), set([], p)];
            const c2 = [set([], a), set([], b), set([], c), set([], d)];
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixN([], a, b, t);
        const bc = mixN([], b, c, t);
        const cd = mixN([], c, d, t);
        const abc = mixN([], ab, bc, t);
        const bcd = mixN([], bc, cd, t);
        const p = mixN([], abc, bcd, t);
        return [
            [set([], a), ab, abc, set([], p)],
            [p, bcd, cd, set([], d)]
        ];
    };

export const splitQuadratic =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, t: number) => {
        if (t <= 0 || t >= 1) {
            const p = t <= 0 ? a : c;
            const c1 = [set([], p), set([], p), set([], p)];
            const c2 = [set([], a), set([], b), set([], c)];
            return t <= 0 ? [c1, c2] : [c2, c1];
        }
        const ab = mixN([], a, b, t);
        const bc = mixN([], b, c, t);
        const p = mixN([], ab, bc, t);
        return [[set([], a), ab, p], [p, bc, set([], c)]];
    };
