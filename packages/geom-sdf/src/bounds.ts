import { boundingCircle, bounds2 } from "@thi.ng/geom-poly-utils/bounds";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { addmN2 } from "@thi.ng/vectors/addmn";
import { sub2 } from "@thi.ng/vectors/sub";
import { submN2 } from "@thi.ng/vectors/submn";
import type { SDFn } from "./api.js";
import { distBox2 } from "./dist.js";

/**
 * Augments given distance function with a bounding circle pre-check. The circle
 * can be either given as `[centroid, radius]` tuple or can be auto-computed
 * from given array of points. When the returned function is called it first
 * computes the distance to the bounding circle and *only* if that is less then
 * the current (already computed) min distance (default: positive ∞), the
 * original (wrapped) `sdf` function is called. If the distance to the bounding
 * circle is > `minD`, the presumably more costly `sdf` is skipped and `minD`
 * returned.
 *
 * @remarks
 * Currently used for {@link polygon2}, {@link polyline2}, {@link points2}.
 *
 * @param sdf
 * @param pts
 */
export function withBoundingCircle(sdf: SDFn, pts: ReadonlyVec[]): SDFn;
export function withBoundingCircle(
    sdf: SDFn,
    centroid: ReadonlyVec,
    r: number
): SDFn;
export function withBoundingCircle(sdf: SDFn, ...args: any[]): SDFn {
    let [[cx, cy], r] =
        args.length === 1
            ? boundingCircle(args[0])
            : <[ReadonlyVec, number]>args;
    r *= r;
    return (p, minD = Infinity) => {
        if (minD === Infinity) return sdf(p, minD);
        const dx = p[0] - cx;
        const dy = p[1] - cy;
        return dx * dx + dy * dy - r < minD * minD ? sdf(p, minD) : minD;
    };
}

/**
 * Similar to {@link withBoundingCircle}, but using a bounding rect (defined via
 * `min`/`max` or computed from an array of points).
 *
 * @param sdf
 * @param pts
 */
export function withBoundingRect(sdf: SDFn, pts: ReadonlyVec[]): SDFn;
export function withBoundingRect(
    sdf: SDFn,
    min: ReadonlyVec,
    max: ReadonlyVec
): SDFn;
export function withBoundingRect(sdf: SDFn, ...args: any[]): SDFn {
    const [min, max] =
        args.length === 1 ? bounds2(args[0]) : <[ReadonlyVec, ReadonlyVec]>args;
    const centroid = addmN2([], min, max, 0.5);
    const hSize = submN2([], max, min, 0.5);
    const t = [0, 0];
    return (p, minD = Infinity) => {
        if (minD === Infinity) return sdf(p, minD);
        return distBox2(sub2(t, p, centroid), hSize) < minD
            ? sdf(p, minD)
            : minD;
    };
}
