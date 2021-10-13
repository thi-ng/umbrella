import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [trunc, trunc2, trunc3, trunc4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.trunc"
);
