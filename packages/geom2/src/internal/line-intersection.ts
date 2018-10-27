import { LineIntersection, LineIntersectionType } from "../api";
import { ReadonlyVec, mixNewN } from "@thi.ng/vectors2/api";

export const intersectLines2 = (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec) => {
    const bax = b[0] - a[0];
    const bay = b[1] - a[1];
    const dcx = d[0] - c[0];
    const dcy = d[1] - c[1];
    const acx = a[0] - c[0];
    const acy = a[1] - c[1];
    const det = dcy * bax - dcx * bay;
    let alpha = dcx * acy - dcy * acx;
    let beta = bax * acy - bay * acx;
    if (det === 0) {
        if (alpha === 0 && beta === 0) {
            return { type: LineIntersectionType.COINCIDENT };
        }
        return { type: LineIntersectionType.PARALLEL };
    }
    alpha /= det;
    beta /= det;
    return <LineIntersection>{
        type: (0 <= alpha && alpha <= 1) && (0 <= beta && beta <= 1) ?
            LineIntersectionType.INTERSECT :
            LineIntersectionType.INTERSECT_OUTSIDE,
        isec: mixNewN(a, b, alpha),
        alpha,
        beta,
        det,
    };
};
