import type { MultiToBVecOpV, ToBVecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [isNaN, isNaN2, isNaN3, isNaN4] = defFnOp<
    MultiToBVecOpV,
    ToBVecOpV
>("isNaN");
