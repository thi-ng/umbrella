import { ReadonlyVec, distSq, mag, sub, maddN, perpendicularLeft2, mulN, add } from "@thi.ng/vectors3";
import { eqDeltaFixed } from "@thi.ng/math";
import { IntersectionType } from "../api";

export const intersectCircleCircle =
    (a: ReadonlyVec, b: ReadonlyVec, ar: number, br: number) => {
        const delta = sub([], b, a);
        const d = mag(delta);
        if (eqDeltaFixed(d, 0)) {
            return { type: IntersectionType.COINCIDENT };
        }
        if (d <= ar + br && d >= Math.abs(ar - br)) {
            ar *= ar;
            const alpha = (ar - br * br + d * d) / (2 * d);
            const h = Math.sqrt(ar - alpha * alpha);
            const p = maddN([], a, delta, alpha / d);
            const t = mulN(null, perpendicularLeft2(null, delta), h / d);
            return {
                type: IntersectionType.INTERSECT,
                isec: [add([], p, t), sub([], p, t)]
            };
        }
        return { type: IntersectionType.NONE };
    };

export const testCircleCircle =
    (a: ReadonlyVec, b: ReadonlyVec, ar: number, br: number) =>
        distSq(a, b) <= Math.pow(ar + br, 2);
