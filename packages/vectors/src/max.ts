import type { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./compile/emit";
import { FN2 } from "./compile/templates";

export const [max, max2, max3, max4] = defOp<MultiVecOpVV, VecOpVV>(
    FN2("Math.max")
);
