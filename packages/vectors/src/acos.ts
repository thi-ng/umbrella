import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [acos, acos2, acos3, acos4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.acos"
);
