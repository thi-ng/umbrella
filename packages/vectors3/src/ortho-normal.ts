import { ReadonlyVec, Vec } from "./api";
import { cross3 } from "./cross";
import { sub3 } from "./sub";

export const orthoNormal3 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) =>
        cross3(out, sub3(out, c, a), sub3([], b, a));
