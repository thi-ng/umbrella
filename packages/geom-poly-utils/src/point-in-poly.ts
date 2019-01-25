import { ReadonlyVec } from "@thi.ng/vectors";

export const pointInPoly2 =
    (pts: ReadonlyVec[], [px, py]: ReadonlyVec) => {
        const n = pts.length - 1;
        let a = pts[n];
        let b = pts[0];
        let inside = 0;
        for (let i = 0; i <= n; a = b, b = pts[++i]) {
            inside = classifyPointPolyPair(px, py, a[0], a[1], b[0], b[1], inside);
        }
        return inside;
    };

export const classifyPointPolyPair = (
    px: number,
    py: number,
    ax: number,
    ay: number,
    bx: number,
    by: number,
    inside: number
) =>
    ((ay < py && by >= py) || (by < py && ay >= py)) && (ax <= px || bx <= px) ?
        inside ^ (((ax + (py - ay) / (by - ay) * (bx - ax)) < px) ? 1 : 0) :
        inside;
