import type { VecOpSGVVV, VecOpSVVV } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VVV, MATH2, SARGS_VVV } from "./compile/templates";

export const [msubS, msubS2, msubS3, msubS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
    MATH2("*", "-"),
    ARGS_VVV,
    SARGS_VVV,
    ARGS_VVV
);
