import { distSq, ReadonlyVec, set, Vec } from "@thi.ng/vectors";

export const closestPointArray = (
    p: ReadonlyVec,
    pts: Vec[],
    out: Vec = []
) => {
    let minD = Infinity;
    let closest: Vec | undefined;
    for (let i = pts.length; --i >= 0; ) {
        const d = distSq(pts[i], p);
        if (d < minD) {
            minD = d;
            closest = pts[i];
        }
    }
    return closest ? set(out, closest) : undefined;
};
