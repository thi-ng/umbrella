import { EPS } from "@thi.ng/math";
import { eqDelta, ReadonlyVec } from "@thi.ng/vectors";

export const pointInArray =
    (points: ReadonlyVec[], p: ReadonlyVec, eps = EPS) => {
        for (let i = points.length; --i >= 0;) {
            if (eqDelta(p, points[i], eps)) {
                return true;
            }
        }
        return false;
    };
