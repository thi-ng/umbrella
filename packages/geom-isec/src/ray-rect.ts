import type { FnU4 } from "@thi.ng/api";
import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api";
import { maddN, ReadonlyVec } from "@thi.ng/vectors";
import { NONE } from "./api";

const min = Math.min;
const max = Math.max;

/**
 * Based on:
 * {@link https://tavianator.com/fast-branchless-raybounding-box-intersections/}
 *
 * @param rpos - ray origin
 * @param dir - ray dir
 * @param bmin - rect min
 * @param bmax - rect max
 */
const rayRect: FnU4<ReadonlyVec, [number, number]> = (
    rpos,
    dir,
    bmin,
    bmax
) => {
    let p = rpos[0];
    let d = 1 / dir[0];
    let t1 = (bmin[0] - p) * d;
    let t2 = (bmax[0] - p) * d;
    let tmin = min(t1, t2);
    let tmax = max(t1, t2);
    p = rpos[1];
    d = 1 / dir[1];
    t1 = (bmin[1] - p) * d;
    t2 = (bmax[1] - p) * d;
    return [max(tmin, min(t1, t2)), min(tmax, max(t1, t2))];
};

/**
 * Like to {@link rayRect}, but for 3D (AABB).
 *
 * @param rpos - ray origin
 * @param dir - ray dir
 * @param bmin - box min
 * @param bmax - box max
 */
const rayBox: FnU4<ReadonlyVec, [number, number]> = (rpos, dir, bmin, bmax) => {
    let p = rpos[0];
    let d = 1 / dir[0];
    let t1 = (bmin[0] - p) * d;
    let t2 = (bmax[0] - p) * d;
    let tmin = min(t1, t2);
    let tmax = max(t1, t2);
    p = rpos[1];
    d = 1 / dir[1];
    t1 = (bmin[1] - p) * d;
    t2 = (bmax[1] - p) * d;
    tmin = max(tmin, min(t1, t2));
    tmax = min(tmax, max(t1, t2));
    p = rpos[2];
    d = 1 / dir[2];
    t1 = (bmin[2] - p) * d;
    t2 = (bmax[2] - p) * d;
    return [max(tmin, min(t1, t2)), min(tmax, max(t1, t2))];
};

const intersectWith = (
    fn: FnU4<ReadonlyVec, [number, number]>
): FnU4<ReadonlyVec, IntersectionResult> => (rpos, dir, bmin, bmax) => {
    const t = fn(rpos, dir, bmin, bmax);
    const tmin = t[0];
    const tmax = t[1];
    const inside = tmin < 0;
    return tmax > max(tmin, 0)
        ? inside
            ? {
                  type: IntersectionType.INTERSECT,
                  isec: [maddN([], dir, tmax, rpos)],
                  alpha: tmax,
                  inside,
              }
            : {
                  type: IntersectionType.INTERSECT,
                  isec: [
                      maddN([], dir, tmin, rpos),
                      maddN([], dir, tmax, rpos),
                  ],
                  alpha: tmin,
                  beta: tmax,
              }
        : NONE;
};

export const intersectRayRect = intersectWith(rayRect);

export const intersectRayAABB = intersectWith(rayBox);

export const testRayRect: FnU4<ReadonlyVec, boolean> = (
    rpos,
    dir,
    bmin,
    bmax
) => {
    const t = rayRect(rpos, dir, bmin, bmax);
    return t[1] > max(t[0], 0);
};

export const testRayAABB: FnU4<ReadonlyVec, boolean> = (
    rpos,
    dir,
    bmin,
    bmax
) => {
    const t = rayBox(rpos, dir, bmin, bmax);
    return t[1] > max(t[0], 0);
};
