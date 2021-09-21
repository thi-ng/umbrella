import type { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./compile/emit";
import { FN2 } from "./compile/templates";

export const [pow, pow2, pow3, pow4] = defOp<MultiVecOpVV, VecOpVV>(
    FN2("Math.pow")
);
