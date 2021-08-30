import type { VecOpSGVVV, VecOpSVVV } from "./api";
import { ARGS_VVV, defOpS, SARGS_VVV } from "./internal/codegen";
import { MATH2 } from "./internal/templates";

export const [submS, submS2, submS3, submS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
    MATH2("-", "*"),
    ARGS_VVV,
    SARGS_VVV,
    ARGS_VVV
);
