import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [acos, acos2, acos3, acos4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.acos"
);
