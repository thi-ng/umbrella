import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VVV, MIX } from "./compile/templates";

export const [mix, mix2, mix3, mix4] = defOp<MultiVecOpVVV, VecOpVVV>(
    MIX,
    ARGS_VVV
);
