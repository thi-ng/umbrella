import type { VecOpSGVV, VecOpSVV } from "./api";
import { defOpS } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [divS, divS2, divS3, divS4] = defOpS<VecOpSGVV, VecOpSVV>(
    MATH("/")
);
