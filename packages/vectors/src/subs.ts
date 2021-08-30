import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [subS, subS2, subS3, subS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("-")
);
