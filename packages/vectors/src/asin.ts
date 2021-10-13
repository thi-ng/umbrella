import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [asin, asin2, asin3, asin4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.asin"
);
