import {
    add,
    direction,
    mixN,
    ReadonlyVec,
    set,
    Vec
} from "@thi.ng/vectors";

export const closedCubicFromControlPoints = (
    points: ReadonlyVec[],
    t = 1,
    uniform = false
) => {
    const segments = [];
    for (let i = 0, num = points.length; i < num; i++) {
        const a = points[i];
        const b = points[(i + 1) % num];
        segments.push(mixN([], a, b, 0.5), set([], b));
    }
    segments.push(segments[0]);
    const res: Vec[][] = [];
    if (uniform) {
        for (let i = 0, n = segments.length - 2; i < n; i += 2) {
            const a = segments[i];
            const b = segments[i + 1];
            const c = segments[i + 2];
            res.push([
                a,
                add(null, direction([], a, b, t), a),
                add(null, direction([], c, b, t), c),
                c
            ]);
        }
    } else {
        for (let i = 0, n = segments.length - 2; i < n; i += 2) {
            const a = segments[i];
            const b = segments[i + 1];
            const c = segments[i + 2];
            res.push([a, mixN([], a, b, t), mixN([], c, b, t), c]);
        }
    }
    return res;
};
