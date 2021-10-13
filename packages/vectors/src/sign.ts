import type { MultiVecOpV, VecOpV } from "./api.js";
import { defFnOp } from "./compile/emit.js";

export const [sign, sign2, sign3, sign4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.sign"
);
