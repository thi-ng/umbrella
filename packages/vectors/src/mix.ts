import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defOp } from "./internal/codegen";
import { MIX } from "./internal/templates";

export const [mix, mix2, mix3, mix4] = defOp<MultiVecOpVVV, VecOpVVV>(
    MIX,
    ARGS_VVV
);
