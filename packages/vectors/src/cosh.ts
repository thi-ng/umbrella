import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [cosh, cosh2, cosh3, cosh4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.cosh"
);
