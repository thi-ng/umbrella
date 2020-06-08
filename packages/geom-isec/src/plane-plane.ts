import { IntersectionType } from "@thi.ng/geom-api";
import { eqDelta, eqDeltaFixed } from "@thi.ng/math";
import { add3, cross3, dot3, mulN3, ReadonlyVec } from "@thi.ng/vectors";
import { NONE } from "./api";

export const intersectPlanePlane = (
    na: ReadonlyVec,
    wa: number,
    nb: ReadonlyVec,
    wb: number
) => {
    const dn = dot3(na, nb);
    if (eqDeltaFixed(dn, 1)) {
        return eqDelta(wa, wb) ? { type: IntersectionType.COINCIDENT } : NONE;
    }
    const det = 1 / (1 - dn * dn);
    const da = (wa - wb * dn) * det;
    const db = (wb - wa * dn) * det;
    return {
        type: IntersectionType.INTERSECT,
        isec: [
            add3(null, mulN3([], na, da), mulN3([], nb, db)),
            cross3([], na, nb),
        ],
    };
};
