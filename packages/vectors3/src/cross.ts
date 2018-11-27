import { ReadonlyVec, Vec } from "./api";

export const cross2 =
    (a: ReadonlyVec, b: ReadonlyVec) =>
        a[0] * b[1] - a[1] * b[0];

export const cross3 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec) => {
        !out && (out = a);
        const x = a[1] * b[2] - a[2] * b[1];
        const y = a[2] * b[0] - a[0] * b[2];
        out[2] = a[0] * b[1] - a[1] * b[0];
        out[1] = y;
        out[0] = x;
        return a;
    };
