import { addWeighted3 } from "./add-weighted";
import { ReadonlyVec, Vec } from "./api";

export const mixQuadratic =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, t: number) => {
        const s = 1 - t;
        return addWeighted3(out, a, b, c, s * s, 2 * s * t, t * t);
    };
