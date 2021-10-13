import type { BVecOpV, MultiBVecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [logicNot, logicNot2, logicNot3, logicNot4] = defFnOp<
    MultiBVecOpV,
    BVecOpV
>("!");
