import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { FN2 } from "./compile/templates.js";

export const [min, min2, min3, min4] = defOp<MultiVecOpVV, VecOpVV>(
    FN2("Math.min")
);
