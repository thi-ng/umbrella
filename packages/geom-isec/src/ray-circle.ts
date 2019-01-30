import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api";
import {
    dot,
    maddN,
    magSq,
    ReadonlyVec,
    sub
} from "@thi.ng/vectors";
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
    if (d >= 0) {
        d = Math.sqrt(d);
        const a = w + d;
        const b = w - d;
        const isec = a >= 0 ?
            b >= 0 ?
                a > b ?
                    [maddN(delta, rpos, dir, b), maddN([], rpos, dir, a)] :
                    [maddN(delta, rpos, dir, a), maddN([], rpos, dir, b)] :
                [maddN(delta, rpos, dir, a)] :
            b >= 0 ?
                [maddN(delta, rpos, dir, b)] :
                undefined;
        return isec ?
            { type: IntersectionType.INTERSECT, isec } :
            NONE;
    }
};
