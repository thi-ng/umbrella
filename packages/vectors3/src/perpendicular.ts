import { ReadonlyVec, Vec } from "./api";

export const perpendicularLeft2 =
    (out: Vec, a: ReadonlyVec) => {
        const x = a[0];
        out[0] = -a[1];
        out[1] = x;
        return out;
    };

export const perpendicularRight2 =
    (out: Vec, a: ReadonlyVec) => {
        const x = -a[0];
        out[0] = a[1];
        out[1] = x;
        return out;
    };
