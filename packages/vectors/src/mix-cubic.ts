import { ReadonlyVec, Vec } from "./api";
import { addW4 } from "./addw";

export const mixCubic = (
    out: Vec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    t: number
) => {
    const s = 1 - t;
    const s2 = s * s;
    const t2 = t * t;
    return addW4(out, a, b, c, d, s2 * s, 3 * s2 * t, 3 * t2 * s, t2 * t);
};
