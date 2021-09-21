import type { VecOpSGVVV, VecOpSVVV } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VVV, MIX, SARGS_VVV } from "./compile/templates";

export const [mixS, mixS2, mixS3, mixS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
    MIX,
    ARGS_VVV,
    SARGS_VVV,
    ARGS_VVV
);
