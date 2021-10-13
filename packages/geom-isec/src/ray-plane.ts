import { IntersectionType } from "@thi.ng/geom-api/isec";
import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { copy } from "@thi.ng/vectors/copy";
import { dot } from "@thi.ng/vectors/dot";
import { maddN } from "@thi.ng/vectors/maddn";
import { mulN } from "@thi.ng/vectors/muln";
import { sub } from "@thi.ng/vectors/sub";
import { NONE } from "./api.js";

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
