import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { addmN } from "@thi.ng/vectors/addmn";
import { direction } from "@thi.ng/vectors/direction";
import { mixN } from "@thi.ng/vectors/mixn";
import { set } from "@thi.ng/vectors/set";

const buildUniform = (segments: Vec[], t: number) => {
    const res: Vec[][] = [];
    for (let i = 0, n = segments.length - 2; i < n; i += 2) {
        const a = segments[i];
        const b = segments[i + 1];
        const c = segments[i + 2];
        res.push([
            a,
            add(null, direction([], a, b, t), a),
            add(null, direction([], c, b, t), c),
            c,
        ]);
    }
    return res;
};

const buildNonUniform = (segments: Vec[], t: number) => {
    const res: Vec[][] = [];
    for (let i = 0, n = segments.length - 2; i < n; i += 2) {
        const a = segments[i];
        const b = segments[i + 1];
        const c = segments[i + 2];
        res.push([a, mixN([], a, b, t), mixN([], c, b, t), c]);
    }
    return res;
};

export const closedCubicFromControlPoints = (
    points: ReadonlyVec[],
    t = 1,
    uniform = false
) => {
    const segments: Vec[] = [];
    for (let i = 0, num = points.length; i < num; i++) {
        const q = points[(i + 1) % num];
        segments.push(addmN([], points[i], q, 0.5), set([], q));
    }
    segments.push(segments[0]);
    return uniform ? buildUniform(segments, t) : buildNonUniform(segments, t);
};

export const openCubicFromControlPoints = (
    points: ReadonlyVec[],
    t = 1,
    uniform = false
) => {
    const segments: Vec[] = [set([], points[0]), set([], points[0])];
    const num = points.length - 1;
    for (let i = 0; i < num; i++) {
        const q = points[i + 1];
        segments.push(addmN([], points[i], q, 0.5), set([], q));
    }
    segments.push(set([], points[num]));
    return uniform ? buildUniform(segments, t) : buildNonUniform(segments, t);
};
