import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [sinh, sinh2, sinh3, sinh4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.sinh"
);
