import { addW3 } from "./addw";
import { ReadonlyVec, Vec } from "./api";

export const mixQuadratic = (
    out: Vec | null,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    t: number
) => {
    const s = 1 - t;
    return addW3(out, a, b, c, s * s, 2 * s * t, t * t);
};
