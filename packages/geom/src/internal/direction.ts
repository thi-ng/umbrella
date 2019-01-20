import {
    normalize,
    perpendicularLeft2,
    perpendicularRight2,
    ReadonlyVec,
    sub
} from "@thi.ng/vectors3";

export const direction =
    (a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        normalize(null, sub([], b, a), n);

export const normalL2 =
    (a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        perpendicularLeft2(null, direction(a, b, n));

export const normalR2 =
    (a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        perpendicularRight2(null, direction(a, b, n));
