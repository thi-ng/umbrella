import { IntersectionResult, IntersectionType } from "@thi.ng/geom-api";
import { eqDeltaFixed } from "@thi.ng/math";
import {
    add,
    distSq,
    maddN,
    mag,
    mulN,
    perpendicularCCW,
    ReadonlyVec,
    sub,
} from "@thi.ng/vectors";
import { NONE } from "./api";

export const intersectCircleCircle = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    ar: number,
    br: number
): IntersectionResult => {
    const delta = sub([], b, a);
    const d = mag(delta);
    if (eqDeltaFixed(d, 0)) {
        return { type: IntersectionType.COINCIDENT };
    }
    if (d <= ar + br && d >= Math.abs(ar - br)) {
        ar *= ar;
        const alpha = (ar - br * br + d * d) / (2 * d);
        const h = Math.sqrt(ar - alpha * alpha);
        const p = maddN([], delta, alpha / d, a);
        const t = mulN(null, perpendicularCCW(null, delta), h / d);
        return {
            type: IntersectionType.INTERSECT,
            isec: [add([], p, t), sub([], p, t)],
        };
    }
    return NONE;
};

export const testCircleCircle = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    ar: number,
    br: number
) => distSq(a, b) <= Math.pow(ar + br, 2);
