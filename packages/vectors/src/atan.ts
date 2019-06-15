import { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./internal/codegen";

export const [atan, atan2, atan3, atan4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.atan"
);
