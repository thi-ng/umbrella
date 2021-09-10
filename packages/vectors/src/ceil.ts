import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [ceil, ceil2, ceil3, ceil4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.ceil"
);
