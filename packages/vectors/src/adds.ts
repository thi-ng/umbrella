import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [addS, addS2, addS3, addS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("+")
);
