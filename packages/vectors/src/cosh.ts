import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [cosh, cosh2, cosh3, cosh4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.cosh"
);
