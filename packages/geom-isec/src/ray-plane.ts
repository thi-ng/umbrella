import { IntersectionType } from "@thi.ng/geom-api";
import { EPS, sign } from "@thi.ng/math";
import { copy, dot, maddN, mulN, ReadonlyVec, sub } from "@thi.ng/vectors";
import { NONE } from "./api";

export const intersectRayPlane = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    normal: ReadonlyVec,
    w: number,
    eps = EPS
) => {
    const d = dot(normal, dir);
    const cp = sign(dot(normal, rpos) - w, eps);
    if ((d > eps && cp < 0) || (d < -eps && cp > 0)) {
        const isec = sub(null, mulN([], normal, w), rpos);
        const alpha = dot(normal, isec) / d;
        return {
            type: IntersectionType.INTERSECT,
            isec: maddN(isec, dir, alpha, rpos),
            alpha,
        };
    }
    return cp === 0
        ? {
              type: IntersectionType.COINCIDENT,
              isec: copy(rpos),
          }
        : NONE;
};
