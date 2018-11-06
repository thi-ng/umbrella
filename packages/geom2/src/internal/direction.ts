import { ReadonlyVec, normalize, subNew } from "@thi.ng/vectors2/api";
import { perpendicularLeft2, perpendicularRight2 } from "@thi.ng/vectors2/vec2";

export const direction =
    (a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        normalize(subNew(b, a), n);

export const normalL2 =
    (a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        perpendicularLeft2(direction(a, b, n));

export const normalR2 =
    (a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
        perpendicularRight2(direction(a, b, n));
