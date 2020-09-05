import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./internal/codegen";

export const [acos, acos2, acos3, acos4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.acos"
);
