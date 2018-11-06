import { LineIntersection, LineIntersectionType } from "../api";
import { ReadonlyVec, mixNewN } from "@thi.ng/vectors2/api";
import { EPS } from "@thi.ng/math/api";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { closestPointSegment } from "./closest-point";

export const intersectLines2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    eps = EPS): LineIntersection => {

    const bax = b[0] - a[0];
    const bay = b[1] - a[1];
    const dcx = d[0] - c[0];
    const dcy = d[1] - c[1];
    const acx = a[0] - c[0];
    const acy = a[1] - c[1];
    const det = dcy * bax - dcx * bay;
    let alpha = dcx * acy - dcy * acx;
    let beta = bax * acy - bay * acx;
    if (eqDelta(det, 0, eps)) {
        if (eqDelta(alpha, 0, eps) && eqDelta(beta, 0, eps)) {
            let isec = closestPointSegment(c, a, b, undefined, true) ||
                closestPointSegment(d, a, b, undefined, true);
            return {
                isec,
                type: isec ?
                    LineIntersectionType.COINCIDENT :
                    LineIntersectionType.COINCIDENT_NO_INTERSECT,
            };
        }
        return { type: LineIntersectionType.PARALLEL };
    }
    alpha /= det;
    beta /= det;
    const ieps = 1 - eps;
    return {
        type: (eps < alpha && alpha < ieps) && (eps < beta && beta < ieps) ?
            LineIntersectionType.INTERSECT :
            LineIntersectionType.INTERSECT_OUTSIDE,
        isec: mixNewN(a, b, alpha),
        alpha,
        beta,
        det,
    };
};
