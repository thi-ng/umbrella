import {
    corner2,
    dist,
    maddN,
    mixN,
    mulN,
    normalize,
    perpendicularCW,
    ReadonlyVec,
    set,
    sub,
    Vec
} from "@thi.ng/vectors";

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
            perpendicularCW(
                null,
                normalize(
                    null,
                    mixN(
                        null,
                        normalize(null, sub([], a, b)),
                        normalize(null, sub([], c, b)),
                        0.5
                    )
                )
            ),
            corner2(a, b, c)
        );
        tangents.push([set([], b), n]);
    }
    tangents.push(tangents[0]);
    const res: Vec[][] = [];
    for (let i = 0, num = tangents.length - 1; i < num; i++) {
        const [a, na] = tangents[i];
        const [b, nb] = tangents[i + 1];
        const d = uniform ? t : t * dist(a, b);
        res.push([a, maddN([], na, d, a), maddN([], nb, -d, b), b]);
    }
    return res;
};
