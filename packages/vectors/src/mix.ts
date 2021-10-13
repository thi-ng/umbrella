import type { MultiVecOpVVV, VecOpVVV } from "./api.js";
import { defOp } from "./compile/emit.js";
import { ARGS_VVV, MIX } from "./compile/templates.js";

export const [mix, mix2, mix3, mix4] = defOp<MultiVecOpVVV, VecOpVVV>(
    MIX,
    ARGS_VVV
);
