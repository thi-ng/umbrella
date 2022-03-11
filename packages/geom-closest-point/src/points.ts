import type { FnU2 } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { distSq } from "@thi.ng/vectors/distsq";
import { set } from "@thi.ng/vectors/set";

/**
 * Returns closest point to `p` in given point array, optionally using custom
 * distance function `dist` (default: {@link @thi.ng/vectors#distSq}).
 *
 * @param p - 
 * @param pts - 
 * @param out - 
 * @param dist - 
 */
export const closestPointArray = (
    p: ReadonlyVec,
    pts: Vec[],
    out: Vec = [],
    dist: FnU2<ReadonlyVec, number> = distSq
) => {
    let minD = Infinity;
    let closest: Vec | undefined;
    for (let i = pts.length; i-- > 0; ) {
        const d = dist(pts[i], p);
        if (d < minD) {
            minD = d;
            closest = pts[i];
        }
    }
    return closest ? set(out, closest) : undefined;
};
