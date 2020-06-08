import {
    corner2,
    cornerBisector,
    direction,
    dist,
    maddN,
    mulN,
    perpendicularCW,
    ReadonlyVec,
    set,
    Vec,
} from "@thi.ng/vectors";

const buildSegments = (tangents: Vec[][], t: number, uniform: boolean) => {
    const res: Vec[][] = [];
    for (let i = 0, num = tangents.length - 1; i < num; i++) {
        const [a, na] = tangents[i];
        const [b, nb] = tangents[i + 1];
        const d = uniform ? t : t * dist(a, b);
        res.push([a, maddN([], na, d, a), maddN([], nb, -d, b), b]);
    }
    return res;
};

export const closedCubicFromBreakPoints = (
    points: ReadonlyVec[],
    t = 1 / 3,
    uniform = false
) => {
    const tangents: Vec[][] = [];
    for (let num = points.length, i = num - 1, j = 0; j < num; i = j, j++) {
        const a = points[i];
        const b = points[j];
        const c = points[(j + 1) % num];
        const n = mulN(
            null,
            perpendicularCW(null, cornerBisector([], a, b, c)),
            corner2(a, b, c)
        );
        tangents.push([set([], b), n]);
    }
    tangents.push(tangents[0]);
    return buildSegments(tangents, t, uniform);
};

export const openCubicFromBreakPoints = (
    points: ReadonlyVec[],
    t = 1 / 3,
    uniform = false
) => {
    const tangents: Vec[][] = [
        [points[0], direction([], points[0], points[1])],
    ];
    const num = points.length - 1;
    for (let i = 1; i < num; i++) {
        const a = points[i - 1];
        const b = points[i];
        const c = points[i + 1];
        const n = mulN(
            null,
            perpendicularCW(null, cornerBisector([], a, b, c)),
            corner2(a, b, c)
        );
        tangents.push([set([], b), n]);
    }
    tangents.push([points[num], direction([], points[num - 1], points[num])]);
    return buildSegments(tangents, t, uniform);
};
