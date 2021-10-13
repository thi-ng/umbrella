import type { VecOpSGVVV, VecOpSVVV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { ARGS_VVV, MATH2, SARGS_VVV } from "./compile/templates.js";

export const [addmS, addmS2, addmS3, addmS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
    MATH2("+", "*"),
    ARGS_VVV,
    SARGS_VVV,
    ARGS_VVV
);
