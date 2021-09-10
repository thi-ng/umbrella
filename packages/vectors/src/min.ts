import type { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./compile/emit";
import { FN2 } from "./compile/templates";

export const [min, min2, min3, min4] = defOp<MultiVecOpVV, VecOpVV>(
    FN2("Math.min")
);
