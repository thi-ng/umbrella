import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [tanh, tanh2, tanh3, tanh4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.tanh"
);
