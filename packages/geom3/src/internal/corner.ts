import { EPS, sign } from "@thi.ng/math";
import { ReadonlyVec, signedArea2 } from "@thi.ng/vectors3";

export const corner =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, eps = EPS) =>
        sign(signedArea2(a, b, c), eps);