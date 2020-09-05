import type { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

export const [pow, pow2, pow3, pow4] = defOp<MultiVecOpVV, VecOpVV>(
    FN2("Math.pow")
);
