import type { VecOpSGVVN, VecOpSVVN } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VVN, MIX_N, SARGS_VV } from "./compile/templates";

export const [mixNS, mixNS2, mixNS3, mixNS4] = defOpS<VecOpSGVVN, VecOpSVVN>(
    MIX_N,
    ARGS_VVN,
    SARGS_VV
);
