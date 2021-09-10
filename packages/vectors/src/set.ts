import type { MultiVecOpV, VecOpV } from "./api";
import { defOp } from "./compile/emit";
import { NEW_OUT, SET } from "./compile/templates";

export const [set, set2, set3, set4] = defOp<MultiVecOpV, VecOpV>(
    SET,
    "o,a",
    undefined,
    "o",
    1,
    NEW_OUT
);
