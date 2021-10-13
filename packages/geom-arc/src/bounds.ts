import { HALF_PI } from "@thi.ng/math/api";
import { inRange } from "@thi.ng/math/interval";
import { roundTo } from "@thi.ng/math/prec";
import { MAX2, MIN2, ReadonlyVec, Vec, VecPair } from "@thi.ng/vectors/api";
import { max2 } from "@thi.ng/vectors/max";
import { min2 } from "@thi.ng/vectors/min";
import { set2 } from "@thi.ng/vectors/set";
import { pointAtTheta } from "./point-at.js";

export const bounds = (
    pos: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    start: number,
    end: number
): VecPair => {
    const min = set2([], MAX2);
    const max = set2([], MIN2);
    const p: Vec = [];
    const update = (theta: number) => {
        pointAtTheta(pos, r, axis, theta, p);
        min2(null, min, p);
        max2(null, max, p);
    };
    update(start);
    update(end);
    if (start > end) {
        const t = start;
        start = end;
        end = t;
    }
    // include multiples of π/2 within [start,end] interval
    for (
        let i = roundTo(start, HALF_PI), j = roundTo(end, HALF_PI);
        i < j;
        i += HALF_PI
    ) {
        inRange(i, start, end) && update(i);
    }
    return [min, max];
};
