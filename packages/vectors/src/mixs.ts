import type { VecOpSGVVV, VecOpSVVV } from "./api";
import { ARGS_VVV, defOpS, SARGS_VVV } from "./internal/codegen";
import { MIX } from "./internal/templates";

export const [mixS, mixS2, mixS3, mixS4] = defOpS<VecOpSGVVV, VecOpSVVV>(
    MIX,
    ARGS_VVV,
    SARGS_VVV,
    ARGS_VVV
);
