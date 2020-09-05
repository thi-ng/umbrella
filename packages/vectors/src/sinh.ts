import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./internal/codegen";

export const [sinh, sinh2, sinh3, sinh4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.sinh"
);
