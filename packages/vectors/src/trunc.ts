import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [trunc, trunc2, trunc3, trunc4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.trunc"
);
