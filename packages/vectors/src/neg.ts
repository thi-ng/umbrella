import { ReadonlyVec, Vec, VecOpV } from "./api";
import { mulN } from "./muln";

export const neg: VecOpV =
    (out: Vec, v: ReadonlyVec) => mulN(out, v, -1);
