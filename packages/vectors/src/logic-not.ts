import type { BVecOpV, MultiBVecOpV } from "./api";
import { defFnOp } from "./internal/codegen";

export const [logicNot, logicNot2, logicNot3, logicNot4] = defFnOp<
    MultiBVecOpV,
    BVecOpV
>("!");
