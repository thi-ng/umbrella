import type { VecOpSGVVV, VecOpSVVV } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VVV, MATH2, SARGS_VVV } from "./compile/templates";

export const [addmS, addmS2, addmS3, addmS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
    MATH2("+", "*"),
    ARGS_VVV,
    SARGS_VVV,
    ARGS_VVV
);
