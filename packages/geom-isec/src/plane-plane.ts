import { IntersectionType } from "@thi.ng/geom-api/isec";
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add3 } from "@thi.ng/vectors/add";
import { cross3 } from "@thi.ng/vectors/cross";
import { dot3 } from "@thi.ng/vectors/dot";
import { mulN3 } from "@thi.ng/vectors/muln";
import { NONE } from "./api.js";

export const intersectPlanePlane = (
    na: ReadonlyVec,
    wa: number,
    nb: ReadonlyVec,
    wb: number
) => {
    const dn = dot3(na, nb);
    if (eqDelta(dn, 1)) {
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
