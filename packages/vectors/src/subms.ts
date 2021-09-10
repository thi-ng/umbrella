import type { VecOpSGVVV, VecOpSVVV } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VVV, MATH2, SARGS_VVV } from "./compile/templates";

export const [submS, submS2, submS3, submS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
    MATH2("-", "*"),
    ARGS_VVV,
    SARGS_VVV,
    ARGS_VVV
);
