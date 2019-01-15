import { ReadonlyVec } from "@thi.ng/vectors3";

export const polyPointInside =
    (pts: ReadonlyVec[], { 0: px, 1: py }: ReadonlyVec) => {
        let inside = 0;
        for (let n = pts.length - 1, i = n, j = 0; j <= n; i = j, j++) {
            inside = polyPointInsidePair(pts[i], pts[j], px, py, inside);
        }
        return inside;
    };

export const polyPointInsidePair =
    (a: ReadonlyVec, b: ReadonlyVec, px: number, py: number, inside: number) => {
        if (((a[1] < py && b[1] >= py) ||
            (b[1] < py && a[1] >= py)) &&
            (a[0] <= px || b[0] <= px)) {
            inside ^= (((a[0] + (py - a[1]) / (b[1] - a[1]) * (b[0] - a[0])) < px) ? 1 : 0);
        }
        return inside;
    };
