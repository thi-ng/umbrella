import type { ReadonlyVec, Vec, VecOpV } from "./api";
import { mulN } from "./muln";

export const neg: VecOpV = (out: Vec | null, v: ReadonlyVec) =>
    mulN(out, v, -1);
