import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api";
import { dot, maddN, magSq, ReadonlyVec, sub } from "@thi.ng/vectors";
import { NONE } from "./api";

export const intersectRayCircle = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    spos: ReadonlyVec,
    r: number
): IntersectionResult => {
    const delta = sub([], spos, rpos);
    const w = dot(delta, dir);
    let d = r * r + w * w - magSq(delta);
    if (d < 0) return NONE;
    d = Math.sqrt(d);
    const a = w + d;
    const b = w - d;
    const isec =
        a >= 0
            ? b >= 0
                ? a > b
                    ? [maddN(delta, dir, b, rpos), maddN([], dir, a, rpos)]
                    : [maddN(delta, dir, a, rpos), maddN([], dir, b, rpos)]
                : [maddN(delta, dir, a, rpos)]
            : b >= 0
            ? [maddN(delta, dir, b, rpos)]
            : undefined;
    return isec ? { type: IntersectionType.INTERSECT, isec } : NONE;
};
