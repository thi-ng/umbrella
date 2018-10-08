import { Vec2 } from "@thi.ng/vectors/vec2";
import { LineIntersection, LineIntersectionType } from "../api";

export const intersectLines2 = (a: Vec2, b: Vec2, c: Vec2, d: Vec2) => {
    const bax = b.x - a.x;
    const bay = b.y - a.y;
    const dcx = d.x - c.x;
    const dcy = d.y - c.y;
    const acx = a.x - c.x;
    const acy = a.y - c.y;
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
    return <LineIntersection<Vec2>>{
        type: (0 <= alpha && alpha <= 1) && (0 <= beta && beta <= 1) ?
            LineIntersectionType.INTERSECT :
            LineIntersectionType.INTERSECT_OUTSIDE,
        isec: a.mixNewN(b, alpha),
        alpha,
        beta,
        det,
    };
};
