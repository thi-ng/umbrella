import type { MultiVecOpVVN, VecOpVVN } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_VVN, MIX_N } from "./compile/templates.js";

export const [mixN, mixN2, mixN3, mixN4] = defOp<MultiVecOpVVN, VecOpVVN>(
    MIX_N,
    ARGS_VVN
);
