import { IntersectionType } from "@thi.ng/geom-api";
import { maddN, ReadonlyVec } from "@thi.ng/vectors";
import { NONE } from "./api";
import type { Fn4 } from "@thi.ng/api";

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
const rayRect = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    bmin: ReadonlyVec,
    bmax: ReadonlyVec
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
    return <[number, number]>[max(tmin, min(t1, t2)), min(tmax, max(t1, t2))];
};

/**
 * Like to {@link rayRect}, but for 3D (AABB).
 *
 * @param rpos - ray origin
 * @param dir - ray dir
 * @param bmin - box min
 * @param bmax - box max
 */
const rayBox = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    bmin: ReadonlyVec,
    bmax: ReadonlyVec
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
    p = rpos[2];
    d = 1 / dir[2];
    t1 = (bmin[2] - p) * d;
    t2 = (bmax[2] - p) * d;
    tmin = max(tmin, min(t1, t2));
    tmax = min(tmax, max(t1, t2));
    return <[number, number]>[max(tmin, min(t1, t2)), min(tmax, max(t1, t2))];
};

const intersectWith = (
    fn: Fn4<
        ReadonlyVec,
        ReadonlyVec,
        ReadonlyVec,
        ReadonlyVec,
        [number, number]
    >
) => (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    bmin: ReadonlyVec,
    bmax: ReadonlyVec
) => {
    const t = fn(rpos, dir, bmin, bmax);
    const tmin = t[0];
    const tmax = t[1];
    const inside = tmin < 0;
    return tmax > max(tmin, 0)
        ? inside
            ? {
                  type: IntersectionType.INTERSECT,
                  inside,
                  isec: [maddN([], dir, tmax, rpos)],
                  alpha: tmax,
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

export const testRayRect = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    bmin: ReadonlyVec,
    bmax: ReadonlyVec
) => {
    const t = rayRect(rpos, dir, bmin, bmax);
    return t[1] > max(t[0], 0);
};

export const testRayAABB = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    bmin: ReadonlyVec,
    bmax: ReadonlyVec
) => {
    const t = rayBox(rpos, dir, bmin, bmax);
    return t[1] > max(t[0], 0);
};
