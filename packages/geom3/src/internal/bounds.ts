import { Fn } from "@thi.ng/api";
import { clamp01, mixCubic as _mixCubic } from "@thi.ng/math";
import { max, min, Vec } from "@thi.ng/vectors3";
import {
    max2,
    max3,
    min2,
    min3,
    ReadonlyVec
} from "@thi.ng/vectors3";
import { VecPair } from "../api";
import { AABBLike, IShape } from "../api";
import { unionBounds } from "./union-bounds";

/**
 * Computes the nD bounds of given vectors. `vmin` should be initialized
 * to `+Infinity` and `vmax` to `-Infinity` (e.g. use copies of `MIN*` /
 * `MAX*` constants defined in thi.ng/vectors3).
 *
 * Returns 2-tuple of modified `[vmin, vmax]`.
 *
 * @param pts
 * @param vmin
 * @param vmax
 */
export const boundsRaw =
    (pts: ReadonlyArray<Vec>, vmin: Vec, vmax: Vec): VecPair => {

        for (let i = pts.length; --i >= 0;) {
            const p = pts[i];
            min(null, vmin, p);
            max(null, vmax, p);
        }
        return [vmin, vmax];
    };

/**
 * Computes the total bounds for the given shape collection, which
 * should either contain only 2D or 3D types. No mixed dimensions are
 * allowed! Currently the `bounds` function must be passed in as arg to
 * avoid circular module dependencies.
 *
 * @param shapes
 * @param bounds
 */
export const collBounds =
    (shapes: IShape[], bounds: Fn<IShape, AABBLike>) => {
        let n = shapes.length - 1;
        if (n < 0) return;
        let { pos, size } = bounds(shapes[n]);
        for (; --n >= 0;) {
            const b = bounds(shapes[n]);
            [pos, size] = unionBounds(pos, size, b.pos, b.size);
        }
        return [pos, size];
    };

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
                const x = _mixCubic(pa, pb, pc, pd, t);
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
