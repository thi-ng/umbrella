import type { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

export const [max, max2, max3, max4] = defOp<MultiVecOpVV, VecOpVV>(
    FN2("Math.max")
);
