import type { BVecOpV, MultiBVecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [logicNot, logicNot2, logicNot3, logicNot4] = defFnOp<
    MultiBVecOpV,
    BVecOpV
>("!");
