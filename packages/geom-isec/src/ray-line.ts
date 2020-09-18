import { IntersectionType } from "@thi.ng/geom-api";
import { eqDelta } from "@thi.ng/math";
import { maddN, ReadonlyVec } from "@thi.ng/vectors";
import { NONE } from "./api";

export const intersectRayLine = (
    rpos: ReadonlyVec,
    dir: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    minD = 0,
    maxD = Infinity
) => {
    const bax = b[0] - a[0];
    const bay = b[1] - a[1];
    const d = dir[0] * bay - dir[1] * bax;
    if (eqDelta(d, 0)) {
        return NONE;
    }
    const arx = a[0] - rpos[0];
    const ary = a[1] - rpos[1];
    const t = (bay * arx - bax * ary) / d;
    const s = (dir[1] * arx - dir[0] * ary) / d;
    return t >= minD && t <= maxD && s >= 0 && s <= 1
        ? {
              type: IntersectionType.INTERSECT,
              isec: maddN([], dir, t, rpos),
              alpha: t,
          }
        : NONE;
};
