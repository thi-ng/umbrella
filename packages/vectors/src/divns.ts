import type { VecOpSGVN, VecOpSVN } from "./api";
import { ARGS_V, ARGS_VN, defOpS, SARGS_V } from "./internal/codegen";
import { MATH_N } from "./internal/templates";

export const [divNS, divNS2, divNS3, divNS4] = defOpS<VecOpSGVN, VecOpSVN>(
    MATH_N("/"),
    ARGS_VN,
    SARGS_V,
    ARGS_V
);
