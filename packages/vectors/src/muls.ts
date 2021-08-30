import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [mulS, mulS2, mulS3, mulS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("*")
);
