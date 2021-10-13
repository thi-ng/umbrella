import type { ReadonlyVec, Vec, VecOpV } from "./api.js";
import { mulN } from "./muln.js";

export const neg: VecOpV = (out: Vec | null, v: ReadonlyVec) =>
    mulN(out, v, -1);
